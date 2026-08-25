import type { NextConfig } from "next";

const INDEXNOW_KEY_PATH = "/525facfab7354dd3a4f44e32baa456a1.txt";

const nextConfig: NextConfig = {
  /**
   * beforeFiles: run BEFORE App Router matching.
   * Required because src/app/[slug] uses dynamicParams=false and would
   * otherwise 404 the IndexNow key path as an unknown slug.
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: INDEXNOW_KEY_PATH,
          destination: "/api/indexnow-key",
        },
      ],
    };
  },
};

export default nextConfig;
