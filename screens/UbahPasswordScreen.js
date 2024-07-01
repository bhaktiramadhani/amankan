import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function UbahPasswordScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.sectionContainer, { gap: 8 }]}>
        <View>
          <Text style={styles.label}>Password Lama</Text>
          <TextInput style={styles.input} />
        </View>
        <View>
          <Text style={styles.label}>Password Baru</Text>
          <TextInput style={styles.input} />
        </View>
        <View>
          <Text style={styles.label}>Ulangi Password Baru</Text>
          <TextInput style={styles.input} />
        </View>
        <TouchableOpacity style={[styles.button, styles.buttonSimpan]}>
          <Text style={[styles.buttonText, { color: "white" }]}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    marginVertical: 20,
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
});
