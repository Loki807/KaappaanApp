import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import { sendSOS  } from "../../../src/api/alertApi";

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
    })();
  }, []);

  const submitAlert = async () => {
    if (!coords) {
      Alert.alert("Error", "Location not available");
      return;
    }

    const citizenId = await SecureStore.getItemAsync("citizenId");

    const payload = {
      citizenId,
      alertTypeName: type,
      description,
      latitude: coords.lat,
      longitude: coords.lng,
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
