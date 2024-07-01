import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  ArrowRight,
  File,
  LaporanBelumSelesaiIcon,
  LaporanGagalIcon,
  LaporanSelesaiIcon,
  LaporanTidakValidIcon,
  PelaporTerdaftarIcon,
  Report,
  Search,
  SemuaLaporanIcon,
} from "../core/Svg";
import CardLaporanTerakhir from "../components/CardLaporanTerakhir";
import { BACKEND_URL_LARAVEL, getGreeting } from "../data/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserStore from "../context/store";
import axios from "axios";

const data = [
  {
    id: 1,
    image: require("../assets/images/maling.jpg"),
    title: "Pencurian",
    location: "Jalan Raya Bogor",
    distance: "0.5 km",
    time: "1 jam yang lalu",
  },
  {
    id: 2,
    image: require("../assets/images/maling2.jpg"),
    title: "Perampokan",
    location: "Jalan Raya Bogor",
    distance: "0.5 km",
    time: "1 jam yang lalu",
  },
  {
    id: 3,
    image: require("../assets/images/maling3.jpg"),
    title: "Penipuan",
    location: "Jalan Raya Bogor",
    distance: "0.5 km",
    time: "1 jam yang lalu",
  },
];

const HomeScreen = ({ navigation, user }) => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = axios.get(
  //         `${BACKEND_URL_LARAVEL}/api/laporan/all/${user.role}`,
  //         {
  //           headers: {
  //             "ngrok-skip-browser-warning": "true",
  //             Authorization: `Bearer ${user.token}`,
  //           },
  //         }
  //       );
  //       console.log(response.status);
  //       // setDatas(data);
  //       // setLoading(false);
  //     } catch (error) {
  //       if (error.response) {
  //         // Server responded with a status other than 200 range
  //         console.error("Error data:", error.response.data);
  //         console.error("Error status:", error.response.status);
  //         console.error("Error headers:", error.response.headers);
  //       } else if (error.request) {
  //         // Request was made but no response was received
  //         console.error("Error request:", error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an error
  //         console.error("Error message:", error.message);
  //       }
  //       console.error("Config:", error.config);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const renderItem = ({ item }) => (
    <CardLaporanTerakhir
      id={item.id}
      image={item.image}
      title={item.title}
      location={item.location}
      distance={item.distance}
      time={item.time}
      navigation={navigation}
    />
  );
  return (
    <ScrollView>
      <Navbar />
      <View style={{ marginHorizontal: 22 }}>
        <Text style={styles.textHeading}>
          {getGreeting()},{" "}
          <Text style={styles.textHeadingChild}>{user && user.name}</Text>
        </Text>
        {user.role !== "admin" && (
          <>
            {/* Search */}
            <View>
              <TextInput style={styles.input} placeholder="Cari fitur" />
              <View style={styles.search}>
                <Search width={24} height={24} />
              </View>
            </View>
            {/* Hero */}
            <View style={styles.heroContainer}>
              <Image
                fadeDuration={0}
                style={{ borderRadius: 14 }}
                source={require("../assets/images/hero.png")}
                width={331}
                height={160}
              />
            </View>
            {/* Fitur */}
            <View style={{ flexDirection: "row", gap: 77, marginBottom: 20 }}>
              <Pressable
                style={styles.fiturItemContainer}
                onPress={() => navigation.navigate("PanduanPelaporan")}
              >
                <View style={styles.fiturItem}>
                  <File width={24} height={24} />
                </View>
                <Text style={styles.fiturText}>Panduan Pelaporan</Text>
              </Pressable>
              <Pressable
                style={styles.fiturItemContainer}
                onPress={() => navigation.navigate("SemuaLaporan")}
              >
                <View style={styles.fiturItem}>
                  <Report width={24} height={24} />
                </View>
                <Text style={styles.fiturText}>Semua Laporan</Text>
              </Pressable>
            </View>
            {/* Laporan terakhir */}
            <View>
              <View style={styles.textLaporanContainer}>
                <Text style={styles.textLaporan}>Laporan Terakhir</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SemuaLaporan")}
                >
                  <Text style={styles.textLaporanLihatSemua}>Lihat Semua</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={data.slice(0, 3)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                horizontal={true}
                style={styles.cardContainer}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </>
        )}
        {user.role === "admin" && (
          <>
            <View style={{ marginVertical: 22 }}>
              <View style={styles.cardDataContainer}>
                {/* Semua Laporan */}
                <View style={styles.itemData}>
                  <View style={{ flexDirection: "row", gap: 50 }}>
                    <Text style={styles.itemDataText}>30</Text>
                    <SemuaLaporanIcon width={35} height={35} />
                  </View>
                  <Text style={{ textAlign: "center" }}>Semua Laporan</Text>
                </View>
                {/* Pelapor Terdaftar */}
                <View style={styles.itemData}>
                  <View style={{ flexDirection: "row", gap: 50 }}>
                    <Text style={styles.itemDataText}>81</Text>
                    <PelaporTerdaftarIcon width={35} height={35} />
                  </View>
                  <Text style={{ textAlign: "center" }}>Pelapor Terdaftar</Text>
                </View>
                <View style={styles.itemData}>
                  <View style={{ flexDirection: "row", gap: 50 }}>
                    <Text style={styles.itemDataText}>81</Text>
                    <PelaporTerdaftarIcon width={35} height={35} />
                  </View>
                  <Text style={{ textAlign: "center" }}>Petugas Terdaftar</Text>
                </View>
                <View style={styles.itemData}>
                  <View style={{ flexDirection: "row", gap: 50 }}>
                    <Text style={styles.itemDataText}>2</Text>
                    <LaporanBelumSelesaiIcon width={35} height={35} />
                  </View>
                  <Text style={{ textAlign: "center" }}>
                    Laporan Belum Selesai
                  </Text>
                </View>
                <View style={styles.itemData}>
                  <View style={{ flexDirection: "row", gap: 50 }}>
                    <Text style={styles.itemDataText}>2</Text>
                    <LaporanTidakValidIcon width={35} height={35} />
                  </View>
                  <Text style={{ textAlign: "center" }}>
                    Laporan Tidak Valid
                  </Text>
                </View>
                <View style={styles.itemData}>
                  <View style={{ flexDirection: "row", gap: 50 }}>
                    <Text style={styles.itemDataText}>20</Text>
                    <LaporanSelesaiIcon width={35} height={35} />
                  </View>
                  <Text style={{ textAlign: "center" }}>Laporan Selesai</Text>
                </View>
                <View style={[styles.itemData, { flexGrow: 0, width: 158 }]}>
                  <View style={{ flexDirection: "row", gap: 50 }}>
                    <Text style={styles.itemDataText}>2</Text>
                    <LaporanGagalIcon width={35} height={35} />
                  </View>
                  <Text style={{ textAlign: "center" }}>Laporan Gagal</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                Konfirmasi Akun
              </Text>
              <View style={{ marginVertical: 12, gap: 8 }}>
                <TouchableOpacity style={styles.itemKonfirmasiAkun}>
                  <Image
                    source={{ uri: `${BACKEND_URL_LARAVEL}/img/img04.jpg` }}
                    width={30}
                    height={30}
                    style={{ borderRadius: 99 }}
                  />
                  <Text style={styles.itemKonfirmasiAkunText}>
                    Ismail Ahmad Kanabawi
                  </Text>
                  <ArrowRight width={24} height={24} fill="#000000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemKonfirmasiAkun}>
                  <Image
                    source={{ uri: `${BACKEND_URL_LARAVEL}/img/img04.jpg` }}
                    width={30}
                    height={30}
                    style={{ borderRadius: 99 }}
                  />
                  <Text style={styles.itemKonfirmasiAkunText}>
                    Ismail Ahmad Kanabawi
                  </Text>
                  <ArrowRight width={24} height={24} fill="#000000" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
  textHeadingChild: {
    fontFamily: "Poppins_700Bold",
  },
  input: {
    borderWidth: 2,
    borderColor: "#DCDCDC",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginVertical: 15,
    height: 48,
  },
  search: {
    position: "absolute",
    right: 16,
    top: "36%",
  },
  heroContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  fiturText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
  fiturItemContainer: {
    width: 65,
    alignItems: "center",
  },
  fiturItem: {
    width: 50,
    height: 50,
    borderRadius: 16,
    padding: 13,
    backgroundColor: "white",
    elevation: 4,
    marginBottom: 6,
  },
  textLaporanContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textLaporan: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  textLaporanLihatSemua: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#FF2D2D",
  },
  cardContainer: {
    flexDirection: "row",
    marginBottom: 50,
  },
  cardDataContainer: {
    flexDirection: "row",
    gap: 31,
    flexWrap: "wrap",
  },
  itemData: {
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 4,
    padding: 12,
    flexGrow: 1,
    height: 100,
    gap: 13,
    justifyContent: "center",
  },
  itemDataText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
  },
  itemKonfirmasiAkun: {
    borderRadius: 6,
    elevation: 2,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  itemKonfirmasiAkunText: {
    fontWeight: "bold",
    fontSize: 16,
    flexGrow: 1,
    marginLeft: 16,
  },
});
