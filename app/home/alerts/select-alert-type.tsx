import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

const alertTypes = [
  { name: "Fire" },
  { name: "Accident" },
  { name: "WomenSafety" },
  { name: "Crime" },
  { name: "Medical" },
  { name: "StudentSOS" }
];

export default function SelectAlertType() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Alert Type</Text>

      {alertTypes.map((a) => (
        <TouchableOpacity
          key={a.name}
          style={styles.card}
          onPress={() =>
            router.push(`/home/alerts/alert-confirm?type=${a.name}`)
          }
        >
          <Text style={styles.cardText}>{a.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
  },
  cardText: { fontSize: 18, fontWeight: "500" },
});
