import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  BackHandler,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
  Platform,
  ActivityIndicator,
} from "react-native";
import { ArrowLeft } from "../core/Svg";
import { useEffect, useState } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import ImageView from "./ImageView";
import MapFullView from "./MapFullView";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import LaporProses from "./LaporProses";
import { PROVIDER_GOOGLE } from "react-native-maps";
import Loading from "./Loading";
import useUserStore from "../context/store";

const LaporView = ({ navigation, image, setIsPhotoDone }) => {
  const { width, height } = Dimensions.get("window");
  const [showImageView, setShowImageView] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modal, setModal] = useState(true);
  const [kejadian, setKejadian] = useState("");
  const [laporClicked, setLaporClicked] = useState(false);
  const [pesan, setPesan] = useState("");
  const [laporan, setLaporan] = useState({});
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const getAddress = async () => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
        );
        const data = await response.json();
        setAddress(data.display_name);
      };
      getAddress();
    })();
  }, []);

  useEffect(() => {
    // custom back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setIsPhotoDone(false);
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  const handleLapor = () => {
    if (kejadian === "") {
      setModal(true);
      setPesan("Isi kejadian terlebih dahulu!");
      return;
    }
    setLaporan({
      id: Math.random(),
      user: user,
      address: address,
      location: location,
      title: kejadian,
      image: image,
      time: new Date().toLocaleString(),
    });
    setLaporClicked(true);
  };

  if (showImageView) {
    return <ImageView image={image} setShowImageView={setShowImageView} />;
  }

  if (showMapView) {
    return (
      <MapFullView
        isProses={false}
        address={address}
        location={location}
        setShowMapView={setShowMapView}
      />
    );
  }

  if (laporClicked) {
    return (
      <LaporProses
        navigation={navigation}
        location={location}
        setShowMapView={setShowMapView}
        showMapView={showMapView}
        setLaporClicked={setLaporClicked}
        laporan={laporan}
      />
    );
  }

  if (!location) {
    return <Loading />;
  }

  return (
    <ScrollView style={{ position: "relative" }}>
      <Modal transparent={true} visible={modal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Apa Yang sedang terjadi?</Text>
            <Text
              style={{ color: "#FF2D2D", display: pesan ? "flex" : "none" }}
            >
              {pesan}
            </Text>
            <TextInput
              onChangeText={(value) => {
                setKejadian(value);
                setPesan("");
              }}
              value={kejadian}
              style={styles.input}
              autoFocus={true}
              onEndEditing={() => setModal(false)}
            />
            <View style={styles.modalButtonAction}>
              <TouchableOpacity onPress={() => setModal(false)}>
                <Text
                  style={{ fontSize: 20, color: "#70C0B8", fontWeight: "bold" }}
                >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setIsPhotoDone(false)}
        style={styles.arrowLeft}
      >
        <ArrowLeft width={50} height={50} fill="white" />
      </TouchableOpacity>
      <Pressable onPress={() => setShowImageView(true)}>
        <Image source={{ uri: image }} style={{ width: width, height: 400 }} />
      </Pressable>

      <View style={{ marginVertical: 20, marginHorizontal: 22 }}>
        <Text style={styles.addressHeadingText}>Anda Sedang berada di:</Text>
        <Text style={styles.addressContentText}>
          {address ? address : "Mencari alamat..."}
        </Text>
        <Pressable onPress={() => setShowMapView(true)}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            showsUserLocation={true}
            initialCamera={{
              zoom: 5,
              heading: 0,
              pitch: 0,
              altitude: 0,
              center: location,
            }}
            cacheEnabled={Platform.OS === "android" ? true : false}
          >
            <Marker coordinate={location} />
            <Circle
              center={location}
              radius={200} // radius in meters
              strokeWidth={1}
              strokeColor={"rgba(66,133,244,1)"}
              fillColor={"rgba(66,133,244,0.1)"}
            />
          </MapView>
        </Pressable>
        <View>
          <Text style={styles.label}>Yang sedang terjadi?</Text>
          <TextInput
            style={styles.input}
            value={kejadian}
            onPress={() => setModal(true)}
            onChangeText={(value) => setKejadian(value)}
          />
        </View>
        <Text style={{ fontSize: 14, color: "#808080" }}>
          Dengan mengklik tombol dibawah ini anda berarti sudah yakin dengan
          kebenaran laporan ini!
        </Text>
        <TouchableOpacity onPress={handleLapor} style={styles.button}>
          <Text style={styles.buttonText}>Lapor</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LaporView;

const styles = StyleSheet.create({
  arrowLeft: {
    position: "absolute",
    zIndex: 1,
    top: 16,
    left: 22,
  },
  addressHeadingText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  addressContentText: {
    fontSize: 18,
    fontWeight: "regular",
  },
  map: {
    width: "100%",
    height: 160,
    marginTop: 12,
    marginBottom: 22,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  input: {
    borderWidth: 2,
    borderColor: "#DCDCDC",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginTop: 6,
    height: 48,
    marginBottom: 25,
  },
  button: {
    width: "100%",
    height: 52,
    backgroundColor: "#FF2D2D",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 4,
    padding: 20,
  },
  modalText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalButtonAction: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 32,
    paddingRight: 8,
  },
});
