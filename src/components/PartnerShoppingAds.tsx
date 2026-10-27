"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  resolveShoppingSlots,
  type ResolvedShoppingSlot,
} from "@/data/partner-shopping";
import { trackPartnerShoppingClick } from "@/lib/affiliate-attribution";
import { allowsAdvertising } from "@/lib/consent";
import { CookieSettingsButton } from "./CookieConsent";
import { useConsent } from "./ConsentProvider";

/**
 * Labeled shopping-partner ads. Broad placements stay off booking CTAs.
 * Impression pixels fire only after the visible creative is chosen — never
 * for a hidden fallback, and never both BrandsMart creatives at once.
 */
export function PartnerShoppingAds({ pageKey }: { pageKey: string }) {
  const { state } = useConsent();
  const advertisingOk = allowsAdvertising(state);
  const [slots, setSlots] = useState<ResolvedShoppingSlot[] | null>(null);

  useEffect(() => {
    if (!advertisingOk) {
      setSlots(null);
      return;
    }
    setSlots(resolveShoppingSlots(pageKey, new Date()));
  }, [advertisingOk, pageKey]);

  if (!advertisingOk) {
    return (
      <aside
        className="rounded-2xl border border-sky-blue/25 bg-white p-5 sm:p-6"
        aria-labelledby={`shopping-ads-${pageKey}`}
      >
        <p
          id={`shopping-ads-${pageKey}`}
          className="text-xs font-extrabold uppercase tracking-[0.14em] text-lake-blue/70 mb-1"
        >
          Advertisement — shopping partners
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          Shopping-partner creatives and Impact impression tags load only if you
          allow advertising cookies.{" "}
          <CookieSettingsButton className="font-semibold text-sky-blue hover:underline" />
          .
        </p>
      </aside>
    );
  }

  if (slots !== null && slots.length === 0) return null;

  return (
    <aside
      className="rounded-2xl border border-sky-blue/25 bg-white p-5 sm:p-6"
      aria-labelledby={`shopping-ads-${pageKey}`}
    >
      <p
        id={`shopping-ads-${pageKey}`}
        className="text-xs font-extrabold uppercase tracking-[0.14em] text-lake-blue/70 mb-1"
      >
        Advertisement — shopping partners
      </p>
      <p className="text-sm text-gray-700 mb-4">
        We may earn a commission if you buy through these links.{" "}
        <Link
          href="/affiliate-disclosure"
          className="font-semibold text-sky-blue hover:underline"
        >
          Affiliate disclosure
        </Link>
        .
      </p>

      {slots === null ? (
        <div
          className="min-h-[250px] rounded-xl bg-light-blue/40"
          aria-hidden
        />
      ) : (
        <ul className="flex flex-wrap gap-5">
          {slots.map((slot, index) => (
            <li key={`${slot.offer.id}-${slot.slotVariant}`} className="min-w-0">
              <ShoppingCreative slot={slot} position={index + 1} />
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function ShoppingCreative({
  slot,
  position,
}: {
  slot: ResolvedShoppingSlot;
  position: number;
}) {
  const { offer, href } = slot;
  const onClick = () =>
    trackPartnerShoppingClick({
      network: offer.network,
      merchant: offer.merchant,
      merchantId: offer.merchantId,
      creativeId: offer.creativeId,
      href,
      placement: `shopping_${slot.pageKey}`,
      section: "shopping_partners",
      position,
      ctaText: offer.cta,
      pageSlug: slot.pageKey,
    });

  return (
    <div className="relative max-w-[300px]">
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 rounded-lg"
        onClick={onClick}
      >
        {offer.kind === "display" && offer.imageSrc ? (
          <span
            className="block overflow-hidden rounded-lg border border-sky-blue/20 bg-light-blue/20"
            style={{
              width: offer.imageWidth,
              maxWidth: "100%",
              aspectRatio: `${offer.imageWidth} / ${offer.imageHeight}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={offer.imageSrc}
              alt={offer.imageAlt || offer.label}
              width={offer.imageWidth}
              height={offer.imageHeight}
              className="h-full w-full object-contain"
            />
          </span>
        ) : (
          <span className="inline-flex min-h-[44px] items-center rounded-full bg-lake-blue px-4 py-2.5 text-sm font-bold text-white group-hover:bg-lake-blue/90">
            {offer.cta}
          </span>
        )}
        {offer.kind === "display" ? (
          <span className="mt-2 block text-sm font-semibold text-lake-blue group-hover:underline">
            {offer.cta}
          </span>
        ) : null}
      </a>
      {offer.impressionPixel ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={offer.impressionPixel}
          alt=""
          width={1}
          height={1}
          className="absolute h-px w-px overflow-hidden opacity-0"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
