/**
 * Publication quality gates — reject thin, unsourced, unsafe, or duplicate content.
 */
import type { GrowthCandidate, GateFailure, GateResult } from "./types";

const BANNED_PHRASES = [
  /safe to boat/i,
  /safe-to-boat/i,
  /boating is safe/i,
  /guaranteed calm/i,
  /all clear for launching/i,
];

const FEE_INVENTION =
  /\$\d+(\.\d{2})?\s*(per\s+)?(day|daily|season|annual|hour)/i;

const PREFERRED_HOST_HINT =
  /\.(gov|us|org|edu)$|wisconsin\.gov|illinois\.gov|michigan\.gov|in\.gov|mi\.us|wi\.us|state\.mi\.us|dnr\.|parks|marina|harbor|city|village|township|county/i;

export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function evaluateCandidate(
  candidate: GrowthCandidate,
  existingSlugs: Set<string>,
  options: { allowFeeDollarsInFeesNote?: boolean } = {},
): GateResult {
  const failures: GateFailure[] = [];
  const warnings: string[] = [];

  if (!candidate.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(candidate.slug)) {
    failures.push({ code: "slug-invalid", message: "Slug must be kebab-case." });
  }
  if (existingSlugs.has(candidate.slug)) {
    failures.push({
      code: "duplicate-slug",
      message: `Slug "${candidate.slug}" already exists in published inventory.`,
    });
  }
  if (!candidate.name?.trim()) {
    failures.push({ code: "name-missing", message: "Name is required." });
  }
  if (!candidate.summary || candidate.summary.trim().length < 40) {
    failures.push({
      code: "summary-thin",
      message: "Summary must be at least 40 characters of useful planning copy.",
    });
  }
  if (!candidate.overview || candidate.overview.length < 2) {
    failures.push({
      code: "overview-thin",
      message: "Overview needs at least two substantive paragraphs.",
    });
  } else {
    const words = candidate.overview.join(" ").split(/\s+/).filter(Boolean);
    if (words.length < 80) {
      failures.push({
        code: "overview-short",
        message: "Overview must contain at least ~80 words of source-backed context.",
      });
    }
  }

  if (!candidate.officialLinks?.length) {
    failures.push({
      code: "unsourced",
      message: "At least one official https source link is required.",
    });
  } else {
    for (const link of candidate.officialLinks) {
      if (!link.url?.startsWith("https://")) {
        failures.push({
          code: "source-not-https",
          message: `Source must be https: ${link.url}`,
        });
      }
      if (!link.name?.trim()) {
        failures.push({
          code: "source-name-missing",
          message: "Each source needs a name.",
        });
      }
      if (!link.lastVerified || !/^\d{4}-\d{2}-\d{2}$/.test(link.lastVerified)) {
        failures.push({
          code: "source-unverified",
          message: `Source "${link.name}" needs lastVerified YYYY-MM-DD.`,
        });
      }
      try {
        const host = new URL(link.url).hostname;
        if (!PREFERRED_HOST_HINT.test(host)) {
          warnings.push(
            `Source host "${host}" is not an obvious agency/operator domain — double-check provenance.`,
          );
        }
      } catch {
        failures.push({
          code: "source-url-invalid",
          message: `Invalid URL: ${link.url}`,
        });
      }
    }
  }

  const blob = [
    candidate.summary,
    ...(candidate.overview ?? []),
    ...(candidate.highlights ?? []),
  ].join("\n");

  for (const re of BANNED_PHRASES) {
    if (re.test(blob)) {
      failures.push({
        code: "unsafe-rating-language",
        message: "Content must not invent safe-boating ratings or clearances.",
      });
      break;
    }
  }

  // Dollar fees belong only in feesNote pointing readers to confirm on-source —
  // never invent in summary/overview as current rates without "confirm" framing.
  if (FEE_INVENTION.test(candidate.summary) || FEE_INVENTION.test(blob)) {
    const hasConfirm =
      /confirm|see (the )?(official|city|operator|marina|dnr|park)/i.test(blob) ||
      /confirm|see official/i.test(candidate.feesNote ?? "");
    if (!hasConfirm && !options.allowFeeDollarsInFeesNote) {
      failures.push({
        code: "fee-risk",
        message:
          "Dollar fee amounts need confirm-on-official-source framing (fees change).",
      });
    }
  }

  if (candidate.kind === "destination") {
    if (!candidate.weatherLocationId) {
      failures.push({
        code: "weather-missing",
        message: "Destinations require weatherLocationId.",
      });
    }
    if (
      !candidate.coordinates ||
      !Number.isFinite(candidate.coordinates.lat) ||
      !Number.isFinite(candidate.coordinates.lng)
    ) {
      failures.push({
        code: "coords-missing",
        message: "Destinations require finite coordinates.",
      });
    }
    if (
      candidate.distanceFromChicagoMiles != null &&
      candidate.distanceFromChicagoMiles > 420
    ) {
      failures.push({
        code: "out-of-scope",
        message:
          "Driving miles exceed ~400-mile inland/trailer planning radius (+ buffer).",
      });
    }
  }

  if (candidate.kind === "marina" || candidate.kind === "launch") {
    if (!candidate.destinationSlug) {
      failures.push({
        code: "destination-missing",
        message: `${candidate.kind} requires destinationSlug.`,
      });
    }
  }

  if (candidate.kind === "lake" && (!candidate.overview || candidate.overview.length < 2)) {
    failures.push({
      code: "lake-thin",
      message: "Lake guides need multi-paragraph access context.",
    });
  }

  return { ok: failures.length === 0, failures, warnings };
}

export function existingSlugSet(params: {
  destinations: { slug: string }[];
  lakes: { slug: string }[];
  marinas: { slug: string }[];
  launches: { slug: string }[];
  preserves?: { slug: string }[];
}): Set<string> {
  return new Set([
    ...params.destinations.map((d) => d.slug),
    ...params.lakes.map((l) => l.slug),
    ...params.marinas.map((m) => m.slug),
    ...params.launches.map((l) => l.slug),
    ...(params.preserves ?? []).map((p) => p.slug),
  ]);
}
