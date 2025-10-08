// Centralized color system: palette (raw colors) + semantic tokens (usage-based)

export const PALETTE = {
  white: "#FFFFFF",
  orangePrimary: "#FF6B35",
  yellowLight: "#FEF9E1",
  gray400: "#988C8C",
  gray600: "#929292",
  // Add more as needed: black, success, warning, etc.
} as const;

export type Palette = typeof PALETTE;
