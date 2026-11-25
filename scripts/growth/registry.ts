/**
 * Deduplicate candidates / queue items against published inventory.
 */
import {
  getPublishedDestinations,
  getPublishedLakes,
  getPublishedLaunches,
  getPublishedMarinas,
  getPublishedPreserveAccess,
} from "../../src/data/geo";
import { existingSlugSet, slugifyName } from "./quality-gates";

export function loadPublishedSlugSet(): Set<string> {
  return existingSlugSet({
    destinations: getPublishedDestinations(),
    lakes: getPublishedLakes(),
    marinas: getPublishedMarinas(),
    launches: getPublishedLaunches(),
    preserves: getPublishedPreserveAccess(),
  });
}

export function loadPublishedNameIndex(): Set<string> {
  const names = [
    ...getPublishedDestinations().flatMap((d) => [d.name, d.slug]),
    ...getPublishedLakes().flatMap((l) => [l.name, l.slug]),
    ...getPublishedMarinas().flatMap((m) => [m.name, m.slug]),
    ...getPublishedLaunches().flatMap((l) => [l.name, l.slug]),
    ...getPublishedPreserveAccess().flatMap((p) => [p.name, p.slug]),
  ];
  return new Set(names.map((n) => n.toLowerCase()));
}

export function isLikelyDuplicate(
  name: string,
  slug: string | undefined,
  index: Set<string>,
): boolean {
  const key = name.toLowerCase().trim();
  const slugKey = (slug ?? slugifyName(name)).toLowerCase();
  if (index.has(key) || index.has(slugKey)) return true;
  // Conservative token overlap for multi-name queue rows ("Two Rivers / Kewaunee")
  const tokens = key
    .split(/[\/,|&]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 3);
  for (const token of tokens) {
    if (index.has(token) || index.has(slugifyName(token))) return true;
  }
  return false;
}

export function inventoryCounts(): Record<string, number> {
  return {
    destinations: getPublishedDestinations().length,
    lakes: getPublishedLakes().length,
    launches: getPublishedLaunches().length,
    marinas: getPublishedMarinas().length,
    preserves: getPublishedPreserveAccess().length,
  };
}
