import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ADRENALINE_CJ,
  CJ_WEBSITE_PID_BOATINGCHICAGO,
  buildAdrenalineCjUrl,
  isAdrenalineCjUrl,
} from "../partner-programs";
import { isAdvertiserActive, resolveAdvertisers } from "@/lib/affiliate-registry";

describe("Adrenaline CJ placements (2026-10-15)", () => {
  it("builds deep links with BoatingChicago PID and evergreen link id", () => {
    for (const product of Object.keys(ADRENALINE_CJ.products) as Array<
      keyof typeof ADRENALINE_CJ.products
    >) {
      const href = buildAdrenalineCjUrl(product);
      const u = new URL(href);
      assert.equal(u.hostname, "www.tkqlhce.com");
      assert.equal(
        u.pathname,
        `/click-${CJ_WEBSITE_PID_BOATINGCHICAGO}-${ADRENALINE_CJ.linkId}`,
      );
      assert.equal(u.searchParams.get("url"), ADRENALINE_CJ.products[product].destinationUrl);
      assert.equal(isAdrenalineCjUrl(href, product), true);
    }
  });

  it("keeps destination paths on verified Chicago product pages", () => {
    assert.match(
      ADRENALINE_CJ.products["premier-dinner-cruise"].destinationUrl,
      /\/chicago\/meal-cruises\/early-premier-dinner-cruise-lake-michigan-2\.5hrs\/$/,
    );
    assert.match(
      ADRENALINE_CJ.products["private-sunset-sail"].destinationUrl,
      /\/chicago\/sailing\/private-skyline-sunset-sailing-chicago-2hrs30mins\/$/,
    );
  });

  it("activates Adrenaline in the editorial registry for boatingchicago only", () => {
    const row = resolveAdvertisers().find((r) => r.id === "adrenaline");
    assert.ok(row);
    assert.equal(row.advertiserId, "4851771");
    assert.equal(isAdvertiserActive(row, "boatingchicago"), true);
    assert.equal(isAdvertiserActive(row, "leaguepour"), false);
  });
});
