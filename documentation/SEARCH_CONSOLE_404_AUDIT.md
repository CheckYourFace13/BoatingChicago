# Search Console 404 Audit — BoatingChicago

Date: 2026-09-16  
Production baseline before this pass: `d75886eaf8cd5a3bfa0e4d53542d2c3570cf8eef`

## Summary

Live sitemap (107 URLs): **0 hard 404s**.  
Google’s “Not found (404)” warning is explained by **legacy/retired URLs still in Google’s crawl queue**, not by broken sitemap members.

## Confirmed 404s → action

| Old URL | Cause | Replacement / action | Final status |
| --- | --- | --- | --- |
| `/find-a-boat` | Retired boat-matching product | **308** → `/boat-rentals-chicago` | Redirect |
| `/find-a-boat/` | Same | **308** → `/boat-rentals-chicago` | Redirect |
| `/navy-pier-fireworks-boat-rentals` | Renamed category | **308** → `/chicago-fireworks-cruises` (already) + internal hrefs updated | Redirect |
| `/boat-storage-chicago` | Thin service category | **308** → `/chicago-boat-storage-guide` | Redirect |
| `/boat-detailing-chicago` | Thin service category | **308** → `/chicago-boat-detailing-guide` | Redirect |
| `/boat-repair-chicago` | Thin service category | **308** → `/chicago-boat-repair-guide` | Redirect |
| `/chicago-marinas` | Thin / overlaps `/marinas` | **308** → `/marinas` | Redirect |
| `/captains-for-hire-chicago` | Thin / no real listings | **308** → `/yacht-rentals-chicago` | Redirect |
| `/chicago-boat-rentals` | Alias spelling | **308** → `/boat-rentals-chicago` | Redirect |
| `/boat-rental-chicago` | Alias spelling | **308** → `/boat-rentals-chicago` | Redirect |
| `/private-yacht-charter` | Alias | **308** → `/yacht-rentals-chicago` | Redirect |
| `/rentals` | Generic alias | **308** → `/boat-rentals-chicago` | Redirect |
| `/charters` | Generic alias | **308** → `/yacht-rentals-chicago` | Redirect |
| `/contact-us` | Alias | **308** → `/contact` | Redirect |
| `/about-us` | Alias | **308** → `/about` | Redirect |
| `/home` | Alias | **308** → `/` | Redirect |
| `/sitemap` | Alias | **308** → `/sitemap.xml` | Redirect |
| `/feed`, `/rss` | Feed probes | **308** → `/news` | Redirect |
| `/vendors/sample-*` | Unpublished sample stubs | **308** → `/list-your-business` | Redirect |
| `/blog`, `/blog/*` | Old editorial hub | **308** → `/news` (middleware one-hop) | Redirect |
| `/matching`, `/services`, `/boats`, `/boat-sales`, `/wp-login.php`, `/lakes/fox-river` | Never published / spam probes | Leave proper **404** (no homepage dump) | 404 |

## Internal link fixes

- All `/navy-pier-fireworks-boat-rentals` hrefs → `/chicago-fireworks-cruises`
- Guide links to thin categories → guide/directory equivalents
- IndexNow URL list now filters redirected categories (aligned with sitemap)

## Host consistency

- Middleware: `www.boatingchicago.com` → `boatingchicago.com` (308) for all matched routes including `/ads.txt`
