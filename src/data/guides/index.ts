import type { GuidePage } from "@/types";
import { guidePart1 } from "./part1";
import { guidePart2 } from "./part2";
import { guidePart3 } from "./part3";
import { guidePart4 } from "./part4";
import { guidePart5 } from "./part5";

export const guides: GuidePage[] = [
  ...guidePart1,
  ...guidePart2,
  ...guidePart3,
  ...guidePart4,
  ...guidePart5,
];

/** Compact seasonal collection for homepage / guides hub. */
export const WINTER_GUIDE_SLUGS = [
  "chicago-boat-storage-guide",
  "winter-boat-storage-chicago",
  "chicago-boat-winterizing-guide",
  "chicago-boat-shrink-wrap-guide",
  "buying-a-boat-off-season-chicago",
  "chicago-boat-show-buyer-guide",
] as const;

export function getGuideBySlug(slug: string): GuidePage | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
