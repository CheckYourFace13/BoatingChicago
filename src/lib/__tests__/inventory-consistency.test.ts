/**
 * Inventory consistency — public directory pages must surface the same counts
 * as the published geo registry (guards against stale external audits / broken merges).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  getPublishedDestinations,
  getPublishedLakes,
  getPublishedLaunches,
  getPublishedMarinas,
  getPublishedPreserveAccess,
} from "@/data/geo";
import { TOOL_CATALOG } from "@/lib/tools/catalog";
import { listGeoHubs } from "@/lib/geo-registry";
import { COVERAGE_LONG, INLAND_DRIVING_MILES_APPROX } from "@/config/coverage";

describe("inventory consistency", () => {
  it("publishes expected directory sizes from merged geo batches", () => {
    assert.ok(getPublishedDestinations().length >= 41);
    assert.ok(getPublishedLakes().length >= 24);
    assert.ok(getPublishedLaunches().length >= 56);
    assert.ok(getPublishedMarinas().length >= 32);
    assert.ok(getPublishedPreserveAccess().length >= 38);
    assert.equal(listGeoHubs().length, 9);
    assert.equal(TOOL_CATALOG.length, 10);
  });

  it("keeps directory pages wired to published getters (not hard-coded stale counts)", () => {
    const launchesPage = readFileSync(
      join(process.cwd(), "src/app/boat-launches/page.tsx"),
      "utf8",
    );
    const marinasPage = readFileSync(
      join(process.cwd(), "src/app/marinas/page.tsx"),
      "utf8",
    );
    const toolsPage = readFileSync(
      join(process.cwd(), "src/app/tools/page.tsx"),
      "utf8",
    );
    assert.match(launchesPage, /getPublishedLaunches|getLaunchesByDestination/);
    assert.match(marinasPage, /getPublishedMarinas|getMarinasByDestination/);
    assert.match(toolsPage, /TOOL_CATALOG/);
  });

  it("uses 400-mile inland scope without trailing-period coverage trap", () => {
    assert.equal(INLAND_DRIVING_MILES_APPROX, 400);
    assert.equal(COVERAGE_LONG.endsWith("."), false);
    const about = readFileSync(
      join(process.cwd(), "src/app/about/page.tsx"),
      "utf8",
    );
    assert.match(about, /siteConfig\.coverage/);
    assert.match(about, /How we source information/);
  });

  it("exposes a deploy health probe for post-publish hang detection", () => {
    const health = readFileSync(
      join(process.cwd(), "src/app/api/health/route.ts"),
      "utf8",
    );
    assert.match(health, /ok:\s*true/);
    assert.match(health, /BUILD_SHA/);
    const verify = readFileSync(
      join(process.cwd(), "scripts/verify-production.sh"),
      "utf8",
    );
    assert.match(verify, /api\/health/);
  });
});
