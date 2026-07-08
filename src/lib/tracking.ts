declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export type TrackEventName =
  | "affiliate_click"
  | "find_boat_submit"
  | "newsletter_signup"
  | "list_business_click";

export function trackEvent(
  name: TrackEventName,
  params?: Record<string, string>
): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });

  if (window.gtag) {
    window.gtag("event", name, params);
  }
}

export const trackingAttrs = {
  affiliateClick: (partner: string) => ({
    "data-track": "affiliate_click" as const,
    "data-partner": partner,
  }),
  findBoatSubmit: { "data-track": "find_boat_submit" as const },
  newsletterSignup: { "data-track": "newsletter_signup" as const },
  listBusinessClick: { "data-track": "list_business_click" as const },
};
