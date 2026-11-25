import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import {
  DEFAULT_WEATHER_LOCATION_ID,
  getWeatherLocationById,
  listWeatherLocations,
} from "@/config/weather-locations";
import { getWeatherForLocation } from "@/lib/weather";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const ALLOWED = new Set(listWeatherLocations().map((l) => l.id));

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fmtTime(iso: string | null | undefined): string {
  if (!iso) return "time unknown";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "time unknown";
  return d.toLocaleString("en-US", {
    timeZone: "America/Chicago",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

/**
 * Lightweight embeddable conditions card (standalone HTML for iframes).
 * No cookies, no ads, no private keys — observations + timestamps + disclaimer.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const rawLoc = url.searchParams.get("location") || DEFAULT_WEATHER_LOCATION_ID;
  const locationId = ALLOWED.has(rawLoc) ? rawLoc : DEFAULT_WEATHER_LOCATION_ID;
  const location =
    getWeatherLocationById(locationId) ||
    getWeatherLocationById(DEFAULT_WEATHER_LOCATION_ID)!;

  let payload;
  try {
    payload = await getWeatherForLocation(locationId);
  } catch {
    payload = null;
  }

  const weatherUrl = `${siteConfig.url}/weather?location=${encodeURIComponent(locationId)}`;
  const docsUrl = `${siteConfig.url}/weather/embed`;
  const current = payload?.current ?? null;
  const lake = payload?.lake;
  const fetchedAt = payload?.fetchedAt ?? null;
  const obsAt = current?.observedAt ?? null;
  const buoyAt = lake?.observedAt ?? null;

  const temp =
    current?.temperatureF != null ? `${current.temperatureF}°F` : "—";
  const wind =
    current?.windSpeedMph != null
      ? `${current.windDirectionCardinal ?? ""} ${current.windSpeedMph} mph`.trim()
      : "—";
  const waves =
    lake?.waveHeightFt != null ? `${lake.waveHeightFt} ft` : "unavailable";
  const water =
    lake?.waterTempF != null ? `${lake.waterTempF}°F` : "unavailable";
  const alertCount = payload?.alertsAvailable
    ? payload.alerts.filter((a) => a.isMarine).length
    : null;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>${esc(location.label)} conditions — ${esc(siteConfig.name)}</title>
  <style>
    :root { color-scheme: light; }
    body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: #0b3d5c; color: #f5f9fc; }
    .card { padding: 14px 16px 12px; border: 1px solid rgba(125, 190, 220, 0.35); border-radius: 12px; background: linear-gradient(160deg, #0b3d5c 0%, #125a7a 100%); }
    .brand { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #7dbcdc; font-weight: 700; }
    h1 { font-size: 16px; margin: 6px 0 10px; line-height: 1.25; font-weight: 800; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .cell { background: rgba(255,255,255,0.08); border-radius: 8px; padding: 8px 10px; }
    .label { display:block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #b7d7ea; margin-bottom: 2px; }
    .value { font-size: 15px; font-weight: 700; }
    .meta { margin-top: 10px; font-size: 11px; color: #d5e8f3; line-height: 1.4; }
    .disclaimer { margin-top: 8px; font-size: 11px; color: #f6d38a; line-height: 1.35; }
    a { color: #9fd0ea; font-weight: 700; }
    .stale { color: #f6d38a; }
  </style>
</head>
<body>
  <div class="card" role="region" aria-label="Marine conditions card">
    <div class="brand">${esc(siteConfig.name)}</div>
    <h1>${esc(location.label)} observations</h1>
    ${
      payload
        ? `<div class="grid">
      <div class="cell"><span class="label">Air temp</span><span class="value">${esc(temp)}</span></div>
      <div class="cell"><span class="label">Wind</span><span class="value">${esc(wind)}</span></div>
      <div class="cell"><span class="label">Wave height</span><span class="value">${esc(waves)}</span></div>
      <div class="cell"><span class="label">Water temp</span><span class="value">${esc(water)}</span></div>
    </div>
    <p class="meta">
      Station obs: ${esc(fmtTime(obsAt))}
      ${current?.stationId ? ` (${esc(current.stationId)})` : ""}<br/>
      Buoy/lake fields: ${esc(fmtTime(buoyAt))}${lake?.buoyId ? ` (${esc(lake.buoyId)})` : ""}<br/>
      Card built: ${esc(fmtTime(fetchedAt))}
      ${
        alertCount == null
          ? `<br/><span class="stale">Marine alerts feed unavailable — do not treat empty alerts as all-clear.</span>`
          : alertCount > 0
            ? `<br/><span class="stale">${alertCount} marine alert(s) active — open full weather page.</span>`
            : `<br/>No active marine alerts in the last successful alerts fetch.`
      }
    </p>`
        : `<p class="meta stale">Conditions temporarily unavailable. Open the full weather page for official NWS/NOAA products.</p>`
    }
    <p class="disclaimer">
      Informational only — not a safety clearance and not a safe/unsafe rating.
      Always verify current NWS marine forecasts and local harbor rules before you go.
    </p>
    <p class="meta">
      <a href="${esc(weatherUrl)}" target="_blank" rel="noopener noreferrer">Full BoatingChicago weather →</a>
      · <a href="${esc(docsUrl)}" target="_blank" rel="noopener noreferrer">Embed docs</a>
      · Sources: NWS / NOAA NDBC
    </p>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
      "Content-Security-Policy": "frame-ancestors *",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
