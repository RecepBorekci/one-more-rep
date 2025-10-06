import { PALETTE } from "@/constants/Colors";
import { useVoiceLineUpdater } from "@/hooks/useVoiceLine";
import { Checkbox } from "expo-checkbox";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RandomIntervalCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  const { setInterval } = useVoiceLineUpdater();

  useEffect(() => {
    if (isChecked) {
      const MIN = 20; // seconds
      const MAX = 600; // seconds (10 minutes)
      const randomInterval = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
      setInterval(randomInterval);
    }
  }, [isChecked]);

  const handleChange = (value: boolean) => {
    setIsChecked(value);
  };

  return (
    <View style={styles.container}>
      <Checkbox
        color={PALETTE.orangePrimary}
        style={styles.checkbox}
        value={isChecked}
        onValueChange={handleChange}
      />
      <Text style={styles.text}>Random Interval</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    margin: 8,
    width: 24,
    height: 24,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  text: {
    fontSize: 20,
    fontFamily: "Inter-VariableFont",
    fontWeight: "400",
  },
});
