"use client";

import { PopularOnTheWater } from "@/components/PopularOnTheWater";

/**
 * Weather-page experiences. Copy must not treat our snapshot as a green light.
 */
export function WeatherGoodDayOffers({
  conditionLevel,
}: {
  conditionLevel: "Good" | "Caution" | "Poor";
}) {
  if (conditionLevel === "Poor") return null;

  return (
    <section className="rounded-3xl border border-sky-blue/25 bg-light-blue/30 p-6 md:p-8">
      <PopularOnTheWater
        title="Book an experience"
        subtitle="Listing these operators is not a weather clearance. Verify NOAA/NWS marine forecasts and use your own judgment before you go."
        pageSlug="weather"
        limit={3}
        placement="weather_contextual"
        section="weather_next_steps"
      />
    </section>
  );
}
