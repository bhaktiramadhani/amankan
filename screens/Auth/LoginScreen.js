import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableHighlight,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Logo, Eye, EyeOff } from "../../core/Svg";
import { useEffect, useState } from "react";
import useUserStore from "../../context/store";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import axios from "axios";
import { BACKEND_URL_LARAVEL } from "../../data/data";

const users = [
  {
    name: "Bhakti Ramadhani",
    username: "bhakti",
    password: "123456",
    role: "pelapor",
    nik: "1234567890",
  },
  {
    name: "Udin Samsudin",
    username: "udin",
    password: "123456",
    role: "petugas keamanan",
    nik: "0987654321",
  },
  {
    name: "Polsek Banjarmasin Barat",
    username: "polsekbjmbarat",
    password: "123456",
    role: "polisi",
    nik: "5678901234",
  },
  {
    name: "Admin",
    username: "admin",
    password: "123456",
    role: "admin",
    nik: "9876543210",
  },
];

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          setUser(JSON.parse(user));
          navigation.navigate("Home");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Info", "Username dan password harus diisi.");
      return;
    }

    setLoading(true);
    const postLogin = await axios.post(
      `${BACKEND_URL_LARAVEL}/api/login/`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (postLogin.status == 200) {
        const token = postLogin.data.payload.token;
        const role = postLogin.data.payload.userRole;

        const getProfile = await axios.get(
          `${BACKEND_URL_LARAVEL}/api/profile/${role}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(getProfile.data.payload)
        );
        console.log(getProfile.data.payload);
        setUser(getProfile.data.payload);
        navigation.navigate("Home");
        setUsername("");
        setPassword("");
      } else {
        Alert.alert("Gagal Login", "Username atau password salah.");
        setPassword("");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Logo width={100} height={100} />
      <Text style={styles.textHeading}>Masuk</Text>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username anda..."
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry={!showPassword}
            style={styles.input}
            placeholder="Password anda..."
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.showPassword}>
            <Pressable onPress={handleShowPassword}>
              {showPassword ? (
                <EyeOff width={24} height={24} />
              ) : (
                <Eye width={24} height={24} />
              )}
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.forgetPasswordContainer}>
        <Pressable>
          <Text style={styles.textForgetPassword}>Lupa Password?</Text>
        </Pressable>
      </View>
      <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Masuk</Text>
        )}
      </Pressable>
      <View style={styles.textFooter}>
        <Text>Belum Punya Akun? </Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.textChildFooter}>Buat Akun</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  textHeading: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  inputContainer: {
    width: "100%",
    marginTop: 8,
    gap: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  input: {
    borderWidth: 2,
    borderColor: "#DCDCDC",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginTop: 6,
    height: 48,
  },
  forgetPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  textForgetPassword: {
    marginTop: 10,
    color: "red",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    width: "100%",
    height: 52,
    backgroundColor: "#FF2D2D",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  textFooter: {
    color: "#808080",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  textChildFooter: {
    color: "black",
    fontFamily: "Poppins_700Bold",
    textDecorationLine: "underline",
    textAlign: "center",
    paddingTop: 3,
  },
  showPassword: {
    position: "absolute",
    right: 16,
    top: "52%",
  },
});
