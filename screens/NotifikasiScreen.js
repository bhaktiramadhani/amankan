import { View, Text } from 'react-native'
import React from 'react'
import { SvgUri } from 'react-native-svg'
import { Profile } from '../core/Svg'

export default function NotifikasiScreen() {
  return (
    <View>
      <Text>NotifikasiScreen</Text>
      <Profile width={100} height={100} fill="black"/>
    </View>
  )
}