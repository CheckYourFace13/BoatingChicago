import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { events } from "@/data/geo/events";
import { getPublishedEvents, isEventExpired } from "@/data/geo";
import { buildConditionsTickerItems } from "@/lib/conditions-ticker";
import {
  eventTickerLabel,
  pickTickerEvent,
  publishedSeasonPhase,
} from "@/lib/event-status";
import { resolveMetadataTitle, socialImagePath } from "@/lib/seo";
import type { ChicagoWeatherPayload } from "@/types/weather";

function chicagoNoon(isoDate: string): Date {
  return new Date(`${isoDate}T17:00:00.000Z`);
}

const harbor = events.find((e) => e.slug === "chicago-harbor-season");
assert.ok(harbor);

function weatherStub(): ChicagoWeatherPayload {
  return {
    fetchedAt: "2026-10-28T17:00:00.000Z",
    locationId: "chicago",
    locationLabel: "Chicago",
    current: {
      observedAt: null,
      stationId: "KMDW",
      stationName: null,
      temperatureF: 52,
      feelsLikeF: null,
      description: null,
      windSpeedMph: 12,
      windGustMph: 18,
      windDirectionDeg: null,
      windDirectionCardinal: "NW",
      humidityPct: null,
      visibilityMiles: null,
      precipLastHourIn: null,
    },
    hourly: [],
    daily: [],
    alerts: [],
    alertsAvailable: true,
    lake: {
      waterTempF: 58,
      waveHeightFt: 1.5,
      buoyId: null,
      observedAt: null,
      notes: null,
    },
    sunriseIso: null,
    sunsetIso: null,
    marineForecastText: null,
    marineForecastLabel: null,
    rating: { level: "Good", reason: "test", factors: [] },
    sources: [],
    errors: [],
  };
}

describe("published mooring season (America/Chicago)", () => {
  it("is upcoming before May 1, open May 1–Oct 31 inclusive, closed after Oct 31", () => {
    assert.equal(
      publishedSeasonPhase("2026-05-01", "2026-10-31", chicagoNoon("2026-04-30")),
      "upcoming",
    );
    assert.equal(
      publishedSeasonPhase("2026-05-01", "2026-10-31", chicagoNoon("2026-05-01")),
      "open",
    );
    assert.equal(
      publishedSeasonPhase("2026-05-01", "2026-10-31", chicagoNoon("2026-10-28")),
      "open",
    );
    assert.equal(
      publishedSeasonPhase("2026-05-01", "2026-10-31", chicagoNoon("2026-10-31")),
      "open",
    );
    assert.equal(
      publishedSeasonPhase("2026-05-01", "2026-10-31", chicagoNoon("2026-11-01")),
      "closed",
    );
  });

  it("keeps Oct 31 open at late evening Chicago time", () => {
    const lateOct31 = new Date("2026-11-01T04:59:00.000Z");
    assert.equal(
      publishedSeasonPhase("2026-05-01", "2026-10-31", lateOct31),
      "open",
    );
  });

  it("labels Chicago Harbors OPEN on Oct 28, not UPCOMING", () => {
    const asOf = chicagoNoon("2026-10-28");
    assert.equal(
      eventTickerLabel(harbor, asOf),
      "CHICAGO HARBORS MOORING SEASON: OPEN",
    );
    assert.equal(pickTickerEvent(getPublishedEvents(asOf), asOf)?.slug, harbor.slug);
  });

  it("keeps seasonal events listed after Oct 31 so CLOSED can show", () => {
    const nov1 = chicagoNoon("2026-11-01");
    assert.equal(isEventExpired(harbor, nov1), false);
    assert.equal(eventTickerLabel(harbor, nov1), "CHICAGO HARBORS MOORING SEASON: CLOSED");
    assert.equal(isEventExpired(harbor, chicagoNoon("2027-01-01")), true);
  });

  it("puts the OPEN harbor label on the conditions ticker for Oct 28", () => {
    const asOf = chicagoNoon("2026-10-28");
    const items = buildConditionsTickerItems({
      chicago: weatherStub(),
      events: getPublishedEvents(asOf),
      asOf,
    });
    const eventItem = items.find((item) => item.kind === "event");
    assert.ok(eventItem);
    assert.equal(eventItem.label, "CHICAGO HARBORS MOORING SEASON: OPEN");
    assert.equal(eventItem.label.includes("UPCOMING"), false);
  });
});

describe("resolveMetadataTitle", () => {
  it("uses absolute titles when the brand is already in the string", () => {
    assert.deepEqual(resolveMetadataTitle("About Boating Chicago"), {
      absolute: "About Boating Chicago",
    });
    assert.equal(
      resolveMetadataTitle("Chicago Boating Weather, Marinas, Launches & Guides"),
      "Chicago Boating Weather, Marinas, Launches & Guides",
    );
  });
});

describe("socialImagePath", () => {
  it("uses page-specific OG files for guides and the branded fallback otherwise", () => {
    assert.equal(socialImagePath("/"), "/opengraph-image");
    assert.equal(socialImagePath("/about"), "/opengraph-image");
    assert.equal(socialImagePath("/storage"), "/storage/opengraph-image");
    assert.equal(
      socialImagePath("/chicago-boat-winterization"),
      "/chicago-boat-winterization/opengraph-image",
    );
  });
});
