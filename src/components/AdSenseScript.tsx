import {
  areAdSenseDisplayUnitsEnabled,
  getAdSenseClient,
} from "@/config/ads";

/**
 * Server-rendered AdSense verification + optional loader for the document <head>.
 * Meta stays when NEXT_PUBLIC_ADSENSE_CLIENT is set (account / property verification).
 * The adsbygoogle.js script loads only when display units are explicitly re-enabled
 * via NEXT_PUBLIC_ADSENSE_DISPLAY_UNITS=true — keeping monetization dormant otherwise.
 */
export function AdSenseScript() {
  const client = getAdSenseClient();
  if (!client) return null;

  const loadScript = areAdSenseDisplayUnitsEnabled();

  return (
    <>
      <meta name="google-adsense-account" content={client} />
      {loadScript ? (
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
          crossOrigin="anonymous"
        />
      ) : null}
    </>
  );
}
