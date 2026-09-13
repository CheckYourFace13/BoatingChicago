import type { NextConfig } from "next";
import {
  INDEXNOW_KEY,
  INDEXNOW_KEY_BING_WIZARD,
} from "./src/config/indexnow";

const nextConfig: NextConfig = {
  /**
   * beforeFiles: run BEFORE App Router matching.
   * Required because src/app/[slug] uses dynamicParams=false and would
   * otherwise 404 IndexNow key paths as unknown slugs.
   */
  async rewrites() {
    return {
      beforeFiles: [
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
      {
        source: "/blog",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/navy-pier-fireworks-boat-rentals",
        destination: "/chicago-fireworks-cruises",
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
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
