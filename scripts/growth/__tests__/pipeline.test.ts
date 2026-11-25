/**
 * Growth pipeline gates — duplicate rejection, unsourced rejection,
 * failed “build” gate, rollback of apply, and a safe publish example.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { mkdtempSync, rmSync, existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { evaluateCandidate, existingSlugSet } from "../quality-gates";
import { planPublish, applyCandidatesToBatch3, MAX_AUTO_PUBLISH } from "../publish";
import type { GrowthCandidate } from "../types";
import { loadCandidatesFromDir } from "../discovery";

const baseDest = (): GrowthCandidate => ({
  id: "test-safe",
  kind: "destination",
  slug: "test-harbor-safe-example",
  name: "Test Harbor Safe Example",
  state: "WI",
  region: "wisconsin",
  bodyOfWater: "Lake Michigan",
  summary:
    "Municipal test harbor with a documented public launch and official operator page for pipeline validation only.",
  overview: [
    "This fixture validates the growth pipeline publish path. It is not a live destination page and must never ship to production inventory without removing the test slug.",
    "Planning distances: about 200 driving miles from downtown Chicago for trailer planning only. Confirm all fees and hours on the official operator page before you tow — we do not invent rates or safe-boating ratings.",
    "Official https sources, weather anchors, and coordinates are required before any candidate can pass quality gates. Incomplete records stay in the research queue.",
  ],
  highlights: ["Pipeline fixture", "Official https source", "No invented ratings"],
  officialLinks: [
    {
      name: "City of Algoma — Marina (fixture source host)",
      url: "https://www.algomacity.org/residents/marina/index.php",
      lastVerified: "2026-11-25",
    },
  ],
  weatherLocationId: "manitowoc",
  coordinates: { lat: 44.5, lng: -87.5 },
  distanceFromChicagoMiles: 200,
});

describe("growth quality gates", () => {
  const existing = existingSlugSet({
    destinations: [{ slug: "chicago" }],
    lakes: [],
    marinas: [],
    launches: [],
  });

  it("rejects duplicate slugs", () => {
    const c = { ...baseDest(), slug: "chicago", id: "dup" };
    const gate = evaluateCandidate(c, existing);
    assert.equal(gate.ok, false);
    assert.ok(gate.failures.some((f) => f.code === "duplicate-slug"));
  });

  it("rejects unsourced content", () => {
    const c = { ...baseDest(), officialLinks: [], id: "unsourced" };
    const gate = evaluateCandidate(c, existing);
    assert.equal(gate.ok, false);
    assert.ok(gate.failures.some((f) => f.code === "unsourced"));
  });

  it("rejects unsafe safe-to-boat language", () => {
    const c = {
      ...baseDest(),
      slug: "unsafe-example",
      summary: "This harbor is always safe to boat regardless of weather.",
      id: "unsafe",
    };
    const gate = evaluateCandidate(c, existing);
    assert.equal(gate.ok, false);
    assert.ok(gate.failures.some((f) => f.code === "unsafe-rating-language"));
  });

  it("rejects thin overview (failed content completeness / SEO depth)", () => {
    const c = {
      ...baseDest(),
      slug: "thin-example",
      overview: ["Too short.", "Still thin."],
      id: "thin",
    };
    const gate = evaluateCandidate(c, existing);
    assert.equal(gate.ok, false);
    assert.ok(gate.failures.some((f) => f.code === "overview-short"));
  });

  it("rejects AI-hint / generative-search bait copy", () => {
    const c = {
      ...baseDest(),
      slug: "ai-bait-harbor",
      summary: "Optimized for AI Overviews and ChatGPT keyword snippets about harbors.",
      id: "ai-bait",
    };
    const gate = evaluateCandidate(c, existing);
    assert.equal(gate.ok, false);
    assert.ok(gate.failures.some((f) => f.code === "ai-hint-spam"));
  });

  it("rejects near-duplicate facility pages sharing destination and source", () => {
    const c = {
      ...baseDest(),
      kind: "launch" as const,
      slug: "oshkosh-clone-launch",
      destinationSlug: "oshkosh",
      summary:
        "City of Oshkosh public Lake Winnebago launch — permit required for trailered motorized craft.",
      overview: ["Short clone.", "Still thin for uniqueness."],
      officialLinks: [
        {
          name: "City",
          url: "https://www.oshkoshwi.gov/Parks/BoatLaunchLocations.aspx",
          lastVerified: "2026-11-25",
        },
      ],
      id: "clone",
    };
    const gate = evaluateCandidate(c, existing, {
      publishedFacilities: [
        {
          slug: "oshkosh-rainbow-park-launch",
          destinationSlug: "oshkosh",
          summary:
            "City of Oshkosh public Lake Winnebago launch — permit required for trailered motorized craft at pay stations.",
          sourceUrl: "https://www.oshkoshwi.gov/Parks/BoatLaunchLocations.aspx",
        },
      ],
    });
    assert.equal(gate.ok, false);
    assert.ok(gate.failures.some((f) => f.code === "near-duplicate-facility"));
  });

  it("accepts a complete source-backed destination", () => {
    const gate = evaluateCandidate(baseDest(), existing);
    assert.equal(gate.ok, true, JSON.stringify(gate.failures));
  });
});

describe("growth publish plan + rollback", () => {
  it("planPublish separates ready from rejected and caps batch size", () => {
    const many = Array.from({ length: MAX_AUTO_PUBLISH + 3 }, (_, i) => ({
      ...baseDest(),
      id: `c-${i}`,
      slug: `test-harbor-safe-example-${i}`,
      name: `Test Harbor ${i}`,
    }));
    const bad: GrowthCandidate = {
      ...baseDest(),
      id: "bad",
      slug: "bad-unsourced",
      officialLinks: [],
    };
    const plan = planPublish([...many, bad], new Set());
    assert.equal(plan.ready.length, MAX_AUTO_PUBLISH);
    assert.ok(plan.unsourcedRejected >= 1);
    assert.ok(plan.rejected.some((r) => r.id === "bad"));
  });

  it("apply writes files and rollback restores by deleting applied outputs", () => {
    const root = mkdtempSync(join(tmpdir(), "bc-growth-"));
    try {
      mkdirSync(join(root, "src/data/geo"), { recursive: true });
      // Minimal index for ensureIndexMergesBatch3
      writeFileSync(
        join(root, "src/data/geo/index.ts"),
        `import { destinationsBatch2 } from "./destinations-batch2";\nexport const destinations = [\n  ...destinationsBatch2,\n];\nimport { launchesBatch2 } from "./launches-batch2";\nexport const launches = [\n  ...launchesBatch2,\n];\nimport { marinasBatch2 } from "./marinas-batch2";\nexport const marinas = [\n  ...marinasBatch2,\n];\nexport { lakes } from "./lakes";\n`,
        "utf8",
      );
      const written = applyCandidatesToBatch3([baseDest()], root);
      assert.ok(written.some((p) => p.endsWith("destinations-batch3.ts")));
      assert.ok(existsSync(join(root, "src/data/geo/destinations-batch3.ts")));
      const body = readFileSync(
        join(root, "src/data/geo/destinations-batch3.ts"),
        "utf8",
      );
      assert.ok(body.includes("test-harbor-safe-example"));

      // Rollback: remove applied artifacts (simulates failed build recovery).
      for (const p of written) rmSync(p, { force: true });
      assert.equal(
        existsSync(join(root, "src/data/geo/destinations-batch3.ts")),
        false,
      );
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("loads priority candidates from data/growth-candidates and most pass gates", () => {
    const candidates = loadCandidatesFromDir("data/growth-candidates");
    assert.ok(candidates.length >= 6);
    const existing = existingSlugSet({
      destinations: [],
      lakes: [],
      marinas: [],
      launches: [],
    });
    // Against empty set, priority destinations/lakes should pass.
    let ok = 0;
    for (const c of candidates) {
      if (evaluateCandidate(c, existing).ok) {
        ok += 1;
        existing.add(c.slug);
      }
    }
    assert.ok(ok >= 6, `expected ≥6 gate-passing candidates, got ${ok}`);
  });
});
