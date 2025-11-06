import React, { useCallback } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import RangeSlider from "rn-range-slider";

interface CustomRangeSliderProps {
  low: number;
  high: number;
  onValueChanged: (low: number, high: number) => void;
  min?: number;
  max?: number;
  step?: number;
  // Styling
  trackHeight?: number;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  // Layout props
  containerStyle?: ViewStyle;
}

export default function CustomRangeSlider({
  low,
  high,
  onValueChanged,
  min = 20,
  max = 600,
  step = 1,
  trackHeight = 4,
  minimumTrackTintColor = "#FF6B35",
  maximumTrackTintColor = "#E0E0E0",
  thumbTintColor = "#FFFFFF",
  containerStyle,
}: CustomRangeSliderProps) {
  const renderThumb = useCallback(() => {
    return <View style={[styles.thumb, { backgroundColor: thumbTintColor }]} />;
  }, [thumbTintColor]);

  const renderRail = useCallback(() => {
    return (
      <View
        style={[
          styles.rail,
          { backgroundColor: maximumTrackTintColor, height: trackHeight },
        ]}
      />
    );
  }, [maximumTrackTintColor, trackHeight]);

  const renderRailSelected = useCallback(() => {
    return (
      <View
        style={[
          styles.railSelected,
          { backgroundColor: minimumTrackTintColor, height: trackHeight },
        ]}
      />
    );
  }, [minimumTrackTintColor, trackHeight]);

  const renderLabel = useCallback((value: number) => {
    return (
      <View style={styles.labelBubble}>
        <Text style={styles.labelText}>{formatSeconds(value)}</Text>
      </View>
    );
  }, []);

  const renderNotch = useCallback(() => {
    return <View style={styles.notch} />;
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <RangeSlider
        min={min}
        max={max}
        step={step}
        low={low}
        high={high}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={onValueChanged}
      />
    </View>
  );
}

export function formatSeconds(totalSeconds: number) {
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (seconds === 0) return `${minutes}m`;
  return `${minutes}m ${seconds}s`;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  rail: {
    flex: 1,
    borderRadius: 999,
  },
  railSelected: {
    height: 4,
    borderRadius: 999,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  labelBubble: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#333333",
    borderRadius: 6,
  },
  labelText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  notch: {
    width: 8,
    height: 8,
    backgroundColor: "#E0E0E0",
    transform: [{ rotate: "45deg" }],
    marginTop: -4,
  },
});
