import Link from "next/link";
import {
  BoatingBriefViewTracker,
  BoatingConditionRatingCard,
} from "@/components/weather/BoatingConditionRating";
import { NewsList } from "@/components/news/NewsCard";
import type { ChicagoWeatherPayload } from "@/types/weather";
import type { NewsItem } from "@/types/news";

export function ChicagoBoatingBrief({
  weather,
  news,
  tip,
  compact = false,
}: {
  weather: ChicagoWeatherPayload;
  news: NewsItem[];
  tip: string;
  compact?: boolean;
}) {
  const alert = weather.alerts[0];
  const recent = news.slice(0, compact ? 2 : 5);

  return (
    <section className={compact ? "" : "space-y-6"}>
      <BoatingBriefViewTracker />
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
          Chicago Boating Brief
        </h2>
        <p className="text-gray-600 max-w-3xl">
          A quick read of conditions, official alerts, and recent source-cited
          updates for Lake Michigan boaters.
        </p>
      </div>

      <div className={`grid gap-4 ${compact ? "" : "lg:grid-cols-2"}`}>
        <BoatingConditionRatingCard rating={weather.rating} />
        <div className="rounded-2xl border border-sky-blue/20 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-lake-blue/70 mb-2">
            Official alert spotlight
          </p>
          {alert ? (
            <>
              <p className="text-xs font-bold text-coral mb-1">NOAA/NWS</p>
              <p className="font-extrabold text-lake-blue mb-2">{alert.event}</p>
              <p className="text-sm text-gray-700 line-clamp-4 mb-3">
                {alert.headline}
              </p>
            </>
          ) : (
            <p className="text-gray-600 mb-3">
              No active alerts in configured nearshore zones right now.
            </p>
          )}
          <p className="text-xs font-bold uppercase tracking-widest text-lake-blue/70 mb-2">
            Seasonal tip
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">{tip}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/weather"
              className="text-sm font-bold text-coral hover:underline"
            >
              Full weather →
            </Link>
            <Link
              href="/news"
              className="text-sm font-bold text-coral hover:underline"
            >
              All news →
            </Link>
          </div>
        </div>
      </div>

      {!compact ? (
        <div>
          <h3 className="text-lg font-extrabold text-lake-blue mb-3">
            Recent updates
          </h3>
          <NewsList items={recent} compact />
        </div>
      ) : recent.length ? (
        <div className="mt-4">
          <NewsList items={recent} compact />
        </div>
      ) : null}
    </section>
  );
}

export function WhatsHappeningOnTheWater({
  weather,
  news,
}: {
  weather: ChicagoWeatherPayload;
  news: NewsItem[];
}) {
  const alert = weather.alerts.find((a) => a.isMarine) || weather.alerts[0];
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
            What&apos;s Happening on the Water
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Live Chicago boating conditions and a few source-cited updates —
            without crowding your trip planning.
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
          <Link href="/weather" className="font-bold text-coral hover:underline">
            Weather
          </Link>
          <Link href="/news" className="font-bold text-coral hover:underline">
            News
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 rounded-2xl border border-sky-blue/20 bg-light-blue/50 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-lake-blue/70 mb-2">
            Conditions
          </p>
          <p className="text-2xl font-extrabold text-lake-blue mb-1">
            {weather.rating.level}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
            {weather.rating.reason}
          </p>
        </div>
        <div className="lg:col-span-2 rounded-2xl border border-sky-blue/20 bg-white p-5">
          {alert ? (
            <div className="mb-4 pb-4 border-b border-sky-blue/15">
              <p className="text-xs font-bold uppercase tracking-widest text-coral mb-1">
                NOAA/NWS alert
              </p>
              <p className="font-extrabold text-lake-blue">{alert.event}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{alert.headline}</p>
            </div>
          ) : null}
          <NewsList items={news.slice(0, 3)} compact />
        </div>
      </div>
    </section>
  );
}
