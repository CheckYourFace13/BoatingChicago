import { getPublishedEvents } from "@/data/geo";
import { buildConditionsTickerItems } from "@/lib/conditions-ticker";
import { getChicagoNews } from "@/lib/news";
import { getWeatherForLocation } from "@/lib/weather";
import { ConditionsTicker } from "./ConditionsTicker";

/**
 * Server-rendered sitewide conditions wire below the header.
 * Uses existing weather/news/events caches — no client polling.
 */
export async function SiteConditionsTicker() {
  try {
    const [chicago, lakeGeneva, chain, waukegan] = await Promise.all([
      getWeatherForLocation("chicago"),
      getWeatherForLocation("lake-geneva"),
      getWeatherForLocation("chain-o-lakes"),
      getWeatherForLocation("waukegan"),
    ]);

    const news = await getChicagoNews({ alerts: chicago.alerts });
    const events = getPublishedEvents();

    const items = buildConditionsTickerItems({
      chicago,
      lakeGeneva,
      chain,
      waukegan,
      news: news.items,
      events,
    });

    return <ConditionsTicker items={items} />;
  } catch {
    // Never break the shell if weather/news fetch fails
    return null;
  }
}
