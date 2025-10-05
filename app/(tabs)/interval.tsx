import CircularProgress from "@/components/CircularProgress";
import { PALETTE } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export default function IntervalScreen() {
  return (
    <View style={styles.container}>
      <CircularProgress
        size={200}
        strokeWidth={10}
        progress={0.5}
        color={PALETTE.orangePrimary}
      >
        <Text style={styles.timerText}>00:00</Text>
      </CircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PALETTE.white,
  },
  timerText: {
    fontSize: 40,
    fontWeight: "400",
    color: "#000000",
    fontFamily: "OpenSans-VariableFont",
  },
});
