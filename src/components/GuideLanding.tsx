import Image from "next/image";
import Link from "next/link";
import type { GuidePage } from "@/types";
import { getCategoryBySlug } from "@/data/categories";
import { getGuideBySlug } from "@/data/guides";
import { getCategoryImage } from "@/data/images";
import { getOffersForPage } from "@/data/affiliate-offers";
import { AffiliateOfferGrid } from "./AffiliateOfferGrid";
import { AdSenseBlock } from "./AdSenseBlock";
import { BreadcrumbSchema } from "./BreadcrumbSchema";
import { FAQ } from "./FAQ";
import { FAQSchema } from "./FAQSchema";
import { EmailSignup } from "./EmailSignup";
import {
  ExploreResources,
  type ResourceLink,
} from "./ExploreResources";
import { siteConfig } from "@/config/site";
import { buildArticleSchema } from "@/lib/schema";

interface GuideLandingProps {
  guide: GuidePage;
}

const GUIDE_RESOURCE_LINKS: Record<string, ResourceLink[]> = {
  "chicago-playpen-guide": [
    { href: "/chicago-playpen-boat-rentals", label: "Playpen boat rentals" },
    { href: "/destinations/chicago", label: "Boating in Chicago" },
    { href: "/weather", label: "Lake conditions" },
    { href: "/marinas", label: "Marinas" },
    { href: "/party-boat-rentals-chicago", label: "Party boats" },
  ],
  "chicago-marina-guide": [
    { href: "/marinas", label: "Marinas directory" },
    { href: "/chicago-marinas", label: "Chicago marinas overview" },
    { href: "/boat-launches", label: "Boat launches" },
    { href: "/destinations/chicago", label: "Boating in Chicago" },
    { href: "/weather", label: "Boating weather" },
  ],
  "lake-michigan-boating-guide": [
    { href: "/destinations", label: "Destinations" },
    { href: "/weather", label: "Boating weather" },
    { href: "/boat-launches", label: "Boat launches" },
    { href: "/news", label: "Boating news" },
    { href: "/guides", label: "All guides" },
  ],
  "chicago-fishing-guide": [
    { href: "/fishing-charters-chicago", label: "Fishing charters" },
    { href: "/weather", label: "Lake conditions" },
    { href: "/boat-launches", label: "Boat launches" },
    { href: "/news", label: "Boating news" },
  ],
  "chicago-air-and-water-show-boats": [
    { href: "/air-and-water-show-boat-rentals", label: "Request a show boat" },
    { href: "/events", label: "Events" },
    { href: "/weather", label: "Boating weather" },
    { href: "/destinations/chicago", label: "Boating in Chicago" },
  ],
  "chicago-fireworks-cruise-guide": [
    { href: "/navy-pier-fireworks-boat-rentals", label: "Fireworks boats" },
    { href: "/events", label: "Events" },
    { href: "/destinations/chicago", label: "Boating in Chicago" },
    { href: "/weather", label: "Boating weather" },
  ],
};

function resolveSlugTitle(slug: string): string | null {
  const cat = getCategoryBySlug(slug);
  if (cat) return cat.title;
  const g = getGuideBySlug(slug);
  if (g) return g.title;
  return null;
}

export function GuideLanding({ guide }: GuideLandingProps) {
  const heroImage = getCategoryImage(guide.slug);
  const affiliateSlug = guide.affiliateOffersFromSlug ?? guide.slug;
  const pageOffers = getOffersForPage(affiliateSlug);
  const hasOffers = pageOffers.length > 0;

  const allFaqs = [...guide.peopleAlsoAsk, ...guide.faqs];

  return (
    <>
      <FAQSchema faqs={allFaqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/${guide.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildArticleSchema({
              title: guide.seoTitle || guide.title,
              description: guide.seoDescription,
              path: `/${guide.slug}`,
            })
          ),
        }}
      />

      {/* Hero */}
      <section className="relative min-h-[52vh] md:min-h-[58vh] flex items-end overflow-hidden text-white">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover animate-ken-burns-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-lake-blue/90 via-lake-blue/65 to-lake-blue/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-lake-blue/80 via-transparent to-black/20" />
        <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 max-w-3xl animate-fade-up">
            {guide.headline}
          </h1>
          <p
            className="text-lg text-white/90 max-w-3xl leading-relaxed animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            {guide.intro}
          </p>
          {hasOffers ? (
            <div className="mt-6 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "220ms" }}>
              <a
                href="#book-online"
                className="inline-flex items-center px-6 py-3 bg-coral text-white font-bold rounded-full hover:bg-coral/90 transition-colors shadow-md"
              >
                Browse Experiences →
              </a>
            </div>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Long-form content sections */}
        <article className="space-y-10 max-w-4xl">
          {guide.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-4">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-gray-700 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>

        <AdSenseBlock slot="guide-mid" />

        {/* Comparison Table */}
        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
            {guide.comparisonTable.caption}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-sky-blue/20 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-lake-blue text-white">
                <tr>
                  {guide.comparisonTable.headers.map((h, i) => (
                    <th key={i} className="px-4 py-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {guide.comparisonTable.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={ri % 2 === 0 ? "bg-white" : "bg-light-blue/30"}
                  >
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Seasonal Tips */}
        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
            Seasonal Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guide.seasonalTips.map((tip, i) => (
              <div
                key={i}
                className="bg-light-blue/50 rounded-2xl p-5 border border-sky-blue/20"
              >
                <p className="font-bold text-lake-blue mb-1">{tip.season}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Map Embed */}
        {guide.mapEmbed && (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              {guide.mapEmbed.title}
            </h2>
            <iframe
              title={guide.mapEmbed.title}
              loading="lazy"
              className="w-full h-72 rounded-2xl border border-sky-blue/20 shadow-sm"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(guide.mapEmbed.query)}&output=embed`}
              allowFullScreen
            />
          </section>
        )}

        {/* People Also Ask */}
        <FAQ faqs={guide.peopleAlsoAsk} title="People Also Ask" />

        {/* Affiliate Offers */}
        {hasOffers && (
          <div id="book-online">
            <AffiliateOfferGrid
              pageSlug={affiliateSlug}
              placement="guide_contextual"
              section="article_related"
              title="Popular on the Water"
              subtitle="Highly reviewed ticketed cruises and water experiences related to this guide. Ratings from GetYourGuide or Viator — not BoatingChicago reviews."
            />
          </div>
        )}

        {/* Main FAQs */}
        <FAQ faqs={guide.faqs} title="Frequently Asked Questions" />

        {GUIDE_RESOURCE_LINKS[guide.slug] ? (
          <ExploreResources links={GUIDE_RESOURCE_LINKS[guide.slug]} />
        ) : null}

        <AdSenseBlock slot="guide-bottom" />

        {/* Popular Searches */}
        {guide.popularSearches.length > 0 && (
          <section>
            <h2 className="text-xl font-extrabold text-lake-blue mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-3">
              {guide.popularSearches.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 bg-light-blue text-lake-blue font-semibold text-sm rounded-full hover:bg-sky-blue/20 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Pages */}
        {guide.relatedSlugs.length > 0 && (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">
              Related Chicago Boating Guides
            </h2>
            <div className="flex flex-wrap gap-3">
              {guide.relatedSlugs.map((slug) => {
                const title = resolveSlugTitle(slug);
                if (!title) return null;
                return (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="px-4 py-2 bg-light-blue text-lake-blue font-semibold text-sm rounded-full hover:bg-sky-blue/20 transition-colors"
                  >
                    {title}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <EmailSignup source={guide.slug} />
      </div>
    </>
  );
}
