import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  ADSENSE_EXCLUDED_PATHS,
  ADSENSE_PUBLISHER_ID,
  isAdSensePathExcluded,
} from "../ads";

describe("AdSense gate safety", () => {
  it("keeps the approved publisher id stable for ads.txt / meta", () => {
    assert.equal(ADSENSE_PUBLISHER_ID, "ca-pub-9572509189594279");
  });

  it("mounts a single AdSenseLoader from root layout when ads are enabled", () => {
    const layout = readFileSync(join(process.cwd(), "src/app/layout.tsx"), "utf8");
    assert.match(layout, /<AdSenseLoader/);
    assert.match(layout, /areAdSenseDisplayUnitsEnabled/);
    assert.match(layout, /AdSenseScript/);
  });

  it("loads adsbygoogle.js from AdSenseLoader, not from each AdSenseBlock", () => {
    const loader = readFileSync(
      join(process.cwd(), "src/components/AdSenseLoader.tsx"),
      "utf8",
    );
    assert.match(loader, /adsbygoogle\.js\?client=/);
    const block = readFileSync(
      join(process.cwd(), "src/components/AdSenseBlock.tsx"),
      "utf8",
    );
    assert.doesNotMatch(block, /adsbygoogle\.js\?client=/);
    assert.match(block, /adsbygoogle\.push/);
  });

  it("excludes legal, form, and printable utility paths", () => {
    for (const path of ADSENSE_EXCLUDED_PATHS) {
      assert.equal(isAdSensePathExcluded(path), true, path);
    }
    assert.equal(isAdSensePathExcluded("/privacy/extra"), true);
    assert.equal(isAdSensePathExcluded("/"), false);
    assert.equal(isAdSensePathExcluded("/boat-launches"), false);
    assert.equal(isAdSensePathExcluded("/guides"), false);
  });

  it("does not hard-code Auto ads page-level enable flags in source", () => {
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
