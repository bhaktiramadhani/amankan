import { View, Text, StyleSheet } from "react-native";

export default function TentangAplikasiScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Amankan</Text>
      <Text style={{ fontSize: 18, color: "#808080" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce finibus
        accumsan quam, ut sollicitudin quam placerat dignissim. Nulla pharetra,
        nulla tempus volutpat pretium, diam libero vehicula ipsum, vestibulum
        ultrices lectus enim eu lorem.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    marginVertical: 20,
  },
});
