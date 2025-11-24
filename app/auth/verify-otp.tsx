import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { verifyOtpRequest } from "../../src/api/authApi";
import { saveToken, saveCitizenId, saveName } from "../../src/utils/storage";

export default function VerifyOtp() {
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState("");

 const verify = async () => {
  if (!otp.trim()) return Alert.alert("Enter OTP");

  try {
    const res = await verifyOtpRequest(String(email), otp);

    // ⭐ SAVE TOKEN
    await saveToken(res.data.token);

    // ⭐ SAVE CITIZEN ID (very important)
    if (res.data.citizenId) {
      await saveCitizenId(res.data.citizenId);
      console.log("CitizenId saved:", res.data.citizenId);
    }

    router.replace("/home/dashboard");

  } catch (err: any) {
    Alert.alert("Error", err.response?.data?.message || "Invalid OTP");
  }
};



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify OTP</Text>
      <Text style={styles.sub}>OTP sent to {email}</Text>

      <TextInput
        placeholder="Enter OTP"
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={verify}>
        <Text style={styles.btnText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, justifyContent: "center", flex: 1 },
  header: { fontSize: 30, color: "red", fontWeight: "bold", textAlign: "center" },
  sub: { textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, textAlign: "center", fontSize: 20 },
  btn: { backgroundColor: "red", padding: 16, marginTop: 20, borderRadius: 8 },
  btnText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
