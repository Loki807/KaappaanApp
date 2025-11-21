import { View, Text, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const n = await SecureStore.getItemAsync("name");
      const e = await SecureStore.getItemAsync("email");
      setName(n || "");
      setEmail(e || "");
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{name || "N/A"}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email || "N/A"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25 },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 20, color: "#D50000" },
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  label: { fontSize: 16, opacity: 0.6, marginTop: 10 },
  value: { fontSize: 20, fontWeight: "600", marginBottom: 10 },
});
