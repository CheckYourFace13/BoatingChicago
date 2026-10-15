"use client";

import Link from "next/link";
import {
  ADRENALINE_CJ,
  buildAdrenalineCjUrl,
  type AdrenalineProduct,
} from "@/config/partner-programs";
import { trackAdrenalineAffiliateClick } from "@/lib/affiliate-attribution";

export interface AdrenalineItem {
  product: AdrenalineProduct;
  ctaLabel?: string;
  blurb: string;
}

export interface AdrenalineExperienceCtaProps {
  items: AdrenalineItem[];
  placement: string;
  section?: string;
  pageSlug?: string;
  heading?: string;
  intro?: string;
}

/**
 * Compact Adrenaline (CJ) experience placements for verified Chicago water products.
 * No invented prices, discounts, ratings, or marine claims beyond merchant-page facts.
 */
export function AdrenalineExperienceCta({
  items,
  placement,
  section = "adrenaline_chicago_experiences",
  pageSlug,
  heading = "Also bookable on Adrenaline",
  intro = "Adrenaline is another booking marketplace for selected Chicago water experiences. Details, times, and cancellation rules are set by Adrenaline and the operator — confirm them on the product page before you pay.",
}: AdrenalineExperienceCtaProps) {
  if (items.length === 0) return null;

  return (
    <aside
      className="rounded-2xl border border-sky-blue/25 bg-white p-5 sm:p-6"
      aria-labelledby="adrenaline-experiences-heading"
    >
      <h2
        id="adrenaline-experiences-heading"
        className="text-xl sm:text-2xl font-extrabold text-lake-blue mb-2"
      >
        {heading}
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed mb-4 max-w-3xl">
        {intro}{" "}
        <span className="text-gray-600">
          Adrenaline links are affiliate links{" "}
          <span className="whitespace-nowrap">(paid link)</span>.
        </span>
      </p>
      <ul className="space-y-4">
        {items.map((item, index) => {
          const creative = ADRENALINE_CJ.products[item.product];
          const href = buildAdrenalineCjUrl(item.product);
          const ctaLabel = item.ctaLabel || creative.label;
          return (
            <li key={`${item.product}-${index}`}>
              <p className="text-sm font-semibold text-lake-blue mb-1">
                {creative.shortName}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                {item.blurb}
              </p>
              <a
                href={href}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full bg-lake-blue text-white text-sm font-bold hover:bg-lake-blue/90 transition-colors"
                onClick={() =>
                  trackAdrenalineAffiliateClick({
                    product: item.product,
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
        BoatingChicago may earn a commission if you click through and book via
        Adrenaline / Commission Junction. GetYourGuide and Viator remain
        available where listed on this page — compare operators and policies.
        See our{" "}
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
