import React from "react";
import { Switch, SwitchProps } from "react-native";

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export default function CustomSwitch({
  value,
  onValueChange,
  disabled = false,
  ...props
}: CustomSwitchProps & Omit<SwitchProps, "trackColor" | "thumbColor">) {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{
        false: "#D9D9D9", // Inactive bar color
        true: "#F9AB8E", // Active bar color
      }}
      thumbColor={value ? "#FF6B35" : "#988C8C"} // Active: FF6B35, Inactive: 988C8C
      {...props}
    />
  );
}
