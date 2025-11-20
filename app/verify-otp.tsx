import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { verifyOtp } from "../src/services/authService";
import { saveToken } from "../src/utils/storage";

export default function VerifyOtpScreen() {
  const { email } = useLocalSearchParams();
  const emailStr = Array.isArray(email) ? email[0] : email;

  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    const res = await verifyOtp(emailStr, otp);

    console.log("OTP VERIFY RESPONSE:", res);

    if (res.token) {
      await saveToken(res.token);
      Alert.alert("Success", "Your email is verified!");

      // ⭐ CORRECT ROUTE TO DASHBOARD
      router.replace("/home/dashboard");
    } else {
      Alert.alert("Failed", res.message || "Invalid OTP");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.btn} onPress={handleVerify}>
        <Text style={styles.btnText}>VERIFY OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  btn: { backgroundColor: "blue", padding: 15, borderRadius: 8 },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
