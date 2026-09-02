"use client";

import Image from "next/image";
import {
  PROVIDER_RATINGS_DISCLAIMER,
  affiliateDisclosure,
  formatOfferRating,
  formatPriceFrom,
  getPopularOnTheWaterOffers,
  getProviderLabel,
  getContextualOffers,
  type AffiliateOffer,
} from "@/data/affiliate-offers";
import { trackEvent } from "@/lib/tracking";

interface PopularOnTheWaterProps {
  title?: string;
  subtitle?: string;
  /** Page slug for contextual selection; defaults to popular bestsellers */
  pageSlug?: string;
  offers?: AffiliateOffer[];
  limit?: number;
  placement?: string;
}

export function PopularOnTheWater({
  title = "Popular on the Water in Chicago",
  subtitle = "Highly reviewed ticketed cruises and water experiences you can check online — ratings from GetYourGuide.",
  pageSlug,
  offers,
  limit = 3,
  placement = "popular_on_the_water",
}: PopularOnTheWaterProps) {
  const list =
    offers?.filter((o) => o.active) ||
    (pageSlug
      ? getContextualOffers(pageSlug, { limit })
      : getPopularOnTheWaterOffers(limit));

  if (!list.length) return null;

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-gray-600 max-w-2xl leading-relaxed">{subtitle}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((offer, index) => {
          const ratingLabel = formatOfferRating(offer);
          const priceLabel = formatPriceFrom(offer);
          const cta = offer.ctaLabel || "View Experience";
          return (
            <article
              key={offer.id}
              className="flex flex-col rounded-2xl border border-sky-blue/20 bg-white overflow-hidden shadow-sm"
            >
              {offer.image ? (
                <div className="relative aspect-[16/9]">
                  <Image
                    src={offer.image}
                    alt={`${offer.shortTitle || offer.title} — Chicago`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 text-[10px] font-bold uppercase text-lake-blue">
                    {getProviderLabel(offer.provider)}
                  </span>
                </div>
              ) : null}
              <div className="flex flex-col flex-1 p-4">
                <h3 className="font-extrabold text-lake-blue leading-snug mb-1">
                  {offer.shortTitle || offer.title}
                </h3>
                {ratingLabel ? (
                  <p className="text-sm font-semibold text-lake-blue/80 mb-2">
                    {ratingLabel}
                  </p>
                ) : null}
                {priceLabel ? (
                  <p className="text-sm font-bold text-lake-blue mb-3">
                    {priceLabel}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 mb-3">View experience</p>
                )}
                <a
                  href={offer.url}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  onClick={() =>
                    trackEvent("affiliate_click", {
                      provider: offer.provider,
                      product_id: offer.providerProductId || offer.id,
                      product_name: offer.shortTitle || offer.title,
                      category: offer.category,
                      page_path: pageSlug || "popular",
                      placement,
                      position: String(index + 1),
                      destination: offer.location || "",
                      cta_text: cta,
                      partner: offer.provider,
                      offer_id: offer.id,
                      offer_title: offer.title,
                      page: pageSlug || "popular",
                      cta_label: cta,
                    })
                  }
                  className="mt-auto inline-flex items-center justify-center min-h-[48px] px-4 py-3 bg-coral text-white font-bold text-sm rounded-full hover:bg-coral/90"
                >
                  {cta} →
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-xs text-gray-500">{PROVIDER_RATINGS_DISCLAIMER}</p>
        <p className="text-xs text-gray-500">
          {affiliateDisclosure}{" "}
          <a href="/affiliate-disclosure" className="underline">
            Learn more
          </a>
          .
        </p>
      </div>
    </section>
  );
}
