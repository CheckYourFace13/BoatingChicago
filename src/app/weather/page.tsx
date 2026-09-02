import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ChicagoBoatingBrief } from "@/components/BoatingBrief";
import {
  BoatingConditionRatingCard,
  WeatherPageViewTracker,
} from "@/components/weather/BoatingConditionRating";
import {
  MarineAlerts,
  WeatherSourceAttribution,
} from "@/components/weather/MarineAlerts";
import {
  CurrentBoatingConditions,
  HourlyBoatingForecast,
  LakeConditions,
  SevenDayForecast,
} from "@/components/weather/WeatherPanels";
import { WeatherLocationSelector } from "@/components/weather/WeatherLocationSelector";
import { WeatherGoodDayOffers } from "@/components/weather/WeatherGoodDayOffers";
import { PageShell } from "@/components/layout/PageShell";
import { SideRail } from "@/components/layout/SideRail";
import { DEFAULT_WEATHER_LOCATION_ID } from "@/config/weather-locations";
import { getSeasonalTip, getChicagoNews } from "@/lib/news";
import { buildMetadata } from "@/lib/seo";
import { getWeatherForLocation } from "@/lib/weather";

export const revalidate = 900;

/**
 * One indexable weather page, one canonical. Locations are a query-param view
 * of the same page, so metadata stays generic to southern Lake Michigan.
 */
export const metadata = buildMetadata({
  title: "Chicago Boating Weather & Lake Michigan Conditions",
  description:
    "Live Chicago boating weather, Lake Michigan nearshore conditions, NOAA/NWS marine alerts, and an informational boating conditions summary for recreational boaters.",
  path: "/weather",
});

interface WeatherPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WeatherPage({ searchParams }: WeatherPageProps) {
  const { location } = await searchParams;
  const requestedLocationId = Array.isArray(location) ? location[0] : location;

  const weather = await getWeatherForLocation(requestedLocationId);
  const news = await getChicagoNews({ alerts: weather.alerts, weather });
  const tip = getSeasonalTip();
  const isChicago = weather.locationId === DEFAULT_WEATHER_LOCATION_ID;

  return (
    <>
      <WeatherPageViewTracker />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Weather", path: "/weather" },
        ]}
      />

      <section className="relative bg-gradient-to-br from-lake-blue via-lake-blue to-sky-blue text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)]" />
        <div className="relative mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-sun-yellow font-bold text-sm tracking-widest uppercase mb-3">
            {isChicago
              ? "Lake Michigan · Chicago"
              : `Southern Lake Michigan · ${weather.locationLabel}`}
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 max-w-4xl">
            Chicago Boating Weather &amp; Lake Michigan Conditions
          </h1>
          <p className="text-white/90 text-lg max-w-3xl leading-relaxed">
            Official NOAA/NWS forecasts and alerts for recreational boaters —
            plus a plain-language conditions summary. Always verify marine
            products before you cast off.
            {isChicago
              ? ""
              : ` Currently showing the nearest official forecast for ${weather.locationLabel}.`}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/news" className="text-sun-yellow hover:underline">
              Chicago Boating News →
            </Link>
            <Link
              href="/boat-rentals-chicago"
              className="text-white/90 hover:underline"
            >
              Boat rentals
            </Link>
            <Link
              href="/fishing-charters-chicago"
              className="text-white/90 hover:underline"
            >
              Fishing charters
            </Link>
            <Link
              href="/chicago-marinas"
              className="text-white/90 hover:underline"
            >
              Chicago marinas guide
            </Link>
            <Link href="/marinas" className="text-white/90 hover:underline">
              Marinas directory
            </Link>
            <Link href="/destinations" className="text-white/90 hover:underline">
              Destinations
            </Link>
            <Link href="/boat-launches" className="text-white/90 hover:underline">
              Boat launches
            </Link>
          </div>
        </div>
      </section>

      <PageShell
        className="py-14"
        leftRail={
          <SideRail
            modules={["popular_guides", "upcoming_events", "explore_lake_michigan"]}
            weather={weather}
          />
        }
        rightRail={
          <SideRail
            modules={["popular_destinations", "newsletter", "find_a_boat"]}
            weather={weather}
            stickyFirst={false}
          />
        }
      >
        <div className="space-y-16">
        <WeatherLocationSelector activeLocationId={weather.locationId} />

        <BoatingConditionRatingCard rating={weather.rating} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="rounded-xl bg-white border border-sky-blue/20 p-4">
            <p className="font-bold text-lake-blue mb-1">Sunrise</p>
            <p>
              {weather.sunriseIso
                ? new Date(weather.sunriseIso).toLocaleTimeString("en-US", {
                    timeZone: "America/Chicago",
                  })
                : "Not currently available from source"}
            </p>
          </div>
          <div className="rounded-xl bg-white border border-sky-blue/20 p-4">
            <p className="font-bold text-lake-blue mb-1">Sunset</p>
            <p>
              {weather.sunsetIso
                ? new Date(weather.sunsetIso).toLocaleTimeString("en-US", {
                    timeZone: "America/Chicago",
                  })
                : "Not currently available from source"}
            </p>
          </div>
        </div>

        <CurrentBoatingConditions weather={weather} />
        <LakeConditions
          weather={weather}
          title={isChicago ? undefined : `Lake conditions · ${weather.locationLabel}`}
        />
        <MarineAlerts
          alerts={weather.alerts}
          scopeLabel={isChicago ? undefined : weather.locationLabel}
        />

        {weather.marineForecastText ? (
          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
              Nearshore marine forecast (excerpt)
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Official NWS coastal waters forecast product excerpt. Read the full
              product on weather.gov before boating.
            </p>
            {weather.marineForecastLabel ? (
              <p className="text-sm font-semibold text-amber-800 mb-3">
                {weather.marineForecastLabel}
              </p>
            ) : null}
            <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-white border border-sky-blue/20 rounded-2xl p-5 overflow-x-auto">
              {weather.marineForecastText}
            </pre>
          </section>
        ) : null}

        <HourlyBoatingForecast weather={weather} />
        <SevenDayForecast weather={weather} />

        <WeatherGoodDayOffers conditionLevel={weather.rating.level} />

        <section className="rounded-2xl bg-lake-blue text-white p-6 md:p-8">
          <h2 className="text-2xl font-extrabold mb-3">
            What wind means for recreational boating
          </h2>
          <div className="space-y-3 text-white/90 leading-relaxed max-w-3xl">
            <p>
              Downtown air temperature is not the same as Lake Michigan. Wind
              over open water builds chop faster than the same breeze feels on
              land, and thunderstorms can arrive with little room to run for a
              harbor.
            </p>
            <p>
              As a conservative rule of thumb for small recreational boats: winds
              climbing through the teens often mean a tougher ride; mid-20s and
              higher — especially with gusts or a small craft advisory — are a
              strong reason to stay docked unless you and your vessel are truly
              prepared.
            </p>
            <p>
              This site&apos;s Good / Caution / Poor summary is informational
              only. Official NOAA/NWS marine forecasts and a qualified captain&apos;s
              judgment always come first.
            </p>
          </div>
        </section>

        <ChicagoBoatingBrief weather={weather} news={news.items} tip={tip} />

        <WeatherSourceAttribution
          sources={weather.sources}
          fetchedAt={weather.fetchedAt}
          errors={weather.errors}
        />
        </div>
      </PageShell>
    </>
  );
}
