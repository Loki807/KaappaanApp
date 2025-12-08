import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import api from "../../../src/utils/api";
import { sendSOS } from "../../../src/api/alertApi";

export default function AlertConfirm() {
  const { type } = useLocalSearchParams();
  const [description, setDescription] = useState("");
  const [coords, setCoords] = useState<any>(null);
  const [emergencyPhone, setEmergencyPhone] = useState("");

  useEffect(() => {
    (async () => {
      // LOCATION
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission needed");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCoords({ lat: loc.coords.latitude, lng: loc.coords.longitude });

      // EMERGENCY CONTACT
      const citizenId = await SecureStore.getItemAsync("citizenId");
      if (citizenId) {
        const res = await api.get(`/citizen/emergency-contact/${citizenId}`);
        setEmergencyPhone(res.data.emergencyContact);
      }
    })();
  }, []);

  const sendOnlineAlert = async () => {
    if (!coords) return Alert.alert("Location not ready");

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
      await sendSOS(payload);
      Alert.alert("Success", "Alert sent!");
      router.push("/home/dashboard");
    } catch {
      Alert.alert("Error", "Failed to send");
    }
  };

  const sendSMS = () => {
    if (!coords) return;
    const msg = `🚨 EMERGENCY ALERT
Type: ${type}
Desc: ${description}
Location: https://maps.google.com/?q=${coords.lat},${coords.lng}`;
    Linking.openURL(`sms:${emergencyPhone}?body=${encodeURIComponent(msg)}`);
  };

  const sendWhatsApp = () => {
    if (!coords) return;
    const phone = emergencyPhone.startsWith("0")
      ? `94${emergencyPhone.substring(1)}`
      : emergencyPhone;

    const msg = `🚨 EMERGENCY ALERT
Type: ${type}
Desc: ${description}
Location: https://maps.google.com/?q=${coords.lat},${coords.lng}`;
    Linking.openURL(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
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

      <TouchableOpacity style={styles.btnOnline} onPress={sendOnlineAlert}>
        <Text style={styles.btnText}>Send Online Alert</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSMS} onPress={sendSMS}>
        <Text style={styles.btnText}>Send SMS Alert</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnWhatsApp} onPress={sendWhatsApp}>
        <Text style={styles.btnText}>Send WhatsApp Alert</Text>
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
    marginBottom: 25,
  },
  btnOnline: {
    backgroundColor: "#B30000",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  btnSMS: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  btnWhatsApp: {
    backgroundColor: "#25D366",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
