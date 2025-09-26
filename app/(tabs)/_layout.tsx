import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
  headerShown: boolean; // omit if default (shown)
  headerTitle: string; // omit if same as title or auto-derived
}> = [
  {
    name: "index",
    title: "Home",
    icon: { lib: "Ionicons", name: "home-outline" },
    headerShown: false,
    headerTitle: "Home",
  },
  {
    name: "interval",
    title: "Interval",
    icon: { lib: "AntDesign", name: "clockcircleo" },
    headerShown: true,
    headerTitle: "Interval Screen",
  },
  {
    name: "mode",
    title: "Mode",
    icon: { lib: "MaterialIcons", name: "record-voice-over" },
    headerShown: true,
    headerTitle: "Mode Screen",
  },
  {
    name: "settings",
    title: "Settings",
    icon: { lib: "Ionicons", name: "settings-outline" },
    headerShown: true,
    headerTitle: "Settings",
  },
] as const;

// Colors (single place)
const COLORS = {
  tabBarInactiveBackground: "#FEF9E1",
  tabBarActiveBackground: "#FF6B35",
  headerBackground: "#FF6B35",
  headerText: "#FFFFFF",
  activeText: "#FFFFFF",
  inactiveText: "#988C8C",
  screenBackground: "#FFFFFF",
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
        tabBarInactiveBackgroundColor: COLORS.tabBarInactiveBackground,
        tabBarActiveBackgroundColor: COLORS.tabBarActiveBackground,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.activeText,
        tabBarInactiveTintColor: COLORS.inactiveText,
        headerShown: true,
        headerBackground: () => <View style={styles.headerBackground} />,
        headerTitleStyle: { color: COLORS.headerText },
        sceneStyle: styles.container,
      }}
    >
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            headerShown: tab.headerShown,
            headerTitle: tab.headerTitle,
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
    height: 65,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  headerBackground: {
    flex: 1,
    backgroundColor: COLORS.headerBackground,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBackground,
  },
});
