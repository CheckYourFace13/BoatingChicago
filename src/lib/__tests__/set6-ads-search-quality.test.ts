import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getCategoryBySlug } from "@/data/categories";
import { getLakeBySlug } from "@/data/geo";
import { getOffersForPage } from "@/data/affiliate-offers";
import { truncateMetaDescription } from "@/lib/seo";

describe("Set 6 ads, search quality, conversion", () => {
  it("truncates meta descriptions on word or sentence boundaries", () => {
    const midWord =
      "Lake Maxinkuckee at Culver in Marshall County northern Indiana is a long overview sentence that continues with many words about boating access rules and fishing so the naive cut would slice a word.";
    const out = truncateMetaDescription(midWord, 80);
    assert.ok(out.length <= 80);
    assert.ok(!midWord.startsWith(out) || out.length < 80 || out.endsWith("."));
    // Mid-word cut would leave the next letter of the original glued without a space boundary.
    const nextChar = midWord[out.length];
    if (nextChar && /[a-z]/i.test(out.at(-1) ?? "") && /[a-z]/i.test(nextChar)) {
      assert.fail(`truncated mid-word: "${out}" | next="${nextChar}"`);
    }
    assert.equal(truncateMetaDescription("Short enough."), "Short enough.");
    const sentence =
      "First complete sentence is here. Second sentence should usually be dropped when budget is tight for meta tags.";
    const sent = truncateMetaDescription(sentence, 50);
    assert.match(sent, /\.$/);
    assert.ok(!sent.includes("Second sentence"));
  });

  it("enriches Lake Maxinkuckee with dated DNR survey facts and PDF link", () => {
    const lake = getLakeBySlug("lake-maxinkuckee");
    assert.ok(lake);
    assert.ok(lake.lakeFacts && lake.lakeFacts.length >= 5);
    assert.ok(lake.faqs && lake.faqs.length >= 4);
    assert.ok(lake.coordinates);
    assert.match(
      lake.officialLinks.map((l) => l.url).join(" "),
      /fw-LakeMaxinkuckee_Marshall_FMR_2020\.pdf/
    );
    assert.match(lake.overview.join(" "), /starry stonewort/i);
    assert.match(lake.overview.join(" "), /2020/);
    assert.doesNotMatch(lake.seoDescription ?? "", /\$\d/);
  });

  it("does not invent unsupported yacht dollar ranges", () => {
    const yacht = getCategoryBySlug("yacht-rentals-chicago");
    assert.ok(yacht);
    const faqBlob = yacht.faqs.map((f) => f.answer).join(" ");
    assert.doesNotMatch(faqBlob, /\$1,200/);
    assert.doesNotMatch(faqBlob, /\$5,000/);
    assert.match(yacht.intro, /private yacht/i);
    assert.match(yacht.intro, /ticketed/i);
    assert.ok(yacht.relatedSlugs.includes("luxury-yacht-charters-chicago"));
    assert.ok(yacht.relatedSlugs.includes("corporate-yacht-charters-chicago"));
  });

  it("keeps yacht page booking cards on private charter products", () => {
    const ids = getOffersForPage("yacht-rentals-chicago").map((o) => o.id);
    assert.ok(ids.includes("viator-private-yacht-charter"));
    assert.ok(!ids.includes("gyg-386902"), "shared sunset cruise should not lead yacht page");
  });

  it("hides empty Local Vendor Listings placeholder in CategoryLanding", () => {
    const src = readFileSync(
      join(process.cwd(), "src/components/CategoryLanding.tsx"),
      "utf8"
    );
    assert.doesNotMatch(src, /We're onboarding Chicago boating partners/);
    assert.doesNotMatch(src, /Local Vendor Listings/);
    assert.match(src, /Featured Local Listings/);
    assert.match(src, /vendors\.length > 0/);
  });

  it("adds EmailSignup on lake and forest-preserve detail pages", () => {
    const lakePage = readFileSync(
      join(process.cwd(), "src/app/lakes/[slug]/page.tsx"),
      "utf8"
    );
    const fpPage = readFileSync(
      join(process.cwd(), "src/app/forest-preserves/[slug]/page.tsx"),
      "utf8"
    );
    assert.match(lakePage, /<EmailSignup/);
    assert.match(fpPage, /<EmailSignup/);
    assert.match(lakePage, /overview\.slice\(1\)|aboutParagraphs/);
  });
});
