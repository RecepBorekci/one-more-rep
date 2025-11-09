import { PALETTE } from "@/constants/Colors";
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
    icon: { lib: "AntDesign", name: "clock-circle" },
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
  tabBarInactiveBackground: PALETTE.yellowLight,
  tabBarActiveBackground: PALETTE.orangePrimary,
  tabBarActiveText: PALETTE.white,
  tabBarInactiveText: PALETTE.gray400,
  headerBackground: PALETTE.orangePrimary,
  headerText: PALETTE.white,
  screenBackground: PALETTE.white,
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
        {
          color: focused ? COLORS.tabBarActiveText : COLORS.tabBarInactiveText,
        },
      ]}
    >
      {children}
    </Text>
  );

  const TabIcon = ({ icon, color }: { icon: IconSpec; color: string }) => {
    switch (icon.lib) {
      case "Ionicons":
        return <Ionicons size={24} name={icon.name} color={color} />;
      case "MaterialIcons":
        return <MaterialIcons size={24} name={icon.name} color={color} />;
      case "AntDesign":
        return <AntDesign size={24} name={icon.name} color={color} />;
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
        tabBarActiveTintColor: COLORS.tabBarActiveText,
        tabBarInactiveTintColor: COLORS.tabBarInactiveText,
        headerShown: true,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitleStyle,
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
    fontFamily: "Inter-VariableFont",
    fontWeight: "500",
  },
  header: {
    backgroundColor: COLORS.headerBackground,
  },
  headerTitleStyle: {
    color: COLORS.headerText,
    fontSize: 20,
    fontFamily: "Inter-VariableFont",
    fontWeight: "500",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBackground,
  },
});
