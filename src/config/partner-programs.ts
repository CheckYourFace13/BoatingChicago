/**
 * Future membership / marketplace programs.
 * A commercial CTA renders only when an approved URL is present.
 * Empty env = no outbound link.
 */

function approvedUrl(value: string | undefined): string | null {
  const url = value?.trim();
  if (!url || !/^https:\/\//i.test(url)) return null;
  return url;
}

/** Set BOATUS_AFFILIATE_URL only after BoatUS approves BoatingChicago. */
export function getBoatUsAffiliateUrl(): string | null {
  return approvedUrl(process.env.BOATUS_AFFILIATE_URL);
}

/**
 * Set BOATS_GROUP_AFFILIATE_URL only after Awin approves
 * Boats Group merchant 124170 (Boat Trader / boats.com / YachtWorld).
 */
export function getBoatsGroupAffiliateUrl(): string | null {
  return approvedUrl(process.env.BOATS_GROUP_AFFILIATE_URL);
}
