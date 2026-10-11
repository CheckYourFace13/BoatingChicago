"use client";

import Link from "next/link";
import {
  buildPiscifunAwinUrl,
  PISCIFUN_AWIN,
  type PiscifunProduct,
} from "@/config/partner-programs";
import { trackPiscifunAffiliateClick } from "@/lib/affiliate-attribution";

export interface PiscifunItem {
  product: PiscifunProduct;
  clickref: string;
  ctaLabel?: string;
  blurb: string;
}

export interface PiscifunFishingGearCtaProps {
  items: PiscifunItem[];
  placement: string;
  section?: string;
  pageSlug?: string;
  heading?: string;
  intro?: string;
}

/**
 * Compact text-only Piscifun Awin placements for fishing gear / clothing.
 * No banner creatives. Neutral CTAs only — no prices, discounts, or endorsements.
 */
export function PiscifunFishingGearCta({
  items,
  placement,
  section = "piscifun_fishing_gear",
  pageSlug,
  heading = "Fishing gear & clothing options",
  intro = "If you are shopping for pier or kayak tackle, or a shell for cool Lake Michigan mornings, these merchant product pages are optional starting points.",
}: PiscifunFishingGearCtaProps) {
  if (items.length === 0) return null;

  return (
    <aside
      className="rounded-2xl border border-sky-blue/25 bg-white p-5 sm:p-6"
      aria-labelledby="piscifun-gear-heading"
    >
      <h2
        id="piscifun-gear-heading"
        className="text-xl sm:text-2xl font-extrabold text-lake-blue mb-2"
      >
        {heading}
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed mb-4 max-w-3xl">
        {intro}{" "}
        <span className="text-gray-600">
          Piscifun links are affiliate links{" "}
          <span className="whitespace-nowrap">(paid link)</span>.
        </span>
      </p>

      <ul className="space-y-5">
        {items.map((item, index) => {
          const creative = PISCIFUN_AWIN.products[item.product];
          const href = buildPiscifunAwinUrl(item.product, item.clickref);
          const ctaLabel = item.ctaLabel || creative.label;
          const position = index + 1;
          return (
            <li
              key={item.product}
              className="border-t border-sky-blue/20 pt-4 first:border-t-0 first:pt-0"
            >
              <p className="font-bold text-lake-blue mb-1">{creative.shortName}</p>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                {item.blurb}
              </p>
              <a
                href={href}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full bg-lake-blue text-white text-sm font-bold hover:bg-lake-blue/90 transition-colors"
                onClick={() =>
                  trackPiscifunAffiliateClick({
                    product: item.product,
                    clickref: item.clickref,
                    href,
                    placement,
                    section,
                    position,
                    ctaText: ctaLabel,
                    pageSlug,
                  })
                }
              >
                {ctaLabel} →
              </a>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-xs text-gray-600 leading-relaxed">
        BoatingChicago may earn a commission if you click through and purchase
        from Piscifun via Awin. Availability, sizes, and product specifications
        are set by the seller and can change — we do not invent prices,
        discounts, or manufacturer performance claims. See our{" "}
        <Link
          href="/affiliate-disclosure"
          className="font-semibold text-sky-blue hover:underline"
        >
          affiliate disclosure
        </Link>
        .
      </p>
    </aside>
  );
}
