import Image from "next/image";
import Link from "next/link";
import type { CategoryPage } from "@/types";
import { getCategoryBySlug } from "@/data/categories";
import { getVendorsBySlugs } from "@/data/vendors";
import { getCategoryImage } from "@/data/images";
import { getOffersForPage } from "@/data/affiliate-offers";
import { AffiliateOfferGrid } from "./AffiliateOfferGrid";
import { BestForCards } from "./BestForCards";
import { FAQ } from "./FAQ";
import { FAQSchema } from "./FAQSchema";
import { FindBoatForm } from "./FindBoatForm";
import { VendorCard } from "./VendorCard";
import { EmailSignup } from "./EmailSignup";
import { siteConfig } from "@/config/site";
import { trackingAttrs } from "@/lib/tracking";

interface CategoryLandingProps {
  category: CategoryPage;
}

/** Page-specific affiliate section copy — accurate positioning, no false claims */
const offerSectionCopy: Record<
  string,
  { title: string; subtitle: string; variant?: "default" | "alternative"; beforeForm?: boolean }
> = {
  "boat-rentals-chicago": {
    title: "Instant-Booking Charters, Cruises and Rentals",
    subtitle:
      "Book online for private yacht and sailboat charters, kayak rentals, speedboat architecture cruises, and more. These are instant-booking alternatives — for custom private boat rentals and party boats, use the Find a Boat form below.",
    beforeForm: false,
  },
  "party-boat-rentals-chicago": {
    title: "Instant-Booking Party & Cruise Alternatives",
    subtitle:
      "Ticketed tiki cruises, concert sails, fireworks sails, and skyline sails you can book online. These are not private party boat charters. For a private party boat with your own captain and schedule, use the form below.",
    beforeForm: false,
  },
  "chicago-playpen-boat-rentals": {
    title: "Nearby Lake Experiences (Not Playpen Rentals)",
    subtitle:
      "These experiences are not Playpen boat rentals. They are nearby Lake Michigan and downtown water activities you can book online while you arrange a private Playpen charter through our form.",
    variant: "alternative",
    beforeForm: false,
  },
  "navy-pier-fireworks-boat-rentals": {
    title: "Book a Chicago Fireworks Cruise or Sail",
    subtitle:
      "Ticketed fireworks cruises and fireworks sails you can book online — including Navy Pier marina fireworks, fireworks sails, and GetYourGuide fireworks options. Prefer a private charter for your group? Use the Find a Boat form below.",
    beforeForm: true,
  },
  "air-and-water-show-boat-rentals": {
    title: "General Lake & River Cruise Alternatives",
    subtitle:
      "These experiences do not include Air & Water Show seating or access. They are general Chicago architecture and kayak experiences you can book anytime. For a private boat during Air & Water Show weekend, request a match below.",
    variant: "alternative",
    beforeForm: false,
  },
  "yacht-rentals-chicago": {
    title: "Instant-Booking Private Yacht & Sailing Charters",
    subtitle:
      "Private yacht and sailboat charter options you can book online. These are instant-booking alternatives — not the only way to charter. For custom private yacht matching, use the Find a Boat form below. Dining cruises are ticketed shared experiences, not private yachts.",
    beforeForm: false,
  },
  "bachelorette-boat-rentals-chicago": {
    title: "Ticketed Party Cruise Option",
    subtitle:
      "The Tiki Bar Cruise is a fun group experience you can book online. For a private bachelorette boat rental, use the Find a Boat form.",
    beforeForm: false,
  },
  "birthday-boat-rentals-chicago": {
    title: "Ticketed Party Cruise Option",
    subtitle:
      "Prefer an instant-booking cruise for your celebration? Check the Tiki Bar Cruise — or request a private birthday boat below.",
    beforeForm: false,
  },
  "corporate-yacht-charters-chicago": {
    title: "Instant-Booking Charter & Dining Alternatives",
    subtitle:
      "Private yacht charter and dining cruise options for groups. For a custom corporate yacht charter, use the form below.",
    variant: "alternative",
    beforeForm: false,
  },
  "chicago-architecture-cruises": {
    title: "Book a Chicago Architecture Cruise",
    subtitle:
      "Guided architecture river tours, speedboat architecture cruises, and river sightseeing you can book online.",
    beforeForm: true,
  },
  "chicago-fireworks-cruises": {
    title: "Book a Chicago Fireworks Cruise or Sail",
    subtitle:
      "Ticketed fireworks cruises and fireworks sails on Lake Michigan — book online and skip the pier crowds.",
    beforeForm: true,
  },
  "chicago-jet-ski-rentals": {
    title: "Book a Chicago Jet Ski Rental",
    subtitle:
      "North Avenue Beach jet ski rentals with skyline views — instant booking through GetYourGuide.",
    beforeForm: true,
  },
  "chicago-kayak-rentals": {
    title: "Book a Chicago Kayak Rental",
    subtitle:
      "Downtown river kayak rentals and Ohio Street Beach Lake Michigan kayak rentals — different locations and products. Compare and book online.",
    beforeForm: true,
  },
  "chicago-dining-cruises": {
    title: "Book a Chicago Dining Cruise",
    subtitle:
      "Brunch, lunch, or dinner river cruises with downtown architecture as your backdrop.",
    beforeForm: true,
  },
  "chicago-tiki-cruises": {
    title: "Book a Chicago Tiki Bar Cruise",
    subtitle:
      "A tropical-themed tiki bar cruise on the Chicago River or Lake Michigan.",
    beforeForm: true,
  },
  "chicago-sailing-charters": {
    title: "Book Chicago Sailing & Private Sail Charters",
    subtitle:
      "Skyline sails, private sailboat charters with captain, day sailing, sunset sailing, fireworks sails, and special sailing events — book online. For additional private charter matching, use the form below.",
    beforeForm: true,
  },
  "chicago-sunset-cruises": {
    title: "Book a Chicago Sunset Cruise or Sail",
    subtitle:
      "Sunset cruises and private sunset sailing charters on Lake Michigan. Ticketed and private options available — confirm details on each booking page.",
    beforeForm: true,
  },
};

const experienceSlugs = new Set([
  "chicago-architecture-cruises",
  "chicago-fireworks-cruises",
  "chicago-jet-ski-rentals",
  "chicago-kayak-rentals",
  "chicago-dining-cruises",
  "chicago-tiki-cruises",
  "chicago-sailing-charters",
  "chicago-sunset-cruises",
]);

export function CategoryLanding({ category }: CategoryLandingProps) {
  const vendors = getVendorsBySlugs(category.vendors);
  const related = category.relatedSlugs
    .map((slug) => getCategoryBySlug(slug))
    .filter(Boolean);
  const heroImage = getCategoryImage(category.slug);
  const pageOffers = getOffersForPage(category.slug);
  const offerCopy = offerSectionCopy[category.slug];
  const isExperiencePage = experienceSlugs.has(category.slug);
  const showOffers = pageOffers.length > 0 && offerCopy;
  const offersBeforeForm = showOffers && offerCopy.beforeForm !== false && (offerCopy.beforeForm || isExperiencePage);

  const offerBlock = showOffers ? (
    <AffiliateOfferGrid
      pageSlug={category.slug}
      title={offerCopy.title}
      subtitle={offerCopy.subtitle}
      variant={offerCopy.variant}
      footerOfferId={
        category.slug === "chicago-architecture-cruises"
          ? "viator-chicago-river-destination"
          : undefined
      }
      footerLabel={
        category.slug === "chicago-architecture-cruises"
          ? "See More Chicago River Experiences"
          : undefined
      }
    />
  ) : null;

  return (
    <>
      <FAQSchema faqs={category.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: category.title,
            description: category.seoDescription,
            url: `${siteConfig.url}/${category.slug}`,
            areaServed: { "@type": "City", name: "Chicago" },
            provider: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }),
        }}
      />

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
            {category.headline}
          </h1>
          <p
            className="text-lg text-white/90 max-w-3xl leading-relaxed animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            {category.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "220ms" }}>
            {isExperiencePage && pageOffers[0] ? (
              <a
                href={pageOffers[0].url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="inline-flex items-center px-6 py-3 bg-coral text-white font-bold rounded-full hover:bg-coral/90 transition-colors shadow-md"
              >
                {pageOffers[0].ctaLabel} →
              </a>
            ) : null}
            <a
              href="#find-a-boat"
              className={`inline-flex items-center px-6 py-3 font-bold rounded-full transition-colors shadow-md ${
                isExperiencePage
                  ? "bg-white/15 border border-white/40 text-white hover:bg-white/25"
                  : "bg-coral text-white hover:bg-coral/90 cta-pulse"
              }`}
            >
              {isExperiencePage ? "Need a Private Boat Instead?" : "Get Matched with a Boat →"}
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <BestForCards items={category.bestFor} />

        {offersBeforeForm && offerBlock}

        <section id="find-a-boat">
          {isExperiencePage && (
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-lake-blue mb-2">
                Need a Private Boat, Yacht, or Captain?
              </h2>
              <p className="text-gray-600 max-w-2xl">
                GetYourGuide experiences above are ticketed tours and rentals. For private boat rentals,
                yacht charters, party boats, or captains for hire, tell us what you need and we&apos;ll match you.
              </p>
            </div>
          )}
          <FindBoatForm source={category.slug} />
        </section>

        {!offersBeforeForm && offerBlock}

        {vendors.length > 0 ? (
          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
              Featured Local Listings
            </h2>
            <p className="text-gray-600 mb-6">
              Browse Chicago vendors on Boating Chicago — or submit the form above to get matched automatically.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map((vendor) => (
                <VendorCard key={vendor.slug} vendor={vendor} />
              ))}
            </div>
          </section>
        ) : (
          <section className="bg-light-blue/50 rounded-3xl p-8 md:p-10 text-center">
            <h2 className="text-xl font-extrabold text-lake-blue mb-2">
              Local Vendor Listings
            </h2>
            <p className="text-gray-600 mb-4 max-w-lg mx-auto">
              We&apos;re onboarding Chicago boating partners. Use the form above to get matched for private rentals and charters.
            </p>
            <Link
              href="/list-your-business"
              {...trackingAttrs.listBusinessClick}
              className="inline-flex text-sky-blue font-bold hover:underline"
            >
              List your boating business →
            </Link>
          </section>
        )}

        <FAQ faqs={category.faqs} />

        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-extrabold text-lake-blue mb-4">Related Chicago Boating Guides</h2>
            <div className="flex flex-wrap gap-3">
              {related.map(
                (cat) =>
                  cat && (
                    <Link
                      key={cat.slug}
                      href={`/${cat.slug}`}
                      className="px-4 py-2 bg-light-blue text-lake-blue font-semibold text-sm rounded-full hover:bg-sky-blue/20 transition-colors"
                    >
                      {cat.title}
                    </Link>
                  )
              )}
            </div>
          </section>
        )}

        <EmailSignup source={category.slug} />
      </div>
    </>
  );
}
