import { View, Text } from 'react-native'

export default function CardLaporanDetail({route}) {
  const { id, image, title, location, distance, time } = route.params;
  return (
    <View>
      <Text style={{ fontSize: 50 }}>{title}</Text>
    </View>
  )
}