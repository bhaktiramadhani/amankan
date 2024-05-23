import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import PanduanPelaporan from './screens/PanduanPelaporan';
import { useFonts } from 'expo-font';
import HomeTabs from './screens/HomeTabs';

const Stack = createNativeStackNavigator();


export default function App() {
  let [fontsLoaded] = useFonts({
    'Poppins_200ExtraLight': require('./assets/fonts/Poppins_200ExtraLight.ttf'),
    'Poppins_300Light': require('./assets/fonts/Poppins_300Light.ttf'),
    'Poppins_400Regular': require('./assets/fonts/Poppins_400Regular.ttf'),
    'Poppins_500Medium': require('./assets/fonts/Poppins_500Medium.ttf'),
    'Poppins_600SemiBold': require('./assets/fonts/Poppins_600SemiBold.ttf'),
    'Poppins_700Bold': require('./assets/fonts/Poppins_700Bold.ttf'),
    'Poppins_800ExtraBold': require('./assets/fonts/Poppins_800ExtraBold.ttf'),
  });

  const headerShown = {headerShown: false}
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash" component={SplashScreen} options={headerShown}/>
        <Stack.Screen name="Home" component={HomeTabs} options={headerShown}/>
        <Stack.Screen name="Login" component={LoginScreen} options={headerShown}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={headerShown}/>
        <Stack.Screen name="Panduan Pelaporan" component={PanduanPelaporan}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

