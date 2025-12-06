import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

export default function FooterNav() {
  const path = usePathname();

  const navItems = [
    { icon: "home", route: "/home/dashboard" },
    { icon: "bell", route: "/home/alerts/history" },
    { icon: "user", route: "/home/profile" },
  ];

  return (
    <View style={styles.footer}>
      {navItems.map((item, index) => {
        const active = path === item.route;

        return (
          <TouchableOpacity
            key={index}
            style={styles.btn}
            onPress={() => router.push(item.route as any)}
          >
            <Feather
              name={item.icon as any}
              size={32}
              color={active ? "#B30000" : "#555"}
              style={active && styles.activeIcon}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    zIndex: 20,
  },

  btn: {
    padding: 10,
  },

  activeIcon: {
    transform: [{ scale: 1.25 }],
  },
});
