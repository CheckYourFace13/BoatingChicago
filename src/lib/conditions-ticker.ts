import type { EventItem } from "@/types/geo";
import type { NewsItem } from "@/types/news";
import type { ChicagoWeatherPayload } from "@/types/weather";

export type TickerKind =
  | "weather"
  | "alert"
  | "news"
  | "event"
  | "rating";

export interface ConditionsTickerItem {
  id: string;
  label: string;
  href: string;
  kind: TickerKind;
}

function formatWind(weather: ChicagoWeatherPayload): string | null {
  const speed =
    weather.current?.windSpeedMph ?? weather.hourly[0]?.windSpeedMph ?? null;
  if (speed == null) return null;
  const dir =
    weather.current?.windDirectionCardinal ||
    weather.hourly[0]?.windDirection ||
    null;
  return dir ? `WIND ${dir} ${speed} MPH` : `WIND ${speed} MPH`;
}

function formatGust(weather: ChicagoWeatherPayload): string | null {
  const gust =
    weather.current?.windGustMph ?? weather.hourly[0]?.windGustMph ?? null;
  if (gust == null) return null;
  return `GUSTS ${gust} MPH`;
}

function formatWaves(weather: ChicagoWeatherPayload): string | null {
  const ft = weather.lake.waveHeightFt;
  if (ft == null) return null;
  return `WAVES ${ft} FT`;
}

function formatWater(weather: ChicagoWeatherPayload): string | null {
  const t = weather.lake.waterTempF;
  if (t == null) return null;
  return `WATER ${t}°`;
}

function formatTemp(weather: ChicagoWeatherPayload, place: string): string | null {
  const t =
    weather.current?.temperatureF ?? weather.hourly[0]?.temperatureF ?? null;
  if (t == null) return null;
  return `${place} ${t}°`;
}

function stormRisk(weather: ChicagoWeatherPayload): string | null {
  const near = weather.hourly[0];
  if (!near) return null;
  const text = (near.shortForecast || "").toLowerCase();
  const precip = near.precipProbabilityPct;
  const thunder = text.includes("thunder") || text.includes("tstm");
  if (thunder) return "STORM RISK IN FORECAST";
  if (precip != null && precip >= 50) return `PRECIP ${precip}%`;
  return null;
}

/**
 * Build ticker segments from live weather/news/events.
 * Omits unavailable measurements — never fabricates values.
 */
export function buildConditionsTickerItems(input: {
  chicago: ChicagoWeatherPayload;
  lakeGeneva?: ChicagoWeatherPayload | null;
  chain?: ChicagoWeatherPayload | null;
  waukegan?: ChicagoWeatherPayload | null;
  news?: NewsItem[];
  events?: EventItem[];
}): ConditionsTickerItem[] {
  const { chicago } = input;
  const items: ConditionsTickerItem[] = [];

  const chicagoTemp = formatTemp(chicago, "CHICAGO");
  if (chicagoTemp) {
    items.push({
      id: "chi-temp",
      label: chicagoTemp,
      href: "/weather",
      kind: "weather",
    });
  }

  const wind = formatWind(chicago);
  if (wind) {
    items.push({
      id: "chi-wind",
      label: wind,
      href: "/weather",
      kind: "weather",
    });
  }

  const gust = formatGust(chicago);
  if (gust) {
    items.push({
      id: "chi-gust",
      label: gust,
      href: "/weather",
      kind: "weather",
    });
  }

  const waves = formatWaves(chicago);
  if (waves) {
    items.push({
      id: "chi-waves",
      label: waves,
      href: "/weather",
      kind: "weather",
    });
  }

  const water = formatWater(chicago);
  if (water) {
    items.push({
      id: "chi-water",
      label: water,
      href: "/weather",
      kind: "weather",
    });
  }

  items.push({
    id: "chi-rating",
    label: `BOATING: ${chicago.rating.level.toUpperCase()}`,
    href: "/weather",
    kind: "rating",
  });

  const marineAlerts = chicago.alerts.filter((a) => a.isMarine);
  if (marineAlerts.length > 0) {
    const top = marineAlerts[0];
    items.push({
      id: `alert-${top.id}`,
      label: `ALERT: ${top.event.toUpperCase()}`,
      href: "/weather#marine-alerts",
      kind: "alert",
    });
  } else {
    items.push({
      id: "no-alerts",
      label: "NO MARINE ALERTS",
      href: "/weather#marine-alerts",
      kind: "alert",
    });
  }

  const storm = stormRisk(chicago);
  if (storm) {
    items.push({
      id: "storm",
      label: storm,
      href: "/weather",
      kind: "weather",
    });
  }

  const genevaTemp = input.lakeGeneva
    ? formatTemp(input.lakeGeneva, "LAKE GENEVA")
    : null;
  if (genevaTemp) {
    items.push({
      id: "geneva-temp",
      label: genevaTemp,
      href: "/weather?location=lake-geneva",
      kind: "weather",
    });
  }

  const chainTemp = input.chain
    ? formatTemp(input.chain, "CHAIN O'LAKES")
    : null;
  if (chainTemp) {
    items.push({
      id: "chain-temp",
      label: chainTemp,
      href: "/weather?location=chain-o-lakes",
      kind: "weather",
    });
  }

  const waukeganTemp = input.waukegan
    ? formatTemp(input.waukegan, "WAUKEGAN")
    : null;
  if (waukeganTemp) {
    items.push({
      id: "waukegan-temp",
      label: waukeganTemp,
      href: "/weather?location=waukegan",
      kind: "weather",
    });
  }

  const nextEvent = input.events?.[0];
  if (nextEvent) {
    items.push({
      id: `event-${nextEvent.slug}`,
      label: `UPCOMING: ${nextEvent.title.toUpperCase()}`,
      href: "/events",
      kind: "event",
    });
  }

  const closureOrSafety = input.news?.find(
    (n) =>
      n.category === "Safety" ||
      /closure|closed|warning|advisory|harbor/i.test(
        `${n.headline} ${n.originalSummary}`
      )
  );
  if (closureOrSafety) {
    items.push({
      id: `news-${closureOrSafety.id}`,
      label: `NEWS: ${closureOrSafety.headline.toUpperCase().slice(0, 72)}`,
      href: closureOrSafety.qualifiesForArticlePage
        ? `/news/${closureOrSafety.slug}`
        : "/news",
      kind: "news",
    });
  }

  return items;
}
