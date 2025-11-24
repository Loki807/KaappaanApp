import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { clearAll } from "../../src/utils/storage";

export default function Dashboard() {
  const logout = async () => {
    await clearAll();
    router.replace("/auth/login");
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Citizen Dashboard</Text>

        {/* Profile Button */}
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => router.push("/home/profile")}
        >
          <Text style={styles.profileText}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* My Alerts Button */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/home/alerts/history")}
      >
        <Text style={styles.btnText}>My Alerts</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Floating SOS */}
      <TouchableOpacity
        style={styles.floatingSOS}
        onPress={() => router.push("/home/alert-types")}
      >
        <Text style={styles.floatingText}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 60, backgroundColor: "#f8f8f8" },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: { fontSize: 30, fontWeight: "bold" },

  profileBtn: {
    backgroundColor: "#D50000",
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  profileText: { color: "#fff", fontSize: 22, fontWeight: "bold" },

  btn: {
    backgroundColor: "#D50000",
    padding: 18,
    borderRadius: 10,
    marginTop: 40,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  logoutBtn: {
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },

  floatingSOS: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    transform: [{ translateX: -40 }],
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },

  floatingText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
});
