import type { GuidePage } from "@/types";
import { guidePart1 } from "./part1";
import { guidePart2 } from "./part2";
import { guidePart3 } from "./part3";
import { guidePart4 } from "./part4";

export const guides: GuidePage[] = [
  ...guidePart1,
  ...guidePart2,
  ...guidePart3,
  ...guidePart4,
];

export function getGuideBySlug(slug: string): GuidePage | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
