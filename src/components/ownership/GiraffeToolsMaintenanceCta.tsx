"use client";

import Link from "next/link";
import {
  buildGiraffeToolsAwinUrl,
  GIRAFFE_TOOLS_AWIN,
  type GiraffeToolsProduct,
} from "@/config/partner-programs";
import { trackGiraffeToolsAffiliateClick } from "@/lib/affiliate-attribution";

export interface GiraffeToolsItem {
  product: GiraffeToolsProduct;
  clickref: string;
  ctaLabel?: string;
  blurb: string;
}

export interface GiraffeToolsMaintenanceCtaProps {
  items: GiraffeToolsItem[];
  placement: string;
  section?: string;
  pageSlug?: string;
  heading?: string;
  intro?: string;
}

/**
 * Text-only Giraffe Tools recommendations for boat cleaning / maintenance.
 * No banner creatives.
 */
export function GiraffeToolsMaintenanceCta({
  items,
  placement,
  section = "giraffe_tools_maintenance",
  pageSlug,
  heading = "Owner cleaning tools",
  intro = "For owners who wash at the dock or driveway, a retractable hose reel keeps the washdown area tidier. Pressure washers can help with stubborn buildup — but only when used carefully on marine surfaces.",
}: GiraffeToolsMaintenanceCtaProps) {
  if (items.length === 0) return null;

  return (
    <aside
      className="rounded-2xl border border-sky-blue/25 bg-white p-5 sm:p-6"
      aria-labelledby="giraffe-tools-heading"
    >
      <h2
        id="giraffe-tools-heading"
        className="text-xl sm:text-2xl font-extrabold text-lake-blue mb-2"
      >
        {heading}
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed mb-4 max-w-3xl">
        {intro}{" "}
        <span className="text-gray-600">
          Giraffe Tools links are affiliate links{" "}
          <span className="whitespace-nowrap">(paid link)</span>.
        </span>
      </p>

      <ul className="space-y-5">
        {items.map((item, index) => {
          const creative = GIRAFFE_TOOLS_AWIN.products[item.product];
          const href = buildGiraffeToolsAwinUrl(item.product, item.clickref);
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
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full bg-lake-blue text-white text-sm font-bold hover:bg-lake-blue/90 transition-colors"
                onClick={() =>
                  trackGiraffeToolsAffiliateClick({
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
        from Giraffe Tools via Awin. Product availability and specs are set by
        the seller — we do not invent manufacturer claims. See our{" "}
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
