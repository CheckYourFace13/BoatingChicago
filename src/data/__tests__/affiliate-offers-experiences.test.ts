import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  affiliateOffers,
  buildGygUrl,
  getOffersForPage,
} from "../affiliate-offers";

describe("experience offer additions (2026-10-15)", () => {
  it("tracks new GYG products with HISQ5ML and verified slugs", () => {
    for (const id of ["466232", "500340", "1308180"] as const) {
      const offer = affiliateOffers.find(
        (o) => o.providerProductId === id && o.active
      );
      assert.ok(offer, `missing active offer ${id}`);
      assert.match(offer.url, /partner_id=HISQ5ML/);
      assert.equal(offer.url.includes(`-t${id}`), true);
    }
    assert.match(
      buildGygUrl(
        "290485",
        "chicago-river-75-minute-guided-architecture-cruise"
      ),
      /chicago-river-75-minute-guided-architecture-cruise-t290485/
    );
  });

  it("surfaces First Lady and sunset cocktail on architecture page", () => {
    const ids = getOffersForPage("chicago-architecture-cruises").map((o) => o.id);
    assert.ok(ids.includes("gyg-290485"));
    assert.ok(ids.includes("gyg-466232"));
    assert.ok(ids.includes("gyg-500340"));
  });

  it("surfaces guided sunset kayak on kayak page", () => {
    const ids = getOffersForPage("chicago-kayak-rentals").map((o) => o.id);
    assert.ok(ids.includes("gyg-1308180"));
  });

  it("keeps Viator tracking params on improved river/sunset cards", () => {
    for (const id of [
      "viator-chicago-river-cruise",
      "viator-sunset-cruise",
      "viator-skyline-sail",
    ]) {
      const offer = affiliateOffers.find((o) => o.id === id);
      assert.ok(offer);
      assert.match(offer.url, /pid=P00309183/);
      assert.match(offer.url, /mcid=42383/);
      assert.ok(offer.location);
    }
  });
});
