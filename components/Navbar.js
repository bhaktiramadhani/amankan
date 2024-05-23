import { View, Text, Image, StatusBar } from 'react-native'
import { Logo } from '../core/Svg'

export default function Navbar() {
  return (
    <View style={{ marginTop: 8, marginBottom:12, alignItems: 'center' }}>
        <Logo width={80} height={80}/>
        <StatusBar/>
    </View>
  )
}