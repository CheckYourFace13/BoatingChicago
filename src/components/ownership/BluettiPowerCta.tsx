"use client";

import Link from "next/link";
import {
  BLUETTI_AWIN,
  buildBluettiAwinUrl,
  type BluettiProduct,
} from "@/config/partner-programs";
import { trackBluettiAffiliateClick } from "@/lib/affiliate-attribution";

export interface BluettiItem {
  product: BluettiProduct;
  clickref: string;
  ctaLabel?: string;
  blurb: string;
}

export interface BluettiPowerCtaProps {
  items: BluettiItem[];
  placement: string;
  section?: string;
  pageSlug?: string;
  heading?: string;
  intro?: string;
}

/**
 * Compact text-only BLUETTI Awin placements for shore/backup power context.
 * No marine-suitability claims, prices, discounts, or urgency.
 */
export function BluettiPowerCta({
  items,
  placement,
  section = "bluetti_portable_power",
  pageSlug,
  heading = "Optional portable backup power",
  intro = "Some owners keep a portable power station for shore-side charging, winter battery maintenance, or outages at a yard or driveway — not as marine propulsion or emergency distress equipment.",
}: BluettiPowerCtaProps) {
  if (items.length === 0) return null;

  return (
    <aside
      className="rounded-2xl border border-sky-blue/25 bg-white p-5 sm:p-6"
      aria-labelledby="bluetti-power-heading"
    >
      <h2
        id="bluetti-power-heading"
        className="text-xl sm:text-2xl font-extrabold text-lake-blue mb-2"
      >
        {heading}
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed mb-4 max-w-3xl">
        {intro}{" "}
        <span className="text-gray-600">
          BLUETTI links are affiliate links{" "}
          <span className="whitespace-nowrap">(paid link)</span>.
        </span>
      </p>
      <ul className="space-y-4">
        {items.map((item, index) => {
          const creative = BLUETTI_AWIN.products[item.product];
          const href = buildBluettiAwinUrl(item.product, item.clickref);
          const ctaLabel = item.ctaLabel || creative.label;
          return (
            <li key={`${item.product}-${item.clickref}`}>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                {item.blurb}
              </p>
              <a
                href={href}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full bg-lake-blue text-white text-sm font-bold hover:bg-lake-blue/90 transition-colors"
                onClick={() =>
                  trackBluettiAffiliateClick({
                    product: item.product,
                    clickref: item.clickref,
                    href,
                    placement,
                    section,
                    position: index + 1,
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
      <p className="mt-4 text-xs text-gray-600 leading-relaxed">
        BoatingChicago may earn a commission if you click through and purchase
        from BLUETTI via Awin. Capacity, output, and safety specs are set by the
        merchant — confirm them on the product page. This is not marine-rated
        gear and is not a substitute for USCG distress communications. See our{" "}
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
