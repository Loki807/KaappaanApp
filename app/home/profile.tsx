import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getName, getEmail, getCitizenId, clearAll } from "../../src/utils/storage";
import { router } from "expo-router";

export default function Profile() {
  const [info, setInfo] = useState({ name: "", email: "", id: "" });

  useEffect(() => {
    (async () => {
      const name = await getName();
      const email = await getEmail();
      const id = await getCitizenId();
      setInfo({ name: name || "", email: email || "", id: id || "" });
    })();
  }, []);

  const logout = async () => {
    await clearAll();
    router.replace("/auth/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{info.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{info.email}</Text>

        <Text style={styles.label}>Citizen ID</Text>
        <Text style={styles.value}>{info.id}</Text>
      </View>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, flex: 1, backgroundColor: "#f8f8f8" },
  header: { fontSize: 28, fontWeight: "900", color: "#7A0000", marginBottom: 20 },
  card: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
  },
  label: { opacity: 0.6, marginTop: 10, fontSize: 14 },
  value: { fontSize: 20, fontWeight: "700", color: "#333" },

  logoutBtn: {
    backgroundColor: "#B30000",
    padding: 18,
    borderRadius: 10,
    marginTop: 40,
  },

  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});
