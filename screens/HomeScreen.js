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
import React from "react";
import Navbar from "../components/Navbar";
import { File, Report, Search } from "../core/Svg";
import CardLaporanTerakhir from "../components/CardLaporanTerakhir";
import data from "../data/data";

const HomeScreen = ({ navigation }) => {
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
    <ScrollView style={styles.container}>
      <Navbar />
      <Text style={styles.textHeading}>
        Selamat Pagi, <Text style={styles.textHeadingChild}>Bhakti</Text>
      </Text>
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
          <TouchableOpacity onPress={() => navigation.navigate("SemuaLaporan")}>
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
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    marginHorizontal: "auto",
    width: "100%",
  },
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
});
