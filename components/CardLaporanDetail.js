import { useEffect, useState } from "react";
import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import {
  ArrowLeft,
  CameraIcon,
  Distance,
  Location,
  Send,
  ShareBasic,
  ShareWhatsapp,
  Time,
} from "../core/Svg";
import ImageView from "./ImageView";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapFullView from "./MapFullView";

export default function CardLaporanDetail({ navigation, route }) {
  const data = route.params.laporan;
  console.log(data);
  const { width, height } = Dimensions.get("window");
  const [showImageView, setShowImageView] = useState(false);
  const [showMapView, setShowMapView] = useState(false);

  useEffect(() => {
    // custom back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.navigate("Home");
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  if (showImageView) {
    return <ImageView image={data.image} setShowImageView={setShowImageView} />;
  }

  if (showMapView) {
    return (
      <MapFullView
        isProses={false}
        address={data.address}
        location={data.location}
        setShowMapView={setShowMapView}
      />
    );
  }
  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.arrowLeft}
        onPress={() => navigation.navigate("Home")}
      >
        <ArrowLeft width={50} height={50} fill="white" />
      </TouchableOpacity>
      <Pressable onPress={() => setShowImageView(true)}>
        <Image
          source={{ uri: data.image }}
          style={{ width: width, height: 400 }}
        />
      </Pressable>
      <View style={styles.contentContainer}>
        <Text
          style={{
            color: "#808080",
            marginBottom: 6,
          }}
        >
          Apabila ingin ubah status klik dibawah ini!
        </Text>
        <View style={styles.status}>
          <Text style={styles.statusText}>Belum Selesai</Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 12,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/images/default-profile.jpg")}
                style={{ width: 30, height: 30, borderRadius: 99 }}
              />
              <View style={{ marginLeft: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: "semibold" }}>
                  {data.user.name}
                </Text>
                <Text style={{ fontSize: 10, color: "#808080" }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {data.user.role.toUpperCase()} -{" "}
                  </Text>
                  {data.time}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity>
                <ShareBasic width={30} height={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <ShareWhatsapp width={30} height={30} />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            {data.title}
          </Text>
          <View
            style={{
              marginTop: 18,
              marginRight: 22,
              rowGap: 6,
            }}
          >
            <View style={styles.cardItemContainer}>
              <Time width={24} height={24} fill="#000000" />
              <Text>3 menit yang lalu</Text>
            </View>
            <View style={styles.cardItemContainer}>
              <Location width={24} height={24} fill="#000000" />
              <Text style={{ width: "auto" }}>{data.address}</Text>
            </View>
            <View style={styles.cardItemContainer}>
              <Distance width={24} height={24} />
              <Text>0.3 KM dari lokasi anda</Text>
            </View>
          </View>
          <Pressable onPress={() => setShowMapView(true)}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: data.location.latitude,
                longitude: data.location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              showsUserLocation={true}
              initialCamera={{
                zoom: 5,
                heading: 0,
                pitch: 0,
                altitude: 0,
                center: data.location,
              }}
              cacheEnabled={Platform.OS === "android" ? true : false}
            >
              <Marker coordinate={data.location} />
              <Circle
                center={data.location}
                radius={200} // radius in meters
                strokeWidth={1}
                strokeColor={"rgba(66,133,244,1)"}
                fillColor={"rgba(66,133,244,0.1)"}
              />
            </MapView>
          </Pressable>
          <View style={styles.chatContainer}>
            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: "semibold" }}>Chat</Text>
            </View>
            <View
              style={{
                width: "auto",
                height: 2,
                backgroundColor: "black",
                marginBottom: 10,
              }}
            ></View>
            <View style={{ height: 100 }}></View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#D9D9D9",
                marginHorizontal: 16,
                marginBottom: 13,
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 12,
              }}
            >
              <CameraIcon width={30} height={30} fill="#000000" />
              <View
                style={{
                  width: 2,
                  height: "auto",
                  backgroundColor: "#000000",
                  marginLeft: 6,
                  marginRight: 14,
                }}
              ></View>
              <TextInput
                style={{ flexGrow: 1, padding: 0 }}
                placeholder="Tulis pesan disini"
              />
              <View
                style={{
                  alignItems: "flex-end",
                }}
              >
                <Send width={30} height={30} fill="#000000" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  arrowLeft: {
    position: "absolute",
    zIndex: 1,
    top: 16,
    left: 22,
  },
  contentContainer: {
    marginVertical: 20,
    marginHorizontal: 22,
  },
  status: {
    backgroundColor: "#FF6161",
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 14,
    alignSelf: "flex-start",
    marginRight: 6,
  },
  statusText: {
    color: "white",
    fontWeight: "medium",
  },
  cardItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  map: {
    width: "100%",
    height: 160,
    marginTop: 12,
    marginBottom: 22,
  },
  chatContainer: {
    borderRadius: 16,
    backgroundColor: "white",
  },
});
