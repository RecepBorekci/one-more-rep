import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomRangeSlider, {
  formatSeconds,
} from "../../components/settings/CustomRangeSlider";
import CustomSlider from "../../components/settings/CustomSlider";
import CustomSwitch from "../../components/settings/CustomSwitch";
import PickerSetting from "../../components/settings/PickerSetting";
import ResetButton from "../../components/settings/ResetButton";
import SettingRow from "../../components/settings/SettingRow";
import SettingsSection from "../../components/settings/SettingsSection";

export default function SettingsScreen() {
  const [voiceVolume, setVoiceVolume] = useState(0.1);
  const [systemSound, setSystemSound] = useState(true);
  const [muteDuringCalls, setMuteDuringCalls] = useState(false);
  const [backgroundMode, setBackgroundMode] = useState(false);
  const [rangeLow, setRangeLow] = useState(30);
  const [rangeHigh, setRangeHigh] = useState(600);
  const [appLanguage, setAppLanguage] = useState("English");
  const [theme, setTheme] = useState("System");

  const languageOptions = [
    { label: "English", value: "English" },
    { label: "Turkish", value: "Turkish" },
    { label: "Japanese", value: "Japanese" },
  ];

  const themeOptions = [
    { label: "Light", value: "Light" },
    { label: "Dark", value: "Dark" },
    { label: "System", value: "System" },
  ];

  const handleResetSettings = () => {
    setVoiceVolume(0.1);
    setSystemSound(true);
    setMuteDuringCalls(false);
    setBackgroundMode(false);
    setRangeLow(30);
    setRangeHigh(600);
    setAppLanguage("English");
    setTheme("System");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Audio Section */}
        <SettingsSection title="Audio">
          <SettingRow
            label="Voice Line Volume"
            value={`${Math.round(voiceVolume * 100)}%`}
            vertical
          >
            <CustomSlider
              value={voiceVolume}
              onValueChange={setVoiceVolume}
              minimumValue={0}
              maximumValue={1}
              step={0.01}
              trackHeight={4}
              thumbSize={35}
              minimumTrackTintColor="#FF6B35"
              maximumTrackTintColor="#E0E0E0"
              thumbTintColor="#FFFFFF"
            />
          </SettingRow>

          <SettingRow label="System Sound">
            <CustomSwitch value={systemSound} onValueChange={setSystemSound} />
          </SettingRow>

          <SettingRow label="Auto-mute During Calls">
            <CustomSwitch
              value={muteDuringCalls}
              onValueChange={setMuteDuringCalls}
            />
          </SettingRow>
        </SettingsSection>

        {/* Intervals Section */}
        <SettingsSection title="Intervals">
          <SettingRow
            label="Random Interval Range"
            value={`${formatSeconds(rangeLow)} - ${formatSeconds(rangeHigh)}`}
            vertical
          >
            <CustomRangeSlider
              low={rangeLow}
              high={rangeHigh}
              min={30}
              max={600}
              step={30}
              onValueChanged={(low, high) => {
                setRangeLow(low);
                setRangeHigh(high);
              }}
            />
          </SettingRow>
        </SettingsSection>

        {/* App Section */}
        <SettingsSection title="App">
          <PickerSetting
            label="App Language"
            selectedValue={appLanguage}
            onValueChange={setAppLanguage}
            items={languageOptions}
          />

          <PickerSetting
            label="Theme"
            selectedValue={theme}
            onValueChange={setTheme}
            items={themeOptions}
          />
        </SettingsSection>

        {/* Advanced Section */}
        <SettingsSection title="Advanced">
          <SettingRow label="Run in background">
            <CustomSwitch
              value={backgroundMode}
              onValueChange={setBackgroundMode}
            />
          </SettingRow>
        </SettingsSection>

        {/* Info Section */}
        <SettingsSection title="Info" showSeparator={false}>
          <ResetButton onPress={handleResetSettings} />
          <Text style={styles.versionText}>Version: 0.4.6</Text>
        </SettingsSection>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  versionText: {
    fontSize: 14,
    color: "#8F8787",
    textAlign: "center",
    paddingBottom: 10,
  },
});
