// app/(auth)/register.tsx
import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { router } from "expo-router";
import { registerRequest } from "../../src/api/authApi";

export default function RegisterScreen() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    nic: "",
    address: "",
    emergencyContact: "",
  });

  const update = (key: string, val: string) =>
    setForm({ ...form, [key]: val });

  const handleRegister = async () => {
    try {
      const res = await registerRequest(form);

      if (res.data.message.includes("OTP")) {
        Alert.alert("Success", "OTP sent!");
        router.push(`/auth/verify-otp?email=${form.email}`);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || "Registration failed";
      Alert.alert("Error", msg);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>Citizen Register</Text>

      <TextInput placeholder="Full Name" onChangeText={(v) => update("fullName", v)} style={{ borderWidth: 1, marginTop: 10 }} />
      <TextInput placeholder="Email" onChangeText={(v) => update("email", v)} style={{ borderWidth: 1, marginTop: 10 }} />
      <TextInput placeholder="Phone Number" onChangeText={(v) => update("phoneNumber", v)} style={{ borderWidth: 1, marginTop: 10 }} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={(v) => update("password", v)} style={{ borderWidth: 1, marginTop: 10 }} />
      <TextInput placeholder="NIC" onChangeText={(v) => update("nic", v)} style={{ borderWidth: 1, marginTop: 10 }} />
      <TextInput placeholder="Address" onChangeText={(v) => update("address", v)} style={{ borderWidth: 1, marginTop: 10 }} />
      <TextInput placeholder="Emergency Contact" onChangeText={(v) => update("emergencyContact", v)} style={{ borderWidth: 1, marginTop: 10 }} />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
