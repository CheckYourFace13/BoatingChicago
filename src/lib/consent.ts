/**
 * First-party cookie preference store.
 * No choice (or a deny) means analytics and advertising stay off.
 * This is not a Google-certified IAB CMP and does not detect visitor region.
 */

export const CONSENT_STORAGE_KEY = "bc-consent-v1";
export const CONSENT_VERSION = 1;

export type ConsentState = {
  version: number;
  decided: boolean;
  analytics: boolean;
  advertising: boolean;
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
