import { View, Text, FlatList } from "react-native";
import api from "../../../src/utils/api";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";

export default function History() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      let id = await SecureStore.getItemAsync("citizenId");
      if (!id) return;

      const res = await api.get(`/alerts/citizen/${id}`);
      setAlerts(res.data);
    })();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>My Alerts</Text>

      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              backgroundColor: "#fff",
              borderRadius: 10,
              marginTop: 10,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {item.alertTypeName}
            </Text>

            <Text style={{ opacity: 0.7 }}>
              {new Date(item.reportedAt).toLocaleString()}
            </Text>

            <Text style={{ opacity: 0.6 }}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}
