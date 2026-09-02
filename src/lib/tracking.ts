import {
  trackAnalyticsEvent,
  type AnalyticsEventName,
} from "@/lib/analytics";

export type TrackEventName =
  | "affiliate_click"
  | "lead_form_submit"
  | "newsletter_signup"
  | "list_business_click"
  | "find_boat_submit" // legacy — maps to lead_form_submit
  | "weather_page_view"
  | "weather_alert_click"
  | "news_story_click"
  | "news_source_click"
  | "boating_brief_view"
  | "weather_ticker_click"
  | "homepage_weather_click"
  | "homepage_news_click"
  | "homepage_destination_click"
  | "homepage_resource_click";

/**
 * Site-wide event helper. Prefer this for all conversion events.
 * Routes through the analytics layer (GA4 when configured).
 */
export function trackEvent(
  name: TrackEventName,
  params?: Record<string, string | number | boolean | undefined>
): void {
  const eventName: AnalyticsEventName =
    name === "find_boat_submit" ? "lead_form_submit" : name;

  trackAnalyticsEvent(eventName, params);

  // Keep legacy find_boat_submit in dataLayer when callers still use it
  if (name === "find_boat_submit" && typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "find_boat_submit", ...params });
  }
}

export const trackingAttrs = {
  affiliateClick: (partner: string) => ({
    "data-track": "affiliate_click" as const,
    "data-partner": partner,
  }),
  leadFormSubmit: { "data-track": "lead_form_submit" as const },
  /** @deprecated Use leadFormSubmit */
  findBoatSubmit: { "data-track": "lead_form_submit" as const },
  newsletterSignup: { "data-track": "newsletter_signup" as const },
  listBusinessClick: { "data-track": "list_business_click" as const },
};
