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
};

export default nextConfig;
