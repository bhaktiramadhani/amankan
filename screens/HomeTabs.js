import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import LaporanScreen from "./LaporanScreen";
import { Time } from "../core/Svg";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown:false }} />
      <Tab.Screen
        name="Laporan"
        component={LaporanScreen}
        options={{ headerShown: false, tabBarIcon: () => <Time width={24} height={24}/> }}
      />
    </Tab.Navigator>
  );
}
