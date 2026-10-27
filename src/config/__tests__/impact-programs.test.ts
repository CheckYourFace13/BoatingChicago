import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildImpactClickUrl,
  isBrandsmartBlackFridayWindow,
  isImpactTrackingHost,
  sanitizeImpactSubId,
} from "../impact-programs";
import {
  resolveShoppingSlots,
  SHOPPING_OFFERS,
  SHOPPING_PAGE_SLOTS,
} from "@/data/partner-shopping";
import {
  isAdvertiserActive,
  isValidTrackedDestination,
  resolveAdvertisers,
} from "@/lib/affiliate-registry";

describe("Impact URL utilities", () => {
  it("accepts sjv, pxf, and onepath hosts", () => {
    assert.equal(isImpactTrackingHost("brandsmartusa.sjv.io"), true);
    assert.equal(isImpactTrackingHost("edifier.pxf.io"), true);
    assert.equal(isImpactTrackingHost("chipolo.onepath.io"), true);
    assert.equal(isImpactTrackingHost("example.com"), false);
  });

  it("sets subId1=bc, subId2=page, subId3=slot and keeps the path", () => {
    const href = buildImpactClickUrl(
      "https://brandsmartusa.sjv.io/X4AQjo?foo=1",
      "Guides Page",
      "brandsmart",
    );
    const u = new URL(href);
    assert.equal(u.searchParams.get("foo"), "1");
    assert.equal(u.searchParams.get("subId1"), "bc");
    assert.equal(u.searchParams.get("subId2"), "guides-page");
    assert.equal(u.searchParams.get("subId3"), "brandsmart");
    assert.equal(u.pathname, "/X4AQjo");
  });

  it("strips PII-like characters from subIds", () => {
    assert.equal(sanitizeImpactSubId("Chris@example.com"), "chris-example-com");
  });
});

describe("BrandsMart Black Friday window (America/Chicago, 2026)", () => {
  it("is closed just before Oct 28 00:00 CT", () => {
    // 2026-10-28 00:00 CDT = 2026-10-28 05:00 UTC
    assert.equal(
      isBrandsmartBlackFridayWindow(new Date("2026-10-28T04:59:59.000Z")),
      false,
    );
  });

  it("opens at Oct 28 00:00 CT", () => {
    assert.equal(
      isBrandsmartBlackFridayWindow(new Date("2026-10-28T05:00:00.000Z")),
      true,
    );
  });

  it("stays open across the Nov 1 DST fallback", () => {
    assert.equal(
      isBrandsmartBlackFridayWindow(new Date("2026-11-01T06:30:00.000Z")),
      true,
    );
    assert.equal(
      isBrandsmartBlackFridayWindow(new Date("2026-11-01T08:30:00.000Z")),
      true,
    );
  });

  it("closes at Nov 29 00:00 CT", () => {
    // 2026-11-29 00:00 CST = 2026-11-29 06:00 UTC
    assert.equal(
      isBrandsmartBlackFridayWindow(new Date("2026-11-29T05:59:59.000Z")),
      true,
    );
    assert.equal(
      isBrandsmartBlackFridayWindow(new Date("2026-11-29T06:00:00.000Z")),
      false,
    );
  });
});

describe("Shopping placements", () => {
  it("resolves BrandsMart creative by window and never both", () => {
    const inWindow = resolveShoppingSlots(
      "guides",
      new Date("2026-11-01T12:00:00.000Z"),
    );
    const outWindow = resolveShoppingSlots(
      "guides",
      new Date("2026-12-01T12:00:00.000Z"),
    );
    const inIds = inWindow.map((s) => s.offer.id);
    const outIds = outWindow.map((s) => s.offer.id);
    assert.equal(inIds.includes("brandsmart-bf"), true);
    assert.equal(inIds.includes("brandsmart-evergreen"), false);
    assert.equal(outIds.includes("brandsmart-evergreen"), true);
    assert.equal(outIds.includes("brandsmart-bf"), false);
    assert.equal(inWindow.some((s) => s.offer.impressionPixel), true);
    assert.equal(
      outWindow.find((s) => s.offer.id === "brandsmart-evergreen")?.offer
        .impressionPixel,
      undefined,
    );
  });

  it("places 3–5 Impact offers plus Peet's without homepage slots", () => {
    assert.equal(SHOPPING_PAGE_SLOTS["/"] === undefined, true);
    const placed = new Set(
      Object.values(SHOPPING_PAGE_SLOTS).flatMap((specs) =>
        specs.map((s) => (s.offerId === "brandsmart-window" ? "brandsmart-bf" : s.offerId)),
      ),
    );
    const impact = [...placed].filter((id) => SHOPPING_OFFERS[id].network === "impact");
    assert.ok(impact.length >= 3 && impact.length <= 5);
    assert.equal(placed.has("peets-coffee"), true);
  });

  it("attaches Impact subIds on resolved hrefs", () => {
    const slots = resolveShoppingSlots(
      "tools",
      new Date("2026-12-01T12:00:00.000Z"),
    );
    assert.equal(slots.length, 1);
    const u = new URL(slots[0].href);
    assert.equal(u.searchParams.get("subId1"), "bc");
    assert.equal(u.searchParams.get("subId2"), "tools");
    assert.equal(u.searchParams.get("subId3"), "kingcamp-300");
  });
});

describe("Registry registration without auto-exposure", () => {
  it("registers approved Impact and Peet's rows as inactive for editorial matching", () => {
    const ids = [
      "brandsmart",
      "kingcamp",
      "fender-audio",
      "best-choice-products",
      "chipolo",
      "edifier",
      "lasko",
      "philips-home-access",
      "ispring",
      "secret-aardvark",
      "peets-coffee",
    ];
    for (const id of ids) {
      const row = resolveAdvertisers().find((r) => r.id === id);
      assert.ok(row, id);
      assert.equal(row.approvalStatus, "approved");
      assert.equal(isValidTrackedDestination(row.network, row.trackedDestination), true);
      assert.equal(isAdvertiserActive(row, "boatingchicago"), false);
    }
  });
});
