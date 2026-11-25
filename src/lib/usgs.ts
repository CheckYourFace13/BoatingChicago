/**
 * USGS Instantaneous Values for a few planning-relevant inland rivers and lakes.
 * Free waterservices.usgs.gov — no API key.
 */

export interface UsgsGauge {
  site: string;
  name: string;
  waterway: string;
  lakeSlug?: string;
  /** Weather location ids that should surface this gauge on /weather */
  weatherLocationIds?: string[];
  parameter: "00065" | "00060";
  unitLabel: string;
  sourceUrl: string;
}

export const USGS_GAUGES: UsgsGauge[] = [
  {
    site: "05532500",
    name: "Des Plaines River at Riverside, IL",
    waterway: "Des Plaines River",
    lakeSlug: "des-plaines-river",
    weatherLocationIds: ["chicago"],
    parameter: "00065",
    unitLabel: "ft gage height",
    sourceUrl: "https://waterdata.usgs.gov/monitoring-location/05532500/",
  },
  {
    site: "05540500",
    name: "DuPage River at Shorewood, IL",
    waterway: "DuPage River",
    lakeSlug: "dupage-river",
    weatherLocationIds: ["chicago"],
    parameter: "00065",
    unitLabel: "ft gage height",
    sourceUrl: "https://waterdata.usgs.gov/monitoring-location/05540500/",
  },
  {
    site: "05550000",
    name: "Fox River at Algonquin, IL",
    waterway: "Fox River / Chain",
    lakeSlug: "fox-river",
    weatherLocationIds: ["chicago"],
    parameter: "00065",
    unitLabel: "ft gage height",
    sourceUrl: "https://waterdata.usgs.gov/monitoring-location/05550000/",
  },
  {
    site: "05536123",
    name: "Chicago River at Columbus Drive, Chicago, IL",
    waterway: "Chicago River",
    weatherLocationIds: ["chicago"],
    parameter: "00065",
    unitLabel: "ft gage height",
    sourceUrl: "https://waterdata.usgs.gov/monitoring-location/05536123/",
  },
  {
    site: "04082500",
    name: "Lake Winnebago at Oshkosh, WI",
    waterway: "Lake Winnebago",
    lakeSlug: "lake-winnebago",
    weatherLocationIds: ["fond-du-lac"],
    parameter: "00065",
    unitLabel: "ft gage height",
    sourceUrl: "https://waterdata.usgs.gov/monitoring-location/04082500/",
  },
  {
    site: "04084445",
    name: "Fox River at Appleton, WI",
    waterway: "Fox River (WI)",
    weatherLocationIds: ["fond-du-lac", "green-bay"],
    parameter: "00065",
    unitLabel: "ft gage height",
    sourceUrl: "https://waterdata.usgs.gov/monitoring-location/04084445/",
  },
  {
    site: "040851385",
    name: "Fox River at Oil Tank Depot at Green Bay, WI",
    waterway: "Fox River / Green Bay",
    weatherLocationIds: ["green-bay"],
    parameter: "00065",
    unitLabel: "ft gage height",
    sourceUrl: "https://waterdata.usgs.gov/monitoring-location/040851385/",
  },
];

export const USGS_STALE_MS = 6 * 60 * 60 * 1000;
export const USGS_REVALIDATE_SECONDS = 1800;
export const USGS_FETCH_TIMEOUT_MS = 8000;

export interface UsgsReading {
  gauge: UsgsGauge;
  value: number | null;
  observedAt: string | null;
  stale: boolean;
  error: string | null;
}

function parseUsgsTimeSeries(json: unknown, site: string, parameter: string): {
  value: number | null;
  observedAt: string | null;
} {
  const root = json as {
    value?: {
      timeSeries?: {
        sourceInfo?: { siteCode?: { value?: string }[] };
        variable?: { variableCode?: { value?: string }[] };
        values?: { value?: { value?: string; dateTime?: string }[] }[];
      }[];
    };
  };
  const series = root.value?.timeSeries ?? [];
  const match =
    series.find((s) => {
      const siteOk = s.sourceInfo?.siteCode?.some((c) => c.value === site);
      const paramOk = s.variable?.variableCode?.some((c) => c.value === parameter);
      return siteOk && paramOk;
    }) ?? series[0];
  const point = match?.values?.[0]?.value?.[0];
  if (!point?.value || !point.dateTime) return { value: null, observedAt: null };
  const n = Number(point.value);
  return {
    value: Number.isFinite(n) ? n : null,
    observedAt: point.dateTime,
  };
}

async function fetchGauge(gauge: UsgsGauge): Promise<UsgsReading> {
  const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${gauge.site}&parameterCd=${gauge.parameter}&siteStatus=all`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), USGS_FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent":
          "BoatingChicago.com river levels (+https://boatingchicago.com/contact)",
      },
      next: { revalidate: USGS_REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      return {
        gauge,
        value: null,
        observedAt: null,
        stale: true,
        error: `USGS HTTP ${res.status}`,
      };
    }
    const json = await res.json();
    const parsed = parseUsgsTimeSeries(json, gauge.site, gauge.parameter);
    const age = parsed.observedAt ? Date.now() - Date.parse(parsed.observedAt) : NaN;
    const stale =
      !parsed.observedAt || !Number.isFinite(age) || age > USGS_STALE_MS;
    return {
      gauge,
      value: stale ? null : parsed.value,
      observedAt: parsed.observedAt,
      stale,
      error:
        stale && parsed.observedAt
          ? "Reading older than 6 hours — not shown as current"
          : null,
    };
  } catch (err) {
    return {
      gauge,
      value: null,
      observedAt: null,
      stale: true,
      error: err instanceof Error ? err.message : "USGS request failed",
    };
  } finally {
    clearTimeout(timer);
  }
}

export type UsgsReadingsFilter = {
  lakeSlug?: string;
  weatherLocationId?: string;
};

/**
 * Fetch USGS readings. Pass lakeSlug for lake pages, weatherLocationId for
 * /weather views. With no filter, returns every configured gauge (tests /
 * inventory only — prefer a scoped call in UI).
 */
export async function getUsgsReadings(
  filter?: string | UsgsReadingsFilter,
): Promise<UsgsReading[]> {
  const opts: UsgsReadingsFilter =
    typeof filter === "string" ? { lakeSlug: filter } : filter ?? {};

  const gauges = USGS_GAUGES.filter((g) => {
    if (opts.lakeSlug) return g.lakeSlug === opts.lakeSlug;
    if (opts.weatherLocationId) {
      return (g.weatherLocationIds ?? []).includes(opts.weatherLocationId);
    }
    return true;
  });

  return Promise.all(gauges.map(fetchGauge));
}
