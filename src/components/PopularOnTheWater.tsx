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
import {
  getAttributedAffiliateUrl,
  trackAffiliateClick,
} from "@/lib/affiliate-attribution";

interface PopularOnTheWaterProps {
  title?: string;
  subtitle?: string;
  /** Page slug for contextual selection; defaults to popular bestsellers */
  pageSlug?: string;
  offers?: AffiliateOffer[];
  limit?: number;
  placement?: string;
  section?: string;
  /** Stronger homepage treatment */
  emphasized?: boolean;
  id?: string;
}

export function PopularOnTheWater({
  title = "Popular on the Water in Chicago",
  subtitle = "Popular cruises, charters and on-the-water experiences you can book online.",
  pageSlug,
  offers,
  limit = 3,
  placement = "popular_on_the_water",
  section = "popular_on_the_water",
  emphasized = false,
  id,
}: PopularOnTheWaterProps) {
  const list =
    offers?.filter((o) => o.active) ||
    (pageSlug
      ? getContextualOffers(pageSlug, { limit })
      : getPopularOnTheWaterOffers(limit));

  if (!list.length) return null;

  const gridClass =
    list.length >= 4
      ? "grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5";

  return (
    <section
      id={id}
      className={
        emphasized
          ? "rounded-3xl border border-sky-blue/30 bg-gradient-to-br from-light-blue/80 via-white to-light-blue/40 p-6 md:p-8 scroll-mt-24"
          : "scroll-mt-24"
      }
    >
      <div className="mb-6 md:mb-7">
        {emphasized ? (
          <p className="text-xs font-bold uppercase tracking-widest text-sky-blue mb-2">
            Book online
          </p>
        ) : null}
        <h2
          className={
            emphasized
              ? "text-2xl md:text-4xl font-extrabold text-lake-blue mb-2 tracking-tight"
              : "text-2xl md:text-3xl font-extrabold text-lake-blue mb-2"
          }
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={
              emphasized
                ? "text-gray-700 max-w-2xl leading-relaxed text-base md:text-lg"
                : "text-gray-600 max-w-2xl leading-relaxed"
            }
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className={gridClass}>
        {list.map((offer, index) => {
          const ratingLabel = formatOfferRating(offer);
          const priceLabel = formatPriceFrom(offer);
          const cta = offer.ctaLabel || "View Experience";
          const position = index + 1;
          const href = getAttributedAffiliateUrl(offer, placement, position);
          return (
            <article
              key={offer.id}
              className={
                emphasized
                  ? "flex flex-col rounded-2xl border border-sky-blue/25 bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  : "flex flex-col rounded-2xl border border-sky-blue/20 bg-white overflow-hidden shadow-sm"
              }
            >
              {offer.image ? (
                <div className="relative aspect-[16/9]">
                  <Image
                    src={offer.image}
                    alt={`${offer.shortTitle || offer.title} — Chicago`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                    priority={emphasized && index < 2}
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 text-[10px] font-bold uppercase text-lake-blue">
                    {getProviderLabel(offer.provider)}
                  </span>
                </div>
              ) : null}
              <div className="flex flex-col flex-1 p-4 md:p-5">
                <h3 className="font-extrabold text-lake-blue leading-snug mb-1 text-lg">
                  {offer.shortTitle || offer.title}
                </h3>
                {ratingLabel ? (
                  <p className="text-sm font-semibold text-lake-blue/80 mb-2">
                    {ratingLabel}
                  </p>
                ) : null}
                {offer.shortDescription && emphasized ? (
                  <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                    {offer.shortDescription}
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
                  href={href}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  onClick={() =>
                    trackAffiliateClick(offer, {
                      pageSlug: pageSlug || "popular",
                      placement,
                      section,
                      position,
                      ctaText: cta,
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

      <div className="mt-5 space-y-1">
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
