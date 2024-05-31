import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Search } from "../core/Svg";
import CardLaporan from "../components/CardLaporan";

export default function SemuaLaporan() {
  const filterOptions = [
    { id: 1, label: "Semua" },
    { id: 2, label: "Selesai" },
    { id: 3, label: "Belum Selesai" },
    { id: 4, label: "Gagal" },
    { id: 5, label: "Tidak Valid" },
  ];

  const [selectedFilter, setSelectedFilter] = useState(1);

  const handleFilterChange = (id) => {
    setSelectedFilter(id);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput style={styles.input} placeholder="Cari Laporan" />
        <View style={styles.search}>
          <Search width={24} height={24} />
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filterOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.filterLabel,
              selectedFilter === item.id && styles.filterLabelSelected,
            ]}
            onPress={() => handleFilterChange(item.id)}
          >
            <Text
              style={[
                styles.filterLabelText,
                selectedFilter === item.id && styles.filterLabelTextSelected,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{ marginTop: 14, marginBottom: 50 }}>
        <CardLaporan
          image={require("../assets/images/hero.png")}
          title="Maling Sepeda Motor"
          location="Jl. Kaliurang km 5"
          distance="1.5 KM"
          time="2 jam yang lalu"
          status="Gagal"
        />
        <CardLaporan
          image={require("../assets/images/hero.png")}
          title="Maling Sepeda Motor"
          location="Jl. Kaliurang km 5"
          distance="1.5 KM"
          time="2 jam yang lalu"
          status="Gagal"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22,
  },
  input: {
    borderWidth: 2,
    borderColor: "#DCDCDC",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 14,
    height: 48,
  },
  search: {
    position: "absolute",
    right: 16,
    top: "22%",
  },
  filterLabel: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 4,
    paddingHorizontal: 13,
    borderRadius: 14,
    alignSelf: "flex-start",
    marginRight: 6,
    borderWidth: 1,
    borderColor: "#808080",
  },
  filterLabelSelected: {
    backgroundColor: "#FF6161",
    borderWidth: 1,
    borderColor: "#FF6161",
  },
  filterLabelText: {
    fontSize: 16,
    color: "#808080",
    fontWeight: "500",
  },
  filterLabelTextSelected: {
    color: "#fff",
  },
});
