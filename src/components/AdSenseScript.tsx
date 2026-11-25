import {
  areAdSenseDisplayUnitsEnabled,
  getAdSenseClient,
} from "@/config/ads";

/**
 * Server-rendered AdSense account meta (site verification).
 * Executable adsbygoogle.js loads from AdSenseLoader when display ads
 * are enabled — once per page, never duplicated from manual units.
 */
export function AdSenseScript() {
  const client = getAdSenseClient();
  if (!client) return null;
  return <meta name="google-adsense-account" content={client} />;
}

/** True when display ads / Auto ads script may load (not verification alone). */
export function shouldLoadAdSenseScript(): boolean {
  return Boolean(getAdSenseClient()) && areAdSenseDisplayUnitsEnabled();
}
