/**
 * Emit reviewable proposals or apply verified candidates into batch TypeScript.
 * Never publishes without quality gates. Caps batch size.
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { GrowthCandidate } from "./types";
import { evaluateCandidate } from "./quality-gates";
import { loadPublishedSlugSet } from "./registry";

export const MAX_AUTO_PUBLISH = 8;

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function sourceBlock(links: GrowthCandidate["officialLinks"], indent = 6): string {
  const pad = " ".repeat(indent);
  return links
    .map(
      (l) => `${pad}{
${pad}  name: ${JSON.stringify(l.name)},
${pad}  url: ${JSON.stringify(l.url)},
${pad}  lastVerified: ${JSON.stringify(l.lastVerified)},
${pad}},`,
    )
    .join("\n");
}

export function renderDestination(c: GrowthCandidate): string {
  return `  {
    slug: ${JSON.stringify(c.slug)},
    name: ${JSON.stringify(c.name)},
    region: ${JSON.stringify(c.region)},
    state: ${JSON.stringify(c.state)},
    bodyOfWater: ${JSON.stringify(c.bodyOfWater ?? "")},
    summary: ${JSON.stringify(c.summary)},
    overview: ${JSON.stringify(c.overview, null, 6).replace(/\n/g, "\n    ")},
    highlights: ${JSON.stringify(c.highlights ?? [], null, 6).replace(/\n/g, "\n    ")},
    officialLinks: [
${sourceBlock(c.officialLinks)}
    ],
    relatedGuideSlugs: ${JSON.stringify(c.relatedGuideSlugs ?? ["lake-michigan-boating-guide"])},
    weatherLocationId: ${JSON.stringify(c.weatherLocationId)},
    coordinates: ${JSON.stringify(c.coordinates)},
    distanceFromChicagoMiles: ${c.distanceFromChicagoMiles ?? "undefined"},
    isPublished: true,
    nearbyDestinationSlugs: ${JSON.stringify(c.nearbyDestinationSlugs ?? [])},
  },`;
}

export function renderLake(c: GrowthCandidate): string {
  return `  {
    slug: ${JSON.stringify(c.slug)},
    name: ${JSON.stringify(c.name)},
    region: ${JSON.stringify(c.region)},
    state: ${JSON.stringify(c.state)},
    overview: ${JSON.stringify(c.overview, null, 6).replace(/\n/g, "\n    ")},
    officialLinks: [
${sourceBlock(c.officialLinks)}
    ],
    destinationSlugs: ${JSON.stringify(c.destinationSlugs ?? [])},
    isPublished: true,
  },`;
}

export function renderMarina(c: GrowthCandidate): string {
  const amenities = JSON.stringify(c.amenities ?? [], null, 6).replace(/\n/g, "\n    ");
  return `  {
    slug: ${JSON.stringify(c.slug)},
    name: ${JSON.stringify(c.name)},
    destinationSlug: ${JSON.stringify(c.destinationSlug)},
    summary: ${JSON.stringify(c.summary)},
    officialWebsite: ${JSON.stringify(c.officialWebsite ?? c.officialLinks[0]?.url)},
    amenities: ${amenities},
    feesNote: ${JSON.stringify(c.feesNote ?? "Confirm fees on the official operator page before you tow.")},
    seasonalAccessNote: ${c.seasonalAccessNote ? JSON.stringify(c.seasonalAccessNote) : "undefined"},
    source: {
      name: ${JSON.stringify(c.officialLinks[0].name)},
      url: ${JSON.stringify(c.officialLinks[0].url)},
      lastVerified: ${JSON.stringify(c.officialLinks[0].lastVerified)},
    },
    isPublished: true,
  },`;
}

export function renderLaunch(c: GrowthCandidate): string {
  return `  {
    slug: ${JSON.stringify(c.slug)},
    name: ${JSON.stringify(c.name)},
    destinationSlug: ${JSON.stringify(c.destinationSlug)},
    lakeSlug: ${JSON.stringify(c.lakeSlug)},
    accessMode: ${c.accessMode ? JSON.stringify(c.accessMode) : "undefined"},
    summary: ${JSON.stringify(c.summary)},
    amenityNotes: ${c.amenityNotes ? JSON.stringify(c.amenityNotes) : "undefined"},
    feesNote: ${JSON.stringify(c.feesNote ?? "Confirm launch fees on the official source before you tow.")},
    seasonalAccessNote: ${c.seasonalAccessNote ? JSON.stringify(c.seasonalAccessNote) : "undefined"},
    source: {
      name: ${JSON.stringify(c.officialLinks[0].name)},
      url: ${JSON.stringify(c.officialLinks[0].url)},
      lastVerified: ${JSON.stringify(c.officialLinks[0].lastVerified)},
    },
    isPublished: true,
  },`;
}

export interface PublishPlan {
  ready: GrowthCandidate[];
  rejected: { id: string; failures: string[] }[];
  unsourcedRejected: number;
  qualityRejected: number;
  duplicatesRejected: number;
}

export function planPublish(
  candidates: GrowthCandidate[],
  existingSlugs: Set<string> = loadPublishedSlugSet(),
): PublishPlan {
  const ready: GrowthCandidate[] = [];
  const rejected: { id: string; failures: string[] }[] = [];
  let unsourcedRejected = 0;
  let qualityRejected = 0;
  let duplicatesRejected = 0;

  for (const c of candidates) {
    const gate = evaluateCandidate(c, existingSlugs);
    if (!gate.ok) {
      const codes = gate.failures.map((f) => f.code);
      if (codes.includes("unsourced") || codes.includes("source-not-https")) {
        unsourcedRejected += 1;
      }
      if (codes.includes("duplicate-slug")) duplicatesRejected += 1;
      qualityRejected += 1;
      rejected.push({
        id: c.id || c.slug,
        failures: gate.failures.map((f) => `${f.code}: ${f.message}`),
      });
      continue;
    }
    ready.push(c);
    existingSlugs.add(c.slug);
  }

  return {
    ready: ready.slice(0, MAX_AUTO_PUBLISH),
    rejected,
    unsourcedRejected,
    qualityRejected,
    duplicatesRejected,
  };
}

export function writeProposalArtifact(
  ready: GrowthCandidate[],
  rejected: PublishPlan["rejected"],
  outDir = "data/growth-proposals",
): string {
  mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10);
  const path = join(outDir, `proposal-${stamp}.json`);
  writeFileSync(
    path,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        readyCount: ready.length,
        ready: ready.map((c) => ({ id: c.id, slug: c.slug, kind: c.kind })),
        rejected,
        note: "Review ready candidates before merging. Auto-apply is opt-in.",
      },
      null,
      2,
    ),
    "utf8",
  );
  return path;
}

/**
 * Apply ready candidates into src/data/geo/*-batch3.ts (create or append).
 * Returns paths written. Caller must run tests/build before deploy.
 */
export function applyCandidatesToBatch3(
  ready: GrowthCandidate[],
  root = process.cwd(),
): string[] {
  const written: string[] = [];
  const byKind = {
    destination: ready.filter((c) => c.kind === "destination"),
    lake: ready.filter((c) => c.kind === "lake"),
    marina: ready.filter((c) => c.kind === "marina"),
    launch: ready.filter((c) => c.kind === "launch"),
  };

  if (byKind.destination.length) {
    const path = join(root, "src/data/geo/destinations-batch3.ts");
    const body = `import type { Destination } from "@/types/geo";\n\n/** Auto/growth batch 3 — only gate-passing, source-backed destinations. */\nexport const destinationsBatch3: Destination[] = [\n${byKind.destination.map(renderDestination).join("\n")}\n];\n`;
    writeFileSync(path, body, "utf8");
    written.push(path);
  }
  if (byKind.lake.length) {
    const path = join(root, "src/data/geo/lakes-batch3.ts");
    const body = `import type { Lake } from "@/types/geo";\n\nexport const lakesBatch3: Lake[] = [\n${byKind.lake.map(renderLake).join("\n")}\n];\n`;
    writeFileSync(path, body, "utf8");
    written.push(path);
  }
  if (byKind.marina.length) {
    const path = join(root, "src/data/geo/marinas-batch3.ts");
    const body = `import type { Marina } from "@/types/geo";\n\nexport const marinasBatch3: Marina[] = [\n${byKind.marina.map(renderMarina).join("\n")}\n];\n`;
    writeFileSync(path, body, "utf8");
    written.push(path);
  }
  if (byKind.launch.length) {
    const path = join(root, "src/data/geo/launches-batch3.ts");
    const body = `import type { BoatLaunch } from "@/types/geo";\n\nexport const launchesBatch3: BoatLaunch[] = [\n${byKind.launch.map(renderLaunch).join("\n")}\n];\n`;
    writeFileSync(path, body, "utf8");
    written.push(path);
  }

  // Ensure geo/index merges batch3 when files exist.
  ensureIndexMergesBatch3(root);
  return written;
}

function ensureIndexMergesBatch3(root: string): void {
  const indexPath = join(root, "src/data/geo/index.ts");
  let src = readFileSync(indexPath, "utf8");
  if (!src.includes("destinations-batch3")) {
    src = src.replace(
      'import { destinationsBatch2 } from "./destinations-batch2";',
      'import { destinationsBatch2 } from "./destinations-batch2";\nimport { destinationsBatch3 } from "./destinations-batch3";',
    );
    src = src.replace(
      "...destinationsBatch2,\n];",
      "...destinationsBatch2,\n  ...destinationsBatch3,\n];",
    );
  }
  if (!src.includes("launches-batch3") && existsSync(join(root, "src/data/geo/launches-batch3.ts"))) {
    src = src.replace(
      'import { launchesBatch2 } from "./launches-batch2";',
      'import { launchesBatch2 } from "./launches-batch2";\nimport { launchesBatch3 } from "./launches-batch3";',
    );
    src = src.replace(
      "...launchesBatch2,\n];",
      "...launchesBatch2,\n  ...launchesBatch3,\n];",
    );
  }
  if (!src.includes("marinas-batch3") && existsSync(join(root, "src/data/geo/marinas-batch3.ts"))) {
    src = src.replace(
      'import { marinasBatch2 } from "./marinas-batch2";',
      'import { marinasBatch2 } from "./marinas-batch2";\nimport { marinasBatch3 } from "./marinas-batch3";',
    );
    src = src.replace(
      "...marinasBatch2,\n];",
      "...marinasBatch2,\n  ...marinasBatch3,\n];",
    );
  }
  if (!src.includes("lakesBatch3") && existsSync(join(root, "src/data/geo/lakes-batch3.ts"))) {
    // Lakes are a single array file historically — append via export merge helper
    if (!src.includes('from "./lakes-batch3"')) {
      src = src.replace(
        'export { lakes } from "./lakes";',
        'import { lakes as lakesCore } from "./lakes";\nimport { lakesBatch3 } from "./lakes-batch3";\nexport const lakes = [...lakesCore, ...lakesBatch3];',
      );
    }
  }
  writeFileSync(indexPath, src, "utf8");
}

/** Bump lastVerified on matching published sources when probe OK (enrichment). */
export function enrichVerificationDates(
  labels: string[],
  verifiedDate: string,
): string[] {
  // Enrichment of TS source files is done carefully via proposal notes;
  // this returns the list that would be updated for the report.
  return labels.map((l) => `Would refresh lastVerified→${verifiedDate} for ${l}`);
}
