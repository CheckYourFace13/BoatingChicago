import type { ExperienceType, AffiliateOffer } from "@/data/affiliate-offers";

const EXPERIENCE_TYPE_LABEL: Record<ExperienceType, string> = {
  "ticketed-cruise": "Shared ticketed cruise",
  "private-charter": "Private charter",
  rental: "Equipment rental",
  destination: "Destination listing",
  event: "Event experience",
  attraction: "Attraction",
  lesson: "Lesson / instruction",
};

export function getExperienceTypeLabel(type?: ExperienceType): string | null {
  if (!type) return null;
  return EXPERIENCE_TYPE_LABEL[type] || null;
}

/** Verified display meta for affiliate cards — never invents duration/price. */
export function getOfferMetaChips(offer: AffiliateOffer): string[] {
  const chips: string[] = [];
  const typeLabel = getExperienceTypeLabel(offer.experienceType);
  if (typeLabel) chips.push(typeLabel);
  if (offer.location) chips.push(offer.location);
  return chips.slice(0, 3);
}
