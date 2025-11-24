import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { getCitizenId } from "../../../src/utils/storage";
import { AlertItem } from "../../../src/types/alert";
import api from "../../../src/utils/api";

export default function AlertHistory() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      const citizenId = await getCitizenId();

      if (!citizenId) {
        console.log("❌ No citizenId found");
        return;
      }

      const res = await api.get(`/alert/citizen/${citizenId}`);
      setAlerts(res.data);
    } catch (err) {
      console.log("❌ Failed to load alerts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#D50000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Alerts</Text>

      {alerts.length === 0 ? (
        <Text style={styles.empty}>No alerts found.</Text>
      ) : (
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.type}>{item.alertTypeName}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.date}>
                {new Date(item.reportedAt).toLocaleString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  empty: { textAlign: "center", marginTop: 20, fontSize: 18, opacity: 0.7 },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  type: { fontSize: 20, fontWeight: "bold", marginBottom: 5, color: "#D50000" },
  desc: { fontSize: 16, marginBottom: 5 },
  date: { fontSize: 14, opacity: 0.6 },
});
