/**
 * Load research queue + candidate JSON files; never invent facilities.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { GrowthCandidate } from "./types";
import { isLikelyDuplicate, loadPublishedNameIndex } from "./registry";

export interface QueueItem {
  id?: string;
  name: string;
  state?: string;
  status: string;
  notes?: string;
  priority?: number;
}

export interface DiscoveryResult {
  queue: QueueItem[];
  candidates: GrowthCandidate[];
  duplicatesRejected: { name: string; reason: string }[];
  newDiscoveries: QueueItem[];
}

const OFFICIAL_SEED_DISCOVERIES: QueueItem[] = [
  {
    id: "seed-kewaunee",
    name: "Kewaunee Harbor WI",
    state: "WI",
    status: "research",
    notes: "Between Two Rivers and Algoma — verify municipal harbor/launch pages.",
    priority: 40,
  },
  {
    id: "seed-manistique",
    name: "Manistique Harbor MI",
    state: "MI",
    status: "research",
    notes: "Northern LM / UP — verify DNR/city marina before standalone page.",
    priority: 30,
  },
  {
    id: "seed-portage-lake",
    name: "Portage Lake / Onekama MI",
    state: "MI",
    status: "research",
    notes: "West MI inland/nearshore — MiBFF verification needed.",
    priority: 25,
  },
  {
    id: "seed-wi-dnr-boat-access-enrich",
    name: "WI DNR Boat Access inventory enrichment",
    state: "WI",
    status: "research",
    notes:
      "Use https://dnr.wisconsin.gov/topic/lands/boataccess and ArcGIS Boat Access Sites layer to enrich existing WI launches with ramp type / ADA / ownership — do not invent fees.",
    priority: 55,
  },
  {
    id: "seed-mi-bff-harbors",
    name: "Michigan DNR Boating Facility Finder harbors",
    state: "MI",
    status: "research",
    notes:
      "Cross-check published MI marinas/launches against MiBFF for lane counts and transient reservation links.",
    priority: 50,
  },
  {
    id: "seed-usace-shelbyville-enrich",
    name: "USACE Lake Shelbyville / Rend Lake facility details",
    state: "IL",
    status: "research",
    notes: "Enrich existing reservoir pages from USACE recreation pages only.",
    priority: 35,
  },
];

export function loadResearchQueue(
  path = "data/geo-research-queue.json",
): { updated?: string; policy?: string; items: QueueItem[] } {
  const raw = JSON.parse(readFileSync(path, "utf8")) as {
    updated?: string;
    policy?: string;
    items: QueueItem[];
  };
  return raw;
}

export function loadCandidatesFromDir(
  dir = "data/growth-candidates",
): GrowthCandidate[] {
  if (!existsSync(dir)) return [];
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  const out: GrowthCandidate[] = [];
  for (const file of files) {
    if (file.startsWith("_")) continue;
    const parsed = JSON.parse(readFileSync(join(dir, file), "utf8")) as
      | GrowthCandidate
      | GrowthCandidate[];
    if (Array.isArray(parsed)) out.push(...parsed);
    else out.push(parsed);
  }
  return out;
}

export function discover(options: {
  queuePath?: string;
  candidatesDir?: string;
  includeSeeds?: boolean;
} = {}): DiscoveryResult {
  const queueDoc = loadResearchQueue(options.queuePath);
  const index = loadPublishedNameIndex();
  const duplicatesRejected: { name: string; reason: string }[] = [];
  const newDiscoveries: QueueItem[] = [];

  const existingNames = new Set(queueDoc.items.map((i) => i.name.toLowerCase()));

  if (options.includeSeeds !== false) {
    for (const seed of OFFICIAL_SEED_DISCOVERIES) {
      if (existingNames.has(seed.name.toLowerCase())) continue;
      if (isLikelyDuplicate(seed.name, undefined, index)) {
        duplicatesRejected.push({
          name: seed.name,
          reason: "Matches published inventory — skipped seed.",
        });
        continue;
      }
      newDiscoveries.push(seed);
    }
  }

  for (const item of queueDoc.items) {
    if (item.status === "hub-only" || item.status === "enrich") continue;
    if (isLikelyDuplicate(item.name, item.id, index)) {
      duplicatesRejected.push({
        name: item.name,
        reason: "Queue item overlaps published name/slug.",
      });
    }
  }

  const candidates = loadCandidatesFromDir(options.candidatesDir);

  return {
    queue: [...queueDoc.items, ...newDiscoveries],
    candidates,
    duplicatesRejected,
    newDiscoveries,
  };
}
