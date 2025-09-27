import { useVoiceLine } from "@/hooks/useVoiceLine";
import { Ionicons } from "@expo/vector-icons";
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
        <Ionicons name={iconName as IoniconName} size={48} color="#FF6B35" />
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
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  button: {
    padding: 10,
    borderRadius: 5,
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FF6B35",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  currentModeContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
