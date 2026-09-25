import type { NextConfig } from "next";
import {
  INDEXNOW_KEY,
  INDEXNOW_KEY_BING_WIZARD,
} from "./src/config/indexnow";

const nextConfig: NextConfig = {
  /**
   * Handle trailing-slash normalization in middleware so /blog/ can 308
   * directly to /news (one hop) instead of /blog/ → /blog → /news.
   */
  skipTrailingSlashRedirect: true,
  /**
   * beforeFiles: run BEFORE App Router matching.
   * Required because src/app/[slug] uses dynamicParams=false and would
   * otherwise 404 IndexNow key paths as unknown slugs.
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/ads.txt",
          destination: "/api/ads-txt",
        },
        {
          source: `/${INDEXNOW_KEY}.txt`,
          destination: "/api/indexnow-key",
        },
        {
          source: `/${INDEXNOW_KEY_BING_WIZARD}.txt`,
          destination: "/api/indexnow-key-bing",
        },
      ],
    };
  },
  async redirects() {
    return [
      { source: "/faq", destination: "/chicago-boating-faq", permanent: true },
      { source: "/faq/:path*", destination: "/chicago-boating-faq", permanent: true },
      { source: "/blog", destination: "/news", permanent: true },
      { source: "/blog/:path*", destination: "/news", permanent: true },
      {
        source: "/find-a-boat",
        destination: "/boat-rentals-chicago",
        permanent: true,
      },
      {
        source: "/find-a-boat/:path*",
        destination: "/boat-rentals-chicago",
        permanent: true,
      },
      {
        source: "/navy-pier-fireworks-boat-rentals",
        destination: "/chicago-fireworks-cruises",
        permanent: true,
      },
      {
        source: "/boat-storage-chicago",
        destination: "/chicago-boat-storage-guide",
        permanent: true,
      },
      {
        source: "/boat-detailing-chicago",
        destination: "/chicago-boat-detailing-guide",
        permanent: true,
      },
      {
        source: "/boat-repair-chicago",
        destination: "/chicago-boat-repair-guide",
        permanent: true,
      },
      {
        source: "/chicago-marinas",
        destination: "/marinas",
        permanent: true,
      },
      {
        source: "/captains-for-hire-chicago",
        destination: "/yacht-rentals-chicago",
        permanent: true,
      },
      {
        source: "/chicago-boat-rentals",
        destination: "/boat-rentals-chicago",
        permanent: true,
      },
      {
        source: "/boat-rental-chicago",
        destination: "/boat-rentals-chicago",
        permanent: true,
      },
      {
        source: "/private-yacht-charter",
        destination: "/yacht-rentals-chicago",
        permanent: true,
      },
      { source: "/rentals", destination: "/boat-rentals-chicago", permanent: true },
      { source: "/charters", destination: "/yacht-rentals-chicago", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/sitemap", destination: "/sitemap.xml", permanent: true },
      { source: "/feed", destination: "/news", permanent: true },
      { source: "/rss", destination: "/news", permanent: true },
      {
        source: "/vendors/sample-chicago-party-boat-partner",
        destination: "/list-your-business",
        permanent: true,
      },
      {
        source: "/vendors/sample-chicago-yacht-partner",
        destination: "/list-your-business",
        permanent: true,
      },
      {
        source: "/vendors/sample-chicago-fishing-partner",
        destination: "/list-your-business",
        permanent: true,
      },
      {
        source: "/vendors/sample-chicago-captain-partner",
        destination: "/list-your-business",
        permanent: true,
      },
      {
        source: "/vendors/sample-chicago-marina-partner",
        destination: "/list-your-business",
        permanent: true,
      },
      {
        source: "/vendors/sample-chicago-detailing-partner",
        destination: "/list-your-business",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/ads.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          {
            key: "Cache-Control",
            value: "public, max-age=300, must-revalidate",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
