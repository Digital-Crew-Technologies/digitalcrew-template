"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface SplashCursorContextType {
  splashCursorEnabled: boolean;
  setSplashCursorEnabled: (enabled: boolean) => void;
}

const SplashCursorContext =
  createContext<SplashCursorContextType | null>(null);

interface SplashCursorProviderProps {
  children: ReactNode;
}

export function SplashCursorProvider({ children }: SplashCursorProviderProps) {
  const [splashCursorEnabled, setSplashCursorEnabled] =
    useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem("splashCursorEnabled");
    if (stored !== null) {
      setSplashCursorEnabled(stored === "true");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(
        "splashCursorEnabled",
        splashCursorEnabled.toString(),
      );
    }
  }, [splashCursorEnabled, mounted]);

  return (
    <SplashCursorContext.Provider
      value={{ splashCursorEnabled, setSplashCursorEnabled }}
    >
      {children}
    </SplashCursorContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSplashCursor(): SplashCursorContextType {
  const context = useContext(SplashCursorContext);
  if (!context) {
    throw new Error(
      "useSplashCursor must be used within a SplashCursorProvider",
    );
  }
  return context;
}
