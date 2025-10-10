import { PALETTE } from "@/constants/Colors";
import { useVoiceLineState, useVoiceLineUpdater } from "@/hooks/useVoiceLine";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function CustomContent() {
  const { interval } = useVoiceLineState();
  const { setInterval } = useVoiceLineUpdater();

  const [minutesStr, setMinutesStr] = useState("00");
  const [secondsStr, setSecondsStr] = useState("00");

  useEffect(() => {
    const mins = Math.floor(interval / 60);
    const secs = interval % 60;
    setMinutesStr(String(mins).padStart(2, "0"));
    setSecondsStr(String(secs).padStart(2, "0"));
  }, [interval]);

  const sanitize = (text: string, maxLen: number) =>
    text.replace(/\D/g, "").slice(0, maxLen);

  const commitInterval = () => {
    let mins = parseInt(minutesStr || "0", 10) || 0;
    let secs = parseInt(secondsStr || "0", 10) || 0;
    // Clamp values to valid ranges and sync UI strings
    mins = Math.min(Math.max(mins, 0), 99);
    secs = Math.min(Math.max(secs, 0), 59);
    setMinutesStr(String(mins).padStart(2, "0"));
    setSecondsStr(String(secs).padStart(2, "0"));
    const total = mins * 60 + secs;
    setInterval(total);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.innerText}>Minutes</Text>
        <View style={styles.button}>
          <TextInput
            value={minutesStr}
            onChangeText={(t) => setMinutesStr(sanitize(t, 2))}
            onBlur={commitInterval}
            keyboardType="number-pad"
            maxLength={2}
            style={styles.text}
            returnKeyType="done"
            accessibilityLabel="Minutes input"
          />
        </View>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.innerText}>Seconds</Text>
        <View style={styles.button}>
          <TextInput
            value={secondsStr}
            onChangeText={(t) => setSecondsStr(sanitize(t, 2))}
            onBlur={commitInterval}
            keyboardType="number-pad"
            maxLength={2}
            style={styles.text}
            returnKeyType="done"
            accessibilityLabel="Seconds input"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 0,
    width: "50%",
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  button: {
    padding: 10,
    backgroundColor: PALETTE.white,
    borderWidth: 2,
    borderColor: PALETTE.orangePrimary,
    width: "80%",
  },
  text: {
    fontSize: 48,
    fontFamily: "OpenSans-VariableFont",
    fontWeight: "400",
    textAlign: "center",
  },
  innerText: {
    fontSize: 12,
    fontFamily: "Inter-VariableFont",
    fontWeight: "400",
    textAlign: "center",
  },
});
