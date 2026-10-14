import { matchEditorialPage, toRecommendedLinks } from "@/lib/affiliate-registry";

/** Disabled until a CJ or Impact row is approved for this website. */
export function editorialAdvertiserLinks(opts: { categories?: string[]; text?: string; productNames?: string[] }) {
  return toRecommendedLinks(
    matchEditorialPage({
      website: "boatingchicago",
      categories: opts.categories,
      text: opts.text,
      productNames: opts.productNames,
    }),
  );
}
