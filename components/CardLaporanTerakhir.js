import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Distance, Location, Time } from "../core/Svg";

export default function CardLaporanTerakhir({
  id,
  image,
  title,
  location,
  distance,
  time,
  navigation,
}) {
  const handlePress = () => {
    navigation.navigate("DetailLaporan", {
      id: id,
      image: image,
      title: title,
      location: location,
      distance: distance,
      time: time,
    });
  };
  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={styles.laporanCard}>
        <Image
          source={image}
          width={200}
          height={165}
          fadeDuration={0}
          style={{
            width: 200,
            height: 165,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          }}
        />
        <Text style={styles.textCardHeading}>{title}</Text>
        <View style={{ paddingHorizontal: 10, paddingBottom: 10, gap: 6 }}>
          <View style={styles.cardItemContainer}>
            <Location width={24} height={24} fill="#000000" />
            <Text>{location}</Text>
          </View>
          <View style={styles.cardItemContainer}>
            <Distance width={24} height={24} fill="#000000" />
            <Text>{distance}</Text>
          </View>
          <View style={styles.cardItemContainer}>
            <Time width={24} height={24} fill="#000000" />
            <Text>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  laporanCard: {
    backgroundColor: "white",
    width: 200,
    borderRadius: 6,
    elevation: 3,
    marginRight: 10,
    marginLeft: 5,
    marginVertical: 10,
  },
  textCardHeading: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    padding: 10,
  },
  cardItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
