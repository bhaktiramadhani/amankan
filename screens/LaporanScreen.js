import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Search } from "../core/Svg";
import CardLaporan from "../components/CardLaporan";
import { data } from "../data/data";

const filterOptions = [
  { id: 1, label: "Semua" },
  { id: 2, label: "Selesai" },
  { id: 3, label: "Belum Selesai" },
  { id: 4, label: "Gagal" },
  { id: 5, label: "Tidak Valid" },
];

const filterStatusMap = {
  2: "Selesai",
  3: "Belum Selesai",
  4: "Gagal",
  5: "Tidak Valid",
};

export default function LaporanScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [chunkSize, setChunkSize] = useState(10);

  const handleFilterChange = (id) => {
    setSelectedFilter(id);
  };

  useEffect(() => {
    filterData();
  }, [selectedFilter, searchText, chunkSize]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filterData = () => {
    let newData = data;

    if (selectedFilter !== 1) {
      const filterStatus = filterStatusMap[selectedFilter];
      newData = newData.filter((item) => item.status === filterStatus);
    }

    newData = newData.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredData(newData.slice(0, chunkSize)); // Slice data to match chunk size
  };

  const loadMoreData = () => {
    const newChunkSize = chunkSize + 10;
    setChunkSize(newChunkSize);
  };

  const renderFooter = () => {
    if (chunkSize >= data.length) return null; // Hide button when all data is loaded
    return (
      <View style={{ marginBottom: 40 }}>
        <Button title="Muat Lebih Banyak" onPress={loadMoreData} />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <CardLaporan
        id={item.id}
        image={item.image}
        title={item.title}
        location={item.location}
        distance={item.distance}
        time={item.time}
        status={item.status}
        role={item.role}
        user={item.user}
        navigation={navigation}
      />
    );
  };
  return (
    <ScrollView style={styles.container}>
      <Navbar />
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
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          style={styles.cardLaporanContainer}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingBottom: 22,
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
