import {
  areAdSenseDisplayUnitsEnabled,
  getAdSenseClient,
} from "@/config/ads";

/**
 * Server-rendered AdSense account meta only (site verification).
 * Executable adsbygoogle.js is loaded only from AdSenseBlock when a display
 * unit is actually mounted — never from the root layout.
 */
export function AdSenseScript() {
  const client = getAdSenseClient();
  if (!client) return null;
  return <meta name="google-adsense-account" content={client} />;
}

/** True only when a page may mount display units (not verification alone). */
export function shouldLoadAdSenseScript(): boolean {
  return Boolean(getAdSenseClient()) && areAdSenseDisplayUnitsEnabled();
}
