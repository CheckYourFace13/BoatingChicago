import Link from "next/link";
import { HomepageTrackLink } from "@/components/HomepageTrackLink";
import { NewsList } from "@/components/news/NewsCard";
import { BoatingConditionRatingCard } from "@/components/weather/BoatingConditionRating";
import type { EventItem } from "@/types/geo";
import type { NewsItem } from "@/types/news";
import type { ChicagoWeatherPayload } from "@/types/weather";

function formatMph(v: number | null | undefined): string | null {
  if (v == null) return null;
  return `${v} mph`;
}

export function TodayOnTheWater({
  weather,
  news,
  events,
}: {
  weather: ChicagoWeatherPayload;
  news: NewsItem[];
  events: EventItem[];
}) {
  const current = weather.current;
  const wind =
    current?.windSpeedMph ?? weather.hourly[0]?.windSpeedMph ?? null;
  const gust = current?.windGustMph ?? weather.hourly[0]?.windGustMph ?? null;
  const dir =
    current?.windDirectionCardinal || weather.hourly[0]?.windDirection || null;
  const alert = weather.alerts.find((a) => a.isMarine) || weather.alerts[0];
  const upcoming = events.slice(0, 2);

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-sky-blue mb-2">
            Live from NOAA / NWS
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
            Today on the Water
            <span className="ml-3 inline-flex align-middle text-base md:text-lg font-extrabold text-sky-blue">
              · {weather.rating.level}
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Current Chicago boating conditions, the latest source-cited news, and
            what&apos;s coming up — refreshed with our weather and news cache.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-bold shrink-0">
          <HomepageTrackLink
            href="/weather"
            event="homepage_weather_click"
            params={{ placement: "today_on_water" }}
            className="text-coral hover:underline"
          >
            Full Weather
          </HomepageTrackLink>
          <HomepageTrackLink
            href="/news"
            event="homepage_news_click"
            params={{ placement: "today_on_water" }}
            className="text-coral hover:underline"
          >
            All News
          </HomepageTrackLink>
          <Link href="/events" className="text-coral hover:underline">
            Events
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-lake-blue/70">
            Current Conditions
          </h3>
          <BoatingConditionRatingCard rating={weather.rating} />
          <div className="rounded-2xl border border-sky-blue/20 bg-white p-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Temp</p>
              <p className="font-extrabold text-lake-blue">
                {current?.temperatureF != null
                  ? `${current.temperatureF}°F`
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Wind</p>
              <p className="font-extrabold text-lake-blue">
                {wind != null
                  ? `${dir ? `${dir} ` : ""}${formatMph(wind)}`
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Gusts</p>
              <p className="font-extrabold text-lake-blue">
                {formatMph(gust) ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Waves</p>
              <p className="font-extrabold text-lake-blue">
                {weather.lake.waveHeightFt != null
                  ? `${weather.lake.waveHeightFt} ft`
                  : "—"}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-sky-blue/20 bg-light-blue/40 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-lake-blue/70 mb-1">
              Alerts
            </p>
            {alert ? (
              <>
                <p className="font-extrabold text-coral text-sm mb-1">{alert.event}</p>
                <p className="text-sm text-gray-700 line-clamp-2 mb-2">{alert.headline}</p>
              </>
            ) : (
              <p className="text-sm text-gray-700 mb-2">No active marine alerts right now.</p>
            )}
            <div className="flex flex-wrap gap-3 text-xs font-bold">
              <Link href="/marinas" className="text-coral hover:underline">
                Marinas
              </Link>
              <Link href="/boat-launches" className="text-coral hover:underline">
                Launches
              </Link>
              <Link href="/destinations" className="text-coral hover:underline">
                Destinations
              </Link>
              <Link href="/guides" className="text-coral hover:underline">
                Guides
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-lake-blue/70">
            Latest Boating News
          </h3>
          <NewsList items={news.slice(0, 3)} compact />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-lake-blue/70">
            What&apos;s Coming Up
          </h3>
          {upcoming.length ? (
            <ul className="space-y-3">
              {upcoming.map((event) => (
                <li
                  key={event.slug}
                  className="rounded-2xl border border-sky-blue/20 bg-white p-4"
                >
                  <p className="text-xs font-bold text-sky-blue mb-1">
                    {event.startDate}
                    {event.endDate && event.endDate !== event.startDate
                      ? ` – ${event.endDate}`
                      : ""}
                  </p>
                  <p className="font-extrabold text-lake-blue mb-1">
                    <Link href="/events" className="hover:underline">
                      {event.title}
                    </Link>
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                    {event.summary}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs font-semibold">
                    <Link href="/events" className="text-coral hover:underline">
                      Events calendar →
                    </Link>
                    <a
                      href={event.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-blue hover:underline"
                    >
                      {event.source.name} →
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-sky-blue/20 bg-white p-5 text-sm text-gray-600">
              No upcoming curated events right now. Check the{" "}
              <Link href="/events" className="font-semibold text-coral hover:underline">
                events page
              </Link>{" "}
              for seasonal schedules.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
