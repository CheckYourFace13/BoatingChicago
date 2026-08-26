"use client";

import Link from "next/link";
import {
  DEFAULT_WEATHER_LOCATION_ID,
  weatherLocations,
} from "@/config/weather-locations";
import { trackAnalyticsEvent } from "@/lib/analytics";

/**
 * Query-param location switcher for the single /weather page.
 * The default location links to the bare canonical URL so /weather never
 * duplicates itself as /weather?location=chicago.
 */
export function WeatherLocationSelector({
  activeLocationId,
}: {
  activeLocationId: string;
}) {
  return (
    <section aria-labelledby="weather-location-heading">
      <h2
        id="weather-location-heading"
        className="text-xs font-bold uppercase tracking-widest text-lake-blue/70 mb-3"
      >
        Choose a boating area
      </h2>
      <div className="flex flex-wrap gap-2">
        {weatherLocations.map((loc) => {
          const isActive = loc.id === activeLocationId;
          const href =
            loc.id === DEFAULT_WEATHER_LOCATION_ID
              ? "/weather"
              : `/weather?location=${loc.id}`;

          return (
            <Link
              key={loc.id}
              href={href}
              scroll={false}
              aria-current={isActive ? "true" : undefined}
              onClick={() =>
                trackAnalyticsEvent("weather_location_select", {
                  location_id: loc.id,
                })
              }
              className={`px-4 py-2 font-semibold text-sm rounded-full transition-colors ${
                isActive
                  ? "bg-lake-blue text-white"
                  : "bg-light-blue text-lake-blue hover:bg-sky-blue/20"
              }`}
            >
              {loc.label}
            </Link>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Forecasts come from the nearest National Weather Service grid and
        station for each area.
      </p>
    </section>
  );
}
