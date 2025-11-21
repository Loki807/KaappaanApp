import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { loginRequest } from "../../src/api/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    if (!email.trim()) return "Email is required";
    if (!email.includes("@")) return "Invalid email";
    if (!password.trim()) return "Password is required";
    return null;
  };

  const login = async () => {
    const error = validate();
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }

    try {
      const res = await loginRequest(email, password);

      if (res.data.message?.includes("OTP")) {
        router.push(`/auth/verify-otp?email=${email}`);
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Citizen Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => router.push("/auth/register")}>
        Don't have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: "center" },
  header: { fontSize: 30, fontWeight: "bold", color: "#D50000", textAlign: "center", marginBottom: 30 },
  input: {
    borderWidth: 1, padding: 14, borderRadius: 10,
    marginBottom: 15, backgroundColor: "#fafafa"
  },
  btn: { backgroundColor: "#D50000", padding: 15, borderRadius: 10 },
  btnText: { color: "#fff", textAlign: "center", fontSize: 18, fontWeight: "bold" },
  link: { textAlign: "center", marginTop: 20, color: "#D50000", fontSize: 16 },
});
