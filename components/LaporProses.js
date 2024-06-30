import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { LaporProsesIcon } from "../core/Svg";
import { useEffect, useState } from "react";
import MapFullView from "./MapFullView";

export default function LaporProses({
  navigation,
  location,
  setShowMapView,
  showMapView,
  setLaporClicked,
  laporan,
}) {
  const { width, height } = Dimensions.get("window");
  const [laporanTersebar, setLaporanTersebar] = useState(false);

  useEffect(() => {
    // custom back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setLaporClicked(false);
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLaporanTersebar(true);
    }, 3000);
  }, []);

  if (!laporanTersebar) {
    return (
      <MapFullView
        isProses={true}
        location={location}
        setShowMapView={setShowMapView}
      />
    );
  }

  return (
    <View>
      <LaporProsesIcon width={width} height={375} />
      <View style={styles.textContainer}>
        <Text style={styles.textHeading}>Laporan anda sedang disebarkan</Text>
        <Text style={{ fontSize: 16, marginTop: 10, color: "#808080" }}>
          Tunggu sebentar laporan anda sedang diproses untuk disebarkan kepada
          pengguna sekitar!
        </Text>
        <Text style={{ fontSize: 16, marginTop: 14, color: "#808080" }}>
          Sambil menunggu warga yang lain berdatangan silahkan{" "}
          <Text style={{ fontWeight: "bold" }}>AMANKAN DIRI ANDA</Text> terlebih
          dahulu!
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("DetailLaporan", { laporan })}
          style={[styles.button, laporanTersebar && styles.buttonDone]}
        >
          <Text style={styles.buttonText}>Lihat Laporan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginVertical: 40,
    marginHorizontal: 22,
  },
  textHeading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    height: 58,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderColor: "#FF2D2D",
    borderWidth: 1,
    backgroundColor: "white",
  },
  buttonDone: {
    borderWidth: 0,
    backgroundColor: "#FF2D2D",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
