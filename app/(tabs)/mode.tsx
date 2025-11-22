import { PALETTE } from "@/constants/Colors";
import {
  useVoiceLineState,
  useVoiceLineUpdater,
  VoiceLanguage,
  VoiceMode,
} from "@/hooks/useVoiceLine";
import { Picker } from "@react-native-picker/picker";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
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
    mode: "Supportive",
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
  const { mode, language } = useVoiceLineState();
  const { setMode, setLanguage } = useVoiceLineUpdater();
  const { width } = useWindowDimensions();

  const GAP = 16;
  const PADDING = 20;
  const itemWidth = (width - PADDING * 2 - GAP) / 2;
  const IMAGE_PADDING_RATIO = 0.1;

  const handleModePress = (selectedMode: VoiceMode) => {
    setMode(selectedMode);
  };

  const handleLanguageChange = (selectedLanguage: VoiceLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={{ width: width - PADDING * 2 }}>
        <Text style={styles.sectionHeading}>Choose Mode</Text>
        <View style={styles.gridContainer}>
          {modeImages.map((item) => {
            const isActive = mode === item.mode;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.imageContainer,
                  isActive && styles.activeImageContainer,
                  { width: itemWidth },
                ]}
                onPress={() => handleModePress(item.mode)}
                accessibilityRole="button"
                accessibilityLabel={`Select ${item.name} mode`}
                accessibilityState={{ selected: isActive }}
              >
                <Image
                  source={item.source}
                  style={[
                    styles.image,
                    {
                      width: itemWidth * (1 - IMAGE_PADDING_RATIO),
                      height: itemWidth * (1 - IMAGE_PADDING_RATIO),
                    },
                  ]}
                />
                <Text style={styles.modeText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.sectionHeading}>Choose Language</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={language}
            onValueChange={(itemValue) =>
              handleLanguageChange(itemValue as VoiceLanguage)
            }
            style={styles.picker}
          >
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Turkish" value="Turkish" />
            <Picker.Item label="Japanese" value="Japanese" />
          </Picker>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "transparent",
    borderRadius: 15,
    padding: 5,
  },
  activeImageContainer: {
    borderColor: PALETTE.orangePrimary,
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modeText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Inter-VariableFont",
    color: "#000000",
    marginTop: 5,
  },
  image: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pickerContainer: {
    borderColor: "#8F8787",
    borderWidth: 0.7,
    padding: 0,
    borderRadius: 12,
  },
  picker: {
    borderWidth: 0,
    borderRadius: 12,
    // fontSize doesn't work on Picker style on Android usually, but keeping it
    color: "#8F8787",
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "left",
    fontFamily: "Inter-VariableFont",
    color: "#000000",
    marginBottom: 10,
    marginTop: 5,
  },
});
