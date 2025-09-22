import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";

// Discriminated icon spec per library for strict typing
export type IconSpec =
  | { lib: "Ionicons"; name: React.ComponentProps<typeof Ionicons>["name"] }
  | {
      lib: "MaterialIcons";
      name: React.ComponentProps<typeof MaterialIcons>["name"];
    }
  | { lib: "AntDesign"; name: React.ComponentProps<typeof AntDesign>["name"] };

// Tab configuration (single source of truth)
const TAB_CONFIG: ReadonlyArray<{
  name: string;
  title: string;
  icon: IconSpec;
}> = [
  {
    name: "index",
    title: "Home",
    icon: { lib: "Ionicons", name: "home-outline" },
  },
  {
    name: "interval",
    title: "Interval",
    icon: { lib: "AntDesign", name: "clockcircleo" },
  },
  {
    name: "mode",
    title: "Mode",
    icon: { lib: "MaterialIcons", name: "record-voice-over" },
  },
  {
    name: "settings",
    title: "Settings",
    icon: { lib: "Ionicons", name: "settings-outline" },
  },
] as const;

// Colors (single place)
const COLORS = {
  tabBarBackground: "#F9EAC6",
  tabBarInactiveBackgroundColor: "#F9EAC6",
  tabBarActiveBackgroundColor: "#FF6B35",
  activeText: "#fff",
  inactiveText: "#988C8C",
};

export default function TabLayout() {
  const TabLabel = ({
    focused,
    children,
  }: {
    focused: boolean;
    children: string;
  }) => (
    <Text
      style={[
        styles.tabLabel,
        { color: focused ? COLORS.activeText : COLORS.inactiveText },
      ]}
    >
      {children}
    </Text>
  );

  const TabIcon = ({ icon, color }: { icon: IconSpec; color: string }) => {
    switch (icon.lib) {
      case "Ionicons":
        return <Ionicons size={28} name={icon.name} color={color} />;
      case "MaterialIcons":
        return <MaterialIcons size={28} name={icon.name} color={color} />;
      case "AntDesign":
        return <AntDesign size={28} name={icon.name} color={color} />;
      default:
        return null;
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveBackgroundColor: COLORS.tabBarInactiveBackgroundColor,
        tabBarActiveBackgroundColor: COLORS.tabBarActiveBackgroundColor,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.activeText,
        tabBarInactiveTintColor: COLORS.inactiveText,
      }}
    >
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon icon={tab.icon} color={color!} />
            ),
            tabBarLabel: ({ focused }) => (
              <TabLabel focused={focused}>{tab.title}</TabLabel>
            ),
            tabBarAccessibilityLabel: `${tab.title} tab`,
            tabBarButtonTestID: `tab-${tab.name}`,
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.tabBarBackground,
    height: 65,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
