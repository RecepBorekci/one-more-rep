import Slider from "@react-native-community/slider";
import React from "react";
import { Platform, StyleSheet, View, ViewStyle } from "react-native";

interface CustomSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  // Styling props
  trackHeight?: number;
  thumbSize?: number;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  // Layout props
  containerStyle?: ViewStyle;
}

export default function CustomSlider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 1,
  step = 0.01,
  trackHeight = 4,
  thumbSize = 20,
  minimumTrackTintColor = "#FF6B35",
  maximumTrackTintColor = "#E0E0E0",
  thumbTintColor = "#FFFFFF",
  containerStyle,
}: CustomSliderProps) {
  // Calculate scale based on desired thumb size (default slider thumb is ~15px)
  const scale = thumbSize / 15;
  const sliderHeight = Math.max(thumbSize + 10, trackHeight + 10);
  const widthIOS = 110 * (1 / scale);
  const widthAndroid = 110 * (1 / scale);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ width: "100%", height: sliderHeight }}>
        <View
          style={{
            height: sliderHeight,
            transform: [
              { scaleX: Platform.OS === "ios" ? scale : scale },
              { scaleY: Platform.OS === "ios" ? scale : scale },
            ],
          }}
        >
          <Slider
            style={{
              flex: 1,
              height: sliderHeight,
              width:
                Platform.OS === "ios" ? `${widthIOS}%` : `${widthAndroid}%`,
              alignSelf: "center",
            }}
            value={value}
            onValueChange={onValueChange}
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            step={step}
            minimumTrackTintColor={minimumTrackTintColor}
            maximumTrackTintColor={maximumTrackTintColor}
            thumbTintColor={thumbTintColor}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
