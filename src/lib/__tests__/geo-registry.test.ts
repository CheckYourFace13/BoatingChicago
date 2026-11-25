import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { GEO_HUBS } from "@/config/geo-hierarchy";
import { getDestinationBySlug } from "@/data/geo";
import {
  classifyDestinationHub,
  getGeoInventorySnapshot,
  getHubDestinations,
  listGeoHubs,
} from "@/lib/geo-registry";

describe("geo-registry", () => {
  it("lists nine geographic hubs in stable order", () => {
    const hubs = listGeoHubs();
    assert.equal(hubs.length, 9);
    assert.equal(hubs[0]?.id, "chicago-chicagoland");
    assert.equal(hubs.at(-1)?.id, "lake-michigan-full");
    assert.equal(GEO_HUBS.length, 9);
  });

  it("keeps Chicago under the primary hub", () => {
    const chicago = getDestinationBySlug("chicago");
    assert.ok(chicago);
    assert.equal(classifyDestinationHub(chicago), "chicago-chicagoland");
  });

  it("classifies Door County and Traverse City on Lake Michigan hubs", () => {
    const door = getDestinationBySlug("door-county");
    const tc = getDestinationBySlug("traverse-city");
    assert.ok(door && tc);
    assert.equal(classifyDestinationHub(door), "wisconsin-lake-michigan");
    assert.equal(classifyDestinationHub(tc), "michigan-lake-michigan");
  });

  it("includes new northern destinations in the full-lake hub", () => {
    const slugs = getHubDestinations("lake-michigan-full").map((d) => d.slug);
    for (const slug of [
      "green-bay",
      "sturgeon-bay",
      "door-county",
      "manitowoc",
      "hammond",
      "muskegon",
      "ludington",
      "traverse-city",
    ]) {
      assert.ok(slugs.includes(slug), `missing ${slug}`);
    }
  });

  it("reports inventory counts from published data", () => {
    const snap = getGeoInventorySnapshot();
    assert.ok(snap.destinations >= 25);
    assert.ok(snap.launches >= 40);
    assert.ok(snap.marinas >= 20);
    assert.equal(snap.hubs, 9);
  });
});
