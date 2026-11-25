import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getPublishedLaunches,
  getPublishedMarinas,
  getPublishedDestinations,
  getDestinationBySlug,
} from "@/data/geo";
import {
  filterLaunches,
  getAlternateOptions,
  parseAccessFilter,
  parseWaterFilter,
} from "@/lib/launch-filters";
import {
  buildLaunchAreaPoints,
  buildMarinaPoints,
} from "@/lib/map-points";
import {
  groupByType,
  searchEntries,
  tokenize,
  type SearchEntry,
} from "@/lib/site-search-core";
import { buildSearchIndex } from "@/lib/site-search-index";

describe("site search core", () => {
  const sample: SearchEntry[] = [
    { t: "marina", n: "Belmont Harbor", h: "/marinas/belmont-harbor", s: "Chicago, IL", k: "marina harbor" },
    { t: "launch", n: "Montrose Harbor Launch", h: "/boat-launches/montrose", s: "Chicago, IL", k: "boat launch ramp" },
    { t: "guide", n: "Chicago Boat Winterization Guide", h: "/chicago-boat-winterization", k: "guide" },
  ];

  it("ignores stop words and punctuation", () => {
    assert.deepEqual(tokenize("The Belmont, Harbor!"), ["belmont", "harbor"]);
  });

  it("matches word prefixes, plurals and keywords", () => {
    assert.equal(searchEntries(sample, "belm")[0]?.h, "/marinas/belmont-harbor");
    assert.equal(searchEntries(sample, "launches")[0]?.t, "launch");
    assert.equal(searchEntries(sample, "ramp")[0]?.t, "launch");
  });

  it("requires every word to match", () => {
    assert.equal(searchEntries(sample, "belmont winterization").length, 0);
    assert.equal(searchEntries(sample, "zzzz").length, 0);
    assert.equal(searchEntries(sample, "   ").length, 0);
  });

  it("ranks title hits above keyword hits and respects limit/type", () => {
    const harbor = searchEntries(sample, "harbor");
    assert.equal(harbor.length, 2);
    assert.equal(searchEntries(sample, "harbor", { limit: 1 }).length, 1);
    assert.equal(searchEntries(sample, "harbor", { type: "launch" })[0]?.t, "launch");
    assert.deepEqual(groupByType(harbor).map((g) => g.type), ["launch", "marina"]);
  });
});

describe("site search index (real data)", () => {
  const index = buildSearchIndex();

  it("covers every requested content type from published data", () => {
    const types = new Set(index.map((e) => e.t));
    for (const t of ["launch", "marina", "preserve", "lake", "destination", "guide", "tool"]) {
      assert.ok(types.has(t as SearchEntry["t"]), `missing ${t}`);
    }
    assert.equal(
      index.filter((e) => e.t === "launch").length,
      getPublishedLaunches().length,
    );
    assert.equal(
      index.filter((e) => e.t === "marina").length,
      getPublishedMarinas().length,
    );
  });

  it("only links to internal paths and has no duplicate hrefs per type", () => {
    const seen = new Set<string>();
    for (const e of index) {
      assert.ok(e.h.startsWith("/"), e.h);
      const key = `${e.t}:${e.h}`;
      assert.ok(!seen.has(key), `duplicate ${key}`);
      seen.add(key);
    }
  });

  it("finds a real launch by name", () => {
    const launch = getPublishedLaunches()[0];
    const hits = searchEntries(index, launch.name, { type: "launch" });
    assert.ok(hits.some((h) => h.h === `/boat-launches/${launch.slug}`));
  });

  it("stays compact enough for a lazy client fetch", () => {
    assert.ok(JSON.stringify(index).length < 60_000);
  });
});

describe("launch filters + empty state", () => {
  const launches = getPublishedLaunches();

  it("parses unknown params to all", () => {
    assert.equal(parseWaterFilter("nope"), "all");
    assert.equal(parseAccessFilter(undefined), "all");
    assert.equal(parseWaterFilter("river"), "river");
  });

  it("alternate options only offer non-empty, differently-filtered results", () => {
    for (const water of ["lake-michigan", "inland", "river"] as const) {
      for (const access of ["trailered", "carry-in", "non-motorized", "steps"] as const) {
        const { keepWater, keepAccess } = getAlternateOptions(launches, water, access);
        for (const opt of keepWater) {
          assert.equal(opt.water, water);
          assert.ok(opt.count > 0);
          assert.equal(filterLaunches(launches, opt.water, opt.access).length, opt.count);
        }
        for (const opt of keepAccess) {
          assert.equal(opt.access, access);
          assert.ok(opt.count > 0);
          assert.equal(filterLaunches(launches, opt.water, opt.access).length, opt.count);
        }
      }
    }
  });
});

describe("map points", () => {
  it("marina pins come only from verified coordinates", () => {
    const { points, unmapped } = buildMarinaPoints(getPublishedMarinas(), (s) => s);
    assert.equal(points.length + unmapped.length, getPublishedMarinas().length);
    for (const p of points) {
      assert.ok(p.href.startsWith("/marinas/"));
      assert.ok(p.lat > 40 && p.lat < 45 && p.lng < -85 && p.lng > -90);
    }
  });

  it("launch area pins use destination coordinates and link to launch pages", () => {
    const launches = getPublishedLaunches();
    const groups = getPublishedDestinations().map((destination) => ({
      destination,
      launches: launches.filter((l) => l.destinationSlug === destination.slug),
    }));
    const points = buildLaunchAreaPoints(groups);
    assert.ok(points.length > 0);
    for (const p of points) {
      const slug = p.id.replace("launch-area:", "");
      const dest = getDestinationBySlug(slug)!;
      assert.equal(p.lat, dest.coordinates.lat);
      assert.equal(p.lng, dest.coordinates.lng);
      assert.ok(p.links.every((l) => l.href.startsWith("/boat-launches/")));
    }
  });
});
