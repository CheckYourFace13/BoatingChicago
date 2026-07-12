import { getAdSenseClient } from "@/config/ads";

/**
 * Server-rendered AdSense verification + loader for the document <head>.
 * Emits a real <meta> and <script> into raw HTML (not next/script preload-only).
 * Returns null when NEXT_PUBLIC_ADSENSE_CLIENT is unset.
 */
export function AdSenseScript() {
  const client = getAdSenseClient();
  if (!client) return null;

  return (
    <>
      <meta name="google-adsense-account" content={client} />
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        crossOrigin="anonymous"
      />
    </>
  );
}
