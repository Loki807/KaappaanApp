import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

const alertTypes = [
  "Fire",
  "Accident",
  "WomenSafety",
  "Crime",
  "Medical",
  "StudentSOS",
];

export default function AlertTypes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Alert Type</Text>

      {alertTypes.map((type) => (
        <TouchableOpacity
          key={type}
          style={styles.card}
          onPress={() =>
            router.push(`/home/alerts/alert-confirm?type=${type}`)
          }
        >
          <Text style={styles.cardText}>{type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25},
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 200},
  card: {
    backgroundColor: "#060606ff",
    padding: 18,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 5,
  },
  cardText: { fontSize: 20, fontWeight: "600", color: "#fff" },
});
