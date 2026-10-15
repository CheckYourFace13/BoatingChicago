import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getBoatingSeason, getSeasonalHeroCopy } from "@/lib/season";

/** Fixed UTC instants that fall on specific America/Chicago calendar days. */
function chicagoNoon(isoDate: string): Date {
  // Noon UTC is still the same calendar day in CDT/CST for these boundary dates.
  return new Date(`${isoDate}T17:00:00.000Z`);
}

describe("getBoatingSeason", () => {
  it("treats Apr 30 as spring and May 1 as peak", () => {
    assert.equal(getBoatingSeason(chicagoNoon("2026-04-30")), "spring");
    assert.equal(getBoatingSeason(chicagoNoon("2026-05-01")), "peak");
  });

  it("treats Oct 31 as peak and Nov 1 as winter", () => {
    assert.equal(getBoatingSeason(chicagoNoon("2026-10-31")), "peak");
    assert.equal(getBoatingSeason(chicagoNoon("2026-11-01")), "winter");
  });

  it("maps Jan and Dec correctly", () => {
    assert.equal(getBoatingSeason(chicagoNoon("2026-01-15")), "spring");
    assert.equal(getBoatingSeason(chicagoNoon("2026-12-15")), "winter");
  });
});

describe("getSeasonalHeroCopy", () => {
  it("points spring CTAs at checklist/storage and peak at weather/marinas", () => {
    const spring = getSeasonalHeroCopy(chicagoNoon("2026-03-15"));
    assert.equal(spring.primaryCta.href, "/spring-boat-launch-checklist-chicago");
    const peak = getSeasonalHeroCopy(chicagoNoon("2026-07-15"));
    assert.equal(peak.primaryCta.href, "/weather");
    assert.equal(peak.secondaryCta.href, "/marinas");
    const winter = getSeasonalHeroCopy(chicagoNoon("2026-11-15"));
    assert.equal(winter.primaryCta.href, "/storage");
  });
});
