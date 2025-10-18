import React, { createContext, ReactNode, useContext, useState } from "react";

// Types
export type VoiceMode = "Coach" | "Supportive" | "Wholesome" | "Funny";

export type VoiceLanguage = "English" | "Turkish" | "Japanese";

interface VoiceLineState {
  mode: VoiceMode;
  interval: number;
  language: VoiceLanguage;
}

interface VoiceLineContextType {
  mode: VoiceMode;
  interval: number;
  setMode: (mode: VoiceMode) => void;
  setInterval: (interval: number) => void;
  updateSettings: (settings: Partial<VoiceLineState>) => void;
  language: VoiceLanguage;
  setLanguage: (language: VoiceLanguage) => void;
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
  const [language, setLanguage] = useState<VoiceLanguage>("English");

  // Helper function to update multiple settings at once
  const updateSettings = (settings: Partial<VoiceLineState>) => {
    if (settings.mode !== undefined) {
      setMode(settings.mode);
    }
    if (settings.interval !== undefined) {
      setInterval(settings.interval);
    }
    if (settings.language !== undefined) {
      setLanguage(settings.language);
    }
  };

  const value: VoiceLineContextType = {
    mode,
    interval,
    language,
    setMode,
    setInterval,
    setLanguage,
    updateSettings,
  };

  return (
    <VoiceLineContext.Provider value={value}>
      {children}
    </VoiceLineContext.Provider>
  );
}

// Read-only state accessor for components that should not perform updates
export function useVoiceLineState() {
  const context = useContext(VoiceLineContext);

  if (context === undefined) {
    throw new Error(
      "useVoiceLineState must be used within a VoiceLineProvider"
    );
  }

  const { mode, interval, language } = context;
  return { mode, interval, language };
}

// Updater accessor for components that need to modify voice line settings
export function useVoiceLineUpdater() {
  const context = useContext(VoiceLineContext);

  if (context === undefined) {
    throw new Error(
      "useVoiceLineUpdater must be used within a VoiceLineProvider"
    );
  }

  const { setMode, setInterval, setLanguage, updateSettings } = context;
  return { setMode, setInterval, setLanguage, updateSettings };
}
