import CircularProgress from "@/components/CircularProgress";
import CustomContent from "@/components/CustomContent";
import PresetContent from "@/components/PresetContent";
import TwoTabToggle from "@/components/TwoTabToggle";
import { PALETTE } from "@/constants/Colors";
import { useVoiceLineState, useVoiceLineUpdater } from "@/hooks/useVoiceLine";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function IntervalScreen() {
  const TABS = {
    PRESETS: "PRESETS",
    CUSTOM: "CUSTOM",
  } as const;

  type TabKey = keyof typeof TABS;

  const [activeTab, setActiveTab] = useState<TabKey>("PRESETS");

  const handleChangeTab = (key: string) => {
    if (key === "PRESETS" || key === "CUSTOM") {
      setActiveTab(key as TabKey);
    }
  };

  const { interval } = useVoiceLineState();
  const { setInterval } = useVoiceLineUpdater();

  const handlePresetChanged = (preset: {
    key: string;
    label: string;
    seconds: number;
  }) => {
    setInterval(preset.seconds);
  };

  return (
    <View style={styles.container}>
      <CircularProgress
        size={200}
        strokeWidth={10}
        progress={0.5}
        color={PALETTE.orangePrimary}
      >
        <Text style={styles.timerText}>
          {interval
            ? `${String(Math.floor(interval / 60)).padStart(2, "0")}:${String(
                interval % 60
              ).padStart(2, "0")}`
            : "00:00"}
        </Text>
      </CircularProgress>
      <TwoTabToggle
        tabs={[
          { key: "PRESETS", label: TABS.PRESETS },
          { key: "CUSTOM", label: TABS.CUSTOM },
        ]}
        activeKey={activeTab}
        onChange={handleChangeTab}
        containerStyle={styles.tabsContainer}
      />

      {/* Tab content placeholders */}
      <View style={styles.tabContent}>
        {activeTab === "PRESETS" ? (
          <PresetContent onChange={handlePresetChanged} />
        ) : (
          <CustomContent />
        )}
      </View>
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
  tabsContainer: {
    marginTop: 60,
    width: "80%",
  },
  tabContent: {
    marginTop: 50,
    minHeight: 120,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: PALETTE.gray600,
    fontFamily: "Inter-VariableFont",
    fontSize: 16,
  },
  timerText: {
    fontSize: 40,
    fontWeight: "400",
    color: "#000000",
    fontFamily: "OpenSans-VariableFont",
  },
});
