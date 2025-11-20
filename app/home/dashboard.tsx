import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { clearAuth } from "../../src/utils/storage";

export default function Dashboard() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>Citizen Dashboard</Text>
      <Text>You are logged in successfully 🎉</Text>

      <Button title="Logout" color="red" onPress={async () => {
        await clearAuth();
        router.replace("/auth/login");
      }} />
    </View>
  );
}
