import { PALETTE } from "@/constants/Colors";
import { Pressable, StyleSheet, Text } from "react-native";

type PresetButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export default function PresetButton({
  label,
  isActive,
  onPress,
}: PresetButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        isActive ? styles.buttonActive : styles.buttonInactive,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          isActive ? styles.textActive : styles.textInactive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "30%",
    padding: 10,
    borderRadius: 15,
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: PALETTE.orangePrimary,
  },
  buttonInactive: {
    backgroundColor: PALETTE.yellowLight,
  },
  text: {
    fontSize: 28,
    fontFamily: "Inter-VariableFont",
    fontWeight: "400",
  },
  textActive: {
    color: PALETTE.white,
  },
  textInactive: {
    color: PALETTE.gray400,
  },
});
