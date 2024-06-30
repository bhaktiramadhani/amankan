import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/Auth/LoginScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import PanduanPelaporan from "./screens/PanduanPelaporan";
import { useFonts } from "expo-font";
import HomeTabs from "./screens/HomeTabs";
import LaporScreen from "./screens/LaporScreen";
import SemuaLaporan from "./screens/SemuaLaporan";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import CardLaporanDetail from "./components/CardLaporanDetail";
import { getCurrentLocation, watchLocation } from "./core/location";
import registerForPushNotificationsAsync from "./core/notificationToken";
import { fetchLocation, storeLocation, updateLocation } from "./core/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserStore from "./context/store";
import EditProfileScreen from "./screens/EditProfileScreen";
import LokasiRumahScreen from "./screens/LokasiRumahScreen";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_200ExtraLight: require("./assets/fonts/Poppins_200ExtraLight.ttf"),
    Poppins_300Light: require("./assets/fonts/Poppins_300Light.ttf"),
    Poppins_400Regular: require("./assets/fonts/Poppins_400Regular.ttf"),
    Poppins_500Medium: require("./assets/fonts/Poppins_500Medium.ttf"),
    Poppins_600SemiBold: require("./assets/fonts/Poppins_600SemiBold.ttf"),
    Poppins_700Bold: require("./assets/fonts/Poppins_700Bold.ttf"),
    Poppins_800ExtraBold: require("./assets/fonts/Poppins_800ExtraBold.ttf"),
  });

  const [locationSubscription, setLocationSubscription] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user !== null) {
          setUser(JSON.parse(user));
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const updateLocationData = async (location) => {
      if (!isLogin) {
        console.log("User not logged in. Skipping location update.");
        return;
      }

      const token = await registerForPushNotificationsAsync();
      const user = await AsyncStorage.getItem("user");

      if (location && token) {
        const existingLocations = await fetchLocation();

        let existingEntry = null;

        for (const key in existingLocations) {
          if (existingLocations[key].token === token) {
            existingEntry = { id: key, ...existingLocations[key] };
            break;
          }
        }
        const data = { ...location, token, user };

        if (existingEntry) {
          console.log("Updating location app.js : " + token);
          await updateLocation(existingEntry.id, data);
        } else {
          console.log("Storing location app.js : " + token);
          await storeLocation(data);
        }
      }
    };

    // const startLocationWatch = async () => {
    //   if (!isLogin) {
    //     console.log("User not logged in. Skipping location watch.");
    //     return;
    //   }

    //   const subscription = await watchLocation(async (location) => {
    //     const { latitude, longitude } = location.coords;
    //     const currentLocation = { latitude, longitude };
    //     await updateLocationData(currentLocation);
    //   });

    //   setLocationSubscription(subscription);
    // };

    // startLocationWatch();

    // return () => {
    //   if (locationSubscription) {
    //     locationSubscription.remove();
    //   }
    // };
  }, [isLogin]);

  const onLayoutRootView = useCallback(async () => {
    console.log(fontsLoaded, fontError);
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const headerShown = { headerShown: false };
  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer>
        {/* initialRouteName={isLogin ? "Home" : "Login"} */}
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={headerShown}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={headerShown}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={headerShown}
          />
          <Stack.Screen
            name="LaporScreen"
            component={LaporScreen}
            options={headerShown}
          />
          <Stack.Screen
            name="PanduanPelaporan"
            component={PanduanPelaporan}
            options={{
              headerStyle: { backgroundColor: "#FF2D2D" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="SemuaLaporan"
            component={SemuaLaporan}
            options={{
              headerStyle: { backgroundColor: "#FF2D2D" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
              headerTitleAlign: "center",
              title: "Semua Laporan",
            }}
          />
          <Stack.Screen
            name="DetailLaporan"
            component={CardLaporanDetail}
            options={headerShown}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
              headerStyle: { backgroundColor: "#FF2D2D" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
              headerTitleAlign: "center",
              title: "Edit Profile",
            }}
          />
          <Stack.Screen
            name="CekLokasi"
            component={LokasiRumahScreen}
            options={{
              headerStyle: { backgroundColor: "#FF2D2D" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
              headerTitleAlign: "center",
              title: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
