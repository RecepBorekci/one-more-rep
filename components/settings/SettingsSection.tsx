import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
  showSeparator?: boolean;
}

export default function SettingsSection({
  title,
  children,
  showSeparator = true,
}: SettingsSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
      {showSeparator && <View style={styles.separator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8F8787",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  separator: {
    height: 2,
    backgroundColor: "#E0E0E0",
    marginTop: 20,
    marginHorizontal: 5,
  },
});
