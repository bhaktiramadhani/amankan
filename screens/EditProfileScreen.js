import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import useUserStore from "../context/store";
import * as ImagePicker from "expo-image-picker";

export default function EditProfileScreen({ navigation }) {
  const user = useUserStore((state) => state.user);
  const [nik, setNik] = useState(user.nik);
  const [role, setRole] = useState(user.role);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [number, setNumber] = useState(user.number);
  const [alamat, setAlamat] = useState(user.alamat);
  const [image, setImage] = useState(null);
  const [lokasi, setLokasi] = useState(user.lokasi_rumah);

  useEffect(() => {
    setLokasi(user.lokasi_rumah.split(","));
  }, []);
  const handleUploadGambar = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Ubah Gambar Profile</Text>
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              display: image ? "flex" : "none",
              marginBottom: 6,
            }}
          />
          <Pressable style={styles.button} onPress={handleUploadGambar}>
            <Text style={styles.buttonText}>Upload Gambar</Text>
          </Pressable>
        </View>
        <View style={[styles.sectionContainer, { gap: 8 }]}>
          <View>
            <Text style={styles.label}>NIK</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: "rgba(128,128,128,0.1)",
                  color: "rgba(128,128,128,0.5)",
                },
              ]}
              value={nik}
              onChangeText={(e) => setNik(e)}
              editable={false}
            />
          </View>
          <View>
            <Text style={styles.label}>Role</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: "rgba(128,128,128,0.1)",
                  color: "rgba(128,128,128,0.5)",
                },
              ]}
              value={role}
              onChangeText={(e) => setRole(e)}
              editable={false}
            />
          </View>
          <View>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={(e) => setUsername(e)}
            />
          </View>
          <View>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(e) => setName(e)}
            />
          </View>
          <View>
            <Text style={styles.label}>No Handphone</Text>
            <TextInput
              style={styles.input}
              value={number}
              onChangeText={(e) => setNumber(e)}
              keyboardType="number-pad"
            />
          </View>
          <View>
            <Text style={styles.label}>Alamat Lengkap</Text>
            <TextInput
              multiline
              style={[styles.input, { height: 120, textAlignVertical: "top" }]}
              value={alamat}
              onChangeText={(e) => setAlamat(e)}
              numberOfLines={4}
            />
          </View>
          <View>
            <Text style={styles.label}>Titik Lokasi Rumah Anda</Text>
            <Pressable
              style={styles.button}
              onPress={() =>
                navigation.navigate("CekLokasi", {
                  koordinat: {
                    latitude: parseFloat(lokasi[0]),
                    longitude: parseFloat(lokasi[1]),
                    lokasi_rumah: user.alamat,
                  },
                })
              }
            >
              <Text style={styles.buttonText}>Cek Lokasi</Text>
            </Pressable>
          </View>
          <TouchableOpacity style={[styles.button, styles.buttonSimpan]}>
            <Text style={[styles.buttonText, { color: "white" }]}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    marginVertical: 20,
    gap: 30,
  },
  button: {
    height: 52,
    backgroundColor: "white",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF2D2D",
  },
  buttonText: {
    color: "#FF2D2D",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  sectionContainer: {
    borderRadius: 6,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 20,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  input: {
    borderWidth: 2,
    borderColor: "#DCDCDC",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    height: 48,
  },
  buttonSimpan: {
    marginTop: 22,
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FF2D2D",
    borderWidth: 0,
    alignSelf: "center",
  },
});
