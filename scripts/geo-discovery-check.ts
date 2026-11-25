/**
 * Deduplicate research-queue names against published destinations, lakes,
 * marinas, and launches. Prints enrichment candidates; never auto-publishes.
 *
 * Run: npx tsx scripts/geo-discovery-check.ts
 */
import { readFileSync } from "node:fs";
import {
  getPublishedDestinations,
  getPublishedLakes,
  getPublishedLaunches,
  getPublishedMarinas,
} from "../src/data/geo";

type QueueItem = {
  name: string;
  state?: string;
  status: string;
  notes?: string;
};

const raw = JSON.parse(
  readFileSync("data/geo-research-queue.json", "utf8"),
) as { items: QueueItem[] };

const publishedNames = new Set(
  [
    ...getPublishedDestinations().map((d) => d.name.toLowerCase()),
    ...getPublishedDestinations().map((d) => d.slug),
    ...getPublishedLakes().map((l) => l.name.toLowerCase()),
    ...getPublishedLakes().map((l) => l.slug),
    ...getPublishedMarinas().map((m) => m.name.toLowerCase()),
    ...getPublishedMarinas().map((m) => m.slug),
    ...getPublishedLaunches().map((l) => l.name.toLowerCase()),
    ...getPublishedLaunches().map((l) => l.slug),
  ].map((s) => s.toLowerCase()),
);

const report = {
  generatedAt: new Date().toISOString(),
  published: {
    destinations: getPublishedDestinations().length,
    lakes: getPublishedLakes().length,
    launches: getPublishedLaunches().length,
    marinas: getPublishedMarinas().length,
  },
  queue: raw.items.map((item) => {
    const key = item.name.toLowerCase();
    const slugGuess = key.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const already =
      publishedNames.has(key) ||
      publishedNames.has(slugGuess) ||
      [...publishedNames].some(
        (n) => key.includes(n) || n.includes(slugGuess.split("-")[0] ?? ""),
      );
    return {
      ...item,
      likelyDuplicate: already && item.status !== "enrich",
      action:
        item.status === "hub-only"
          ? "keep-in-hub"
          : item.status === "enrich"
            ? "enrich-existing"
            : already
              ? "skip-or-enrich"
              : "research-official-sources",
    };
  }),
};

console.log(JSON.stringify(report, null, 2));
