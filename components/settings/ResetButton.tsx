import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ResetButtonProps {
  onPress: () => void;
}

export default function ResetButton({ onPress }: ResetButtonProps) {
  return (
    <TouchableOpacity style={styles.resetButton} onPress={onPress}>
      <Text style={styles.resetButtonText}>Reset Settings</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    borderWidth: 1.5,
    borderColor: "#FF6B35",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 15,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B35",
  },
});
