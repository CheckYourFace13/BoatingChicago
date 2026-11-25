import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getGuideBySlug } from "@/data/guides";
import { getCategoryBySlug } from "@/data/categories";
import { getPublishedStorageFacilities } from "@/data/geo";
import { buildMetadata, socialImagePath } from "@/lib/seo";
import { siteConfig } from "@/config/site";

describe("Set 2 GSC fixes", () => {
  it("keeps storage guide educational and linked to verified operators", () => {
    const guide = getGuideBySlug("chicago-boat-storage-guide");
    assert.ok(guide);
    assert.match(guide.seoTitle, /Boat Storage Chicago/i);
    assert.ok(getPublishedStorageFacilities().length >= 7);
    assert.equal(guide.showLeadForm, false);
    assert.equal(guide.lastReviewed, "2026-11-25");
  });

  it("removes unsupported detailing dollar ranges from retired category FAQs", () => {
    const category = getCategoryBySlug("boat-detailing-chicago");
    assert.ok(category);
    const blob = category.faqs.map((f) => f.answer).join(" ");
    assert.doesNotMatch(blob, /\$\d/);
    assert.equal(category.vendors.length, 0);
  });

  it("keeps detailing guide free of charter lead-form intent", () => {
    const guide = getGuideBySlug("chicago-boat-detailing-guide");
    assert.ok(guide);
    assert.equal(guide.showLeadForm, false);
    assert.doesNotMatch(guide.seoDescription, /\$\d/);
    assert.ok(!guide.relatedSlugs.includes("boat-detailing-chicago"));
  });

  it("emits absolute Open Graph image URLs", () => {
    const meta = buildMetadata({
      title: "Test",
      description: "Test description for social cards.",
      path: "/news",
    });
    const og = meta.openGraph?.images;
    const first = Array.isArray(og) ? og[0] : og;
    const url =
      typeof first === "string"
        ? first
        : first && typeof first === "object" && "url" in first
          ? String(first.url)
          : "";
    assert.match(url, /^https:\/\//);
    assert.ok(url.startsWith(siteConfig.url));
    assert.equal(socialImagePath("/news"), "/opengraph-image");
  });

  it("ships embed conditions route and docs pages", () => {
    const embed = readFileSync(
      join(process.cwd(), "src/app/embed/conditions/route.ts"),
      "utf8",
    );
    assert.match(embed, /frame-ancestors \*/);
    assert.match(embed, /not a safety clearance/i);
    assert.match(embed, /getWeatherForLocation/);
    const docs = readFileSync(
      join(process.cwd(), "src/app/weather/embed/page.tsx"),
      "utf8",
    );
    assert.match(docs, /iframe/);
  });

  it("preserves protected Set 2 ranking URLs in redirects map only as non-targets", () => {
    const config = readFileSync(join(process.cwd(), "next.config.ts"), "utf8");
    for (const path of [
      "/chicago-playpen-guide",
      "/forest-preserves",
      "/chicago-transient-dockage",
      "/lakes/des-plaines-river",
      "/lakes/chain-o-lakes",
      "/boat-launches/simmons-island-public-boat-launch",
    ]) {
      assert.equal(
        config.includes(`source: "${path}"`),
        false,
        `must not redirect protected URL ${path}`,
      );
    }
  });
});
