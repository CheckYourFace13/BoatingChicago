import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("AdSense gate safety", () => {
  it("does not mount a global adsbygoogle loader from root layout", () => {
    const layout = readFileSync(join(process.cwd(), "src/app/layout.tsx"), "utf8");
    assert.doesNotMatch(layout, /<AdSenseLoader/);
    assert.match(layout, /areAdSenseDisplayUnitsEnabled/);
    assert.match(layout, /AdSenseScript/);
  });

  it("loads adsbygoogle.js only from AdSenseBlock when a unit mounts", () => {
    const block = readFileSync(
      join(process.cwd(), "src/components/AdSenseBlock.tsx"),
      "utf8"
    );
    assert.match(block, /adsbygoogle\.js\?client=/);
    assert.match(block, /error pages/);
    const loader = readFileSync(
      join(process.cwd(), "src/components/AdSenseLoader.tsx"),
      "utf8"
    );
    assert.match(loader, /return null/);
    assert.doesNotMatch(loader, /adsbygoogle\.js/);
  });

  it("keeps Auto ads / page-level ads disabled in source", () => {
    const adsDir = [
      "src/components/AdSenseBlock.tsx",
      "src/components/AdSenseLoader.tsx",
      "src/components/AdSenseScript.tsx",
      "src/config/ads.ts",
      "src/app/layout.tsx",
    ];
    for (const rel of adsDir) {
      const src = readFileSync(join(process.cwd(), rel), "utf8");
      assert.doesNotMatch(src, /enable_page_level_ads/);
      assert.doesNotMatch(src, /google_ad_client/);
    }
  });
});
