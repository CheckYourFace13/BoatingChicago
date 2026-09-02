"use client";

import type { AffiliatePartner } from "@/config/affiliates";
import { getAffiliateLinksForCategory } from "@/config/affiliates";
import {
  sanitizeCampaignCode,
  withPartnerCampaign,
} from "@/lib/affiliate-attribution";
import { getSessionOrigin } from "@/lib/session-origin";
import { trackEvent } from "@/lib/tracking";
import type { AffiliateProvider } from "@/data/affiliate-offers";

interface AffiliateCTAProps {
  partners: AffiliatePartner[];
  title?: string;
  subtitle?: string;
  variant?: "default" | "compact";
  placement?: string;
  section?: string;
}

function handlePartnerClick(
  partner: AffiliatePartner,
  label: string,
  url: string,
  placement: string,
  section: string,
  position: number
) {
  const origin = getSessionOrigin();
  const pagePath =
    typeof window !== "undefined" ? window.location.pathname || "/" : "/";
  const pageTitle = typeof document !== "undefined" ? document.title : "";

  trackEvent("affiliate_click", {
    provider: partner,
    product_id: partner,
    product_name: label,
    page_path: pagePath,
    page_title: pageTitle.slice(0, 150),
    placement,
    section,
    position,
    cta_text: `Book on ${label}`,
    destination: "",
    category: "partner_cta",
    landing_page: origin?.landing_page || "",
    initial_referrer: origin?.initial_referrer || "",
    utm_source: origin?.utm_source || "",
    utm_medium: origin?.utm_medium || "",
    utm_campaign: origin?.utm_campaign || "",
    partner,
    destination_url: url,
    page: pagePath,
    cta_label: `Book on ${label}`,
  });
}

/**
 * Legacy partner-button CTA. Only renders enabled partners.
 * Prefer AffiliateOfferGrid / PopularOnTheWater for product links.
 */
export function AffiliateCTA({
  partners,
  title = "Book Through Trusted Partners",
  subtitle = "Compare options and book directly through our affiliate partners",
  variant = "default",
  placement = "partner_cta",
  section = "things_to_do",
}: AffiliateCTAProps) {
  const links = getAffiliateLinksForCategory(partners);

  if (links.length === 0) return null;

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-3">
        {links.map((link, index) => {
          const provider = link.partner as AffiliateProvider;
          const href =
            provider === "getyourguide" || provider === "viator"
              ? withPartnerCampaign(
                  link.url,
                  provider,
                  sanitizeCampaignCode(`${placement}-${index + 1}`)
                )
              : link.url;
          return (
            <a
              key={link.partner}
              href={href}
              target="_blank"
              rel="sponsored nofollow noopener"
              onClick={() =>
                handlePartnerClick(
                  link.partner,
                  link.label,
                  href,
                  placement,
                  section,
                  index + 1
                )
              }
              className="inline-flex items-center px-5 py-2.5 bg-lake-blue text-white font-bold text-sm rounded-full hover:bg-lake-blue/90 transition-colors"
            >
              Book on {link.label} →
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-lake-blue to-sky-blue rounded-3xl p-8 md:p-10 text-white">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-2">{title}</h2>
      <p className="text-white/85 mb-8 max-w-2xl">{subtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link, index) => {
          const provider = link.partner as AffiliateProvider;
          const href =
            provider === "getyourguide" || provider === "viator"
              ? withPartnerCampaign(
                  link.url,
                  provider,
                  sanitizeCampaignCode(`${placement}-${index + 1}`)
                )
              : link.url;
          return (
            <a
              key={link.partner}
              href={href}
              target="_blank"
              rel="sponsored nofollow noopener"
              onClick={() =>
                handlePartnerClick(
                  link.partner,
                  link.label,
                  href,
                  placement,
                  section,
                  index + 1
                )
              }
              className="group flex flex-col p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5"
            >
              <span className="font-bold text-lg mb-1 group-hover:text-sun-yellow transition-colors">
                {link.label} →
              </span>
              <span className="text-sm text-white/80">{link.description}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
