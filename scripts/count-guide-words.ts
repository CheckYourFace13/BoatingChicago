import { getAllGuideSlugs, getGuideBySlug } from "../src/data/guides/index";

const rows = getAllGuideSlugs().map((slug) => {
  const g = getGuideBySlug(slug)!;
  const text = [
    g.intro,
    ...g.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ...g.faqs.map((f) => f.question + " " + f.answer),
    ...g.peopleAlsoAsk.map((f) => f.question + " " + f.answer),
    ...g.seasonalTips.map((t) => t.season + " " + t.tip),
  ].join(" ");
  return {
    slug,
    words: text.split(/\s+/).filter(Boolean).length,
    sections: g.sections.length,
  };
});
rows.sort((a, b) => a.words - b.words);
console.log("min", rows[0]);
console.log("max", rows[rows.length - 1]);
console.log(
  "avg",
  Math.round(rows.reduce((s, r) => s + r.words, 0) / rows.length)
);
console.log("under 1200", rows.filter((r) => r.words < 1200).length);
console.log("under 1500", rows.filter((r) => r.words < 1500).length);
for (const r of rows) console.log(r.slug + ":" + r.words);
