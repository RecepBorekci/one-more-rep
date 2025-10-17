import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

const modeImages = [
  {
    id: 1,
    source: require("@/assets/images/mode_images/coach_mode.png"),
    name: "Coach",
  },
  {
    id: 2,
    source: require("@/assets/images/mode_images/supportive_mode.png"),
    name: "Supportive",
  },
  {
    id: 3,
    source: require("@/assets/images/mode_images/wholesome_mode.png"),
    name: "Wholesome",
  },
  {
    id: 4,
    source: require("@/assets/images/mode_images/funny_mode.png"),
    name: "Funny",
  },
];

export default function ModeScreen() {
  const renderImage = ({
    item,
  }: {
    item: { id: number; source: ImageSourcePropType; name: string };
  }) => (
    <View style={styles.imageContainer}>
      <Image source={item.source} style={styles.image} />
      <Text style={styles.modeText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={modeImages}
        renderItem={renderImage}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  row: {
    justifyContent: "space-around",
    gap: 50,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  modeText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Inter-VariableFont",
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 10,
    margin: 10,
  },
});
