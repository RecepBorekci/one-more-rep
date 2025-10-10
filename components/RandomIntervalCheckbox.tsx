import { PALETTE } from "@/constants/Colors";
import { useVoiceLineState, useVoiceLineUpdater } from "@/hooks/useVoiceLine";
import { Checkbox } from "expo-checkbox";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RandomIntervalCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  const { interval } = useVoiceLineState();
  const { setInterval } = useVoiceLineUpdater();
  const previousInterval = useRef<number | undefined>(interval);

  useEffect(() => {
    if (isChecked) {
      // capture current interval once when enabling random
      previousInterval.current = interval;

      const MIN = 20; // seconds
      const MAX = 600; // seconds (10 minutes)
      const randomInterval = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
      setInterval(randomInterval);
    } else {
      // restore previous interval when disabling random
      if (previousInterval.current !== undefined) {
        setInterval(previousInterval.current);
      }
    }
  }, [isChecked, setInterval]);

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
      <View style={styles.textContainer}>
        <Text style={styles.text}>Random Interval</Text>
        {isChecked && <Text style={styles.subText}>Range: 20s-10m</Text>}
      </View>
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
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
  },
  text: {
    fontSize: 20,
    fontFamily: "Inter-VariableFont",
    fontWeight: "400",
    textAlign: "left",
  },
  subText: {
    fontSize: 14,
    fontFamily: "Inter-VariableFont",
    fontWeight: "400",
    textAlign: "left",
    color: PALETTE.gray400,
    position: "absolute",
    left: 0,
    top: 26,
  },
});
