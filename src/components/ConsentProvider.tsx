"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { areAdSenseDisplayUnitsEnabled } from "@/config/ads";
import {
  applyGtagConsent,
  consentFromGoogleCmp,
  hasGlobalPrivacyControl,
  readStoredConsent,
  UNDECIDED_CONSENT,
  writeStoredConsent,
  type ConsentState,
} from "@/lib/consent";

type ConsentContextValue = {
  state: ConsentState;
  settingsOpen: boolean;
  /** True when Google Privacy & messaging is handling this visitor (hide duplicate banner). */
  googleCmpHandlesUi: boolean;
  setConsent: (
    next: Pick<ConsentState, "analytics" | "advertising"> & {
      source?: ConsentState["source"];
    },
  ) => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

declare global {
  interface Window {
    googlefc?: {
      callbackQueue?: Array<Record<string, () => void> | (() => void)>;
      getGoogleConsentModeValues?: () => {
        analytics_storage?: "granted" | "denied";
        ad_storage?: "granted" | "denied";
        ad_user_data?: "granted" | "denied";
        ad_personalization?: "granted" | "denied";
      };
      showRevocationMessage?: () => void;
    };
    __tcfapi?: (
      command: string,
      version: number,
      callback: (data: { gdprApplies?: boolean } | null, success: boolean) => void,
    ) => void;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConsentState>(UNDECIDED_CONSENT);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [googleCmpHandlesUi, setGoogleCmpHandlesUi] = useState(false);

  useEffect(() => {
    let stored = readStoredConsent();

    // Global Privacy Control: advertising opt-out without forcing analytics grant.
    if (hasGlobalPrivacyControl()) {
      if (!stored.decided || stored.advertising) {
        stored = {
          version: UNDECIDED_CONSENT.version,
          decided: true,
          analytics: stored.decided ? stored.analytics : false,
          advertising: false,
          source: "gpc",
        };
        writeStoredConsent(stored);
      }
    }

    startTransition(() => {
      setState(stored);
      setHydrated(true);
    });
    applyGtagConsent(stored);

    const onChange = () => {
      const next = readStoredConsent();
      startTransition(() => setState(next));
      applyGtagConsent(next);
    };
    window.addEventListener("bc-consent-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("bc-consent-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  // Bridge Google Privacy & messaging CMP → local state; suppress duplicate banner.
  useEffect(() => {
    if (!areAdSenseDisplayUnitsEnabled()) return;

    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];

    const onConsentApiReady = () => {
      if (typeof window.__tcfapi === "function") {
        window.__tcfapi("getTCData", 2, (tcData, success) => {
          if (success && tcData?.gdprApplies) {
            startTransition(() => setGoogleCmpHandlesUi(true));
          }
        });
      }
    };

    const onConsentModeReady = () => {
      const values = window.googlefc?.getGoogleConsentModeValues?.();
      const fromCmp = consentFromGoogleCmp(values);
      if (!fromCmp) return;
      startTransition(() => setGoogleCmpHandlesUi(true));
      writeStoredConsent(fromCmp);
      startTransition(() => setState(fromCmp));
      // Google CMP already updates gtag; keep local mirror for affiliate/GA gates.
      applyGtagConsent(fromCmp);
    };

    window.googlefc.callbackQueue.push({ CONSENT_API_READY: onConsentApiReady });
    window.googlefc.callbackQueue.push({
      CONSENT_MODE_DATA_READY: onConsentModeReady,
    });
  }, []);

  const setConsent = useCallback(
    (
      next: Pick<ConsentState, "analytics" | "advertising"> & {
        source?: ConsentState["source"];
      },
    ) => {
      const stored: ConsentState = {
        version: UNDECIDED_CONSENT.version,
        decided: true,
        analytics: next.analytics,
        advertising: hasGlobalPrivacyControl() ? false : next.advertising,
        source: next.source ?? "first-party",
      };
      writeStoredConsent(stored);
      setState(stored);
      applyGtagConsent(stored);
      setSettingsOpen(false);
    },
    [],
  );

  const openSettings = useCallback(() => {
    // Prefer Google's revocation UI when CMP owns the regulated visitor.
    if (googleCmpHandlesUi && typeof window.googlefc?.showRevocationMessage === "function") {
      try {
        window.googlefc.showRevocationMessage();
        return;
      } catch {
        // Fall through to first-party settings
      }
    }
    setSettingsOpen(true);
  }, [googleCmpHandlesUi]);

  const value = useMemo(
    () => ({
      state: hydrated ? state : UNDECIDED_CONSENT,
      settingsOpen,
      googleCmpHandlesUi,
      setConsent,
      openSettings,
      closeSettings: () => setSettingsOpen(false),
    }),
    [googleCmpHandlesUi, hydrated, openSettings, setConsent, settingsOpen, state],
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
