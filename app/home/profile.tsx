import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getName, getEmail, getCitizenId } from "../../src/utils/storage";

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{info.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{info.email}</Text>

        
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, flex: 1 },
  header: { fontSize: 30, fontWeight: "bold", color: "red", marginBottom: 20 },
  card: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
  },
  label: { opacity: 0.6, marginTop: 10 },
  value: { fontSize: 18, fontWeight: "600" },
});
