import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Close, Tick } from "../core/Svg";
import LaporView from "../components/LaporView";

export default function LaporScreen({ navigation }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);
  const [isPhotoDone, setIsPhotoDone] = useState(false);

  useEffect(() => {}, [isPhotoDone]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function handleTakePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo);
    }
  }

  if (isPhotoDone) {
    return (
      <LaporView
        navigation={navigation}
        image={capturedPhoto.uri}
        setIsPhotoDone={setIsPhotoDone}
      />
    );
  }

  return (
    <View style={styles.container}>
      {capturedPhoto ? (
        <View style={styles.camera}>
          <Image source={{ uri: capturedPhoto.uri }} style={{ flex: 1 }} />
          <View style={styles.buttonContainerCapture}>
            <TouchableOpacity onPress={() => setCapturedPhoto(null)}>
              <View
                style={[
                  styles.buttonStyle,
                  { backgroundColor: "#000", opacity: 0.25 },
                ]}
              ></View>
              <View style={{ position: "absolute", bottom: 15, left: 15 }}>
                <Close width={50} height={50} fill="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsPhotoDone(true)}>
              <View
                style={[
                  styles.buttonStyle,
                  { backgroundColor: "#000", opacity: 0.25 },
                ]}
              />
              <View style={{ position: "absolute", bottom: 15, left: 15 }}>
                <Tick width={50} height={50} fill="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleTakePhoto} style={styles.button}>
              <View style={styles.buttonStyle} />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  buttonContainerCapture: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    marginVertical: 64,
    marginHorizontal: 40,
    position: "absolute",
    bottom: 0,
    right: 0,
    gap: 35,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "transparent",
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
