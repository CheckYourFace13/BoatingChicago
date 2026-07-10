"use client";

import type { AffiliatePartner } from "@/config/affiliates";
import { getAffiliateLinksForCategory } from "@/config/affiliates";
import { trackEvent, trackingAttrs } from "@/lib/tracking";

interface AffiliateCTAProps {
  partners: AffiliatePartner[];
  title?: string;
  subtitle?: string;
  variant?: "default" | "compact";
}

function handleAffiliateClick(partner: string) {
  trackEvent("affiliate_click", { partner });
}

/**
 * Legacy partner-button CTA. Only renders enabled partners.
 * Prefer AffiliateOfferGrid for GetYourGuide product links.
 */
export function AffiliateCTA({
  partners,
  title = "Book Through Trusted Partners",
  subtitle = "Compare options and book directly through our affiliate partners",
  variant = "default",
}: AffiliateCTAProps) {
  const links = getAffiliateLinksForCategory(partners);

  if (links.length === 0) return null;

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.partner}
            href={link.url}
            target="_blank"
            rel="sponsored nofollow noopener"
            {...trackingAttrs.affiliateClick(link.partner)}
            onClick={() => handleAffiliateClick(link.partner)}
            className="inline-flex items-center px-5 py-2.5 bg-lake-blue text-white font-bold text-sm rounded-full hover:bg-lake-blue/90 transition-colors"
          >
            Book on {link.label} →
          </a>
        ))}
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-lake-blue to-sky-blue rounded-3xl p-8 md:p-10 text-white">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-2">{title}</h2>
      <p className="text-white/85 mb-8 max-w-2xl">{subtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link) => (
          <a
            key={link.partner}
            href={link.url}
            target="_blank"
            rel="sponsored nofollow noopener"
            {...trackingAttrs.affiliateClick(link.partner)}
            onClick={() => handleAffiliateClick(link.partner)}
            className="group flex flex-col p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5"
          >
            <span className="font-bold text-lg mb-1 group-hover:text-sun-yellow transition-colors">
              {link.label} →
            </span>
            <span className="text-sm text-white/80">{link.description}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
