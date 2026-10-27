import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAmazonGearPlacementForGuide } from "@/data/amazon-gear";
import {
  getAllGuideSlugs,
  getGuideBySlug,
  WINTER_GUIDE_SLUGS,
} from "@/data/guides";

describe("winterization hub and transient dockage guides", () => {
  it("registers concise hub and transient guides without lead forms", () => {
    const hub = getGuideBySlug("chicago-boat-winterization");
    const transient = getGuideBySlug("chicago-transient-dockage");
    assert.ok(hub);
    assert.ok(transient);
    assert.equal(hub.showLeadForm, false);
    assert.equal(transient.showLeadForm, false);
    assert.ok(WINTER_GUIDE_SLUGS.includes("chicago-boat-winterization"));
    assert.ok(getAllGuideSlugs().includes("chicago-transient-dockage"));
    assert.match(hub.intro, /not a universal winterizing recipe/i);
    assert.match(transient.intro, /October 27, 2026/);
    assert.match(transient.intro, /does not claim a slip is available/i);
  });

  it("adds kayak and paddle Amazon placements without inventing products", () => {
    const kayak = getAmazonGearPlacementForGuide("chicago-kayak-rental-guide");
    const paddle = getAmazonGearPlacementForGuide(
      "paddle-board-rentals-chicago",
    );
    assert.ok(kayak);
    assert.ok(paddle);
    assert.deepEqual(kayak.itemIds, ["life-jackets", "waterproof-dry-bags"]);
    assert.deepEqual(paddle.itemIds, ["life-jackets", "waterproof-dry-bags"]);
  });
});
