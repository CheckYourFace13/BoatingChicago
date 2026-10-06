"use client";

import Link from "next/link";
import { buildBoatsGroupAwinUrl } from "@/config/partner-programs";
import { trackBoatTraderAffiliateClick } from "@/lib/affiliate-attribution";

export interface BoatTraderShopCtaProps {
  /** Awin clickref (placement id) — no PII */
  clickref: string;
  /** GA4 placement label */
  placement: string;
  section?: string;
  position?: number;
  /** Optional page path hint for analytics */
  pageSlug?: string;
  heading?: string;
  body?: string;
  ctaLabel?: string;
}

/**
 * Contextual Boat Trader (Awin / Boats Group) editorial CTA.
 * Text-only — no banner creatives.
 */
export function BoatTraderShopCta({
  clickref,
  placement,
  section = "boat_trader_shop",
  position = 1,
  pageSlug,
  heading = "Shopping for a boat?",
  body = "Compare new and used boats from dealers and private sellers on Boat Trader.",
  ctaLabel = "Browse Boats on Boat Trader",
}: BoatTraderShopCtaProps) {
  const href = buildBoatsGroupAwinUrl(clickref);

  return (
    <aside
      className="rounded-2xl border border-sky-blue/25 bg-white p-5 sm:p-6"
      aria-labelledby={`boat-trader-heading-${clickref}`}
    >
      <h2
        id={`boat-trader-heading-${clickref}`}
        className="text-xl sm:text-2xl font-extrabold text-lake-blue mb-2"
      >
        {heading}
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed mb-4 max-w-3xl">
        {body}{" "}
        <span className="text-gray-600">
          Boat Trader links are affiliate links{" "}
          <span className="whitespace-nowrap">(paid link)</span>.
        </span>
      </p>
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full bg-lake-blue text-white text-sm font-bold hover:bg-lake-blue/90 transition-colors"
        onClick={() =>
          trackBoatTraderAffiliateClick({
            clickref,
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
      <p className="mt-4 text-xs text-gray-600 leading-relaxed">
        BoatingChicago may earn a commission if you click through and make a
        purchase on Boat Trader. We do not sell, broker, or list boats, and we
        do not guarantee pricing or inventory. See our{" "}
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
