import {
  getLakeBySlug,
  getPublishedDestinations,
  getPublishedLakes,
  getPublishedLaunches,
  getPublishedMarinas,
  getPublishedPreserveAccess,
  getDestinationBySlug,
} from "@/data/geo";
import { guides } from "@/data/guides";
import { regionLabel } from "@/lib/geo-display";
import type { SearchEntry } from "@/lib/site-search-core";
import { TOOL_CATALOG } from "@/lib/tools/catalog";

function slugWords(slug: string): string {
  return slug.replace(/-/g, " ");
}

function destinationLabel(slug: string): string | undefined {
  const d = getDestinationBySlug(slug);
  return d ? `${d.name}, ${d.state}` : undefined;
}

/**
 * Builds the site search index from the same published datasets that render
 * the pages. Nothing is hand-written here, so no place can appear in search
 * that does not already have a page.
 */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const launch of getPublishedLaunches()) {
    const lake = launch.lakeSlug ? getLakeBySlug(launch.lakeSlug) : undefined;
    entries.push({
      t: "launch",
      n: launch.name,
      h: `/boat-launches/${launch.slug}`,
      s: [destinationLabel(launch.destinationSlug), lake?.name]
        .filter(Boolean)
        .join(" · "),
      k: `boat launch ramp public ${slugWords(launch.slug)} ${launch.accessMode ?? ""}`,
    });
  }

  for (const marina of getPublishedMarinas()) {
    entries.push({
      t: "marina",
      n: marina.name,
      h: `/marinas/${marina.slug}`,
      s: destinationLabel(marina.destinationSlug),
      k: `marina harbor slip dock ${slugWords(marina.slug)}`,
    });
  }

  for (const preserve of getPublishedPreserveAccess()) {
    const href =
      preserve.standalonePage === false && preserve.redirectTo
        ? preserve.redirectTo
        : `/forest-preserves/${preserve.slug}`;
    entries.push({
      t: "preserve",
      n: preserve.name,
      h: href,
      s: `${preserve.locationLabel} · ${preserve.county} County`,
      k: `forest preserve canoe kayak landing ${slugWords(preserve.slug)}`,
    });
  }

  for (const lake of getPublishedLakes()) {
    entries.push({
      t: "lake",
      n: lake.name,
      h: `/lakes/${lake.slug}`,
      s: `${regionLabel(lake.region)}`,
      k: `lake river waterway ${slugWords(lake.slug)}`,
    });
  }

  for (const destination of getPublishedDestinations()) {
    entries.push({
      t: "destination",
      n: `${destination.name}, ${destination.state}`,
      h: `/destinations/${destination.slug}`,
      s: destination.bodyOfWater,
      k: `destination harbor town ${slugWords(destination.slug)}`,
    });
  }

  for (const guide of guides) {
    entries.push({
      t: "guide",
      n: guide.title,
      h: `/${guide.slug}`,
      s: "Boating guide",
      k: `guide ${slugWords(guide.slug)} ${guide.sections
        .slice(0, 8)
        .map((s) => s.heading)
        .join(" ")}`,
    });
  }

  for (const tool of TOOL_CATALOG) {
    entries.push({
      t: "tool",
      n: tool.title,
      h: tool.href,
      s: "Planning tool",
      k: `calculator ${slugWords(tool.href)}`,
    });
  }

  entries.push({
    t: "tool",
    n: "Kayak, canoe and SUP finder",
    h: "/kayak-canoe-sup",
    s: "Paddling discovery",
    k: "kayak canoe sup paddle rental forest preserve",
  });

  return entries;
}

let cached: SearchEntry[] | null = null;

export function getSearchIndex(): SearchEntry[] {
  if (!cached) cached = buildSearchIndex();
  return cached;
}
