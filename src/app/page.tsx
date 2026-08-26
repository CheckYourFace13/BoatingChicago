import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PopularCategories } from "@/components/PopularCategories";
import { FeaturedExperiences } from "@/components/FeaturedExperiences";
import { WhyBoatingChicago } from "@/components/WhyBoatingChicago";
import { EmailSignup } from "@/components/EmailSignup";
import { VendorSignupCTA } from "@/components/VendorSignupCTA";
import { FindBoatForm } from "@/components/FindBoatForm";
import { AffiliateOfferGrid } from "@/components/AffiliateOfferGrid";
import { AdSenseBlock } from "@/components/AdSenseBlock";
import { SceneryBand } from "@/components/SceneryBand";
import { RegionalDiscovery } from "@/components/geo/RegionalDiscovery";
import { TodayOnTheWater } from "@/components/homepage/TodayOnTheWater";
import { HomepageWeatherFeature } from "@/components/homepage/HomepageWeatherFeature";
import { HomepageNewsFeature } from "@/components/homepage/HomepageNewsFeature";
import { BoatingResourceTools } from "@/components/homepage/BoatingResourceTools";
import { PracticalDiscovery } from "@/components/homepage/PracticalDiscovery";
import { FeaturedGuides } from "@/components/homepage/FeaturedGuides";
import { HomepageEvents } from "@/components/homepage/HomepageEvents";
import { getHomepageOffers } from "@/data/affiliate-offers";
import { getPublishedEvents } from "@/data/geo";
import { getChicagoNews } from "@/lib/news";
import { buildMetadata } from "@/lib/seo";
import { getChicagoWeather } from "@/lib/weather";

export const revalidate = 900;

export const metadata = buildMetadata({
  title: "Boating Chicago | Chicago Boating Weather, Marinas, Launches & Guides",
  description:
    "Your guide to boating Chicago and southern Lake Michigan — live weather and lake conditions, boating news, destinations, marinas, boat launches, events, guides, plus rentals and charters.",
  path: "/",
});

export default async function HomePage() {
  const homepageOffers = getHomepageOffers();
  const weather = await getChicagoWeather();
  const news = await getChicagoNews({ alerts: weather.alerts });
  const events = getPublishedEvents();

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <AdSenseBlock slot="homepage-top" className="mb-4" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-16 space-y-20">
        <TodayOnTheWater
          weather={weather}
          news={news.items}
          events={events}
        />

        <RegionalDiscovery />

        <BoatingResourceTools />

        <HomepageWeatherFeature weather={weather} />

        <HomepageNewsFeature news={news.items} />

        <PracticalDiscovery />

        <FeaturedGuides />

        <HomepageEvents events={events} />
      </div>

      <SceneryBand />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <PopularCategories />
        <FeaturedExperiences />

        <AffiliateOfferGrid
          title="Book Chicago Boating Experiences"
          subtitle="Ticketed cruises, private yacht and sail charters, kayak rentals, and more you can book online through GetYourGuide and Viator. These are not the same as a custom private boat match — for private rentals and captains, use Find a Boat below."
          offers={homepageOffers}
          pageSlug="homepage"
        />

        <section id="find-a-boat">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-3">
                Need a Private Boat, Yacht, or Captain?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                GetYourGuide and Viator cover ticketed cruises, sailing
                experiences, and some private charter listings. For custom
                private boat rentals, yacht charters, party boats, fishing
                charters, and captains, tell us what you need — we&apos;ll match
                you with local options, usually within 24 hours.
              </p>
              <div className="flex flex-wrap gap-3 text-sm font-semibold">
                <Link href="/boat-rentals-chicago" className="text-coral hover:underline">
                  Boat rentals
                </Link>
                <Link href="/yacht-rentals-chicago" className="text-coral hover:underline">
                  Yacht charters
                </Link>
                <Link href="/party-boat-rentals-chicago" className="text-coral hover:underline">
                  Party boats
                </Link>
                <Link href="/fishing-charters-chicago" className="text-coral hover:underline">
                  Fishing
                </Link>
              </div>
            </div>
            <FindBoatForm source="homepage" />
          </div>
        </section>

        <WhyBoatingChicago />
        <EmailSignup source="homepage" />
        <VendorSignupCTA />
      </div>
    </>
  );
}
