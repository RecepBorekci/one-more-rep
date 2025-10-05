import { StyleSheet, View } from "react-native";

export default function IntervalScreen() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
});
