import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Platform, BackHandler } from "react-native";
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MarkerMan } from "../core/Svg";

export default function MapFullView({ location, setShowMapView }) {
  const mapRef = useRef(null);
  console.log(mapRef);
  useEffect(() => {
    // custom back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setShowMapView(false);
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  
  return (
    <View>
      <MapView
        ref={mapRef}  
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        initialCamera={{
          zoom: 5,
          heading: 0,
          pitch: 0,
          altitude: 0,
          center: location,
        }}
        zoomEnabled={true}
      >
        <Marker coordinate={location} />
        <Marker
          coordinate={{
            latitude: location.latitude + 0.001,
            longitude: location.longitude + 0.001,
          }}
          icon={require('../assets/images/marker_man.png')}
        >
          <Callout>
            <Text>INI SIAPA</Text>
          </Callout>
        </Marker>
        <Marker
          coordinate={{
            latitude: location.latitude + 0.002,
            longitude: location.longitude + 0.001,
          }}
          icon={require('../assets/images/marker_man.png')}
        />
        <Circle
          center={location}
          radius={50} // radius in meters
          strokeWidth={1}
          strokeColor={"rgba(66,133,244,1)"}
          fillColor={"rgba(66,133,244,0.1)"}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    // flex: 1,
    width: "100%",
    height: "100%",
  },
});
