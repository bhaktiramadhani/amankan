import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import PanduanPelaporan from "./screens/PanduanPelaporan";
import { useFonts } from "expo-font";
import HomeTabs from "./screens/HomeTabs";
import LaporScreen from "./screens/LaporScreen";
import SemuaLaporan from "./screens/SemuaLaporan";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import CardLaporanDetail from "./components/CardLaporanDetail";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    "Poppins_200ExtraLight": require("./assets/fonts/Poppins_200ExtraLight.ttf"),
    "Poppins_300Light": require("./assets/fonts/Poppins_300Light.ttf"),
    "Poppins_400Regular": require("./assets/fonts/Poppins_400Regular.ttf"),
    "Poppins_500Medium": require("./assets/fonts/Poppins_500Medium.ttf"),
    "Poppins_600SemiBold": require("./assets/fonts/Poppins_600SemiBold.ttf"),
    "Poppins_700Bold": require("./assets/fonts/Poppins_700Bold.ttf"),
    "Poppins_800ExtraBold": require("./assets/fonts/Poppins_800ExtraBold.ttf"),
  });
  
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
    <View onLayout={onLayoutRootView} style={{ flex:1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={headerShown}
        /> */}
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
              headerStyle: {
                backgroundColor: "#FF2D2D",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="SemuaLaporan"
            component={SemuaLaporan}
            options={{
              headerStyle: {
                backgroundColor: "#FF2D2D",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
              },
              headerTitleAlign: "center",
              title: "Semua Laporan"
            }}
          />
          <Stack.Screen
            name="DetailLaporan"
            component={CardLaporanDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
