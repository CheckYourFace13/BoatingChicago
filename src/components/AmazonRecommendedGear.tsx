"use client";

import Link from "next/link";
import {
  AMAZON_ASSOCIATE_DISCLOSURE,
} from "@/config/amazon";
import {
  getAmazonGearUrl,
  resolveAmazonGearItems,
  type AmazonGearPlacement,
} from "@/data/amazon-gear";
import { trackAmazonAffiliateClick } from "@/lib/affiliate-attribution";

interface AmazonRecommendedGearProps {
  placement: AmazonGearPlacement;
  /** Analytics placement label */
  analyticsPlacement?: string;
}

/**
 * Restrained Amazon category recommendations.
 * No prices, ratings, logos, or urgency — clear Amazon destination + disclosures.
 */
export function AmazonRecommendedGear({
  placement,
  analyticsPlacement = "amazon_recommended_gear",
}: AmazonRecommendedGearProps) {
  const items = resolveAmazonGearItems(placement);
  if (items.length === 0) return null;

  const heading = placement.heading || "Recommended gear";
  const intro =
    placement.intro ||
    "Category links open Amazon search results. BoatingChicago does not sell or fulfill these products.";

  return (
    <section
      className="rounded-2xl border border-sky-blue/25 bg-light-blue/30 p-5 sm:p-6"
      aria-labelledby="amazon-gear-heading"
    >
      <h2
        id="amazon-gear-heading"
        className="text-xl sm:text-2xl font-extrabold text-lake-blue mb-2"
      >
        {heading}
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed mb-4 max-w-3xl">
        {intro}{" "}
        <span className="text-gray-600">
          Amazon links are affiliate links{" "}
          <span className="whitespace-nowrap">(paid link)</span>.
        </span>
      </p>

      <ul className="space-y-4">
        {items.map((item, index) => {
          const href = getAmazonGearUrl(item);
          const position = index + 1;
          return (
            <li
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-t border-sky-blue/20 pt-4 first:border-t-0 first:pt-0"
            >
              <div className="min-w-0 flex-1">
                <p className="font-bold text-lake-blue mb-1">{item.title}</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.blurb}
                </p>
              </div>
              <a
                href={href}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center min-h-[44px] px-4 py-2.5 rounded-full bg-lake-blue text-white text-sm font-bold hover:bg-lake-blue/90 transition-colors"
                onClick={() =>
                  trackAmazonAffiliateClick(item, {
                    placement: analyticsPlacement,
                    section: "recommended_gear",
                    position,
                    ctaText: item.ctaLabel,
                    pageSlug: placement.pagePath,
                  })
                }
              >
                {item.ctaLabel} →
              </a>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-xs text-gray-600 leading-relaxed">
        {AMAZON_ASSOCIATE_DISCLOSURE} Availability and pricing are shown on
        Amazon and may change. See our{" "}
        <Link
          href="/affiliate-disclosure"
          className="font-semibold text-sky-blue hover:underline"
        >
          affiliate disclosure
        </Link>
        .
      </p>
    </section>
  );
}
