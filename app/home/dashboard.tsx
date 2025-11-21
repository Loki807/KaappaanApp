import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { logout } from "../../src/utils/storage";

export default function Dashboard() {
  
  const handleLogout = async () => {
    await logout();                  // clear all secure store
    router.replace("/auth/login");   // go back to login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Citizen Dashboard</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("../home/sos")}
      >
        <Text style={styles.btnText}>Send SOS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/home/profile")}
      >
        <Text style={styles.btnText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/home/alerts/history")}
      >
        <Text style={styles.btnText}>My Alerts</Text>
      </TouchableOpacity>

      {/* 🔥 LOGOUT BUTTON ADDED HERE */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: "center" },
  title: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 40 },

  btn: {
    backgroundColor: "#D50000",
    padding: 18,
    borderRadius: 10,
    marginTop: 15,
  },
  btnText: { color: "white", textAlign: "center", fontSize: 18, fontWeight: "bold" },

  logoutBtn: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center"}
  })
