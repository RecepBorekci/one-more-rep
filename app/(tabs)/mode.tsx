import {
  useVoiceLineState,
  useVoiceLineUpdater,
  VoiceMode,
} from "@/hooks/useVoiceLine";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const modeImages: {
  id: number;
  source: ImageSourcePropType;
  name: string;
  mode: VoiceMode;
}[] = [
  {
    id: 1,
    source: require("@/assets/images/mode_images/coach_mode.png"),
    name: "Coach",
    mode: "Coach",
  },
  {
    id: 2,
    source: require("@/assets/images/mode_images/supportive_mode.png"),
    name: "Supportive",
    mode: "Supporting",
  },
  {
    id: 3,
    source: require("@/assets/images/mode_images/wholesome_mode.png"),
    name: "Wholesome",
    mode: "Wholesome",
  },
  {
    id: 4,
    source: require("@/assets/images/mode_images/funny_mode.png"),
    name: "Funny",
    mode: "Funny",
  },
];

export default function ModeScreen() {
  const { mode } = useVoiceLineState();
  const { setMode } = useVoiceLineUpdater();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

  const handleModePress = (selectedMode: VoiceMode) => {
    setMode(selectedMode);
  };

  const renderImage = ({
    item,
  }: {
    item: {
      id: number;
      source: ImageSourcePropType;
      name: string;
      mode: VoiceMode;
    };
  }) => {
    const isActive = mode === item.mode;

    return (
      <TouchableOpacity
        style={[styles.imageContainer, isActive && styles.activeImageContainer]}
        onPress={() => handleModePress(item.mode)}
      >
        <Image source={item.source} style={styles.image} />
        <Text style={styles.modeText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={modeImages}
          renderItem={renderImage}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Turkish" value="Turkish" />
            <Picker.Item label="Japanese" value="Japanese" />
          </Picker>
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
  },
  grid: {
    alignItems: "center",
    paddingVertical: 20,
    gap: 20,
    marginBottom: 30,
  },
  row: {
    justifyContent: "space-around",
    gap: 50,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "transparent",
    borderRadius: 15,
    padding: 5,
  },
  activeImageContainer: {
    borderColor: "#FF8C42",
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
    marginVertical: 10,
  },
  pickerContainer: {
    borderColor: "#8F8787",
    borderWidth: 0.7,
    padding: 5,
    borderRadius: 12,
  },
  picker: {
    borderWidth: 0,
    borderRadius: 12,
    fontSize: 20,
    fontFamily: "Inter-VariableFont",
    fontWeight: "400",
    textAlign: "left",
    paddingLeft: 5,
    color: "#8F8787",
    outlineStyle: undefined,
  },
});
