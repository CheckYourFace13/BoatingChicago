"use client";

import { trackAnalyticsEvent } from "@/lib/analytics";
import type { WeatherAlert, WeatherSourceRef } from "@/types/weather";

export function MarineAlerts({
  alerts,
  scopeLabel = "configured Chicago / nearshore Lake Michigan zones",
}: {
  alerts: WeatherAlert[];
  scopeLabel?: string;
}) {
  if (!alerts.length) {
    return (
      <section id="marine-alerts">
        <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
          Active NOAA/NWS alerts
        </h2>
        <p className="text-gray-600">
          No active alerts for {scopeLabel} right now.
        </p>
      </section>
    );
  }

  return (
    <section id="marine-alerts">
      <h2 className="text-2xl md:text-3xl font-extrabold text-lake-blue mb-2">
        Active NOAA/NWS alerts
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Official National Weather Service products. These are not BoatingChicago
        opinions.
      </p>
      <div className="space-y-4">
        {alerts.map((a) => (
          <article
            key={a.id}
            className={`rounded-2xl border-2 p-5 ${
              a.isMarine
                ? "border-coral bg-coral/5"
                : "border-amber-400 bg-amber-50"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-coral mb-1">
              Official NOAA/NWS{a.isMarine ? " · Marine-related" : ""}
            </p>
            <h3 className="text-xl font-extrabold text-lake-blue mb-1">
              {a.event}
            </h3>
            <p className="text-sm font-semibold text-gray-800 mb-3">
              {a.headline}
            </p>
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed mb-3 line-clamp-8">
              {a.description}
            </p>
            <a
              href={
                a.sourceUrl.startsWith("http")
                  ? a.sourceUrl
                  : "https://www.weather.gov/lot"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-coral hover:underline"
              onClick={() =>
                trackAnalyticsEvent("weather_alert_click", {
                  event_name: a.event,
                })
              }
            >
              View official alert →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function WeatherSourceAttribution({
  sources,
  fetchedAt,
  errors,
}: {
  sources: WeatherSourceRef[];
  fetchedAt: string;
  errors: string[];
}) {
  return (
    <section className="rounded-2xl bg-light-blue/60 border border-sky-blue/20 p-5 text-sm text-gray-700">
      <h2 className="font-extrabold text-lake-blue mb-2">Data sources</h2>
      <ul className="space-y-1 mb-3">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-lake-blue hover:underline"
            >
              {s.name}
            </a>
          </li>
        ))}
      </ul>
      <p>
        Last fetched{" "}
        {new Date(fetchedAt).toLocaleString("en-US", {
          timeZone: "America/Chicago",
        })}{" "}
        (approx. 15-minute cache).
      </p>
      {errors.length ? (
        <p className="mt-2 text-amber-800">
          Some sources were unavailable: {errors.join(" · ")}
        </p>
      ) : null}
    </section>
  );
}
