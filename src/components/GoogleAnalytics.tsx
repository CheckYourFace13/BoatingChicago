import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId?: string;
}

/**
 * Official gtag.js loader for the App Router root layout (Server Component).
 * Returns null when NEXT_PUBLIC_GA_MEASUREMENT_ID is missing.
 * Page views are handled separately by GoogleAnalyticsPageView.
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const id = measurementId?.trim();
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${id}', {
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}
