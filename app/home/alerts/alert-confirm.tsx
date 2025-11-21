import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { sendSOS } from "../../../src/api/alertApi";

export default function AlertConfirm() {
  const { type } = useLocalSearchParams();
  const [description, setDescription] = useState("");
  const [coords, setCoords] = useState<any>(null);

 useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission needed", "Turn on location permission.");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setCoords({
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
    });

    // ⭐ ADD HERE
    console.log("📍 Location:", {
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
      acc: loc.coords.accuracy
    });

  })();
}, []);


  const submitAlert = async () => {
    if (!coords) {
      Alert.alert("Error", "Location not available");
      return;
    }

    const citizenId = await SecureStore.getItemAsync("citizenId");

    const payload = {
  CitizenId: citizenId,
  AlertTypeName: type,
  Description: description || "No description",
  Latitude: coords.lat,
  Longitude: coords.lng,
  ReportedAt: new Date().toISOString(),
};

    try {
      await sendSOS (payload);
      Alert.alert("Success", "Alert sent successfully!");
      router.push("/home/dashboard");
    } catch (err) {
      Alert.alert("Error", "Failed to send alert");
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Confirm {type} Alert</Text>

      <TextInput
        placeholder="Describe the situation"
        style={styles.input}
        multiline
        numberOfLines={4}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.btn} onPress={submitAlert}>
        <Text style={styles.btnText}>Send Alert</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fafafa",
    height: 120,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "red",
    padding: 18,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
