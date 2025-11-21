import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { clearAll } from "../../src/utils/storage";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = async () => {
    await clearAll();
    router.replace("/auth/login");
  };

  return (
    <View style={styles.container}>

      {/* 🔹 Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Citizen Dashboard</Text>

        {/* 🔹 Profile Dropdown */}
        <View>
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => setMenuOpen(!menuOpen)}
          >
            <Text style={styles.profileText}>👤</Text>
          </TouchableOpacity>

          {menuOpen && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuOpen(false);
                  router.push("/home/profile");
                }}
              >
                <Text style={styles.dropdownText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.dropdownItem} onPress={logout}>
                <Text style={styles.dropdownText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* 🔹 Alerts History Button */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/home/alerts/history")}
      >
        <Text style={styles.btnText}>My Alerts</Text>
      </TouchableOpacity>

      {/* 🔥 Floating SOS Button */}
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
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 60,
    backgroundColor: "#f8f8f8",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  profileBtn: {
    backgroundColor: "#D50000",
    padding: 10,
    borderRadius: 50,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  profileText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  dropdown: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 5,
    width: 150,
  },

  dropdownItem: {
    padding: 12,
  },

  dropdownText: {
    fontSize: 16,
    fontWeight: "500",
  },

  btn: {
    backgroundColor: "#D50000",
    padding: 18,
    borderRadius: 10,
    marginTop: 40,
  },

  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  /* 🔥 Floating SOS Button */
  floatingSOS: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    transform: [{ translateX: -40 }],
    backgroundColor: "red",
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },

  floatingText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
