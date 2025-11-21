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

export default function AlertTypeList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Alert Type</Text>

      {alertTypes.map((a) => (
        <TouchableOpacity
          key={a.name}
          style={styles.btn}
          onPress={() =>
            router.push(`/home/alert-confirm?type=${a.name}`)
          }
        >
          <Text style={styles.btnText}>{a.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  btn: {
    padding: 15,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10
  },
  btnText: { fontSize: 18 }
});
