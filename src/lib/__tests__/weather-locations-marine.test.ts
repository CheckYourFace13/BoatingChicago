import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getWeatherLocationById,
  weatherLocations,
} from "@/config/weather-locations";

describe("regional marine weather metadata", () => {
  it("keeps Chicago on LOT zones and buoy 45174", () => {
    const chicago = getWeatherLocationById("chicago");
    assert.ok(chicago);
    assert.equal(chicago.marineOffice, "LOT");
    assert.equal(chicago.ndbcBuoyId, "45174");
    assert.ok(chicago.alertZones?.includes("LMZ741"));
    assert.equal(chicago.nearshoreZone?.id, "LMZ741");
  });

  it("maps Green Bay / Door County to GRB marine office and bay zones", () => {
    const gb = getWeatherLocationById("green-bay");
    const sb = getWeatherLocationById("sturgeon-bay");
    assert.ok(gb && sb);
    assert.equal(gb.marineOffice, "GRB");
    assert.equal(sb.marineOffice, "GRB");
    assert.equal(gb.nearshoreZone?.id, "LMZ522");
    assert.equal(sb.nearshoreZone?.id, "LMZ541");
  });

  it("maps Traverse City to APX / Grand Traverse Bay zone", () => {
    const tc = getWeatherLocationById("traverse-city");
    assert.ok(tc);
    assert.equal(tc.marineOffice, "APX");
    assert.equal(tc.nearshoreZone?.id, "LMZ323");
    assert.equal(tc.ndbcBuoyId, "45022");
  });

  it("maps Little Traverse / Straits harbors to verified APX LMZ zones", () => {
    const petoskey = getWeatherLocationById("petoskey");
    const charlevoix = getWeatherLocationById("charlevoix");
    const mackinaw = getWeatherLocationById("mackinaw-city");
    const beaver = getWeatherLocationById("beaver-island");
    assert.equal(petoskey?.nearshoreZone?.id, "LMZ342");
    assert.equal(charlevoix?.nearshoreZone?.id, "LMZ342");
    assert.equal(mackinaw?.nearshoreZone?.id, "LMZ342");
    assert.equal(beaver?.nearshoreZone?.id, "LMZ341");
    assert.ok(mackinaw?.alertZones?.includes("LHZ345"));
  });

  it("maps Washington Island to GRB Door County nearshore zone", () => {
    const wi = getWeatherLocationById("washington-island");
    assert.ok(wi);
    assert.equal(wi.marineOffice, "GRB");
    assert.equal(wi.nearshoreZone?.id, "LMZ541");
  });

  it("does not assign marine zones or buoys to inland lake anchors", () => {
    for (const id of [
      "lake-geneva",
      "chain-o-lakes",
      "fond-du-lac",
      "shabbona-lake",
    ]) {
      const loc = getWeatherLocationById(id);
      assert.ok(loc);
      assert.equal(loc.marineOffice, undefined);
      assert.equal(loc.ndbcBuoyId, undefined);
      assert.equal(loc.nearshoreZone, undefined);
    }
  });

  it("gives every Lake Michigan harbor a nearshore zone and office", () => {
    const inland = new Set([
      "lake-geneva",
      "chain-o-lakes",
      "fond-du-lac",
      "shabbona-lake",
    ]);
    for (const loc of weatherLocations) {
      if (inland.has(loc.id)) continue;
      assert.ok(loc.nearshoreZone?.id, `${loc.id} missing nearshoreZone`);
      assert.ok(loc.marineOffice, `${loc.id} missing marineOffice`);
      assert.ok(loc.ndbcBuoyId, `${loc.id} missing ndbcBuoyId`);
      assert.ok(
        (loc.alertZones?.length ?? 0) > 0,
        `${loc.id} missing alertZones`,
      );
    }
  });
});
