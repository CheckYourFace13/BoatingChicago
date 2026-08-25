/**
 * Submit all public site URLs to IndexNow (Bing + partners).
 *
 * Usage:
 *   npx tsx scripts/submit-indexnow.ts
 *
 * Requires the key file to be live at:
 *   https://boatingchicago.com/{key}.txt
 */
import {
  getAllIndexableUrls,
  getIndexNowKeyLocation,
  submitUrlsToIndexNow,
} from "../src/lib/indexnow";
import { INDEXNOW_KEY } from "../src/config/indexnow";

async function main() {
  const urls = getAllIndexableUrls();
  console.log(`IndexNow key: ${INDEXNOW_KEY}`);
  console.log(`Key location: ${getIndexNowKeyLocation()}`);
  console.log(`Submitting ${urls.length} URLs...`);

  const result = await submitUrlsToIndexNow(urls);
  console.log(result);

  if (!result.ok) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
