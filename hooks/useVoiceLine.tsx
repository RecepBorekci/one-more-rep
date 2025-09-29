import React, { createContext, ReactNode, useContext, useState } from "react";

// Types
export type VoiceMode = "Coach" | "Supporting" | "Wholesome" | "Funny";

interface VoiceLineState {
  mode: VoiceMode;
  interval: number;
}

interface VoiceLineContextType {
  mode: VoiceMode;
  interval: number;
  setMode: (mode: VoiceMode) => void;
  setInterval: (interval: number) => void;
  updateSettings: (settings: Partial<VoiceLineState>) => void;
}

// Create the context
const VoiceLineContext = createContext<VoiceLineContextType | undefined>(
  undefined
);

// Provider component
interface VoiceLineProviderProps {
  children: ReactNode;
}

export function VoiceLineProvider({ children }: VoiceLineProviderProps) {
  const [mode, setMode] = useState<VoiceMode>("Coach");
  const [interval, setInterval] = useState<number>(20);

  // Helper function to update multiple settings at once
  const updateSettings = (settings: Partial<VoiceLineState>) => {
    if (settings.mode !== undefined) {
      setMode(settings.mode);
    }
    if (settings.interval !== undefined) {
      setInterval(settings.interval);
    }
  };

  const value: VoiceLineContextType = {
    mode,
    interval,
    setMode,
    setInterval,
    updateSettings,
  };

  return (
    <VoiceLineContext.Provider value={value}>
      {children}
    </VoiceLineContext.Provider>
  );
}

// Custom hook to use the voice line context
export function useVoiceLine(): VoiceLineContextType {
  const context = useContext(VoiceLineContext);

  if (context === undefined) {
    throw new Error("useVoiceLine must be used within a VoiceLineProvider");
  }

  return context;
}

// Read-only state accessor for components that should not perform updates
export function useVoiceLineState() {
  const context = useContext(VoiceLineContext);

  if (context === undefined) {
    throw new Error(
      "useVoiceLineState must be used within a VoiceLineProvider"
    );
  }

  const { mode, interval } = context;
  return { mode, interval };
}

// Updater accessor for components that need to modify voice line settings
export function useVoiceLineUpdater() {
  const context = useContext(VoiceLineContext);

  if (context === undefined) {
    throw new Error(
      "useVoiceLineUpdater must be used within a VoiceLineProvider"
    );
  }

  const { setMode, setInterval, updateSettings } = context;
  return { setMode, setInterval, updateSettings };
}
