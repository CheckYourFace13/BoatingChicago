"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyGtagConsent,
  readStoredConsent,
  UNDECIDED_CONSENT,
  writeStoredConsent,
  type ConsentState,
} from "@/lib/consent";

type ConsentContextValue = {
  state: ConsentState;
  settingsOpen: boolean;
  setConsent: (next: Pick<ConsentState, "analytics" | "advertising">) => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConsentState>(UNDECIDED_CONSENT);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setState(stored);
    applyGtagConsent(stored);
    setHydrated(true);
    const onChange = () => {
      const next = readStoredConsent();
      setState(next);
      applyGtagConsent(next);
    };
    window.addEventListener("bc-consent-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("bc-consent-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const setConsent = useCallback(
    (next: Pick<ConsentState, "analytics" | "advertising">) => {
      const stored: ConsentState = {
        version: UNDECIDED_CONSENT.version,
        decided: true,
        analytics: next.analytics,
        advertising: next.advertising,
      };
      writeStoredConsent(stored);
      setState(stored);
      applyGtagConsent(stored);
      setSettingsOpen(false);
    },
    [],
  );

  const value = useMemo(
    () => ({
      state: hydrated ? state : UNDECIDED_CONSENT,
      settingsOpen,
      setConsent,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [hydrated, setConsent, settingsOpen, state],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}
