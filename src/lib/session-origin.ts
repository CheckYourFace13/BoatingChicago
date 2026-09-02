/**
 * First-touch session origin for affiliate attribution (client-only).
 * Privacy-safe: no PII — path, referrer host, and UTM params only.
 */

const STORAGE_KEY = "bc_session_origin_v1";

export interface SessionOrigin {
  landing_page: string;
  initial_referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

function safeReferrerHost(referrer: string): string {
  if (!referrer) return "(direct)";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    return host || "(direct)";
  } catch {
    return "(direct)";
  }
}

function readUtms(search: string): Pick<
  SessionOrigin,
  "utm_source" | "utm_medium" | "utm_campaign"
> {
  const params = new URLSearchParams(search);
  return {
    utm_source: params.get("utm_source")?.slice(0, 100) || "",
    utm_medium: params.get("utm_medium")?.slice(0, 100) || "",
    utm_campaign: params.get("utm_campaign")?.slice(0, 100) || "",
  };
}

/** Capture once per browser tab/session. Safe to call on every page load. */
export function captureSessionOrigin(): SessionOrigin | null {
  if (typeof window === "undefined") return null;

  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) {
      return JSON.parse(existing) as SessionOrigin;
    }

    const origin: SessionOrigin = {
      landing_page: window.location.pathname || "/",
      initial_referrer: safeReferrerHost(document.referrer || ""),
      ...readUtms(window.location.search || ""),
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(origin));
    return origin;
  } catch {
    // Private mode / blocked storage — still return ephemeral first-touch
    return {
      landing_page: window.location.pathname || "/",
      initial_referrer: safeReferrerHost(document.referrer || ""),
      ...readUtms(window.location.search || ""),
    };
  }
}

export function getSessionOrigin(): SessionOrigin | null {
  if (typeof window === "undefined") return null;
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) return JSON.parse(existing) as SessionOrigin;
  } catch {
    /* ignore */
  }
  return captureSessionOrigin();
}
