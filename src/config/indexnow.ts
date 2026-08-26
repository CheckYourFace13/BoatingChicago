/**
 * IndexNow (Bing / IndexNow.org) ownership keys.
 *
 * Official protocol: any valid key (8–128 chars a-zA-Z0-9-) works if the
 * matching /{key}.txt file is hosted at the site root. Bing Webmaster Tools'
 * "Get Started" wizard generates a NEW optional key — it does not invalidate
 * an existing working key.
 *
 * PRIMARY: used for all BoatingChicago submissions.
 * SECONDARY (Bing wizard): hosted so either key verifies if Bing tests it.
 */
export const INDEXNOW_KEY = "525facfab7354dd3a4f44e32baa456a1";

/** Optional Bing Webmaster Tools–generated key (hosted; not used for submit). */
export const INDEXNOW_KEY_BING_WIZARD = "b15999c350fe447ebc343419265f09b5";

export const INDEXNOW_KEYS = [INDEXNOW_KEY, INDEXNOW_KEY_BING_WIZARD] as const;

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
