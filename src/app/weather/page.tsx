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
import { WeatherExploreLinks } from "@/components/weather/WeatherExploreLinks";
import { PageShell } from "@/components/layout/PageShell";
import { SideRail } from "@/components/layout/SideRail";
import { DEFAULT_WEATHER_LOCATION_ID } from "@/config/weather-locations";
import { getSeasonalTip, getChicagoNews } from "@/lib/news";
import { buildManagedMetadata } from "@/lib/gravyblock-managed";
import { getWeatherForLocation } from "@/lib/weather";
import { getUsgsReadings } from "@/lib/usgs";
import { UsgsRiverPanel } from "@/components/geo/UsgsRiverPanel";
import { BridgeLockNotices } from "@/components/weather/BridgeLockNotices";

export const revalidate = 900;

/**
 * One indexable weather page, one canonical. Locations are a query-param view
 * of the same page, so metadata stays coverage-wide (not a per-harbor index).
 */
export async function generateMetadata() {
  return buildManagedMetadata({
  title: "Boating Weather & Lake Michigan Conditions | Chicago Coverage",
  description:
    "NWS/NOAA marine forecasts, buoy context, and harbor-area weather anchors for Chicago, Lake Michigan, and inland waters in BoatingChicago coverage — informational only, never a safe-to-boat clearance.",
  path: "/weather",
});
}

interface WeatherPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WeatherPage({ searchParams }: WeatherPageProps) {
  const { location } = await searchParams;
  const requestedLocationId = Array.isArray(location) ? location[0] : location;

  const weather = await getWeatherForLocation(requestedLocationId);
  const isChicago = weather.locationId === DEFAULT_WEATHER_LOCATION_ID;
  const riverReadings = await getUsgsReadings({
    weatherLocationId: weather.locationId,
  });
  const news = await getChicagoNews({ alerts: weather.alerts, weather });
  const tip = getSeasonalTip();

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
              : `Lake Michigan region · ${weather.locationLabel}`}
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 max-w-4xl">
            Chicago Boating Weather &amp; Lake Michigan Conditions
          </h1>
          <p className="text-white/90 text-lg max-w-3xl leading-relaxed">
            Official NOAA/NWS area forecasts and alerts for recreational
            boaters — plus a plain-language conditions summary. These are area
            products, not exact harbor- or ramp-mouth observations. Always
            verify marine products on weather.gov before you cast off.
            {isChicago
              ? ""
              : ` Currently showing the nearest official area forecast for ${weather.locationLabel}.`}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/news" className="text-sun-yellow hover:underline">
              Chicago Boating News →
            </Link>
            <Link href="/marinas" className="text-white/90 hover:underline">
              Marinas
            </Link>
            <Link href="/boat-launches" className="text-white/90 hover:underline">
              Boat launches
            </Link>
            <Link href="/kayak-canoe-sup" className="text-white/90 hover:underline">
              Kayak &amp; SUP
            </Link>
            <Link href="/destinations" className="text-white/90 hover:underline">
              Destinations
            </Link>
            <Link href="/guides" className="text-white/90 hover:underline">
              Guides
            </Link>
            <Link href="/events" className="text-white/90 hover:underline">
              Events
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

        <section className="rounded-2xl border border-sky-blue/25 bg-white p-5 md:p-6 max-w-3xl">
          <h2 className="text-xl font-extrabold text-lake-blue mb-3">
            How to read waves, advisories, and nearshore forecasts
          </h2>
          <ul className="space-y-2 text-sm md:text-base text-gray-700 leading-relaxed list-disc pl-5">
            <li>
              <strong>Waves and wind</strong> on this page are area NOAA/NWS
              products for the selected forecast point — not a sensor at your
              exact ramp, harbor mouth, or breakwater.
            </li>
            <li>
              <strong>Marine alerts</strong> (for example Small Craft Advisories)
              apply to the NWS marine zones covering this area. Read the full
              alert text and end time on weather.gov before you cast off.
            </li>
            <li>
              <strong>Nearshore marine forecast</strong> excerpts are coastal
              waters guidance. Conditions inside protected basins can differ
              from open nearshore bands; always compare the latest full product.
            </li>
            <li>
              The snapshot card groups those factors. It is not a green light
              or a go/no-go clearance for any vessel or trip.
            </li>
          </ul>
        </section>

        <WeatherExploreLinks weather={weather} />

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
        {riverReadings.length > 0 ? (
          <div id="river-levels">
            <UsgsRiverPanel
              readings={riverReadings}
              title={
                isChicago
                  ? "USGS river observations"
                  : `USGS observations · ${weather.locationLabel}`
              }
            />
          </div>
        ) : null}
        <BridgeLockNotices showChicago={isChicago} />
        <MarineAlerts
          alerts={weather.alerts}
          alertsAvailable={weather.alertsAvailable}
          scopeLabel={isChicago ? undefined : weather.locationLabel}
        />

        {weather.nearshoreZone ? (
          <section className="rounded-2xl border border-sky-blue/20 bg-white p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-extrabold text-lake-blue mb-2">
              Regional nearshore marine zone
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              This harbor sits in NWS zone{" "}
              <span className="font-semibold">{weather.nearshoreZone.id}</span>
              {" — "}
              {weather.nearshoreZone.name}. That is a regional nearshore forecast
              area (typically within about 5 nautical miles of shore), not a
              dock- or ramp-specific observation.
            </p>
            <a
              href={weather.nearshoreZone.forecastUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-lake-blue hover:underline"
            >
              Open NWS zone forecast for {weather.nearshoreZone.id} →
            </a>
            {weather.marineOffice ? (
              <p className="text-sm text-gray-500 mt-3">
                Coastal waters product office: NWS {weather.marineOffice}
              </p>
            ) : null}
          </section>
        ) : null}

        {weather.marineForecastText ? (
          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
              Coastal waters forecast (excerpt)
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Official NWS coastal waters forecast product excerpt for this
              shore. Read the full product and the zone forecast above before
              boating — point forecasts and airport observations are not marine
              clearance.
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
              Official NOAA/NWS marine forecasts and a qualified skipper&apos;s
              judgment always come first. This site never issues a safe-to-boat
              clearance.
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
