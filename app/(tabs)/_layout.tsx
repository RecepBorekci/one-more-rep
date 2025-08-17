import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

// Tab configuration
const TAB_CONFIG = [
  { name: "index", title: "Home", icon: "home" },
  { name: "interval", title: "Interval", icon: "timer" },
  { name: "mode", title: "Mode", icon: "headphones" },
  { name: "settings", title: "Settings", icon: "settings" },
];

// Colors
const COLORS = {
  tabBarBackground: "#FF6B35",
  activeText: "#fff",
  inactiveText: "#000",
  activeBackground: "rgba(255, 255, 255, 0.2)",
};

export default function TabLayout() {
  // Reusable tab label component
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

  // Reusable tab icon component
  const TabIcon = ({ name, color }: { name: string; color: string }) => (
    <MaterialIcons size={28} name={name as any} color={color} />
  );

  // Animated tab item component
  const AnimatedTabItem = ({
    focused,
    icon,
    label,
  }: {
    focused: boolean;
    icon: React.ReactNode;
    label: React.ReactNode;
  }) => {
    // Animation value for the vertical translation
    const translateY = useRef(new Animated.Value(0)).current;
    // Animation value for the background scale
    const scale = useRef(new Animated.Value(1)).current;

    // Run animation when focused state changes
    useEffect(() => {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: focused ? -10 : 0, // Move up by 10 units when active
          tension: 80,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: focused ? 1.1 : 1, // Slightly scale up when active
          tension: 80,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }, [focused, translateY, scale]);

    return (
      <Animated.View
        style={[
          styles.tabItemWrapper,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.tabItemBackground,
            {
              transform: [{ scale }],
              backgroundColor: focused
                ? COLORS.activeBackground
                : "transparent",
            },
          ]}
        />
        <View style={styles.tabItemContainer}>
          {icon}
          {label}
        </View>
      </Animated.View>
    );
  };

  return (
    <Tabs>
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabItem
                focused={focused}
                icon={<TabIcon name={tab.icon} color={color} />}
                label={<TabLabel focused={focused}>{tab.title}</TabLabel>}
              />
            ),
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarLabel: () => null, // Hide default label since we include it in AnimatedTabItem
            tabBarActiveTintColor: COLORS.activeText,
            tabBarInactiveTintColor: COLORS.inactiveText,
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.tabBarBackground,
    height: 70, // Increased height to accommodate the animation
    paddingBottom: 5,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  tabItemWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  tabItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    zIndex: 1,
  },
  tabItemBackground: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    top: 0,
  },
});
