import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Platform, BackHandler } from "react-native";
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { MarkerMan } from "../core/Svg";
import { fetchLocation } from "../core/http";
import registerForPushNotificationsAsync from "../core/notificationToken";

export default function MapFullView({
  isProses,
  address,
  location,
  setShowMapView,
}) {
  const mapRef = useRef(null);
  const [allUsers, setAllUsers] = useState([]);
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

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await registerForPushNotificationsAsync();
      const users = await fetchLocation();
      let usersEntry = [];

      for (const key in users) {
        if (users[key].token !== token) {
          usersEntry.push(users[key]);
        }
      }
      setAllUsers(usersEntry);
    };
    fetchUsers();
    setInterval(() => {
      fetchUsers();
    }, 10000);
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
        zoomControlEnabled={true}
      >
        <Marker coordinate={location}>
          <Callout style={{ width: 200 }}>
            <Text style={{ width: 200 }}>{address}</Text>
          </Callout>
        </Marker>
        {allUsers.map((user) => (
          <Marker
            key={user.id}
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude,
            }}
            icon={require("../assets/images/marker_man.png")}
          >
            <Callout style={{ width: 200 }}>
              <Text style={{ width: 200 }}>{user.name}</Text>
            </Callout>
          </Marker>
        ))}
        <Circle
          center={location}
          radius={200} // radius in meters
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
