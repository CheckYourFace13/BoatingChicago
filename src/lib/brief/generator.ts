/**
 * Deterministic Chicago Boating Brief issue builder from live site data.
 * Never invents weather, alerts, events, prices, or affiliate facts.
 */

import { siteConfig } from "@/config/site";
import { destinations } from "@/data/geo/destinations";
import { events } from "@/data/geo/events";
import {
  getAmazonGearItem,
  getAmazonGearUrl,
} from "@/data/amazon-gear";
import { getPopularOnTheWaterOffers } from "@/data/affiliate-offers";
import { getProviderLabel } from "@/data/affiliate-offers";
import { getChicagoNews, getStoryItems } from "@/lib/news";
import { getChicagoWeather } from "@/lib/weather";
import { chicagoDateKey, nextThursdayBriefAt } from "@/lib/brief/schedule";
import type { WeatherAlert } from "@/types/weather";
import type { NewsItem } from "@/types/news";
import type { EventItem } from "@/types/geo";

export interface BriefSection {
  id: string;
  title: string;
  html: string;
}

export interface BriefIssue {
  editionKey: string;
  subject: string;
  previewText: string;
  generatedAt: string;
  sections: BriefSection[];
  htmlBody: string;
  links: string[];
  meta: {
    alertCount: number;
    eventCount: number;
    newsCount: number;
    hasGear: boolean;
    hasExperience: boolean;
    destinationSlug: string | null;
  };
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function abs(path: string): string {
  if (path.startsWith("http")) return path;
  return `${siteConfig.url.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

function sectionWrap(title: string, inner: string): string {
  return `
    <h2 style="margin:28px 0 10px;font-size:18px;line-height:1.3;color:#0B3D6B;font-weight:800;">${esc(title)}</h2>
    <div style="font-size:15px;line-height:1.55;color:#1f2937;">${inner}</div>
  `;
}

function formatChicagoStamp(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);
}

/** Highest mph number in an NWS wind string like "15 to 25 mph". */
export function maxWindMphFromString(wind: string | null | undefined): number | null {
  if (!wind) return null;
  const nums = [...wind.matchAll(/(\d+)/g)].map((m) => Number(m[1]));
  if (!nums.length) return null;
  return Math.max(...nums);
}

function weekendDayParts(weatherDaily: {
  name: string;
  shortForecast: string | null;
  temperatureF: number | null;
  windSpeed: string | null;
}[]) {
  const weekendish = weatherDaily.filter((d) =>
    /saturday|sunday|fri|weekend/i.test(d.name)
  );
  return weekendish.length
    ? weekendish.slice(0, 4)
    : weatherDaily.filter((d) => d.name).slice(0, 4);
}

/**
 * Factual weekend-forecast summary — no Good/Caution/Poor email labels.
 * Distinguishes NWS period forecasts from current observations.
 */
export function weekendForecastSummary(
  days: {
    name: string;
    shortForecast: string | null;
    temperatureF: number | null;
    windSpeed: string | null;
  }[]
): string {
  if (!days.length) {
    return "Weekend forecast periods were not available from NWS at generation time — check the live weather page before you go.";
  }
  const winds = days
    .map((d) => maxWindMphFromString(d.windSpeed))
    .filter((n): n is number => n != null);
  const peak = winds.length ? Math.max(...winds) : null;
  if (peak != null && peak >= 20) {
    return `Upcoming weekend forecast periods show winds up to about ${peak} mph in the NWS outlook — plan with that in mind and re-check closer to departure.`;
  }
  if (peak != null && peak >= 15) {
    return `Upcoming weekend forecast periods show winds reaching the mid-teens to about ${peak} mph — conditions can change; verify the marine forecast before you go.`;
  }
  if (peak != null) {
    return `Upcoming weekend forecast periods currently list winds up to about ${peak} mph in the available NWS periods.`;
  }
  return "Upcoming weekend forecast periods are listed below from NWS — wind speeds were not parsed from every period.";
}

function summarizeAlerts(alerts: WeatherAlert[]): BriefSection | null {
  const marine = alerts.filter(
    (a) => a.isMarine || /marine|gale|small craft|storm|lake/i.test(a.event)
  );
  const pick = (marine.length ? marine : alerts).slice(0, 4);
  if (!pick.length) return null;

  const items = pick
    .map((a) => {
      const ends = a.ends
        ? ` (until ${new Date(a.ends).toLocaleString("en-US", {
            timeZone: "America/Chicago",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })})`
        : "";
      return `<li style="margin:0 0 8px;"><strong>${esc(a.event)}</strong>${esc(ends)} — <a href="${esc(a.sourceUrl)}" style="color:#0B3D6B;">NWS details</a></li>`;
    })
    .join("");

  return {
    id: "alerts",
    title: "Marine alerts",
    html: sectionWrap(
      "Marine alerts",
      `<ul style="padding-left:18px;margin:0;">${items}</ul>
       <p style="margin:12px 0 0;font-size:13px;color:#4b5563;">Alerts come from the National Weather Service. Conditions can change quickly — verify before you go.</p>`
    ),
  };
}

function upcomingEvents(now = new Date()): EventItem[] {
  const today = chicagoDateKey(now);
  return events
    .filter((e) => e.isPublished)
    .filter((e) => (e.endDate || e.startDate) >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, 4);
}

function rotateDestination(editionKey: string) {
  const published = destinations.filter((d) => d.isPublished);
  if (!published.length) return null;
  const hash = [...editionKey].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return published[hash % published.length];
}

function rotateGearId(editionKey: string): string {
  const ids = [
    "life-jackets",
    "waterproof-dry-bags",
    "marine-vhf",
    "marine-safety",
    "dock-lines",
    "boat-fenders",
  ];
  const hash = [...editionKey].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return ids[hash % ids.length];
}

/** Stories suitable for a recreational Chicago-area boating brief. */
export function isBriefRelevantStory(item: NewsItem): boolean {
  if (!item.isPublished || !item.sourceUrl || item.kind !== "story") return false;
  // Do not use whyItMatters for relevance — it can invent boating/policy hooks.
  const t = `${item.headline} ${item.originalSummary || ""}`.toLowerCase();

  // Wildlife deaths, obituaries, memorials, named remembrances — not Brief material
  if (
    /\b(beluga|whale|dolphin|otter|seal)\b/.test(t) &&
    /\b(die|died|death|dead|killed|euthan)/.test(t)
  ) {
    return false;
  }
  if (
    /\b(memorial|obituar|in memoriam|funeral|remembers?\b|remembering\b|names? .+ award)\b/.test(
      t
    )
  ) {
    return false;
  }

  // Direct recreational / operational boating activity (not mere "Lake Michigan" mentions)
  const recreational =
    /\b(boat|boating|boater|marina|harbor|harbour|sail|sailing|yacht|kayak|kayaking|paddle|paddling|cruise|charter|jet ski|pontoon|dock|boat launch|navy pier|small craft|marine (warning|advisory|forecast)|coast guard|regatta|mooring|slip|recreational boat)\b/.test(
      t
    );
  if (!recreational) return false;

  // Drop pure aquarium / zoo animal stories even if "lake" appears
  if (/\b(aquarium|zoo|shedd)\b/.test(t) && !/\b(boat|marina|harbor|sail|charter)\b/.test(t)) {
    return false;
  }

  // Awards, meetings, research vessels, workshops — not Brief recreational news
  if (
    /\b(award|champion of|champions of|workshop|educator|curriculum|classroom|book club|conference|meeting|symposium|research vessel|science teacher)\b/.test(
      t
    )
  ) {
    return false;
  }

  return true;
}

/**
 * Source-supported one-liner only — never template “policy implications”.
 */
export function briefNewsBlurb(item: NewsItem): string {
  const raw = (item.originalSummary || "").trim();
  if (!raw) return "";
  // Skip our generic template summaries
  if (
    /boatingchicago summarizes|published an update titled|we do not republish/i.test(
      raw
    )
  ) {
    return "";
  }
  const sentence = raw.split(/(?<=[.!?])\s+/)[0] || raw;
  return sentence.length > 220 ? `${sentence.slice(0, 217)}…` : sentence;
}

export async function generateBriefIssue(options?: {
  now?: Date;
  /** Thursday issue calendar date (send slot). Defaults to next Thursday Brief slot. */
  issueDate?: Date;
}): Promise<BriefIssue> {
  const now = options?.now ?? new Date();
  const issueDate = options?.issueDate ?? nextThursdayBriefAt(now);
  const editionKey = chicagoDateKey(issueDate);
  const generatedStamp = formatChicagoStamp(now);

  const weather = await getChicagoWeather();
  const newsFeed = await getChicagoNews({
    alerts: weather.alerts,
    weather,
  });

  const sections: BriefSection[] = [];
  const links: string[] = [abs("/weather"), abs("/")];

  // 1. Weekend forecast (NWS periods) — factual, no Good/Caution email label
  const days = weekendDayParts(weather.daily);
  const dayLines = days
    .map((d) => {
      const temp =
        d.temperatureF != null ? `${d.temperatureF}°F` : "temp n/a";
      const wind = d.windSpeed ? `, wind ${d.windSpeed}` : "";
      const fx = d.shortForecast || "see forecast";
      return `<li style="margin:0 0 6px;"><strong>${esc(d.name)}</strong>: ${esc(temp)}${esc(wind)} — ${esc(fx)}</li>`;
    })
    .join("");

  const weekendSummary = weekendForecastSummary(days);

  const currentBits: string[] = [];
  if (weather.current?.windSpeedMph != null) {
    const gust =
      weather.current.windGustMph != null
        ? ` (gusts ${weather.current.windGustMph} mph)`
        : "";
    currentBits.push(
      `winds about ${weather.current.windSpeedMph} mph${gust}`
    );
  }
  if (weather.lake.waveHeightFt != null) {
    currentBits.push(
      `nearshore waves ~${weather.lake.waveHeightFt} ft (buoy ${weather.lake.buoyId || "NDBC"})`
    );
  }
  if (weather.lake.waterTempF != null) {
    currentBits.push(`water temp ~${weather.lake.waterTempF}°F`);
  }
  const currentLine = currentBits.length
    ? `As of ${generatedStamp} (current observations, not the weekend outlook): ${currentBits.join("; ")}.`
    : `Generated ${generatedStamp}. Current observation fields were incomplete at build time.`;

  sections.push({
    id: "weekend",
    title: "This weekend on the water",
    html: sectionWrap(
      "This weekend on the water",
      `<p style="margin:0 0 10px;">Informational planning summary — <strong>not</strong> a safety rating or go/no-go call. NOAA/NWS remain authoritative.</p>
       <p style="margin:0 0 10px;"><strong>Weekend forecast</strong> (NWS periods for the upcoming Fri–Sun window): ${esc(weekendSummary)}</p>
       ${dayLines ? `<ul style="padding-left:18px;margin:0 0 10px;">${dayLines}</ul>` : `<p style="margin:0 0 10px;">See the live forecast for the latest periods.</p>`}
       <p style="margin:0 0 10px;font-size:13px;color:#4b5563;">${esc(currentLine)}</p>
       <p style="margin:0;"><a href="${esc(abs("/weather"))}" style="color:#0B3D6B;font-weight:700;">Full Chicago boating weather →</a></p>`
    ),
  });
  links.push(abs("/weather"));

  // 2. Alerts (omit if none)
  const alertSection = summarizeAlerts(weather.alerts);
  if (alertSection) {
    sections.push(alertSection);
    for (const a of weather.alerts.slice(0, 4)) links.push(a.sourceUrl);
  }

  // 3. Events
  const evs = upcomingEvents(now);
  if (evs.length) {
    const items = evs
      .map((e) => {
        const range =
          e.endDate && e.endDate !== e.startDate
            ? `${e.startDate} – ${e.endDate}`
            : e.startDate;
        links.push(e.source.url);
        links.push(abs(`/events`));
        return `<li style="margin:0 0 10px;"><strong>${esc(e.title)}</strong> (${esc(range)})<br/><span style="color:#4b5563;">${esc(e.location)}</span><br/><a href="${esc(e.source.url)}" style="color:#0B3D6B;">Official source</a></li>`;
      })
      .join("");
    sections.push({
      id: "events",
      title: "What’s happening",
      html: sectionWrap(
        "What’s happening",
        `<ul style="padding-left:18px;margin:0;">${items}</ul>
         <p style="margin:12px 0 0;"><a href="${esc(abs("/events"))}" style="color:#0B3D6B;font-weight:700;">More events on BoatingChicago →</a></p>`
      ),
    });
  }

  // 4. News — only directly relevant recreational boating stories; omit section if none
  const stories = getStoryItems(newsFeed.items)
    .filter(isBriefRelevantStory)
    .slice(0, 3);
  if (stories.length) {
    const items = stories
      .map((s) => {
        const blurb = briefNewsBlurb(s);
        links.push(s.sourceUrl);
        return `<li style="margin:0 0 12px;"><strong>${esc(s.headline)}</strong><br/>
          <span style="color:#4b5563;font-size:13px;">${esc(s.sourceName)}${s.sourcePublishedAt ? ` · ${esc(s.sourcePublishedAt.slice(0, 10))}` : ""}</span>
          ${blurb ? `<br/>${esc(blurb)}` : ""}
          <br/><a href="${esc(s.sourceUrl)}" style="color:#0B3D6B;">Read at source →</a></li>`;
      })
      .join("");
    sections.push({
      id: "news",
      title: "Boating news",
      html: sectionWrap(
        "Boating news",
        `<ul style="padding-left:18px;margin:0;">${items}</ul>
         <p style="margin:12px 0 0;"><a href="${esc(abs("/news"))}" style="color:#0B3D6B;font-weight:700;">Chicago boating news hub →</a></p>`
      ),
    });
    links.push(abs("/news"));
  }

  // 5. Destination rotation
  const dest = rotateDestination(editionKey);
  if (dest) {
    const href = abs(`/destinations/${dest.slug}`);
    links.push(href);
    sections.push({
      id: "destination",
      title: "Where to go",
      html: sectionWrap(
        "Where to go",
        `<p style="margin:0 0 8px;"><strong>${esc(dest.name)}</strong> — ${esc(dest.summary)}</p>
         <p style="margin:0;"><a href="${esc(href)}" style="color:#0B3D6B;font-weight:700;">Destination guide →</a></p>`
      ),
    });
  }

  // 6. Optional gear
  const gear = getAmazonGearItem(rotateGearId(editionKey));
  if (gear) {
    const url = getAmazonGearUrl(gear);
    links.push(url);
    sections.push({
      id: "gear",
      title: "Gear for the water",
      html: sectionWrap(
        "Gear for the water",
        `<p style="margin:0 0 8px;"><strong>${esc(gear.title)}</strong> — ${esc(gear.blurb)}</p>
         <p style="margin:0 0 6px;"><a href="${esc(url)}" style="color:#0B3D6B;font-weight:700;">${esc(gear.ctaLabel)} →</a></p>
         <p style="margin:0;font-size:12px;color:#6b7280;">Paid/affiliate link. BoatingChicago may earn a commission. No prices shown — Amazon lists current availability.</p>`
      ),
    });
  }

  // 7. Optional experience
  const offers = getPopularOnTheWaterOffers(1);
  const offer = offers[0];
  if (offer?.url) {
    links.push(offer.url);
    sections.push({
      id: "experience",
      title: "Get on the water",
      html: sectionWrap(
        "Get on the water",
        `<p style="margin:0 0 8px;"><strong>${esc(offer.title)}</strong> via ${esc(getProviderLabel(offer.provider))}.</p>
         <p style="margin:0 0 6px;"><a href="${esc(offer.url)}" style="color:#0B3D6B;font-weight:700;">View experience →</a></p>
         <p style="margin:0;font-size:12px;color:#6b7280;">Affiliate link. Confirm details, availability, and safety requirements with the operator.</p>`
      ),
    });
  }

  const intro = `
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#0B3D6B;font-weight:800;">Chicago Boating Brief</p>
    <p style="margin:0 0 6px;font-size:14px;color:#4b5563;">Issue for ${esc(editionKey)} (America/Chicago) · Content generated ${esc(generatedStamp)}</p>
    <p style="margin:0 0 16px;font-size:12px;color:#6b7280;">Weather and news are refreshed near send — treat this as a planning snapshot, not a live bridge-deck briefing.</p>
  `;

  const htmlBody = `${intro}${sections.map((s) => s.html).join("\n")}`;

  const subject = `Chicago Boating Brief — ${editionKey}`;
  const previewText = `Weekend forecast periods, alerts, and Chicago-area ideas for the water. Generated ${generatedStamp}.`;

  return {
    editionKey,
    subject,
    previewText,
    generatedAt: now.toISOString(),
    sections,
    htmlBody,
    links: [...new Set(links.filter(Boolean))],
    meta: {
      alertCount: weather.alerts.length,
      eventCount: evs.length,
      newsCount: stories.length,
      hasGear: Boolean(gear),
      hasExperience: Boolean(offer),
      destinationSlug: dest?.slug || null,
    },
  };
}
