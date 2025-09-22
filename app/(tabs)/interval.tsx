import { StyleSheet, Text, View } from "react-native";

export default function IntervalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Interval</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9EAC6",
  },
  text: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
});
