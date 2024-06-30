import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { fetchLocation, updateLocation, storeLocation } from "./http";

const LOCATION_TASK_NAME = "background-location-task";

// Menyimpan lokasi terakhir yang diketahui
let lastKnownLocation = null;

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }

  if (data) {
    const { locations } = data;
    const location = locations[0];
    const currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    // Memeriksa apakah lokasi telah berubah
    if (
      lastKnownLocation &&
      lastKnownLocation.latitude === currentLocation.latitude &&
      lastKnownLocation.longitude === currentLocation.longitude
    ) {
      console.log("Lokasi tidak berubah, tidak perlu update.");
      return;
    }

    // Update last known location
    lastKnownLocation = currentLocation;

    // Fetch user's locations from Firebase
    const existingLocations = await fetchLocation();
    const token = data?.extras?.token;

    // Find if the user already has a location entry
    let existingEntry = null;

    for (const key in existingLocations) {
      if (existingLocations[key].token === token) {
        existingEntry = { id: key, ...existingLocations[key] };
        break;
      }
    }

    // If user's location already exists, update it; otherwise, store new location
    if (existingEntry) {
      console.log("Updating location task : " + token);
      await updateLocation(existingEntry.id, { ...currentLocation, token });
    } else {
      // Store new location along with token
      console.log("Storing location task : " + token);
      await storeLocation({ ...currentLocation, token });
    }
  }
});

export async function startLocationUpdates() {
  console.log("start");
  const { status } = await Location.requestBackgroundPermissionsAsync();

  if (status !== "granted") {
    console.error("Permission to access location was denied");
    return;
  }

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.High,
    timeInterval: 300000, // 5 minutes
    distanceInterval: 10, // 10 meters
    foregroundService: {
      notificationTitle: "Tracking your location",
      notificationBody: "To keep you safe",
    },
  });
}

export async function stopLocationUpdates() {
  console.log("exit");
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
}
