import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { verifyOtpRequest } from "../../src/api/authApi";
import { saveToken, saveUser } from "../../src/utils/storage";

export default function VerifyOtp() {
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {
      const res = await verifyOtpRequest(String(email), otp);

      if (res.data.token) {
        await saveToken(res.data.token);
        await saveUser(res.data.name);

        Alert.alert("Success", "OTP Verified!");
        router.replace("/home/dashboard");
      }
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>Verify OTP</Text>
      <Text>Email: {email}</Text>

      <TextInput
        placeholder="Enter OTP"
        keyboardType="numeric"
        onChangeText={setOtp}
        style={{ borderWidth: 1, marginTop: 20 }}
      />

      <Button title="Verify OTP" onPress={verifyOtp} />
    </View>
  );
}
