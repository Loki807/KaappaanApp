// app/(auth)/login.tsx
import { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { loginRequest } from "../../src/api/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await loginRequest(email, password);

      if (res.data.message?.includes("OTP")) {
        router.push(`/auth/verify-otp?email=${email}`);
      } else {
        Alert.alert("Error", "Unexpected response format");
      }
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Login failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        Citizen Login
      </Text>

      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
      />

      <Button title="Login" onPress={login} />

      {/* ⭐ Register Button */}
      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={{ textAlign: "center", marginTop: 20, color: "blue" }}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
