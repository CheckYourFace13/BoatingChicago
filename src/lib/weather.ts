import {
  BOATING_RATING_THRESHOLDS,
  CHICAGO_LAT,
  CHICAGO_LON,
  NDBC_BUOY_ID,
  NWS_ALERT_ZONES,
  NWS_GRID,
  NWS_OBS_STATION,
  WEATHER_FETCH_TIMEOUT_MS,
  WEATHER_REVALIDATE_SECONDS,
  WEATHER_USER_AGENT,
} from "@/config/weather";
import type {
  BoatingConditionRating,
  ChicagoWeatherPayload,
  CurrentConditions,
  DailyForecastPeriod,
  HourlyForecastPeriod,
  LakeConditionsData,
  WeatherAlert,
  WeatherSourceRef,
} from "@/types/weather";

function nwsHeaders(): HeadersInit {
  return {
    "User-Agent": WEATHER_USER_AGENT,
    Accept: "application/geo+json,application/json,text/plain,*/*",
  };
}

async function fetchWithTimeout(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WEATHER_FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      next: { revalidate: WEATHER_REVALIDATE_SECONDS },
    });
  } finally {
    clearTimeout(timer);
  }
}

function cToF(c: number | null | undefined): number | null {
  if (c == null || Number.isNaN(c)) return null;
  return Math.round((c * 9) / 5 + 32);
}

function kmhToMph(kmh: number | null | undefined): number | null {
  if (kmh == null || Number.isNaN(kmh)) return null;
  return Math.round(kmh * 0.621371);
}

function mToMiles(m: number | null | undefined): number | null {
  if (m == null || Number.isNaN(m)) return null;
  return Math.round((m / 1609.344) * 10) / 10;
}

function degToCardinal(deg: number | null | undefined): string | null {
  if (deg == null || Number.isNaN(deg)) return null;
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

function parseWindSpeedString(wind: string | null | undefined): number | null {
  if (!wind) return null;
  const nums = [...wind.matchAll(/(\d+)/g)].map((m) => Number(m[1]));
  if (!nums.length) return null;
  return Math.max(...nums);
}

function heatIndexF(tempF: number, humidityPct: number): number | null {
  if (tempF < 80) return tempF;
  const T = tempF;
  const R = humidityPct;
  let hi =
    -42.379 +
    2.04901523 * T +
    10.14333127 * R -
    0.22475541 * T * R -
    0.00683783 * T * T -
    0.05481717 * R * R +
    0.00122874 * T * T * R +
    0.00085282 * T * R * R -
    0.00000199 * T * T * R * R;
  return Math.round(hi);
}

async function fetchCurrentConditions(
  errors: string[]
): Promise<CurrentConditions | null> {
  const url = `https://api.weather.gov/stations/${NWS_OBS_STATION}/observations/latest`;
  try {
    const res = await fetchWithTimeout(url, { headers: nwsHeaders() });
    if (!res.ok) {
      errors.push(`NWS observation HTTP ${res.status}`);
      return null;
    }
    const json = (await res.json()) as {
      properties?: Record<string, unknown>;
    };
    const p = json.properties || {};
    const tempC = (p.temperature as { value?: number | null } | undefined)?.value;
    const humidity = (p.relativeHumidity as { value?: number | null } | undefined)
      ?.value;
    const windKmh = (p.windSpeed as { value?: number | null } | undefined)?.value;
    const gustKmh = (p.windGust as { value?: number | null } | undefined)?.value;
    const windDeg = (p.windDirection as { value?: number | null } | undefined)
      ?.value;
    const visM = (p.visibility as { value?: number | null } | undefined)?.value;
    const tempF = cToF(tempC ?? null);
    const humidityPct =
      humidity == null ? null : Math.round(humidity);
    const feelsLike =
      tempF != null && humidityPct != null
        ? heatIndexF(tempF, humidityPct)
        : tempF;

    return {
      observedAt: (p.timestamp as string | undefined) || null,
      stationId: NWS_OBS_STATION,
      stationName: "Chicago Midway (KMDW)",
      temperatureF: tempF,
      feelsLikeF: feelsLike,
      description: (p.textDescription as string | undefined) || null,
      windSpeedMph: kmhToMph(windKmh ?? null),
      windGustMph: kmhToMph(gustKmh ?? null),
      windDirectionDeg: windDeg ?? null,
      windDirectionCardinal: degToCardinal(windDeg ?? null),
      humidityPct,
      visibilityMiles: mToMiles(visM ?? null),
      precipLastHourIn: null,
    };
  } catch (err) {
    errors.push(
      `NWS observation failed: ${err instanceof Error ? err.message : "unknown"}`
    );
    return null;
  }
}

async function fetchHourly(
  errors: string[]
): Promise<HourlyForecastPeriod[]> {
  const url = `https://api.weather.gov/gridpoints/${NWS_GRID.office}/${NWS_GRID.gridX},${NWS_GRID.gridY}/forecast/hourly`;
  try {
    const res = await fetchWithTimeout(url, { headers: nwsHeaders() });
    if (!res.ok) {
      errors.push(`NWS hourly forecast HTTP ${res.status}`);
      return [];
    }
    const json = (await res.json()) as {
      properties?: { periods?: Record<string, unknown>[] };
    };
    const periods = json.properties?.periods || [];
    return periods.slice(0, 24).map((p) => ({
      startTime: String(p.startTime || ""),
      temperatureF:
        typeof p.temperature === "number" ? p.temperature : null,
      windSpeedMph: parseWindSpeedString(
        typeof p.windSpeed === "string" ? p.windSpeed : null
      ),
      windGustMph: parseWindSpeedString(
        typeof p.windGust === "string" ? p.windGust : null
      ),
      windDirection: typeof p.windDirection === "string" ? p.windDirection : null,
      shortForecast: typeof p.shortForecast === "string" ? p.shortForecast : null,
      precipProbabilityPct:
        typeof (p.probabilityOfPrecipitation as { value?: number } | undefined)
          ?.value === "number"
          ? (p.probabilityOfPrecipitation as { value: number }).value
          : null,
      isDaytime: Boolean(p.isDaytime),
    }));
  } catch (err) {
    errors.push(
      `NWS hourly failed: ${err instanceof Error ? err.message : "unknown"}`
    );
    return [];
  }
}

async function fetchDaily(errors: string[]): Promise<DailyForecastPeriod[]> {
  const url = `https://api.weather.gov/gridpoints/${NWS_GRID.office}/${NWS_GRID.gridX},${NWS_GRID.gridY}/forecast`;
  try {
    const res = await fetchWithTimeout(url, { headers: nwsHeaders() });
    if (!res.ok) {
      errors.push(`NWS 7-day forecast HTTP ${res.status}`);
      return [];
    }
    const json = (await res.json()) as {
      properties?: { periods?: Record<string, unknown>[] };
    };
    const periods = json.properties?.periods || [];
    return periods.slice(0, 14).map((p) => ({
      name: String(p.name || ""),
      startTime: String(p.startTime || ""),
      isDaytime: Boolean(p.isDaytime),
      temperatureF:
        typeof p.temperature === "number" ? p.temperature : null,
      windSpeed: typeof p.windSpeed === "string" ? p.windSpeed : null,
      windDirection: typeof p.windDirection === "string" ? p.windDirection : null,
      shortForecast: typeof p.shortForecast === "string" ? p.shortForecast : null,
      detailedForecast:
        typeof p.detailedForecast === "string" ? p.detailedForecast : null,
      precipProbabilityPct:
        typeof (p.probabilityOfPrecipitation as { value?: number } | undefined)
          ?.value === "number"
          ? (p.probabilityOfPrecipitation as { value: number }).value
          : null,
    }));
  } catch (err) {
    errors.push(
      `NWS 7-day failed: ${err instanceof Error ? err.message : "unknown"}`
    );
    return [];
  }
}

function isMarineEvent(event: string, headline: string): boolean {
  const t = `${event} ${headline}`.toLowerCase();
  return (
    t.includes("small craft") ||
    t.includes("gale") ||
    t.includes("marine") ||
    t.includes("lake") ||
    t.includes("beach") ||
    t.includes("surf") ||
    t.includes("coastal") ||
    t.includes("waterspout") ||
    t.includes("hazardous seas")
  );
}

async function fetchAlerts(errors: string[]): Promise<WeatherAlert[]> {
  const zoneParam = NWS_ALERT_ZONES.join(",");
  const url = `https://api.weather.gov/alerts/active?zone=${encodeURIComponent(zoneParam)}`;
  try {
    const res = await fetchWithTimeout(url, { headers: nwsHeaders() });
    if (!res.ok) {
      errors.push(`NWS alerts HTTP ${res.status}`);
      return [];
    }
    const json = (await res.json()) as {
      features?: {
        id?: string;
        properties?: Record<string, unknown>;
      }[];
    };
    return (json.features || []).map((f) => {
      const p = f.properties || {};
      const event = String(p.event || "Alert");
      const headline = String(p.headline || event);
      return {
        id: String(f.id || p.id || headline),
        event,
        headline,
        severity: String(p.severity || "Unknown"),
        urgency: String(p.urgency || "Unknown"),
        description: String(p.description || "").slice(0, 2000),
        instruction: p.instruction ? String(p.instruction).slice(0, 1000) : null,
        onset: p.onset ? String(p.onset) : null,
        ends: p.ends ? String(p.ends) : null,
        isMarine: isMarineEvent(event, headline),
        sourceUrl: String(p["@id"] || f.id || "https://www.weather.gov/lot"),
      };
    });
  } catch (err) {
    errors.push(
      `NWS alerts failed: ${err instanceof Error ? err.message : "unknown"}`
    );
    return [];
  }
}

async function fetchLakeConditions(
  errors: string[]
): Promise<LakeConditionsData> {
  const buoyId = NDBC_BUOY_ID;
  const url = `https://www.ndbc.noaa.gov/data/realtime2/${buoyId}.txt`;
  try {
    const res = await fetchWithTimeout(url, {
      headers: { "User-Agent": WEATHER_USER_AGENT },
    });
    if (!res.ok) {
      errors.push(`NDBC buoy ${buoyId} HTTP ${res.status}`);
      return {
        waterTempF: null,
        waveHeightFt: null,
        buoyId,
        observedAt: null,
        notes: "Not currently available from source",
      };
    }
    const text = await res.text();
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
    if (!lines.length) {
      return {
        waterTempF: null,
        waveHeightFt: null,
        buoyId,
        observedAt: null,
        notes: "Not currently available from source",
      };
    }
    const cols = lines[0].split(/\s+/);
    // YY MM DD hh mm WDIR WSPD GST WVHT DPD APD MWD PRES ATMP WTMP ...
    const parseNum = (v: string | undefined): number | null => {
      if (!v || v === "MM" || v === "NaN") return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };
    const wvhtM = parseNum(cols[8]);
    const wtmpC = parseNum(cols[14]);
    const yy = cols[0];
    const mm = cols[1];
    const dd = cols[2];
    const hh = cols[3];
    const mi = cols[4];
    const observedAt =
      yy && mm && dd && hh && mi
        ? `${yy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}T${hh.padStart(2, "0")}:${mi.padStart(2, "0")}:00Z`
        : null;

    return {
      waterTempF: cToF(wtmpC),
      waveHeightFt:
        wvhtM == null ? null : Math.round(wvhtM * 3.28084 * 10) / 10,
      buoyId,
      observedAt,
      notes:
        wvhtM == null && wtmpC == null
          ? "Not currently available from source"
          : null,
    };
  } catch (err) {
    errors.push(
      `NDBC failed: ${err instanceof Error ? err.message : "unknown"}`
    );
    return {
      waterTempF: null,
      waveHeightFt: null,
      buoyId,
      observedAt: null,
      notes: "Not currently available from source",
    };
  }
}

async function fetchSunTimes(
  errors: string[]
): Promise<{ sunriseIso: string | null; sunsetIso: string | null }> {
  const url = `https://api.sunrise-sunset.org/json?lat=${CHICAGO_LAT}&lng=${CHICAGO_LON}&formatted=0`;
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      errors.push(`Sunrise-sunset HTTP ${res.status}`);
      return { sunriseIso: null, sunsetIso: null };
    }
    const json = (await res.json()) as {
      results?: { sunrise?: string; sunset?: string };
      status?: string;
    };
    if (json.status !== "OK") {
      errors.push("Sunrise-sunset status not OK");
      return { sunriseIso: null, sunsetIso: null };
    }
    return {
      sunriseIso: json.results?.sunrise || null,
      sunsetIso: json.results?.sunset || null,
    };
  } catch (err) {
    errors.push(
      `Sunrise-sunset failed: ${err instanceof Error ? err.message : "unknown"}`
    );
    return { sunriseIso: null, sunsetIso: null };
  }
}

async function fetchMarineForecastText(
  errors: string[]
): Promise<string | null> {
  // Nearshore marine forecast product for LOT
  const listUrl =
    "https://api.weather.gov/products?location=LOT&type=CWF&limit=1";
  try {
    const listRes = await fetchWithTimeout(listUrl, { headers: nwsHeaders() });
    if (!listRes.ok) {
      errors.push(`NWS marine product list HTTP ${listRes.status}`);
      return null;
    }
    const listJson = (await listRes.json()) as {
      "@graph"?: { "@id"?: string; id?: string }[];
    };
    const first = listJson["@graph"]?.[0];
    const productUrl = first?.["@id"];
    if (!productUrl) return null;
    const prodRes = await fetchWithTimeout(productUrl, { headers: nwsHeaders() });
    if (!prodRes.ok) return null;
    const prod = (await prodRes.json()) as { productText?: string };
    const text = prod.productText?.trim();
    if (!text) return null;
    // Keep a short excerpt — do not dump the entire product
    return text.slice(0, 1800);
  } catch (err) {
    errors.push(
      `Marine forecast failed: ${err instanceof Error ? err.message : "unknown"}`
    );
    return null;
  }
}

export function computeBoatingRating(input: {
  windSpeedMph: number | null;
  windGustMph: number | null;
  waveHeightFt: number | null;
  precipProbabilityPct: number | null;
  shortForecast: string | null;
  alerts: WeatherAlert[];
}): BoatingConditionRating {
  const factors: string[] = [];
  let level: BoatingConditionRating["level"] = "Good";
  const t = BOATING_RATING_THRESHOLDS;

  const wind = input.windSpeedMph;
  const gust = input.windGustMph;
  const wave = input.waveHeightFt;
  const precip = input.precipProbabilityPct;
  const forecastText = (input.shortForecast || "").toLowerCase();
  const thunder =
    forecastText.includes("thunder") || forecastText.includes("tstm");

  const marineWarning = input.alerts.find(
    (a) =>
      a.isMarine &&
      /warning|gale|storm|hurricane/i.test(`${a.event} ${a.severity}`)
  );
  const smallCraft = input.alerts.find((a) =>
    /small craft/i.test(`${a.event} ${a.headline}`)
  );

  if (marineWarning) {
    level = "Poor";
    factors.push(`Active NOAA/NWS marine warning: ${marineWarning.event}`);
  }

  if (wind != null && wind >= t.windPoorMph) {
    level = "Poor";
    factors.push(`Sustained wind ${wind} mph`);
  } else if (wind != null && wind >= t.windCautionMph) {
    if (level === "Good") level = "Caution";
    factors.push(`Sustained wind ${wind} mph`);
  }

  if (gust != null && gust >= t.gustPoorMph) {
    level = "Poor";
    factors.push(`Gusts ${gust} mph`);
  } else if (gust != null && gust >= t.gustCautionMph) {
    if (level === "Good") level = "Caution";
    factors.push(`Gusts ${gust} mph`);
  }

  if (wave != null && wave >= t.wavePoorFt) {
    level = "Poor";
    factors.push(`Wave height about ${wave} ft`);
  } else if (wave != null && wave >= t.waveCautionFt) {
    if (level === "Good") level = "Caution";
    factors.push(`Wave height about ${wave} ft`);
  }

  if (smallCraft && level === "Good") {
    level = "Caution";
    factors.push(`Active small craft advisory (${smallCraft.event})`);
  } else if (smallCraft) {
    factors.push(`Active small craft advisory (${smallCraft.event})`);
  }

  if (thunder && precip != null && precip >= t.precipCautionPct) {
    if (level === "Good") level = "Caution";
    factors.push(`Thunderstorm chance in forecast (${precip}% precip)`);
  } else if (thunder) {
    if (level === "Good") level = "Caution";
    factors.push("Thunderstorm language in the near-term forecast");
  }

  if (!factors.length) {
    factors.push("No elevated wind, wave, or advisory factors from available data");
  }

  const reason =
    level === "Good"
      ? `Good — ${factors[0]}.`
      : `${level} — ${factors.join("; ")}.`;

  return { level, reason, factors };
}

export async function getChicagoWeather(): Promise<ChicagoWeatherPayload> {
  const errors: string[] = [];
  const sources: WeatherSourceRef[] = [
    {
      name: "National Weather Service (api.weather.gov)",
      url: "https://www.weather.gov/lot",
    },
    {
      name: "NOAA National Data Buoy Center",
      url: `https://www.ndbc.noaa.gov/station_page.php?station=${NDBC_BUOY_ID}`,
    },
    {
      name: "Sunrise-Sunset.org (sunrise/sunset times)",
      url: "https://sunrise-sunset.org/",
    },
  ];

  const [current, hourly, daily, alerts, lake, sun, marineForecastText] =
    await Promise.all([
      fetchCurrentConditions(errors),
      fetchHourly(errors),
      fetchDaily(errors),
      fetchAlerts(errors),
      fetchLakeConditions(errors),
      fetchSunTimes(errors),
      fetchMarineForecastText(errors),
    ]);

  const nearTerm = hourly[0] || null;
  const rating = computeBoatingRating({
    windSpeedMph: current?.windSpeedMph ?? nearTerm?.windSpeedMph ?? null,
    windGustMph: current?.windGustMph ?? nearTerm?.windGustMph ?? null,
    waveHeightFt: lake.waveHeightFt,
    precipProbabilityPct: nearTerm?.precipProbabilityPct ?? null,
    shortForecast: nearTerm?.shortForecast ?? current?.description ?? null,
    alerts,
  });

  return {
    fetchedAt: new Date().toISOString(),
    locationLabel: "Chicago / nearshore Lake Michigan",
    current,
    hourly,
    daily,
    alerts,
    lake,
    sunriseIso: sun.sunriseIso,
    sunsetIso: sun.sunsetIso,
    marineForecastText,
    rating,
    sources,
    errors,
  };
}

export function formatTemp(f: number | null | undefined): string {
  if (f == null) return "Not currently available from source";
  return `${f}°F`;
}

export function formatMph(v: number | null | undefined): string {
  if (v == null) return "Not currently available from source";
  return `${v} mph`;
}

export { WEATHER_REVALIDATE_SECONDS };
