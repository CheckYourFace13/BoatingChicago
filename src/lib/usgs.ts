/**
 * USGS Instantaneous Values for a few planning-relevant inland rivers.
 * Free waterservices.usgs.gov — no API key.
 */

export interface UsgsGauge {
  site: string;
  name: string;
  waterway: string;
  lakeSlug?: string;
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
    parameter: "00065",
    unitLabel: "ft gage height",
    sourceUrl: "https://waterdata.usgs.gov/monitoring-location/05532500/",
  },
  {
    site: "05540500",
    name: "DuPage River at Shorewood, IL",
    waterway: "DuPage River",
    lakeSlug: "dupage-river",
    parameter: "00065",
    unitLabel: "ft gage height",
    sourceUrl: "https://waterdata.usgs.gov/monitoring-location/05540500/",
  },
  {
    site: "05550000",
    name: "Fox River at Algonquin, IL",
    waterway: "Fox River / Chain",
    lakeSlug: "fox-river",
    parameter: "00065",
    unitLabel: "ft gage height",
    sourceUrl: "https://waterdata.usgs.gov/monitoring-location/05550000/",
  },
  {
    site: "05536123",
    name: "Chicago River at Columbus Drive, Chicago, IL",
    waterway: "Chicago River",
    parameter: "00065",
    unitLabel: "ft gage height",
    sourceUrl: "https://waterdata.usgs.gov/monitoring-location/05536123/",
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
  const match = series.find((s) => {
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
        "User-Agent": "BoatingChicago.com river levels (+https://boatingchicago.com/contact)",
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
    const stale = !parsed.observedAt || !Number.isFinite(age) || age > USGS_STALE_MS;
    return {
      gauge,
      value: stale ? null : parsed.value,
      observedAt: parsed.observedAt,
      stale,
      error: stale && parsed.observedAt ? "Reading older than 6 hours — not shown as current" : null,
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

export async function getUsgsReadings(lakeSlug?: string): Promise<UsgsReading[]> {
  const gauges = lakeSlug
    ? USGS_GAUGES.filter((g) => g.lakeSlug === lakeSlug)
    : USGS_GAUGES;
  return Promise.all(gauges.map(fetchGauge));
}
