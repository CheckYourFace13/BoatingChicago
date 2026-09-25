# News indexing policy

Automated weather, alerts, and RSS items are useful on `/news` and `/weather`. They are not durable articles.

## Hub only (default)

These stay on the news hub and link to the original source. They do **not** get an indexable `/news/[slug]` page and are **not** in the sitemap or IndexNow:

- NWS/NOAA alerts
- Observed wind, wave, and water-temperature updates
- Conditions ratings
- Event cards that already live on `/events`
- RSS items ingested automatically

`qualifiesForArticlePage` is `false` for all of those.

## When a standalone URL is allowed

Only a **curated** story should set `qualifiesForArticlePage` to true, when it adds durable local context a reader would still want later:

- lasting harbor or regulation changes
- significant closures
- major boating events with our own planning context
- long-lived safety changes

Do not use word count alone. If the item will expire when a feed drops it, keep it on the hub.

## Expired URLs

Old `/news/...` URLs that were previously sitemap entries can 404 once the feed item is gone. That is intentional. They must not remain in the sitemap, canonicals, or IndexNow.
