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
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    lintrk?: (...args: unknown[]) => void;
  }
}

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return id || undefined;
}

export function isGaEnabled(): boolean {
  return Boolean(getGaMeasurementId());
}

/** Future: Facebook Pixel */
export function getFacebookPixelId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID?.trim();
  return id || undefined;
}

/** Future: Microsoft Clarity */
export function getClarityProjectId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();
  return id || undefined;
}

/** Future: LinkedIn Insight */
export function getLinkedInPartnerId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID?.trim();
  return id || undefined;
}

export function getActiveAnalyticsProviders(): AnalyticsProvider[] {
  const providers: AnalyticsProvider[] = [];
  if (isGaEnabled()) providers.push("google_analytics");
  // Facebook, Clarity, LinkedIn intentionally inactive until configured
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

  pushDataLayer({
    event: "page_view",
    page_path: path,
    page_title: title || document.title,
  });

  if (window.gtag && isGaEnabled()) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title || document.title,
    });
  }

  // Future: Facebook Pixel pageView
  // Future: Clarity is automatic once loaded
  // Future: LinkedIn page view
}

/**
 * Send a custom event to active analytics providers.
 * Safe no-op when providers are not loaded.
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

  if (window.gtag && isGaEnabled()) {
    window.gtag("event", name, cleaned);
  }

  // Future Facebook Pixel:
  // if (window.fbq && getFacebookPixelId()) window.fbq("trackCustom", name, cleaned);

  // Future LinkedIn:
  // if (window.lintrk && getLinkedInPartnerId()) window.lintrk("track", { conversion_id: ... });
}
