import Logo from "@/components/Logo";
import { PALETTE } from "@/constants/Colors";
import { useVoiceLine } from "@/hooks/useVoiceLine";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, type ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const iconName = isPlaying ? "stop-outline" : "play-outline";
  const buttonLabel = isPlaying ? "Stop" : "Play";
  const handleToggle = () => setIsPlaying((prev) => !prev);
  type IoniconName = ComponentProps<typeof Ionicons>["name"];

  // Use the custom hook to get voice line settings
  const { mode: currentMode, interval } = useVoiceLine();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          PALETTE.gray600,
          PALETTE.white,
          PALETTE.white,
          PALETTE.gray600,
        ]}
        locations={[0, 0.2, 0.5, 1]}
        style={styles.background}
      />
      <Logo />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
        ]}
        onPress={handleToggle}
        accessibilityRole="button"
        accessibilityState={{ selected: isPlaying }}
        accessibilityLabel={isPlaying ? "Stop" : "Play"}
      >
        <Ionicons
          name={iconName as IoniconName}
          size={48}
          color={PALETTE.orangePrimary}
        />
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </Pressable>
      <View style={styles.currentModeContainer}>
        <Text style={styles.text}>Current Mode: {currentMode}</Text>
        <Text style={styles.text}>Interval: {interval}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 30,
    paddingBottom: 50,
    paddingTop: 120,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    width: "100%",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Inter-VariableFont",
    fontWeight: "500",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: PALETTE.orangePrimary,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Inter-VariableFont",
    fontWeight: "500",
  },
  currentModeContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
