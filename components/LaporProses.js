import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LaporProsesIcon } from "../core/Svg";
import { useEffect, useState } from "react";

export default function LaporProses() {
  const { width, height } = Dimensions.get("window");
  const [laporanTersebar, setLaporanTersebar] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLaporanTersebar(true);
    }, 3000);
  }, []);
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
          style={[styles.button, laporanTersebar && styles.buttonDone]}
        >
          {!laporanTersebar ? (
            <ActivityIndicator size="large" color="#FF2D2D" />
          ) : (
            <Text style={styles.buttonText}>Lihat Laporan</Text>
          )}
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
