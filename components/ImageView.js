import { useEffect } from "react";
import {
  View,
  Text,
  Image,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ArrowLeft, Close } from "../core/Svg";

export default function ImageView({ image, setShowImageView }) {
  useEffect(() => {
    // custom back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setShowImageView(false);
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => setShowImageView(false)}
        style={styles.arrowLeft}
      >
        <Close width={80} height={80} fill="white" />
      </TouchableOpacity>
      <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  arrowLeft: {
    position: "absolute",
    zIndex: 1,
    top: 16,
    right: 22,
  },
});
