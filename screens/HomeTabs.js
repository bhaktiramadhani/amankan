import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import LaporanScreen from "./LaporanScreen";
import NotifikasiScreen from "./NotifikasiScreen";
import ProfileScreen from "./ProfileScreen";
import LaporScreen from "./LaporScreen";
import { Beranda, Laporan, Notification, Plus, Profile } from "../core/Svg";
import { Text, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

export default function HomeTabs({navigation}) {
  const tabBarLabelStyle = {
    fontSize: 12,
    fontWeight: 'medium',
    fontFamily: "Poppins_500Medium",
    paddingBottom: 14
  }
  const tabBarActiveTintColor = '#FF2D2D'
  const tabBarInactiveTintColor = '#000000'
  return (
    <Tab.Navigator initialRouteName="HomeTabs" screenOptions={{ 
      tabBarStyle: {
        paddingTop: 18,
        paddingHorizontal: 14,
        height: 80,
      },
     }}>
      <Tab.Screen
        name="HomeTabs"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Beranda width={24} height={24} />,
          tabBarLabelStyle: tabBarLabelStyle,
          tabBarLabel: 'Beranda',
          tabBarActiveTintColor: tabBarActiveTintColor,
          tabBarInactiveTintColor: tabBarInactiveTintColor
        }}
      />
      <Tab.Screen
        name="Laporan"
        component={LaporanScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Laporan width={24} height={24} />,
          tabBarLabelStyle: tabBarLabelStyle,
          tabBarActiveTintColor: tabBarActiveTintColor,
          tabBarInactiveTintColor: tabBarInactiveTintColor
        }}
      />
      <Tab.Screen
        name="Lapor"
        component={LaporScreen}
        options={{
          headerShown: false,
          tabBarVisible: false,
          tabBarButton: () => {
            return (
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('Lapor Screen');
              }}
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 99,
                  backgroundColor: '#FF2D2D',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -10
                }}
              >
                <Plus width={24} height={24}/>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Lapor</Text>
              </TouchableOpacity>
            )

          }
        }}
      />
      <Tab.Screen
        name="Notifikasi"
        component={NotifikasiScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Notification width={24} height={24} fill="#FF2D2D"/>,
          tabBarLabelStyle: tabBarLabelStyle,
          tabBarActiveTintColor: tabBarActiveTintColor,
          tabBarInactiveTintColor: tabBarInactiveTintColor
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Profile width={24} height={24} />,
          tabBarLabelStyle: tabBarLabelStyle,
          tabBarActiveTintColor: tabBarActiveTintColor,
          tabBarInactiveTintColor: tabBarInactiveTintColor
        }}
      />
    </Tab.Navigator>
  );
}
