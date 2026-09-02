"use client";

import Image from "next/image";
import {
  PROVIDER_RATINGS_DISCLAIMER,
  affiliateDisclosure,
  formatOfferRating,
  formatPriceFrom,
  getProviderLabel,
  getActiveOffers,
  getOffersByCategory,
  getContextualOffers,
  type AffiliateOffer,
  type AffiliateOfferCategory,
} from "@/data/affiliate-offers";
import { trackEvent } from "@/lib/tracking";

interface AffiliateOfferGridProps {
  title?: string;
  subtitle?: string;
  pageSlug?: string;
  category?: AffiliateOfferCategory;
  offers?: AffiliateOffer[];
  limit?: number;
  showDisclosure?: boolean;
  variant?: "default" | "alternative";
  footerOfferId?: string;
  footerLabel?: string;
  /** Analytics placement label */
  placement?: string;
}

function resolveOffers({
  pageSlug,
  category,
  offers,
  limit,
}: Pick<
  AffiliateOfferGridProps,
  "pageSlug" | "category" | "offers" | "limit"
>): AffiliateOffer[] {
  let list: AffiliateOffer[];
  if (offers) list = offers.filter((o) => o.active);
  else if (pageSlug) list = getContextualOffers(pageSlug, { limit });
  else if (category) list = getOffersByCategory(category);
  else list = getActiveOffers();

  list = list.filter((o) => o.experienceType !== "destination");
  if (limit) list = list.slice(0, limit);
  return list;
}

function trackAffiliateClick(
  offer: AffiliateOffer,
  opts: {
    page: string;
    placement: string;
    position: number;
    ctaText: string;
  }
) {
  trackEvent("affiliate_click", {
    provider: offer.provider,
    product_id: offer.providerProductId || offer.id,
    product_name: offer.shortTitle || offer.title,
    category: offer.category,
    page_path: opts.page,
    placement: opts.placement,
    position: String(opts.position),
    destination: offer.location || "",
    cta_text: opts.ctaText,
    // legacy params preserved
    partner: offer.provider,
    offer_id: offer.id,
    offer_title: offer.title,
    destination_url: offer.url,
    page: opts.page,
    cta_label: opts.ctaText,
  });
}

export function AffiliateOfferCard({
  offer,
  pageSlug,
  placement,
  position,
}: {
  offer: AffiliateOffer;
  pageSlug: string;
  placement: string;
  position: number;
}) {
  const ratingLabel = formatOfferRating(offer);
  const priceLabel = formatPriceFrom(offer);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-sky-blue/20 bg-white shadow-sm hover:shadow-lg transition-shadow">
      {offer.image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={offer.image}
            alt={`${offer.title} — Chicago boating experience`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[11px] font-bold uppercase tracking-wide text-lake-blue">
            {getProviderLabel(offer.provider)}
          </div>
        </div>
      )}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-extrabold text-lake-blue text-lg mb-2 leading-snug">
          {offer.shortTitle || offer.title}
        </h3>
        {ratingLabel ? (
          <p className="text-sm font-semibold text-lake-blue/80 mb-2">
            {ratingLabel}
          </p>
        ) : null}
        <p className="text-sm text-gray-600 leading-relaxed mb-3 flex-1">
          {offer.shortDescription}
        </p>
        {priceLabel ? (
          <p className="text-sm font-bold text-lake-blue mb-3">{priceLabel}</p>
        ) : null}
        <a
          href={offer.url}
          target="_blank"
          rel="sponsored nofollow noopener"
          data-track="affiliate_click"
          data-partner={offer.provider}
          data-offer-id={offer.id}
          data-product-id={offer.providerProductId || offer.id}
          data-placement={placement}
          data-position={position}
          onClick={() =>
            trackAffiliateClick(offer, {
              page: pageSlug,
              placement,
              position,
              ctaText: offer.ctaLabel,
            })
          }
          className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 bg-coral text-white font-bold text-sm rounded-full hover:bg-coral/90 transition-colors"
        >
          {offer.ctaLabel} →
        </a>
      </div>
    </article>
  );
}

export function AffiliateOfferGrid({
  title,
  subtitle,
  pageSlug,
  category,
  offers,
  limit,
  showDisclosure = true,
  variant = "default",
  footerOfferId,
  footerLabel,
  placement,
}: AffiliateOfferGridProps) {
  const list = resolveOffers({ pageSlug, category, offers, limit });
  const footerOffer = footerOfferId
    ? getActiveOffers().find((o) => o.id === footerOfferId)
    : undefined;

  if (list.length === 0 && !footerOffer) return null;

  const trackPage = pageSlug || "unknown";
  const placementKey =
    placement ||
    (pageSlug ? `${pageSlug}_contextual` : "experience_grid");

  return (
    <section
      className={
        variant === "alternative"
          ? "rounded-3xl border border-sky-blue/25 bg-light-blue/40 p-6 md:p-8"
          : ""
      }
    >
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 max-w-2xl leading-relaxed">{subtitle}</p>
          )}
        </div>
      )}

      {list.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((offer, index) => (
            <AffiliateOfferCard
              key={offer.id}
              offer={offer}
              pageSlug={trackPage}
              placement={placementKey}
              position={index + 1}
            />
          ))}
        </div>
      )}

      {footerOffer && (
        <div className="mt-6">
          <a
            href={footerOffer.url}
            target="_blank"
            rel="sponsored nofollow noopener"
            onClick={() =>
              trackAffiliateClick(footerOffer, {
                page: trackPage,
                placement: `${placementKey}_footer`,
                position: list.length + 1,
                ctaText: footerLabel || footerOffer.ctaLabel,
              })
            }
            className="inline-flex items-center min-h-[44px] text-sky-blue font-bold hover:underline"
          >
            {footerLabel || footerOffer.ctaLabel} →
          </a>
        </div>
      )}

      {showDisclosure && (
        <div className="mt-5 space-y-1">
          <p className="text-xs text-gray-500 leading-relaxed">
            {affiliateDisclosure}{" "}
            <a
              href="/affiliate-disclosure"
              className="underline hover:text-gray-700"
            >
              Learn more
            </a>
            .
          </p>
          {list.some((o) => o.rating != null) ? (
            <p className="text-xs text-gray-500 leading-relaxed">
              {PROVIDER_RATINGS_DISCLAIMER}
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}
