import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

const alertTypes = [
  { name: "Fire" },
  { name: "Crime" },
  { name: "Medical" },
  { name: "Accident" },
   { name: "StudentSOS" },
    { name: "WomenSafety" },
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
            router.push(`/home/alerts/alert-confirm?type=${a.name}`)
          }
        >
          <Text style={styles.btnText}>{a.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 20,
    backgroundColor: "#ffffffff", // deep dark navy
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color:"rgba(213, 0, 0, 0.32)", // neon blue
    marginBottom: 30,
    letterSpacing: 1,
  },

  // ⭐ NEON GLASS BUTTON
  btn: {
    paddingVertical: 20,
    paddingHorizontal: 90,
    borderRadius: 160,

    // ✨ GLASS BACKGROUND
    backgroundColor: "rgba(255, 255, 255, 0.05)",

    // ✨ NEON BORDER GLOW
    borderWidth: 1.5,
    borderColor: "rgba(30, 101, 142, 0.9)",

    shadowColor: "#6268d2ff",
    shadowOpacity: 0.7,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,

    marginVertical: 12,
    alignSelf: "center",
  },

  btnText: {
    fontSize: 22,
    fontWeight: "800",
    color: "rgba(213, 0, 0, 0.32)", // neon red accent
    letterSpacing: 1,
    textAlign: "center",
  },
});


