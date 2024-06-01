import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Distance, Location, Time, User, UserTick } from "../core/Svg";

export default function CardLaporan({
  id,
  image,
  title,
  location,
  distance,
  time,
  status,
  role,
  user,
  navigation
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
  }
  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={styles.laporanCard}>
        <Image
          source={image}
          style={styles.image}
          height={300}
          fadeDuration={0}
        />
        <Text style={styles.textCardHeading}>{title}</Text>
        <View style={styles.cardContainer}>
          <View>
            <TouchableOpacity
              style={styles.filterLabel}
            >
              <Text
                style={styles.filterLabelText}
              >
                {status}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardItemContainer}>
            <UserTick width={24} height={24} />
            <Text>{role}</Text>
          </View>
          <View style={styles.cardItemContainer}>
            <User width={24} height={24} />
            <Text>{user}</Text>
          </View>
          <View style={styles.cardItemContainer}>
            <Location width={24} height={24} />
            <Text>{location}</Text>
          </View>
          <View style={styles.cardItemContainer}>
            <Distance width={24} height={24} />
            <Text>{distance}</Text>
          </View>
          <View style={styles.cardItemContainer}>
            <Time width={24} height={24} />
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
    width: "98%",
    borderRadius: 6,
    elevation: 3,
    marginRight: 10,
    marginLeft: 5,
    marginVertical: 10,
    overflow: "hidden",
  },
  textCardHeading: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    padding: 10,
  },
  cardContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 6,
  },
  cardItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  image: {
    width: "100%",
    objectFit: "cover",
  },
  filterLabel: {
    backgroundColor: "#FF6161",
    paddingVertical: 4,
    paddingHorizontal: 13,
    borderRadius: 14,
    alignSelf: "flex-start",
    marginRight: 6,
  },
  filterLabelText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: "500",
  },
});

