/**
 * Multi-provider analytics helpers.
 * Only Google Analytics is active today; other providers are stubs for future use.
 */

export type AnalyticsProvider =
  | "google_analytics"
  | "facebook_pixel"
  | "microsoft_clarity"
  | "linkedin_insight";

export type AnalyticsEventName =
  | "affiliate_click"
  | "lead_form_submit"
  | "newsletter_signup"
  | "list_business_click"
  | "page_view"
  | "find_boat_submit"; // legacy alias — prefer lead_form_submit

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    lintrk?: (...args: unknown[]) => void;
  }
}

/**
 * Read GA measurement ID.
 * Prefer direct NEXT_PUBLIC_ access (build-time inline) with a runtime fallback
 * for Hostinger when the var is injected at process start.
 */
export function getGaMeasurementId(): string | undefined {
  const fromPublic = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (fromPublic) return fromPublic;

  // Runtime fallback (server / Node). Avoids empty build-time inlining issues.
  if (typeof process !== "undefined" && process.env) {
    const runtime = process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"]?.trim();
    if (runtime) return runtime;
  }

  return undefined;
}

export function isGaEnabled(): boolean {
  return Boolean(getGaMeasurementId());
}

/** Future: Facebook Pixel */
export function getFacebookPixelId(): string | undefined {
  return process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID?.trim() || undefined;
}

/** Future: Microsoft Clarity */
export function getClarityProjectId(): string | undefined {
  return process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim() || undefined;
}

/** Future: LinkedIn Insight */
export function getLinkedInPartnerId(): string | undefined {
  return process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID?.trim() || undefined;
}

export function getActiveAnalyticsProviders(): AnalyticsProvider[] {
  const providers: AnalyticsProvider[] = [];
  if (isGaEnabled()) providers.push("google_analytics");
  return providers;
}

function pushDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** Send a page view to active providers (GA4 today). */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === "undefined") return;

  const pageTitle = title || document.title;

  pushDataLayer({
    event: "page_view",
    page_path: path,
    page_title: pageTitle,
  });

  // Prefer window.gtag availability over env checks (env may be build-inlined empty)
  if (typeof window.gtag === "function") {
    const measurementId = getGaMeasurementId();
    if (measurementId) {
      window.gtag("config", measurementId, { page_path: path });
    }
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: pageTitle,
    });
  }
}

/**
 * Send a custom event to active analytics providers.
 * Safe no-op when gtag is not loaded.
 */
export function trackAnalyticsEvent(
  name: AnalyticsEventName,
  params?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined") return;

  const cleaned: Record<string, string | number | boolean> = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) cleaned[key] = value;
    }
  }

  pushDataLayer({ event: name, ...cleaned });

  // Fire into GA4 whenever gtag is present (do not block on env inline checks)
  if (typeof window.gtag === "function") {
    window.gtag("event", name, cleaned);
  }
}
