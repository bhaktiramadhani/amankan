import { View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useRef } from "react";

export default function LokasiRumahScreen({ navigation, route }) {
  const { koordinat } = route.params;
  const koordinatFix = koordinat.split(",");
  const mapRef = useRef(null);
  return (
    <View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: koordinatFix[0],
          longitude: koordinatFix[1],
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      />
    </View>
  );
}
