/**
 * First-party cookie preference store + Consent Mode v2 helpers.
 * Defaults stay denied until the visitor chooses or Google's Privacy &
 * messaging CMP updates consent for regulated traffic.
 */

export const CONSENT_STORAGE_KEY = "bc-consent-v1";
export const CONSENT_VERSION = 1;

export type ConsentState = {
  version: number;
  decided: boolean;
  analytics: boolean;
  advertising: boolean;
  /** Set when Google Privacy & messaging handled the choice (EEA/UK/CH/US). */
  source?: "first-party" | "google-cmp" | "gpc";
};

export const UNDECIDED_CONSENT: ConsentState = {
  version: CONSENT_VERSION,
  decided: false,
  analytics: false,
  advertising: false,
};

export function parseConsent(raw: string | null | undefined): ConsentState {
  if (!raw) return { ...UNDECIDED_CONSENT };
  try {
    const value = JSON.parse(raw) as Partial<ConsentState>;
    if (value.version !== CONSENT_VERSION || typeof value.decided !== "boolean") {
      return { ...UNDECIDED_CONSENT };
    }
    return {
      version: CONSENT_VERSION,
      decided: value.decided,
      analytics: value.decided && value.analytics === true,
      advertising: value.decided && value.advertising === true,
      source:
        value.source === "google-cmp" || value.source === "gpc"
          ? value.source
          : value.decided
            ? "first-party"
            : undefined,
    };
  } catch {
    return { ...UNDECIDED_CONSENT };
  }
}

export function allowsAnalytics(state: ConsentState): boolean {
  return state.decided && state.analytics;
}

export function allowsAdvertising(state: ConsentState): boolean {
  return state.decided && state.advertising;
}

export function readStoredConsent(): ConsentState {
  if (typeof window === "undefined") return { ...UNDECIDED_CONSENT };
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return { ...UNDECIDED_CONSENT };
  }
}

export function writeStoredConsent(state: ConsentState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({
      version: CONSENT_VERSION,
      decided: state.decided,
      analytics: state.analytics,
      advertising: state.advertising,
      source: state.source ?? "first-party",
    }),
  );
  window.dispatchEvent(new CustomEvent("bc-consent-change"));
}

export function applyGtagConsent(state: ConsentState): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: allowsAnalytics(state) ? "granted" : "denied",
    ad_storage: allowsAdvertising(state) ? "granted" : "denied",
    ad_user_data: allowsAdvertising(state) ? "granted" : "denied",
    ad_personalization: allowsAdvertising(state) ? "granted" : "denied",
  });
}

/** Global Privacy Control — treat as advertising opt-out when signaled. */
export function hasGlobalPrivacyControl(): boolean {
  if (typeof navigator === "undefined") return false;
  return (navigator as Navigator & { globalPrivacyControl?: boolean })
    .globalPrivacyControl === true;
}

export type GoogleConsentModeValues = {
  analytics_storage?: "granted" | "denied";
  ad_storage?: "granted" | "denied";
  ad_user_data?: "granted" | "denied";
  ad_personalization?: "granted" | "denied";
};

export function consentFromGoogleCmp(
  values: GoogleConsentModeValues | null | undefined,
): ConsentState | null {
  if (!values) return null;
  const analytics = values.analytics_storage === "granted";
  const advertising =
    values.ad_storage === "granted" ||
    values.ad_user_data === "granted" ||
    values.ad_personalization === "granted";
  return {
    version: CONSENT_VERSION,
    decided: true,
    analytics,
    advertising,
    source: "google-cmp",
  };
}
