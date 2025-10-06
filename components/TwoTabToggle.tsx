import { PALETTE } from "@/constants/Colors";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type TabConfig = {
  key: string;
  label: string;
};

type TwoTabToggleProps = {
  tabs: [TabConfig, TabConfig];
  activeKey: string;
  onChange: (key: string) => void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export default function TwoTabToggle({
  tabs,
  activeKey,
  onChange,
  containerStyle,
  buttonStyle,
  textStyle,
}: TwoTabToggleProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {tabs.map(({ key, label }, index) => {
        const isActive = key === activeKey;
        const isFirst = index === 0;
        const isLast = index === tabs.length - 1;
        const cornerStyle = {
          borderTopLeftRadius: isFirst ? 25 : 0,
          borderTopRightRadius: isLast ? 25 : 0,
        } as const;
        return (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange(key)}
            style={[
              styles.button,
              isActive ? styles.buttonActive : styles.buttonInactive,
              cornerStyle,
              buttonStyle,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                isActive ? styles.textActive : styles.textInactive,
                textStyle,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: PALETTE.orangePrimary,
  },
  buttonInactive: {
    backgroundColor: PALETTE.yellowLight,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "Inter-VariableFont",
    fontWeight: "600",
  },
  textActive: {
    color: PALETTE.white,
  },
  textInactive: {
    color: PALETTE.gray400,
  },
});
