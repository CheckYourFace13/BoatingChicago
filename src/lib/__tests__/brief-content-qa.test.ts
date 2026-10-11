import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  briefNewsBlurb,
  isBriefRelevantStory,
  maxWindMphFromString,
  weekendForecastSummary,
} from "@/lib/brief/generator";
import type { NewsItem } from "@/types/news";

function story(partial: Partial<NewsItem> & Pick<NewsItem, "headline">): NewsItem {
  return {
    id: "t",
    slug: "t",
    kind: "story",
    publishedAt: "2026-10-11T12:00:00.000Z",
    sourceName: "Test",
    sourceUrl: "https://example.com/story",
    isPublished: true,
    originalSummary: "",
    whyItMatters: "",
    ...partial,
  } as NewsItem;
}

describe("weekendForecastSummary", () => {
  it("states peak winds without Good / No elevated wind labels", () => {
    const summary = weekendForecastSummary([
      {
        name: "Saturday",
        shortForecast: "Breezy",
        temperatureF: 55,
        windSpeed: "15 to 25 mph",
      },
      {
        name: "Sunday",
        shortForecast: "Windy",
        temperatureF: 52,
        windSpeed: "20 to 25 mph",
      },
    ]);
    assert.match(summary, /25 mph/);
    assert.equal(/\bGood\b/i.test(summary), false);
    assert.equal(/No elevated wind/i.test(summary), false);
    assert.equal(maxWindMphFromString("15 to 25 mph"), 25);
  });
});

describe("isBriefRelevantStory", () => {
  it("rejects wildlife death and memorial stories", () => {
    assert.equal(
      isBriefRelevantStory(
        story({
          headline: "Beluga whale dies at Shedd Aquarium",
          originalSummary: "A beluga died overnight.",
        })
      ),
      false
    );
    assert.equal(
      isBriefRelevantStory(
        story({
          headline: "Community remembers lake researcher",
          originalSummary: "A memorial service is planned.",
        })
      ),
      false
    );
    assert.equal(
      isBriefRelevantStory(
        story({
          headline:
            "IISG and Purdue FNR Remember Carolyn Foley, Names Great Lakes Research Award",
          originalSummary: "An award was named in her honor.",
          whyItMatters: "Boating safety and policy implications for Lake Michigan.",
        })
      ),
      false
    );
    assert.equal(
      isBriefRelevantStory(
        story({
          headline: "Educators become students at Great Lakes Project WET workshop",
          originalSummary: "Teachers attended a curriculum workshop.",
          whyItMatters: "Useful for boaters planning trips.",
        })
      ),
      false
    );
  });

  it("keeps direct recreational boating stories", () => {
    assert.equal(
      isBriefRelevantStory(
        story({
          headline: "Harbor marina expands boat slips",
          originalSummary:
            "New slips open for recreational boaters on Lake Michigan.",
        })
      ),
      true
    );
  });
});

describe("briefNewsBlurb", () => {
  it("uses source summary only and skips template fillers", () => {
    assert.equal(
      briefNewsBlurb(
        story({
          headline: "Harbor marina expands boat slips",
          originalSummary:
            "New slips open for recreational boaters on Lake Michigan. More later.",
          whyItMatters: "Invented policy implications for boaters.",
        })
      ),
      "New slips open for recreational boaters on Lake Michigan."
    );
    assert.equal(
      briefNewsBlurb(
        story({
          headline: "Update",
          originalSummary:
            "BoatingChicago summarizes a published update titled Example.",
        })
      ),
      ""
    );
  });
});
