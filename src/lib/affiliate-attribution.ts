import type { AffiliateOffer, AffiliateProvider } from "@/data/affiliate-offers";
import { trackEvent } from "@/lib/tracking";
import { getSessionOrigin } from "@/lib/session-origin";

/**
 * Official partner campaign labels (safe characters only).
 * GYG: `cmp` — Partner Portal Analytics → Campaigns
 * Viator: `campaign` — alphanumeric + dashes only (official docs)
 */
export function sanitizeCampaignCode(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function buildCampaignCode(placement: string, position: number): string {
  return sanitizeCampaignCode(`${placement}-${position}`);
}

/**
 * Append official placement campaign params without altering partner IDs.
 * - GetYourGuide: set/replace `cmp` (keeps partner_id + utm_medium)
 * - Viator: set/replace `campaign` (keeps pid, mcid, medium)
 */
export function withPartnerCampaign(
  url: string,
  provider: AffiliateProvider,
  campaignCode: string
): string {
  const code = sanitizeCampaignCode(campaignCode);
  if (!code) return url;

  try {
    const u = new URL(url);
    if (provider === "getyourguide") {
      u.searchParams.set("cmp", code);
      if (!u.searchParams.get("partner_id")) {
        // Should never happen for catalog URLs — leave unchanged if missing
        return url;
      }
    } else if (provider === "viator") {
      u.searchParams.set("campaign", code);
      if (!u.searchParams.get("pid")) {
        return url;
      }
    }
    return u.toString();
  } catch {
    return url;
  }
}

export interface AffiliateClickContext {
  placement: string;
  section: string;
  position: number;
  ctaText: string;
  /** Optional page slug hint; page_path always prefers location.pathname */
  pageSlug?: string;
}

/**
 * Single affiliate_click emitter for all GYG/Viator outbound links.
 * Call once per click (onClick only — do not also bind auto data-track listeners).
 */
export function trackAffiliateClick(
  offer: AffiliateOffer,
  ctx: AffiliateClickContext
): void {
  const origin = getSessionOrigin();
  const pagePath =
    typeof window !== "undefined"
      ? window.location.pathname || ctx.pageSlug || "/"
      : ctx.pageSlug || "/";
  const pageTitle =
    typeof document !== "undefined" ? document.title || "" : "";

  const campaignCode = buildCampaignCode(ctx.placement, ctx.position);
  const destinationUrl = withPartnerCampaign(
    offer.url,
    offer.provider,
    campaignCode
  );

  trackEvent("affiliate_click", {
    provider: offer.provider,
    product_id: offer.providerProductId || offer.id,
    product_name: offer.shortTitle || offer.title,
    page_path: pagePath,
    page_title: pageTitle.slice(0, 150),
    placement: ctx.placement,
    section: ctx.section,
    position: ctx.position,
    cta_text: ctx.ctaText,
    destination: offer.location || "",
    category: offer.category,
    landing_page: origin?.landing_page || "",
    initial_referrer: origin?.initial_referrer || "",
    utm_source: origin?.utm_source || "",
    utm_medium: origin?.utm_medium || "",
    utm_campaign: origin?.utm_campaign || "",
    // legacy aliases (keep dashboards from breaking)
    partner: offer.provider,
    offer_id: offer.id,
    offer_title: offer.title,
    destination_url: destinationUrl,
    page: pagePath,
    cta_label: ctx.ctaText,
    campaign_code: campaignCode,
  });
}

/** Build the attributed href used for navigation (same campaign as GA4). */
export function getAttributedAffiliateUrl(
  offer: AffiliateOffer,
  placement: string,
  position: number
): string {
  return withPartnerCampaign(
    offer.url,
    offer.provider,
    buildCampaignCode(placement, position)
  );
}
