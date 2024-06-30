import * as Location from "expo-location";

export async function requestLocationPermissions() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }
}

export async function getCurrentLocation() {
  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}

export async function watchLocation(callback) {
  await requestLocationPermissions();
  console.log("watching location...");
  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 50000, // Update every 10 seconds
      distanceInterval: 10, // Update every 10 meters
    },
    callback
  );
}
