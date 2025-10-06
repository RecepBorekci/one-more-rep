import { useState } from "react";
import { StyleSheet, View } from "react-native";
import PresetButton from "./PresetButton";

type Preset = {
  key: string;
  label: string;
  seconds: number;
};

type PresetContentProps = {
  presets?: Preset[];
  defaultKey?: string;
  onChange?: (selected: Preset) => void;
};

const DEFAULT_PRESETS: Preset[] = [
  { key: "s20", label: "20S", seconds: 20 },
  { key: "s30", label: "30S", seconds: 30 },
  { key: "s60", label: "1M", seconds: 60 },
  { key: "s120", label: "2M", seconds: 120 },
  { key: "s300", label: "5M", seconds: 300 },
  { key: "s600", label: "10M", seconds: 600 },
];

export default function PresetContent({
  presets = DEFAULT_PRESETS,
  defaultKey = "s20",
  onChange,
}: PresetContentProps) {
  const [activeKey, setActiveKey] = useState<string>(defaultKey);

  const handleSelect = (key: string) => {
    setActiveKey(key);
    const selection = presets.find((p) => p.key === key);
    if (selection && onChange) onChange(selection);
  };

  return (
    <View style={styles.grid}>
      {presets.map((p) => (
        <PresetButton
          key={p.key}
          label={p.label}
          isActive={p.key === activeKey}
          onPress={() => handleSelect(p.key)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
    gap: 10,
  },
});
