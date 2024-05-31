import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import PanduanPelaporan from "./screens/PanduanPelaporan";
import { useFonts } from "expo-font";
import HomeTabs from "./screens/HomeTabs";
import LaporScreen from "./screens/LaporScreen";
import SemuaLaporan from "./screens/SemuaLaporan";
import { Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from "@expo-google-fonts/poppins";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight: require("./assets/fonts/Poppins_200ExtraLight.ttf"),
    Poppins_300Light: require("./assets/fonts/Poppins_300Light.ttf"),
    Poppins_400Regular: require("./assets/fonts/Poppins_400Regular.ttf"),
    Poppins_500Medium: require("./assets/fonts/Poppins_500Medium.ttf"),
    Poppins_600SemiBold: require("./assets/fonts/Poppins_600SemiBold.ttf"),
    Poppins_700Bold: require("./assets/fonts/Poppins_700Bold.ttf"),
    Poppins_800ExtraBold: require("./assets/fonts/Poppins_800ExtraBold.ttf"),
  });


  if (!fontsLoaded) {
    return null;
  }

  const headerShown = { headerShown: false };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={headerShown}
        />
        <Stack.Screen name="Home" component={HomeTabs} options={headerShown} />
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
          name="Lapor Screen"
          component={LaporScreen}
          options={headerShown}
        />
        <Stack.Screen
          name="Panduan Pelaporan"
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
          name="Semua Laporan"
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
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
