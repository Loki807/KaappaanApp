import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { verifyOtpRequest } from "../../src/api/authApi";
import { saveToken, saveUser } from "../../src/utils/storage";

export default function VerifyOtp() {
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState("");

  const validate = () => {
    if (!otp.trim()) return "OTP is required";
    if (otp.length < 6) return "OTP must be 6 digits";  // 6 DIGIT FIX
    return null;
  };

  const verify = async () => {
    const error = validate();
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }

    try {
      const res = await verifyOtpRequest(String(email), otp);

      if (res.data.token) {
        await saveToken(res.data.token);
        await saveUser(res.data.name);

        Alert.alert("Success", "OTP Verified!");
        router.replace("/home/dashboard");
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || "Invalid OTP";
      Alert.alert("Error", msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify OTP</Text>
      <Text style={styles.sub}>OTP sent to {email}</Text>

      <TextInput
        placeholder="Enter OTP"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={setOtp}
        maxLength={6}  // 6 digits
      />

      <TouchableOpacity style={styles.btn} onPress={verify}>
        <Text style={styles.btnText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: "center" },
  header: { fontSize: 32, fontWeight: "bold", color: "#D50000", textAlign: "center" },
  sub: { textAlign: "center", opacity: 0.7, marginBottom: 30 },
  input: {
    borderWidth: 1, borderColor: "#ddd", padding: 14, fontSize: 20,
    borderRadius: 10, backgroundColor: "#fafafa", textAlign: "center",
    letterSpacing: 4
  },
  btn: { backgroundColor: "#D50000", padding: 16, borderRadius: 10, marginTop: 25 },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" },
});
