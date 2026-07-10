"use client";

import Image from "next/image";
import {
  affiliateDisclosure,
  getProviderLabel,
  type AffiliateOffer,
  type AffiliateOfferCategory,
  getActiveOffers,
  getOffersByCategory,
  getOffersForPage,
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
  /** Softer styling for “alternative experiences” sections */
  variant?: "default" | "alternative";
  /** Optional footer link (e.g. destination “see more”) */
  footerOfferId?: string;
  footerLabel?: string;
}

function resolveOffers({
  pageSlug,
  category,
  offers,
  limit,
}: Pick<AffiliateOfferGridProps, "pageSlug" | "category" | "offers" | "limit">): AffiliateOffer[] {
  let list: AffiliateOffer[];
  if (offers) list = offers.filter((o) => o.active);
  else if (pageSlug) list = getOffersForPage(pageSlug);
  else if (category) list = getOffersByCategory(category);
  else list = getActiveOffers();

  // Destination-style links are better as footer CTAs, not primary cards
  list = list.filter((o) => o.experienceType !== "destination");

  if (limit) list = list.slice(0, limit);
  return list;
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
}: AffiliateOfferGridProps) {
  const list = resolveOffers({ pageSlug, category, offers, limit });
  const footerOffer = footerOfferId
    ? getActiveOffers().find((o) => o.id === footerOfferId)
    : undefined;

  if (list.length === 0 && !footerOffer) return null;

  const trackPage = pageSlug || "unknown";

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
          {list.map((offer) => (
            <article
              key={offer.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-sky-blue/20 bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              {offer.image && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={offer.image}
                    alt=""
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
                  {offer.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                  {offer.shortDescription}
                </p>
                <a
                  href={offer.url}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  data-track="affiliate_click"
                  data-partner={offer.provider}
                  data-offer-id={offer.id}
                  data-offer-title={offer.title}
                  data-category={offer.category}
                  data-cta-label={offer.ctaLabel}
                  onClick={() =>
                    trackEvent("affiliate_click", {
                      partner: offer.provider,
                      offer_id: offer.id,
                      offer_title: offer.title,
                      category: offer.category,
                      destination_url: offer.url,
                      page: trackPage,
                      cta_label: offer.ctaLabel,
                    })
                  }
                  className="inline-flex items-center justify-center px-5 py-3 bg-coral text-white font-bold text-sm rounded-full hover:bg-coral/90 transition-colors"
                >
                  {offer.ctaLabel} →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {footerOffer && (
        <div className="mt-6">
          <a
            href={footerOffer.url}
            target="_blank"
            rel="sponsored nofollow noopener"
            data-track="affiliate_click"
            data-partner={footerOffer.provider}
            data-offer-id={footerOffer.id}
            onClick={() =>
              trackEvent("affiliate_click", {
                partner: footerOffer.provider,
                offer_id: footerOffer.id,
                offer_title: footerOffer.title,
                category: footerOffer.category,
                destination_url: footerOffer.url,
                page: trackPage,
                cta_label: footerLabel || footerOffer.ctaLabel,
              })
            }
            className="inline-flex items-center text-sky-blue font-bold hover:underline"
          >
            {footerLabel || footerOffer.ctaLabel} →
          </a>
        </div>
      )}

      {showDisclosure && (
        <p className="mt-5 text-xs text-gray-500 leading-relaxed">
          {affiliateDisclosure}
        </p>
      )}
    </section>
  );
}
