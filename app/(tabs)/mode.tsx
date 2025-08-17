import { StyleSheet, Text, View } from "react-native";

export default function ModeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
});
