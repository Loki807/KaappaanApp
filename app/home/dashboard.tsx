import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from "react-native";
import { useRef, useEffect } from "react";
import FooterNav from "./FooterNav";
import { MaterialCommunityIcons } from "@expo/vector-icons";   // ⭐ ADDED ICON IMPORT

export default function Dashboard() {
  const blink = useRef(new Animated.Value(1)).current;

  /* 🔥 WAVE ANIMATION VALUES */
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;

  /* ⚡ Lightning Flash Animation Values */
  const flash1 = useRef(new Animated.Value(1)).current;
  const flash2 = useRef(new Animated.Value(1)).current;
  const flash3 = useRef(new Animated.Value(1)).current;
  const flash4 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // SOS blink loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0.3, duration: 600, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();

    // Wave animation engine
    const animateWave = (wave: Animated.Value | Animated.ValueXY, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(wave, {
            toValue: 1,
            duration: 2000,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(wave, { toValue: 0, duration: 0, useNativeDriver: true }),
        ])
      ).start();

    animateWave(wave1, 0);
    animateWave(wave2, 700);

    // Lightning flicker animation
    const lightning = (anim: Animated.Value | Animated.ValueXY, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 0.2, duration: 120, delay, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 1, duration: 120, useNativeDriver: true }),
        ])
      ).start();

    lightning(flash1, 0);
    lightning(flash2, 200);
    lightning(flash3, 400);
    lightning(flash4, 600);
  }, []);

  /* ⚡ Lightning Component */
  const Lightning = ({
    style,
    anim,
  }: {
    style: any;
    anim: Animated.Value;
  }) => (
    <Animated.View style={[styles.lightWrapper, style, { opacity: anim }]}>
      <View style={styles.lightTop} />
      <View style={styles.lightMid} />
      <View style={styles.lightBottom} />
    </Animated.View>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.headerRow}>
        <View style={styles.logoCircle}>
          <Image source={require("../../assets/logo.jpeg")} style={styles.logo} />
        </View>

        <Text style={styles.title}>Kaappaan</Text>
      </View>

     {/* ⭐ HORIZONTAL FLOW ICONS */}
<View style={styles.flowContainer}>
  <MaterialCommunityIcons name="alert-circle-outline" size={32} color="#7A0000" />
  <MaterialCommunityIcons name="chevron-right" size={28} color="#B30000" />
  <MaterialCommunityIcons name="radiobox-marked" size={32} color="#7A0000" />
  <MaterialCommunityIcons name="chevron-right" size={28} color="#B30000" />
  <MaterialCommunityIcons name="phone" size={32} color="#7A0000" />
</View>


      {/* CENTER SOS AREA */}
      <View style={styles.centerArea}>

        {/* ⚡ Lightning */}
        <Lightning style={styles.light1} anim={flash1} />
        <Lightning style={styles.light2} anim={flash2} />
        <Lightning style={styles.light3} anim={flash3} />
        <Lightning style={styles.light4} anim={flash4} />

        {/* 🔥 Wave 1 */}
        <Animated.View
          style={[
            styles.wave,
            {
              transform: [
                {
                  scale: wave1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 3],
                  }),
                },
              ],
              opacity: wave1.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 0],
              }),
            },
          ]}
        />

        {/* 🔥 Wave 2 */}
        <Animated.View
          style={[
            styles.wave,
            {
              transform: [
                {
                  scale: wave2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 3.5],
                  }),
                },
              ],
              opacity: wave2.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 0],
              }),
            },
          ]}
        />

        {/* SOS BUTTON */}
        <Animated.View style={[styles.sosCircle, { opacity: blink }]}>
          <TouchableOpacity onPress={() => router.push("/home/alert-types")}>
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* FOOTER */}
      <FooterNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },

  headerRow: {
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#7A0000",
  },

  logoCircle: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#fff",
    elevation: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },

  /* ⭐ UPDATED FLOW ICONS */
  flowContainer: {
  marginTop: 15,
  marginBottom: 5,
  paddingTop: 60,
  alignItems: "center",
  flexDirection: "row",       // ⭐ NOW ICONS ARE HORIZONTAL
  justifyContent: "center",
  gap: 10,                    // ⭐ SPACE BETWEEN ICONS
},


  centerArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  wave: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 200,
    backgroundColor: "rgba(213, 0, 0, 0.32)",
  },

  sosCircle: {
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: "#D50000",
    justifyContent: "center",
    alignItems: "center",
    elevation: 14,
    shadowColor: "red",
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },

  sosText: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "900",
  },

  lightWrapper: {
    position: "absolute",
    width: 50,
    height: 110,
    alignItems: "center",
  },

  lightTop: {
    width: 8,
    height: 25,
    backgroundColor: "yellow",
    transform: [{ rotate: "-28deg" }],
    marginBottom: -8,
    borderRadius: 4,
  },

  lightMid: {
    width: 8,
    height: 28,
    backgroundColor: "yellow",
    transform: [{ rotate: "32deg" }],
    marginBottom: -8,
    borderRadius: 4,
  },

  lightBottom: {
    width: 8,
    height: 22,
    backgroundColor: "yellow",
    transform: [{ rotate: "-22deg" }],
    borderRadius: 4,
  },

  /* Lightning Positions */
  light1: { top: -120, left: -85 },
  light2: { top: -120, right: -85 },
  light3: { bottom: -120, right: -85 },
  light4: { bottom: -120, left: -85 },
});
