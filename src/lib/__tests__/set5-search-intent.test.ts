import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getCategoryBySlug } from "@/data/categories";
import { getGuideBySlug } from "@/data/guides";
import { getOffersForPage } from "@/data/affiliate-offers";
import { CATEGORY_RESOURCE_LINKS } from "@/components/ExploreResources";

describe("Set 5 search intent & internal linking", () => {
  it("assigns distinct sunset primary vs comparison metadata", () => {
    const primary = getCategoryBySlug("chicago-sunset-cruises");
    const compare = getGuideBySlug("best-chicago-sunset-cruises");
    assert.ok(primary && compare);
    assert.match(primary.seoTitle, /Sunset Cruise Chicago/i);
    assert.match(primary.headline, /Sunset Cruises/i);
    assert.match(compare.seoTitle, /Compared/i);
    assert.match(compare.headline, /Ticketed vs Private/i);
    assert.notEqual(primary.seoTitle, compare.seoTitle);
    assert.notEqual(primary.headline, compare.headline);
    assert.ok(primary.relatedSlugs.includes("best-chicago-sunset-cruises"));
    assert.ok(compare.relatedSlugs.includes("chicago-sunset-cruises"));
  });

  it("assigns distinct boat-rental discovery vs comparison metadata", () => {
    const primary = getCategoryBySlug("boat-rentals-chicago");
    const compare = getGuideBySlug("best-boat-rentals-chicago");
    assert.ok(primary && compare);
    assert.match(primary.seoTitle, /Boat Rentals Chicago/i);
    assert.match(compare.seoTitle, /Compared/i);
    assert.match(compare.headline, /Types, Captains/i);
    assert.notEqual(primary.seoTitle, compare.seoTitle);
    assert.notEqual(primary.headline, compare.headline);
    assert.ok(primary.relatedSlugs.includes("best-boat-rentals-chicago"));
    assert.ok(compare.relatedSlugs.includes("boat-rentals-chicago"));
  });

  it("states tiki cocktails are sold separately, not included", () => {
    const tiki = getCategoryBySlug("chicago-tiki-cruises");
    assert.ok(tiki);
    const blob = [tiki.intro, tiki.seoDescription, ...tiki.faqs.map((f) => f.answer)].join(
      " "
    );
    assert.match(blob, /not included/i);
    assert.match(blob, /purchase/i);
    assert.match(blob, /cocktail/i);
    assert.doesNotMatch(tiki.intro, /with drinks, music/i);
  });

  it("keeps dining booking cards to dining products only", () => {
    const ids = getOffersForPage("chicago-dining-cruises").map((o) => o.id);
    assert.deepEqual(ids, ["gyg-233082"]);
    const tikiIds = getOffersForPage("chicago-tiki-cruises").map((o) => o.id);
    assert.deepEqual(tikiIds, ["gyg-994332"]);
  });

  it("exposes SSR resource cross-links for Set 5 pairs", () => {
    assert.ok(
      CATEGORY_RESOURCE_LINKS["chicago-sunset-cruises"]?.some(
        (l) => l.href === "/best-chicago-sunset-cruises"
      )
    );
    assert.ok(
      CATEGORY_RESOURCE_LINKS["boat-rentals-chicago"]?.some(
        (l) => l.href === "/best-boat-rentals-chicago"
      )
    );
    assert.ok(
      CATEGORY_RESOURCE_LINKS["chicago-dining-cruises"]?.some(
        (l) => l.href === "/chicago-tiki-cruises"
      )
    );
  });

  it("does not soft-claim ranked best operators on comparison guides", () => {
    const sunset = getGuideBySlug("best-chicago-sunset-cruises");
    const rentals = getGuideBySlug("best-boat-rentals-chicago");
    assert.ok(sunset && rentals);
    assert.doesNotMatch(sunset.seoTitle, /^Best /i);
    assert.doesNotMatch(rentals.seoTitle, /^Best /i);
    assert.doesNotMatch(sunset.headline, /^Best /i);
    assert.doesNotMatch(rentals.headline, /^Best /i);
  });
});
