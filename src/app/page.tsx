import Link from "next/link";
import { Hero } from "@/components/Hero";
import { EmailSignup } from "@/components/EmailSignup";
import { PopularOnTheWater } from "@/components/PopularOnTheWater";
import { AdSenseBlock } from "@/components/AdSenseBlock";
import { ExploreBoating } from "@/components/homepage/ExploreBoating";
import { TodayOnTheWater } from "@/components/homepage/TodayOnTheWater";
import { FeaturedGuides } from "@/components/homepage/FeaturedGuides";
import { HomepageEvents } from "@/components/homepage/HomepageEvents";
import { HomepageNewsFeature } from "@/components/homepage/HomepageNewsFeature";
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
  const homepageOffers = getHomepageOffers(4);
  const weather = await getChicagoWeather();
  const news = await getChicagoNews({ alerts: weather.alerts, weather });
  const events = getPublishedEvents();

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8 pt-8">
        <AdSenseBlock slot="homepage-top" className="mb-4" />
      </div>

      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8 py-10 md:py-12 space-y-12 md:space-y-14">
        <TodayOnTheWater
          weather={weather}
          news={news.items}
          events={events}
        />

        <PopularOnTheWater
          id="popular-on-the-water"
          title="Popular on the Water in Chicago"
          subtitle="Popular cruises, charters and on-the-water experiences you can book online."
          pageSlug="homepage"
          offers={homepageOffers}
          limit={4}
          placement="homepage_popular"
          section="popular_on_the_water"
          emphasized
        />

        <ExploreBoating />

        <HomepageNewsFeature news={news.items} limit={3} />

        <FeaturedGuides />

        <HomepageEvents events={events} />

        <section id="chicago-boating-brief">
          <EmailSignup source="homepage" />
        </section>
      </div>
    </>
  );
}
