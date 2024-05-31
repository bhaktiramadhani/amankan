import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import Navbar from "../components/Navbar";
import { NotificationSymbol } from "../core/Svg";

export default function NotifikasiScreen() {
  return (
    <ScrollView style={styles.container}>
      <Navbar />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Notifikasi</Text>
        <TouchableOpacity>
          <Text style={styles.headerButton}>Sudah dibaca</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 36 }}>
        <View style={styles.card}>
          <NotificationSymbol width={24} height={24} />
          <View>
            <Text style={styles.cardText}>Ada laporan baru nih, coba dilihat dulu menu laporan!</Text>
            <Text>26 April, 12.00</Text>
          </View>
        </View>
        {/* <View
          style={{
            paddingVertical: 12,
            paddingHorizontal: 10,
            backgroundColor: "#FFFFFF",
            borderBottomWidth: 2,
            borderColor: "#D9DBE9",
          }}
        >
          <NotificationSymbol width={24} height={24} />
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingBottom: 22,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins_700Bold",
  },
  headerButton: {
    fontSize: 16,
    fontWeight: "medium",
    fontFamily: "Poppins_500Medium",
    color: "#FF2D2D",
  },
  card: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 2,
    borderColor: "#D9DBE9",
    flexDirection: "row",
    gap: 8,
  },
  cardText: {
    fontSize: 14
  }
});
