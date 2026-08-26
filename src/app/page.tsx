import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PopularCategories } from "@/components/PopularCategories";
import { FeaturedExperiences } from "@/components/FeaturedExperiences";
import { WhyBoatingChicago } from "@/components/WhyBoatingChicago";
import { SeasonalHighlights } from "@/components/SeasonalHighlights";
import { EmailSignup } from "@/components/EmailSignup";
import { VendorSignupCTA } from "@/components/VendorSignupCTA";
import { FindBoatForm } from "@/components/FindBoatForm";
import { AffiliateOfferGrid } from "@/components/AffiliateOfferGrid";
import { AdSenseBlock } from "@/components/AdSenseBlock";
import { SceneryBand } from "@/components/SceneryBand";
import { WhatsHappeningOnTheWater } from "@/components/BoatingBrief";
import { RegionalDiscovery } from "@/components/geo/RegionalDiscovery";
import { getHomepageOffers } from "@/data/affiliate-offers";
import { getChicagoNews } from "@/lib/news";
import { buildMetadata } from "@/lib/seo";
import { getChicagoWeather } from "@/lib/weather";

export const revalidate = 900;

const homepagePopularSearches = [
  { href: "/best-boat-rentals-chicago", label: "Best Boat Rentals" },
  { href: "/cheap-boat-rentals-chicago", label: "Cheap Boat Rentals" },
  { href: "/luxury-yacht-charters-chicago", label: "Luxury Yacht Charters" },
  { href: "/chicago-playpen-guide", label: "Chicago Playpen Guide" },
  { href: "/best-chicago-sunset-cruises", label: "Best Sunset Cruises" },
  { href: "/chicago-bachelorette-party-boats-guide", label: "Bachelorette Boat Parties" },
  { href: "/chicago-bachelor-party-boats", label: "Bachelor Party Boats" },
  { href: "/chicago-fireworks-cruise-guide", label: "Fireworks Cruise Guide" },
  { href: "/chicago-air-and-water-show-boats", label: "Air & Water Show Boats" },
  { href: "/chicago-fishing-guide", label: "Chicago Fishing Guide" },
  { href: "/beginners-guide-boating-chicago", label: "Beginner's Boating Guide" },
  { href: "/lake-michigan-boating-guide", label: "Lake Michigan Boating Guide" },
];

const chicagoBoatingGuides = [
  { href: "/chicago-playpen-guide", label: "Playpen Guide" },
  { href: "/chicago-marina-guide", label: "Marina Guide" },
  { href: "/chicago-river-cruises", label: "River Cruises" },
  { href: "/chicago-architecture-cruise-guide", label: "Architecture Cruises" },
  { href: "/sailing-lessons-chicago", label: "Sailing Lessons" },
  { href: "/chicago-fishing-guide", label: "Fishing Guide" },
  { href: "/chicago-boat-storage-guide", label: "Boat Storage" },
  { href: "/chicago-boating-faq", label: "Boating FAQ" },
];

export const metadata = buildMetadata({
  title: "Boating Chicago | Chicago & Southern Lake Michigan Boating Guide",
  description:
    "The boating guide to Chicago and southern Lake Michigan — destinations, marinas, boat launches, weather, news, rentals, yacht charters, and local know-how within reach of the city.",
  path: "/",
});

export default async function HomePage() {
  const homepageOffers = getHomepageOffers();
  const weather = await getChicagoWeather();
  const news = await getChicagoNews({ alerts: weather.alerts });

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <AdSenseBlock slot="homepage-top" className="mb-4" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <PopularCategories />
        <FeaturedExperiences />

        <WhatsHappeningOnTheWater weather={weather} news={news.items} />

        <RegionalDiscovery />

        {/* Popular Searches — high-intent guide links */}
        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-2">Popular Searches</h2>
          <p className="text-gray-600 mb-5 text-sm">Quick links to our most popular Chicago boating guides.</p>
          <div className="flex flex-wrap gap-3">
            {homepagePopularSearches.map((link) => (
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

        {/* Chicago Boating Guides cluster */}
        <section>
          <h2 className="text-2xl font-extrabold text-lake-blue mb-2">Chicago Boating Guides</h2>
          <p className="text-gray-600 mb-5 text-sm">In-depth local guides for every aspect of boating in Chicago.</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/guides"
              className="px-4 py-2 bg-lake-blue text-white font-semibold text-sm rounded-full hover:bg-lake-blue/90 transition-colors"
            >
              All guides hub
            </Link>
            {chicagoBoatingGuides.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 bg-white border border-sky-blue/30 text-lake-blue font-semibold text-sm rounded-full hover:bg-light-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <AffiliateOfferGrid
          title="Book Chicago Boating Experiences"
          subtitle="Ticketed cruises, private yacht and sail charters, kayak rentals, and more you can book online through GetYourGuide and Viator. These are not the same as a custom private boat match — for private rentals and captains, use Find a Boat below."
          offers={homepageOffers}
          pageSlug="homepage"
        />
      </div>

      <SceneryBand />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <section id="find-a-boat">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-3">
                Need a Private Boat, Yacht, or Captain?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                GetYourGuide and Viator cover ticketed cruises, sailing experiences, and some private charter listings. For custom private boat rentals, yacht charters, party boats, fishing charters, and captains, tell us what you need — we&apos;ll match you with local options, usually within 24 hours.
              </p>
            </div>
            <FindBoatForm source="homepage" />
          </div>
        </section>

        <WhyBoatingChicago />
        <SeasonalHighlights />
        <EmailSignup source="homepage" />
        <VendorSignupCTA />
      </div>
    </>
  );
}
