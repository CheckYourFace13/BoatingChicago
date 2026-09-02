import type { Metadata } from "next";
import { Suspense } from "react";
import { Outfit } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GoogleAnalyticsPageView } from "@/components/GoogleAnalyticsPageView";
import { AdSenseScript } from "@/components/AdSenseScript";
import { SiteConditionsTicker } from "@/components/SiteConditionsTicker";
import { SessionOriginCapture } from "@/components/SessionOriginCapture";
import { siteConfig } from "@/config/site";
import {
  buildOrganizationSchema,
  buildPublisherLocalBusinessSchema,
  buildWebSiteSchema,
} from "@/lib/schema";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Chicago & Southern Lake Michigan Boating Guide`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  other: {
    "fo-verify": "7b72da17-a330-4781-882c-eace69f3b67c",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  return (
    <html lang="en" className={`${outfit.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <AdSenseScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildWebSiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildPublisherLocalBusinessSchema()),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <GoogleAnalytics measurementId={gaMeasurementId} />
        <SessionOriginCapture />
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView measurementId={gaMeasurementId} />
        </Suspense>
        <Header />
        <Suspense
          fallback={
            <div
              className="border-b border-sky-blue/25 bg-lake-blue"
              style={{ height: 36 }}
              aria-hidden
            />
          }
        >
          <SiteConditionsTicker />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
