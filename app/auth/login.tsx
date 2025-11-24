import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { loginRequest } from "../../src/api/authApi";
import { saveCitizenId, saveEmail, saveName } from "../../src/utils/storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) return Alert.alert("Enter email & password");

    try {
      const res = await loginRequest(email, password);

      console.log("🔵 LOGIN RESPONSE:", res.data);

      if (res.data?.citizenId) {
        await saveCitizenId(res.data.citizenId);
        await saveEmail(email);
        await saveName(res.data.fullName || res.data.name);
      }

      router.push(`/auth/verify-otp?email=${email}`);

    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Citizen Login</Text>

      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail}/>
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword}/>

      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text style={styles.btnText}>Send OTP</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => router.replace("/auth/register")}>
        No account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25 },
  header: { fontSize: 30, fontWeight: "bold", color: "red", marginBottom: 20 },
  input: { borderWidth: 1, padding: 12, marginVertical: 10, borderRadius: 8 },
  btn: { backgroundColor: "red", padding: 15, borderRadius: 8, marginTop: 20 },
  btnText: { textAlign: "center", color: "white", fontWeight: "bold" },
  link: { marginTop: 15, textAlign: "center", color: "red" }
});
