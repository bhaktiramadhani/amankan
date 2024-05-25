import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  BackHandler,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { ArrowLeft } from "../core/Svg";
import { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

const LaporView = ({ image, setIsPhotoDone }) => {
  const { width, height } = Dimensions.get("window");

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

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => setIsPhotoDone(false)}
        style={styles.arrowLeft}
      >
        <ArrowLeft width={50} height={50} fill="white" />
      </TouchableOpacity>
      <Image source={{ uri: image }} style={{ width: width, height: 400 }} />
      <View style={{ marginVertical: 20, marginHorizontal: 22 }}>
        <Text style={styles.addressHeadingText}>Anda Sedang berada di:</Text>
        <Text style={styles.addressContentText}>
          Jalan Teluk Tiram Darat GG pendamai no 09 rumah budi
        </Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -3.3323358559831706,
            longitude: 114.57987382306109,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: -3.3323358559831706,
              longitude: 114.57987382306109,
            }}
          />
        </MapView>
        <View>
          <Text style={styles.label}>Yang sedang terjadi?</Text>
          <TextInput style={styles.input} />
        </View>
        <Text style={{ fontSize: 14, color: "#808080" }}>
          Dengan mengklik tombol dibawah ini anda berarti sudah yakin dengan
          kebenaran laporan ini!
        </Text>
        <TouchableOpacity style={styles.button}>
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
    marginTop: 8
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
},
});
