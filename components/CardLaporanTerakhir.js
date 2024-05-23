import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Distance, Location, Time } from "../core/Svg";

export default function CardLaporanTerakhir({image, title, location, distance, time}) {
  return (
    <Pressable style={styles.laporanCard}>
      <Image
        source={image}
        width={200}
        height={300}
      />
      <Text style={styles.textCardHeading}>{title}</Text>
      <View style={{ paddingHorizontal: 10, paddingBottom: 10, gap: 6 }}>
        <View style={styles.cardItemContainer}>
          <Location width={24} height={24} />
          <Text>{location}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Distance width={24} height={24} />
          <Text>{distance}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Time width={24} height={24} />
          <Text>{time}</Text>
        </View>
      </View>
    </Pressable>
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
