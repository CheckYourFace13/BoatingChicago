import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getBoatUsAffiliateUrl } from "@/config/partner-programs";
import { getCategoryBySlug } from "@/data/categories";
import { events } from "@/data/geo/events";
import {
  getAllGuideSlugs,
  getGuideBySlug,
  OWNERSHIP_PLANNING_GUIDE_SLUGS,
} from "@/data/guides";
import { getCategoryImage } from "@/data/images";

const OFFICIAL_HOSTS = new Set([
  "dnr.illinois.gov",
  "www.ilga.gov",
  "ilga.gov",
  "idoi.illinois.gov",
  "www.chicagoharbors.info",
  "www.chicagoparkdistrict.com",
  "files.chicagoparkdistrict.com",
  "www.consumerfinance.gov",
]);

function guideText(slug: string): string {
  const g = getGuideBySlug(slug);
  assert.ok(g, slug);
  return [
    g.intro,
    ...g.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ...g.faqs.map((f) => f.answer),
    ...g.peopleAlsoAsk.map((f) => f.answer),
  ].join("\n");
}

describe("ownership planning guides (priority 3)", () => {
  it("registers all four guides with sources, review date, and no lead form", () => {
    assert.equal(OWNERSHIP_PLANNING_GUIDE_SLUGS.length, 4);
    for (const slug of OWNERSHIP_PLANNING_GUIDE_SLUGS) {
      const g = getGuideBySlug(slug);
      assert.ok(g, `missing guide ${slug}`);
      assert.ok(getAllGuideSlugs().includes(slug));
      assert.equal(g.showLeadForm, false);
      assert.match(g.lastReviewed ?? "", /^\d{4}-\d{2}-\d{2}$/);
      assert.ok((g.sources?.length ?? 0) >= 2, `${slug} needs sources`);
      assert.ok(g.faqs.length > 0 && g.peopleAlsoAsk.length > 0);
      assert.ok(getCategoryImage(slug).src);
    }
  });

  it("cites only official / agency hosts over https", () => {
    for (const slug of OWNERSHIP_PLANNING_GUIDE_SLUGS) {
      for (const source of getGuideBySlug(slug)?.sources ?? []) {
        const url = new URL(source.url);
        assert.equal(url.protocol, "https:", source.url);
        assert.ok(OFFICIAL_HOSTS.has(url.hostname), `unexpected host ${source.url}`);
        assert.ok(source.lastVerified);
      }
    }
  });

  it("resolves related and popular-search links to real pages", () => {
    const staticRoutes = new Set([
      "/marinas",
      "/storage",
      "/boat-ownership",
      "/boat-launches",
      "/boat-rentals-chicago",
      "/guides",
    ]);
    for (const slug of OWNERSHIP_PLANNING_GUIDE_SLUGS) {
      const g = getGuideBySlug(slug)!;
      for (const rel of g.relatedSlugs) {
        assert.ok(
          getGuideBySlug(rel) || getCategoryBySlug(rel),
          `${slug} related slug ${rel} does not resolve`,
        );
      }
      for (const link of g.popularSearches) {
        const bare = link.href.replace(/^\//, "");
        assert.ok(
          staticRoutes.has(link.href) ||
            getGuideBySlug(bare) ||
            getCategoryBySlug(bare),
          `${slug} popular search ${link.href} does not resolve`,
        );
      }
    }
  });

  it("states the safety-certificate rule with the statutory birth-date wording", () => {
    const text = guideText("illinois-boating-safety-certificate");
    assert.match(text, /born on or after January 1, 1998/);
    assert.match(text, /over 10 horsepower/);
    assert.match(text, /625 ILCS 45\/5-18/);
    assert.match(text, /free/i);
    assert.doesNotMatch(text, /born after January 1, 1998/);
    const urls = getGuideBySlug("illinois-boating-safety-certificate")!.sources!.map(
      (s) => s.url,
    );
    assert.ok(urls.includes("https://dnr.illinois.gov/safety/boatingsafety.html"));
  });

  it("does not invent premiums, loan rates, waitlist lengths, or current slip fees", () => {
    const insurance = guideText("chicago-boat-insurance-guide");
    // Only the two statutory / code figures are allowed as dollar amounts.
    const insuranceDollars = (insurance.match(/\$[\d,.]+/g) ?? []).map((d) =>
      d.replace(/[,.]+$/, ""),
    );
    for (const d of insuranceDollars) {
      assert.ok(["$300,000", "$500", "$1,000"].includes(d), `unexpected ${d}`);
    }
    const financing = guideText("boat-financing-ownership-costs-chicago");
    assert.equal((financing.match(/\$[\d,.]+/g) ?? []).length, 0);
    assert.doesNotMatch(financing, /\d+(\.\d+)?\s?%/);
    const harbors = guideText("chicago-harbors-seasonal-slips-guide");
    assert.equal((harbors.match(/\$[\d,.]+/g) ?? []).length, 0);
    assert.doesNotMatch(harbors, /\d+\s+(people|boaters|applicants|years)\s+on/i);
  });

  it("keeps BoatUS informational unless an approved env URL is set", () => {
    const prev = process.env.BOATUS_AFFILIATE_URL;
    delete process.env.BOATUS_AFFILIATE_URL;
    try {
      assert.equal(getBoatUsAffiliateUrl(), null);
    } finally {
      if (prev !== undefined) process.env.BOATUS_AFFILIATE_URL = prev;
    }
    for (const slug of OWNERSHIP_PLANNING_GUIDE_SLUGS) {
      for (const s of getGuideBySlug(slug)?.sources ?? []) {
        assert.doesNotMatch(s.url, /boatus/i);
      }
    }
  });
});

describe("Discover Boating Chicago Boat Show 2027 event", () => {
  it("is listed with the organizer source, Rosemont venue, and dates", () => {
    const show = events.find((e) => e.slug === "discover-boating-chicago-boat-show-2027");
    assert.ok(show);
    assert.equal(show.startDate, "2027-02-03");
    assert.equal(show.endDate, "2027-02-07");
    assert.match(show.location, /Rosemont/);
    assert.match(show.location, /Donald E\. Stephens/);
    assert.equal(show.source.url, "https://www.chicagoboatshow.com/about");
    assert.equal(show.isPublished, true);
  });
});
