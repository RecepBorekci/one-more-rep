import CircularProgress from "@/components/CircularProgress";
import TwoTabToggle from "@/components/TwoTabToggle";
import { PALETTE } from "@/constants/Colors";
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
          <Text style={styles.placeholderText}>Presets content goes here</Text>
        ) : (
          <Text style={styles.placeholderText}>Custom content goes here</Text>
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
    marginTop: 16,
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
