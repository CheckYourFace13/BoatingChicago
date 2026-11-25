import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  anchorRodeFeet,
  batteryRuntimeHours,
  calculateFuel,
  calculateOwnership,
  calculateTripTime,
  compareSlipQuotes,
  knotsToMph,
  monthlyLoanPayment,
  nmToStatuteMiles,
  tongueWeightRange,
} from "@/lib/tools/formulas";
import { filterLaunches, launchFiltersIndexable } from "@/lib/launch-filters";
import { getPublishedLaunches } from "@/data/geo";
import { marinaFilterHref, parseMarinaAmenity } from "@/lib/marina-filters";
import { lookupZip } from "@/lib/zip-centroids";
import { haversineMiles } from "@/lib/geo-distance";

describe("fuel calculator", () => {
  it("separates consumed fuel from fuel needed aboard with reserve", () => {
    const result = calculateFuel({
      distanceNm: 20,
      speedKnots: 10,
      gallonsPerHour: 8,
      fuelPricePerGallon: 5,
      otherFees: 10,
      roundTrip: true,
      reserveFraction: 0.2,
    });
    assert.ok(result);
    assert.equal(result.legNm, 40);
    assert.equal(result.underwayHours, 4);
    assert.equal(result.gallonsConsumed, 32);
    assert.equal(result.reserveGallons, 6.4);
    assert.equal(result.gallonsToCarry, 38.4);
    assert.equal(result.fuelSpend, 160);
    assert.equal(result.totalCost, 170);
  });

  it("rejects non-positive speed or distance", () => {
    assert.equal(
      calculateFuel({
        distanceNm: 0,
        speedKnots: 10,
        gallonsPerHour: 1,
        fuelPricePerGallon: 4,
        otherFees: 0,
        roundTrip: false,
        reserveFraction: 0,
      }),
      null,
    );
  });
});

describe("ownership calculator", () => {
  it("uses the standard amortizing payment", () => {
    const pmt = monthlyLoanPayment(20000, 6, 60);
    assert.ok(pmt);
    assert.ok(Math.abs(pmt - 386.66) < 0.5);
    const own = calculateOwnership({
      purchasePrice: 25000,
      downPayment: 5000,
      termYears: 5,
      aprPct: 6,
      marinaAnnual: 4000,
      winterStorageAnnual: 2000,
      insuranceAnnual: 800,
      maintenanceAnnual: 1200,
      fuelAnnual: 1500,
      otherAnnual: 200,
    });
    assert.ok(own);
    assert.equal(own.amountFinanced, 20000);
    assert.ok(Math.abs(own.monthlyLoan - 386.66) < 0.5);
    assert.equal(own.annualOperating, 9700);
  });

  it("treats a paid-in-full boat as zero loan", () => {
    const own = calculateOwnership({
      purchasePrice: 10000,
      downPayment: 10000,
      termYears: 1,
      aprPct: 0,
      marinaAnnual: 1200,
      winterStorageAnnual: 0,
      insuranceAnnual: 0,
      maintenanceAnnual: 0,
      fuelAnnual: 0,
      otherAnnual: 0,
    });
    assert.ok(own);
    assert.equal(own.monthlyLoan, 0);
    assert.equal(own.annualOperating, 1200);
  });
});

describe("other tools", () => {
  it("compares seasonal slip quotes", () => {
    const rows = compareSlipQuotes([
      {
        name: "Harbor A",
        seasonalRate: 100,
        monthsCovered: 6,
        lengthFeet: 30,
        rateIsPerFoot: true,
        addOns: 200,
      },
      {
        name: "Yard B",
        seasonalRate: 2800,
        monthsCovered: 7,
        lengthFeet: 30,
        rateIsPerFoot: false,
        addOns: 0,
      },
    ]);
    assert.equal(rows[0].seasonTotal, 3200);
    assert.equal(rows[1].seasonTotal, 2800);
  });

  it("does not treat extra minutes as underway distance", () => {
    const t = calculateTripTime({
      distanceNm: 12,
      speedKnots: 6,
      extraMinutes: 30,
    });
    assert.ok(t);
    assert.equal(t.underwayHours, 2);
    assert.equal(t.extraHours, 0.5);
    assert.equal(t.totalHours, 2.5);
  });

  it("applies anchor scope to depth plus freeboard", () => {
    assert.equal(anchorRodeFeet(10, 4, 7), 98);
    assert.equal(anchorRodeFeet(10, 0, 2), null);
  });

  it("converts units with standard factors", () => {
    assert.ok(Math.abs(knotsToMph(10) - 11.5078) < 0.001);
    assert.ok(Math.abs(nmToStatuteMiles(1) - 1.15078) < 0.001);
  });

  it("keeps tongue weight as a 10–15% band", () => {
    const band = tongueWeightRange(2000);
    assert.deepEqual(band, { low: 200, high: 300 });
  });

  it("estimates battery runtime from usable watt-hours", () => {
    const hours = batteryRuntimeHours(100, 12, 60, 0.5);
    assert.equal(hours, 10);
  });
});

describe("launch / marina filter URLs", () => {
  it("does not index faceted launch queries", () => {
    assert.equal(
      launchFiltersIndexable({
        water: "all",
        state: "all",
        access: "all",
        motor: "all",
        notes: "all",
      }),
      true,
    );
    assert.equal(
      launchFiltersIndexable({
        water: "river",
        state: "all",
        access: "all",
        motor: "all",
        notes: "all",
      }),
      false,
    );
    assert.equal(
      launchFiltersIndexable({
        water: "all",
        state: "wisconsin",
        access: "all",
        motor: "all",
        notes: "all",
      }),
      false,
    );
  });

  it("fee-note filter only matches launches with a published feesNote", () => {
    const launches = getPublishedLaunches();
    const withFees = filterLaunches(launches, "all", "all", {
      motor: "all",
      notes: "fees",
      state: "all",
    });
    assert.ok(withFees.length > 0);
    assert.ok(withFees.every((l) => l.feesNote));
    const seasonal = filterLaunches(launches, "all", "all", {
      motor: "all",
      notes: "seasonal",
      state: "all",
    });
    assert.ok(seasonal.every((l) => l.seasonalAccessNote));
  });

  it("builds shareable marina filter URLs", () => {
    assert.equal(parseMarinaAmenity("fuel"), "fuel");
    assert.equal(parseMarinaAmenity("wifi"), null);
    assert.equal(
      marinaFilterHref("lake-michigan", "fuel"),
      "/marinas?water=lake-michigan&amenity=fuel",
    );
    assert.equal(marinaFilterHref("all", null), "/marinas");
    assert.equal(
      marinaFilterHref("all", "fuel", "wisconsin"),
      "/marinas?state=wisconsin&amenity=fuel",
    );
  });
});

describe("zip lookup", () => {
  it("maps known Chicago ZIPs and rejects unknown", () => {
    assert.equal(lookupZip("60614")?.label, "Lincoln Park");
    assert.equal(lookupZip("00000"), null);
    const miles = haversineMiles(
      { lat: 41.922, lng: -87.65 },
      { lat: 41.882, lng: -87.615 },
    );
    assert.ok(miles > 2 && miles < 5);
  });
});
