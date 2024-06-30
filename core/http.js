import axios from "axios";

const BACKEND_URL = "https://amankanproject-default-rtdb.firebaseio.com";

export function storeLocation(userData) {
  axios.post(BACKEND_URL + "/user.json", userData);
}

export async function fetchLocation() {
  const response = await axios.get(BACKEND_URL + "/user.json");

  const location = [];

  for (const key in response.data) {
    const locationObj = {
      id: key,
      latitude: response.data[key].latitude,
      longitude: response.data[key].longitude,
      token: response.data[key].token,
    };
    location.push(locationObj);
  }

  return location;
}

export async function updateLocation(id, userData) {
  axios.put(BACKEND_URL + `/user/${id}.json`, userData);
}
