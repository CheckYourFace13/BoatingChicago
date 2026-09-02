"use client";

import { PopularOnTheWater } from "@/components/PopularOnTheWater";

/**
 * Subtle weather-page monetization — only when the informational rating is Good.
 * Does not imply safety; sits after forecast content.
 */
export function WeatherGoodDayOffers({
  conditionLevel,
}: {
  conditionLevel: "Good" | "Caution" | "Poor";
}) {
  if (conditionLevel !== "Good") return null;

  return (
    <section className="rounded-3xl border border-sky-blue/25 bg-light-blue/30 p-6 md:p-8">
      <PopularOnTheWater
        title="Good Day to Get on the Water?"
        subtitle="Our conditions summary looks favorable for many recreational boaters — but always verify official NOAA/NWS marine forecasts and use your own judgment. Here are popular ticketed Chicago water experiences you can check online."
        pageSlug="weather"
        limit={3}
        placement="weather_good_day"
      />
    </section>
  );
}
