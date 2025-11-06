import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";
import SettingRow from "./SettingRow";

interface PickerItem {
  label: string;
  value: string;
}

interface PickerSettingProps {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: PickerItem[];
}

export default function PickerSetting({
  label,
  selectedValue,
  onValueChange,
  items,
}: PickerSettingProps) {
  return (
    <SettingRow label={label}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </SettingRow>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    borderColor: "#8F8787",
    borderWidth: 0.7,
    borderRadius: 12,
    minWidth: 140,
    backgroundColor: "#FFFFFF",
  },
  picker: {
    borderWidth: 0,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "Inter-VariableFont",
    fontWeight: "400",
    textAlign: "left",
    color: "#8F8787",
    width: "100%",
  },
});
