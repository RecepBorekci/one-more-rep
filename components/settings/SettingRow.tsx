import { ReactNode } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface SettingRowProps {
  label: string;
  value?: string;
  children: ReactNode;
  style?: ViewStyle;
  vertical?: boolean;
}

export default function SettingRow({
  label,
  value,
  children,
  style,
  vertical = false,
}: SettingRowProps) {
  if (vertical) {
    return (
      <View style={[styles.settingRowVertical, style]}>
        <View style={styles.labelValueContainer}>
          <Text style={styles.settingLabel}>{label}</Text>
          {value && <Text style={styles.settingValue}>{value}</Text>}
        </View>
        {children}
      </View>
    );
  }

  return (
    <View style={[styles.settingRow, style]}>
      <View style={styles.labelValueContainer}>
        <Text style={styles.settingLabel}>{label}</Text>
        {value && <Text style={styles.settingValue}>{value}</Text>}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  settingRowVertical: {
    flexDirection: "column",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  labelValueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
  settingValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666666",
  },
});
