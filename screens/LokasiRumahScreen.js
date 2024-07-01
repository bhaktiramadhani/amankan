import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import useUserStore from "../context/store";

export default function LokasiRumahScreen({ navigation, route }) {
  const { koordinat } = route.params;
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: koordinat.latitude,
    longitude: koordinat.longitude,
  });
  const [searchText, setSearchText] = useState(
    koordinat.latitude + "," + koordinat.longitude
  );
  const mapRef = useRef(null);

  const moveToCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setMarkerCoordinate({ latitude, longitude });
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  useEffect(() => {
    setSearchText(markerCoordinate.latitude + "," + markerCoordinate.longitude);
  }, [setMarkerCoordinate]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: koordinat.latitude,
          longitude: koordinat.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        rotateEnabled
        loadingEnabled
        onPress={(e) => {
          setMarkerCoordinate(e.nativeEvent.coordinate);
        }}
      >
        <Marker
          draggable
          onDragEnd={(e) => {
            setMarkerCoordinate(e.nativeEvent.coordinate);
          }}
          coordinate={markerCoordinate}
        >
          <Callout style={{ width: "auto", maxWidth: 150 }}>
            <Text style={{ width: "auto", maxWidth: 150 }}>
              {koordinat.lokasi_rumah}
            </Text>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={"Cari Alamat"}
          placeholderTextColor={"#666"}
          value={searchText}
          onChangeText={setSearchText}
          onFocus={() => console.log("focus")}
        />
        <View></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    top: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  searchInput: {
    width: "85%",
    borderRadius: 14,
    color: "#000",
    backgroundColor: "#FFF",
    height: 45,
    paddingHorizontal: 16,
    fontSize: 18,
    elevation: 8,
  },
});
