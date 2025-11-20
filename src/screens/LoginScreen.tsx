import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { loginCitizen } from "../services/authService";
import { saveToken } from "../utils/storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and Password required");
      return;
    }

    const res = await loginCitizen(email, password);
    console.log("LOGIN RES:", res);

    if (res.token) {
      Alert.alert("Success", "Login successful!");
      if (!res.isEmailConfirmed) {
    router.push({ pathname: "/verify-otp", params: { email }});
    return;
}

if (res.token) {
    await saveToken(res.token)
    router.replace("../home/dashboard")
}

    } else {
      Alert.alert("Failed", res.message || "Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Citizen Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 25 },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  btn: { backgroundColor: "red", padding: 15, borderRadius: 10 },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  link: { color: "blue", marginTop: 20, textAlign: "center" },
});
