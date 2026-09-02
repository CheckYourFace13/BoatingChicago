"use client";

import { PopularOnTheWater } from "@/components/PopularOnTheWater";

/**
 * Subtle weather-page monetization — only when the informational rating is Good.
 * Sits after forecast / safety content. Does not imply safety certification.
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
        title="Book an experience"
        subtitle="Conditions look favorable for many recreational boaters — always verify official NOAA/NWS marine forecasts and use your own judgment. Here are popular Chicago water experiences you can book online."
        pageSlug="weather"
        limit={3}
        placement="weather_contextual"
        section="weather_next_steps"
      />
    </section>
  );
}
