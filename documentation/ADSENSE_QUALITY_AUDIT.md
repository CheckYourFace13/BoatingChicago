# AdSense Quality Audit — BoatingChicago

Date: 2026-09-13  
Production baseline before this pass: `919943f623d9d37b0c49d6049eb999d8d3b871ce`  
Publisher ID in ads.txt: `pub-9572509189594279`

## Google rejection

AdSense reported **LOW VALUE CONTENT**. Display units remain **OFF**.

## Likely site-specific causes

1. **Templated rental-intent category URLs** (23) with overlapping FAQs and heavy affiliate grids.
2. **Thin/placeholder service pages** (storage, detailing, repair, captains, chicago-marinas) with no real listings.
3. **Duplicate intent** (e.g. fireworks rental URL vs fireworks cruises).
4. **Sparse Chicago Park District marina pages** recycling destination copy.
5. **Misleading schema**: site-wide `LocalBusiness` for a content publisher + SearchAction pointing at an empty vendors index.
6. **Stale “form / matching” copy** on some category pages after lead-form removal.
7. **Affiliate cards** that previously under-communicated experience type/location vs editorial resources.

## Indexable classification (approx.)

| Grade | Count (ex-news) | Notes |
| --- | ---: | --- |
| A | ~55 | Destinations, lakes, launches, weather, news hub, strong guides, legal |
| B | ~40 | Many guides, denser marina pages, experience categories with unique editorial |
| C | ~15 | Thin service categories, weakest duplicate rental/fireworks URLs, sparse CPD harbors |

Exact live sitemap ≈ 113 URLs (news articles vary).

## Changes made in this pass (before any reapplication)

### Quality / indexing
- Noindexed thin service categories: boat-storage, boat-detailing, boat-repair, chicago-marinas, captains-for-hire.
- Removed those URLs from sitemap.
- 301 `/navy-pier-fireworks-boat-rentals` → `/chicago-fireworks-cruises`.
- Scrubbed remaining “form below / match” language on category offer copy.
- Strengthened `/about` publisher + editorial standards.

### Usefulness
- Added **Plan Your Day** on every destination page (weather → access → activities → optional bookable).
- Homepage Explore section links into Plan Your Day anchors without lengthening the page with a new major block.
- Marina + launch FAQs grounded in verified amenity/source fields + FAQPage schema only when FAQs render.
- Experience cards now show verified type/location chips and a clear “Bookable experience” label.

### Trust / schema / ads.txt
- Removed publisher `LocalBusiness` schema sitewide.
- Stable Organization + WebSite `@id`s; Article/FAQ reference the same publisher.
- Place/Marina schema only with verified fields (no invented coords/hours/ratings).
- Hardened `ads.txt` headers (`text/plain`, cache). Live file already returned HTTP 200 with correct pub ID.
- `/blog` and `/blog/*` → 301 `/news`.
- Footer credit: Built by iScream Studio.

### Explicitly NOT done
- Did not enable AdSense display units.
- Did not mass-create new SEO pages or a fake blog.
- Did not invent marina amenities or boat-marketplace affiliate links.
- Did not reapply to AdSense.

## Wait before reapplying

Reapply only after:
1. Google has recrawled noindexed/redirected URLs.
2. Destination Plan Your Day pages show engagement.
3. ads.txt remains “found” in AdSense for several days.
4. Thin CPD marina pages get more harbor-specific verified prose (next content sprint).

---

## Second pass — 2026-09-16

AdSense dashboard: **GETTING READY** + ads.txt **NOT FOUND** (despite live 200).

Additional changes:
- Thin categories now **308 redirect** to guides/directories (not merely noindex)
- Matching/lead-form language scrubbed from affiliate cards + category copy
- ads.txt via `/api/ads-txt` rewrite + **www → apex** middleware
- Search Console 404 aliases redirected (`/find-a-boat`, `/rentals`, sample vendors, etc.)
- Homepage empty ad spacer removed; Plan Your Day expanded to conditions → access → guide → activities → book

Remaining concerns: overlapping rental categories, sparse CPD harbors, thin `/vendors`.
