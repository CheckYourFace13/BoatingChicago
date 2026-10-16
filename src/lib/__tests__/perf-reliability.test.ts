import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { NEWS_SOURCES } from "@/config/news";
import {
  computeBoatingRating,
  isObservationStale,
} from "@/lib/weather";

describe("performance / reliability safeguards (2026-10-16)", () => {
  it("disables the consistently-403 Great Lakes Now feed", () => {
    const gln = NEWS_SOURCES.find((s) => s.id === "great-lakes-now");
    assert.ok(gln);
    assert.equal(gln.enabled, false);
  });

  it("keeps sitemap free of weather/news fan-out", () => {
    const src = readFileSync(
      join(process.cwd(), "src/app/sitemap.ts"),
      "utf8",
    );
    assert.equal(/getChicagoWeather|getChicagoNews|getManagedFeed/.test(src), false);
  });

  it("keeps the sitewide ticker free of RSS news fetches", () => {
    const src = readFileSync(
      join(process.cwd(), "src/components/SiteConditionsTicker.tsx"),
      "utf8",
    );
    assert.equal(/getChicagoNews/.test(src), false);
    assert.match(src, /getWeatherForLocation/);
  });

  it("treats observations older than 3 hours as stale caution, not Good", () => {
    const now = Date.parse("2026-10-16T15:00:00.000Z");
    assert.equal(
      isObservationStale("2026-10-16T10:00:00.000Z", null, now),
      true,
    );
    assert.equal(
      isObservationStale("2026-10-16T14:30:00.000Z", null, now),
      false,
    );

    const rating = computeBoatingRating({
      windSpeedMph: 8,
      windGustMph: 10,
      waveHeightFt: 1,
      precipProbabilityPct: 10,
      shortForecast: "Mostly sunny",
      alerts: [],
      alertsAvailable: true,
      observationStale: true,
    });
    assert.equal(rating.level, "Caution");
    assert.match(rating.factors.join(" "), /stale/i);
  });

  it("never treats unavailable alerts as all-clear Good", () => {
    const rating = computeBoatingRating({
      windSpeedMph: 8,
      windGustMph: 10,
      waveHeightFt: 1,
      precipProbabilityPct: 10,
      shortForecast: "Mostly sunny",
      alerts: [],
      alertsAvailable: false,
      observationStale: false,
    });
    assert.equal(rating.level, "Caution");
    assert.match(rating.factors.join(" "), /alert feed unavailable/i);
  });
});
