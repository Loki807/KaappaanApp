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
            <View style={styles.timelineRow}>
              
              {/* Timeline Line */}
              <View style={styles.timelineLine} />

              {/* CARD */}
              <View style={styles.card}>
                <Text style={styles.type}>{item.alertTypeName}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.date}>
                  {new Date(item.reportedAt).toLocaleString()}
                </Text>
              </View>

            </View>
          )}
        />
      )}
    </View>
  );
}

/* ------------------ PERFECT FINAL PREMIUM STYLES ------------------ */

const styles = StyleSheet.create({

  /* MAIN PAGE */
  container: { 
    flex: 1, 
    padding: 30, 
    backgroundColor: "#f5f6ff", // ultra clean
  },

  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },

  /* HEADER TITLE */
  title: { 
    fontSize: 34, 
    fontWeight: "900",
    color: "#900000",
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 1.5,
  },

  /* EMPTY MESSAGE */
  empty: { 
    textAlign: "center", 
    marginTop: 40, 
    fontSize: 18, 
    opacity: 0.6,
    color: "#666",
    fontWeight: "600",
  },

  /* TIMELINE ROW */
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 35,
  },

  /* VERTICAL TIMELINE LINE */
  timelineLine: {
    width: 4,
    backgroundColor: "rgba(200,0,0,0.25)",
    height: "100%",
    borderRadius: 3,
    marginLeft: 20,
    marginRight: 20,

    shadowColor: "#ffb3b3",
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },

  /* PERFECTED PREMIUM CARD */
  card: {
    flex: 1,
    padding: 28,
    borderRadius: 26,

    /* Glass feel */
    backgroundColor: "rgba(255,255,255,0.97)",
    borderWidth: 1.2,
    borderColor: "rgba(180,0,0,0.18)",

    /* Deep luxury shadow */
    shadowColor: "#8A0000",
    shadowOpacity: 0.22,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,

    /* Neon Alert strip */
    borderTopWidth: 8,
    borderTopColor: "#ff1e1e",
  },

  /* ALERT TYPE BADGE */
  type: { 
    fontSize: 22, 
    fontWeight: "900",

    paddingVertical: 7,
    paddingHorizontal: 18,
    alignSelf: "flex-start",

    backgroundColor: "rgba(255, 0, 0, 0.12)",
    borderRadius: 14,
    color: "#b30000",
    letterSpacing: 0.9,
    marginBottom: 16,

    shadowColor: "#ff6666",
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },

  /* DESCRIPTION TEXT */
  desc: { 
    fontSize: 18, 
    color: "#111",
    lineHeight: 26,
    marginBottom: 20,
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  /* DATE + TIME PILL */
  date: { 
    fontSize: 15, 
    fontWeight: "700",
    color: "#333",

    backgroundColor: "rgba(0,0,0,0.07)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignSelf: "flex-start",

    letterSpacing: 0.6,
    fontStyle: "italic",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

});
