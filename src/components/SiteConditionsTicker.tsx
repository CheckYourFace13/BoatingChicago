import { getPublishedEvents } from "@/data/geo";
import { buildConditionsTickerItems } from "@/lib/conditions-ticker";
import { getWeatherForLocation } from "@/lib/weather";
import { ConditionsTicker } from "./ConditionsTicker";

/**
 * Server-rendered sitewide conditions wire below the header.
 * Uses weather/events caches only — no RSS fan-out on every page shell.
 * Safety/alert copy comes from Chicago NWS alerts already on the weather payload.
 */
export async function SiteConditionsTicker() {
  try {
    const [chicago, lakeGeneva, chain, waukegan] = await Promise.all([
      getWeatherForLocation("chicago"),
      getWeatherForLocation("lake-geneva"),
      getWeatherForLocation("chain-o-lakes"),
      getWeatherForLocation("waukegan"),
    ]);

    const events = getPublishedEvents();

    const items = buildConditionsTickerItems({
      chicago,
      lakeGeneva,
      chain,
      waukegan,
      events,
    });

    return <ConditionsTicker items={items} />;
  } catch {
    // Never break the shell if weather fetch fails
    return null;
  }
}
