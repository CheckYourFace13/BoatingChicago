/**
 * Pure, dependency-free search helpers. Safe to import from client components
 * (the header search) and from server code (the /search page and tests).
 */

export type SearchEntryType =
  | "launch"
  | "marina"
  | "preserve"
  | "lake"
  | "destination"
  | "guide"
  | "tool";

/** Compact on purpose: this shape is serialized to /api/search-index. */
export interface SearchEntry {
  /** type */
  t: SearchEntryType;
  /** title */
  n: string;
  /** href */
  h: string;
  /** short context line (place / waterbody / region) */
  s?: string;
  /** extra searchable words (slug words, waterbody, type words) — not displayed */
  k?: string;
}

export const SEARCH_TYPE_ORDER: SearchEntryType[] = [
  "launch",
  "marina",
  "preserve",
  "lake",
  "destination",
  "guide",
  "tool",
];

export const SEARCH_TYPE_LABELS: Record<
  SearchEntryType,
  { singular: string; plural: string }
> = {
  launch: { singular: "Boat launch", plural: "Boat launches" },
  marina: { singular: "Marina", plural: "Marinas & harbors" },
  preserve: { singular: "Forest preserve", plural: "Forest preserves" },
  lake: { singular: "Lake / waterway", plural: "Lakes & waterways" },
  destination: { singular: "Destination", plural: "Destinations" },
  guide: { singular: "Guide", plural: "Guides" },
  tool: { singular: "Tool", plural: "Planning tools" },
};

export function isSearchEntryType(value: unknown): value is SearchEntryType {
  return (
    typeof value === "string" &&
    (SEARCH_TYPE_ORDER as string[]).includes(value)
  );
}

export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const STOP_WORDS = new Set(["the", "a", "an", "of", "in", "near", "for", "to"]);

export function tokenize(query: string): string[] {
  return normalizeText(query)
    .split(" ")
    .filter((tok) => tok.length > 0 && !STOP_WORDS.has(tok));
}

/** "launches" -> "launch", "marinas" -> "marina", "harbors" -> "harbor". */
function stem(token: string): string {
  if (token.length > 4 && token.endsWith("ies")) return `${token.slice(0, -3)}y`;
  if (token.length > 4 && token.endsWith("es")) return token.slice(0, -2);
  if (token.length > 3 && token.endsWith("s")) return token.slice(0, -1);
  return token;
}

function wordStartsWith(words: string[], token: string): boolean {
  return words.some((w) => w.startsWith(token));
}

function tokenMatches(words: string[], token: string): boolean {
  return wordStartsWith(words, token) || wordStartsWith(words, stem(token));
}

export function scoreEntry(entry: SearchEntry, tokens: string[]): number {
  if (tokens.length === 0) return 0;
  const titleNorm = normalizeText(entry.n);
  const titleWords = titleNorm.split(" ");
  const subtitleWords = normalizeText(entry.s ?? "").split(" ");
  const keywordWords = normalizeText(entry.k ?? "").split(" ");
  const phrase = tokens.join(" ");

  let score = 0;
  for (const token of tokens) {
    if (tokenMatches(titleWords, token)) score += 10;
    else if (tokenMatches(subtitleWords, token)) score += 4;
    else if (tokenMatches(keywordWords, token)) score += 2;
    else return 0; // every word must match somewhere
  }
  if (titleNorm === phrase) score += 40;
  else if (titleNorm.startsWith(phrase)) score += 20;
  else if (titleNorm.includes(phrase)) score += 10;
  return score;
}

export interface SearchOptions {
  limit?: number;
  type?: SearchEntryType;
}

export function searchEntries(
  entries: SearchEntry[],
  query: string,
  options: SearchOptions = {},
): SearchEntry[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  const scored: { entry: SearchEntry; score: number; order: number }[] = [];
  entries.forEach((entry, order) => {
    if (options.type && entry.t !== options.type) return;
    const score = scoreEntry(entry, tokens);
    if (score > 0) scored.push({ entry, score, order });
  });
  scored.sort((a, b) => b.score - a.score || a.order - b.order);
  const results = scored.map((s) => s.entry);
  return options.limit ? results.slice(0, options.limit) : results;
}

export function groupByType(
  entries: SearchEntry[],
): { type: SearchEntryType; entries: SearchEntry[] }[] {
  return SEARCH_TYPE_ORDER.map((type) => ({
    type,
    entries: entries.filter((e) => e.t === type),
  })).filter((g) => g.entries.length > 0);
}
