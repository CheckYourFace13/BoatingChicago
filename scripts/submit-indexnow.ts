/**
 * Submit public URLs to IndexNow (Bing + partners).
 *
 * Usage:
 *   npx tsx scripts/submit-indexnow.ts
 *   npx tsx scripts/submit-indexnow.ts --live-sitemap
 *   npx tsx scripts/submit-indexnow.ts --force
 *
 * --live-sitemap  Use production sitemap.xml as the URL list (recommended)
 * --force         Skip 24h dedupe window
 */
import {
  fetchLiveSitemapUrls,
  getAllIndexableUrls,
  getIndexNowKeyLocation,
  submitUrlsToIndexNow,
  verifyIndexNowKeyFile,
} from "../src/lib/indexnow";
import { INDEXNOW_KEY } from "../src/config/indexnow";

async function main() {
  const args = new Set(process.argv.slice(2));
  const useLive = args.has("--live-sitemap") || args.has("--live");
  const force = args.has("--force");

  console.log(`IndexNow key: ${INDEXNOW_KEY}`);
  console.log(`Key location: ${getIndexNowKeyLocation()}`);

  const keyCheck = await verifyIndexNowKeyFile();
  console.log(
    `Key verification: ok=${keyCheck.ok} status=${keyCheck.status} body=[${keyCheck.body.slice(0, 80)}]`
  );

  const urls = useLive
    ? await fetchLiveSitemapUrls()
    : getAllIndexableUrls();

  console.log(`URL source: ${useLive ? "live sitemap" : "codebase"}`);
  console.log(`Submitting ${urls.length} URLs (force=${force})...`);

  const result = await submitUrlsToIndexNow(urls, {
    requireLiveKey: true,
    skipDedupe: force,
    markSweep: true,
  });

  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
