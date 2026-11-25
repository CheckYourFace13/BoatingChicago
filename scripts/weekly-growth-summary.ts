/**
 * Friday growth summary — inventory counts from published geo data.
 * Does not invent traffic or AdSense metrics. Emit JSON for logs / Brief ops.
 *
 * Run: npx tsx scripts/weekly-growth-summary.ts
 */
import { writeFileSync } from "node:fs";
import { getGeoInventorySnapshot, listGeoHubs } from "../src/lib/geo-registry";
import { getPublishedDestinations } from "../src/data/geo";
import { weatherLocations } from "../src/config/weather-locations";

const inventory = getGeoInventorySnapshot();
const destinations = getPublishedDestinations();
const byState = destinations.reduce<Record<string, number>>((acc, d) => {
  acc[d.state] = (acc[d.state] ?? 0) + 1;
  return acc;
}, {});

const marineLocations = weatherLocations.filter((l) => l.nearshoreZone);
const inlandWeather = weatherLocations.filter((l) => !l.nearshoreZone);

const summary = {
  generatedAt: new Date().toISOString(),
  title: "BoatingChicago weekly growth summary",
  inventory,
  destinationsByState: byState,
  regionHubs: listGeoHubs().map((h) => h.slug),
  weather: {
    totalAnchors: weatherLocations.length,
    withNearshoreZone: marineLocations.length,
    inlandAnchors: inlandWeather.length,
  },
  researchQueuePath: "data/geo-research-queue.json",
  metricsNote:
    "Organic search, AdSense, and affiliate figures are not invented here. Pull from Search Console / AdSense / affiliate dashboards when available.",
  ownerActions: [
    "Confirm Google AdSense Auto ads remain ON",
    "Confirm Privacy & messaging CMP remains published",
    "Review data/geo-research-queue.json for next verified facilities",
  ],
};

const out = JSON.stringify(summary, null, 2);
console.log(out);
writeFileSync("data/weekly-growth-summary-latest.json", out, "utf8");
