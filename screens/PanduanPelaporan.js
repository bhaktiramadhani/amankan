import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ShareBasic, ShareWhatsapp } from "../core/Svg";

export default function PanduanPelaporan() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.headingLabel}>
        <Text style={styles.headingLabelText}>Panduan Pelaporan</Text>
      </View>
      <Text style={styles.headingText}>
        Cara Lapor Menggunakan Aplikasi AMANKAN
      </Text>
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
            <Text style={{ fontSize: 14, fontWeight: "medium" }}>Admin</Text>
            <Text style={{ fontSize: 10, color: "#808080" }}>
              Senin, 29 Februari 2024 - 18.00 WIB
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
      <View style={styles.panduanImageContainer}>
        <Image
          fadeDuration={0}
          style={{ borderRadius: 14 }}
          source={require("../assets/images/panduan.png")}
          width={331}
          height={160}
        />
      </View>
      <View style={{ marginBottom: 50 }}>
        <Text style={styles.panduanContentText}>
          Cara Lapor menggunakan aplikasi{" "}
          <Text style={{ fontWeight: "bold" }}>AMANKAN</Text> sangatlah mudah
          dengan mengikuti langkah di bawah ini.
        </Text>
        <Text style={{ marginVertical: 25, fontWeight: "bold", fontSize: 16 }}>
          Langkah-langkah :
        </Text>
        <View style={{ flexDirection: "row", gap: 3 }}>
          <Text style={styles.panduanContentText}>1.</Text>
          <Text style={styles.panduanContentText}>
            Setelah Anda membuka aplikasi AMANKAN, klik tombol “Lapor” pada
            pojok bawah tengah, Anda akan langsung diarahkan ke halaman
            pengambilan foto.
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 3 }}>
          <Text style={styles.panduanContentText}>2.</Text>
          <Text style={styles.panduanContentText}>
            Silahkan foto kejadian atau pelaku kejahatan yang ingin Anda
            laporkan, jika sudah silahkan klik tombol bertanda centang.
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 3 }}>
          <Text style={styles.panduanContentText}>3.</Text>
          <Text style={styles.panduanContentText}>
            Setelah itu silahkan isi keterangan laporan,contohnya (Maling sepeda
            di Jalan xxx). Keterangan bisa ditulis dengan lengkap ataupun
            singkat (setidaknya memuat informasi yang bersangkutan dengan
            laporan). Jika sudah mengisi keterangan silahkan klik “OK”.{" "}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 3 }}>
          <Text style={styles.panduanContentText}>4.</Text>
          <Text style={styles.panduanContentText}>
            Setelah itu, silahkan cek laporan Anda, jika menurut Anda sudah
            sesuai, silahkan klik tombol “Lapor”, tunggu beberapa saat hingga
            muncul tombol “Lihat Laporan”, anda bisa melihat laporan yang Anda
            baru kirim dari tombol tersebut atau lewat tombol “Laporan” di
            bagian navbar bawah.
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 3 }}>
          <Text style={styles.panduanContentText}>5.</Text>
          <Text style={styles.panduanContentText}>
            Anda bisa melihat update terbaru dari laporan pada fitur chat yang
            ada di dalam laporan bersangkutan.
          </Text>
        </View>
        <Text style={[styles.panduanContentText, {marginTop: 16}]}>Terimakasih dan tetaplah bernapas</Text>
        <Text style={styles.panduanContentText}>Salam Hormat Kami</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22,
  },
  headingLabel: {
    backgroundColor: "#FF2D2D",
    paddingVertical: 3,
    paddingHorizontal: 13,
    borderRadius: 14,
    alignSelf: "flex-start",
  },
  headingLabelText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "medium",
  },
  headingText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 16,
  },
  panduanImageContainer: {
    marginBottom: 14,
    alignItems: "center",
  },
  panduanContentText: {
    fontSize: 16,
  },
});
