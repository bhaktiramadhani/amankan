import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Navbar from "../components/Navbar";
import useUserStore from "../context/store";
import { ArrowRight, InfoIcon, PasswordIcon, SettingIcon } from "../core/Svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL_LARAVEL } from "../data/data";

export default function ProfileScreen({ navigation }) {
  const user = useUserStore((state) => state.user);
  const { width, height } = Dimensions.get("window");

  const handleLogout = async () => {
    navigation.navigate("Login");
    useUserStore.getState().setUser(null);
    await AsyncStorage.setItem("user", "");
  };
  return (
    <View>
      <Navbar />
      <Text style={[styles.textHeader, styles.mHorizontal]}>Profile</Text>
      <View style={[styles.biodataContainer, styles.mHorizontal]}>
        <Image
          style={styles.imageProfile}
          source={{ uri: `${BACKEND_URL_LARAVEL}/img/${user.user_image}` }}
          width={80}
          height={80}
        />
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{user.name}</Text>
          <Text style={{ color: "#808080" }}>{user.username}</Text>
          <Text style={{ color: "#808080", fontWeight: "bold" }}>
            {user.role.toUpperCase()}
          </Text>
        </View>
      </View>
      {/* line */}
      <View
        style={{
          width: width,
          borderBottomColor: "#D9DBE9",
          borderBottomWidth: 1,
        }}
      ></View>

      <View style={[styles.mHorizontal, styles.linkContainer]}>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <SettingIcon width={24} height={24} fill="#000000" />
          <Text
            style={{
              flexGrow: 1,
              fontSize: 18,
              color: "#808080",
              marginLeft: 12,
            }}
          >
            Edit Profile
          </Text>
          <ArrowRight width={24} height={24} fill="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => navigation.navigate("UbahPassword")}
        >
          <PasswordIcon width={24} height={24} fill="#000000" />
          <Text
            style={{
              flexGrow: 1,
              fontSize: 18,
              color: "#808080",
              marginLeft: 12,
            }}
          >
            Ubah Password
          </Text>
          <ArrowRight width={24} height={24} fill="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => navigation.navigate("TentangAplikasi")}
        >
          <InfoIcon width={24} height={24} fill="#000000" />
          <Text
            style={{
              flexGrow: 1,
              fontSize: 18,
              color: "#808080",
              marginLeft: 12,
            }}
          >
            Tentang Aplikasi
          </Text>
          <ArrowRight width={24} height={24} fill="#000000" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleLogout}
        style={[styles.mHorizontal, styles.button]}
      >
        <Text style={styles.buttonText}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mHorizontal: {
    marginHorizontal: 22,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins_700Bold",
  },
  imageProfile: {
    width: 80,
    height: 80,
    borderRadius: 99,
    objectFit: "cover",
  },
  biodataContainer: {
    marginVertical: 20,
    flexDirection: "row",
    gap: 40,
    alignItems: "center",
  },
  linkContainer: {
    marginTop: 18,
    marginBottom: 34,
    gap: 20,
  },
  linkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    height: 52,
    backgroundColor: "#FF2D2D",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
});
