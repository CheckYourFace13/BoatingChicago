import {
  areAdSenseDisplayUnitsEnabled,
  getAdSenseClient,
} from "@/config/ads";

/**
 * Server-rendered AdSense account meta only. The adsbygoogle.js loader is
 * client-gated on advertising consent in AdSenseLoader.
 */
export function AdSenseScript() {
  const client = getAdSenseClient();
  if (!client) return null;
  return <meta name="google-adsense-account" content={client} />;
}

export function shouldLoadAdSenseScript(): boolean {
  return Boolean(getAdSenseClient()) && areAdSenseDisplayUnitsEnabled();
}
