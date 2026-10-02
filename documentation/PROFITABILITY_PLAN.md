# Profitability plan — BoatingChicago

Updated: 2026-10-02  
Production baseline at audit: `781d5dbb38c9cb33d87a61445da956d4315ce657` (sitemap 104 URLs).

No publisher-reported revenue totals are in the repo. Do not treat any dollar figure below as measured revenue except the known public BoatUS offer and the fact that GetYourGuide has produced at least one booking.

## ads.txt

Technically correct; waiting for AdSense recrawl.

Live check 2026-10-02:

- `https://boatingchicago.com/ads.txt` — 200, `text/plain`, exact publisher line
- `https://www.boatingchicago.com/ads.txt` — 200, `text/plain`, same line
- `http://` apex and www — 301 to the matching HTTPS ads.txt

No implementation change this pass. Display units stay off. Do not reapply.

## Existing engines

| Engine | Pages | Placements | Measured | Opportunity |
| --- | --- | --- | --- | --- |
| GetYourGuide `HISQ5ML` + `cmp` | Experience categories, guides, homepage, Chicago destination | Contextual offer grids; homepage Popular (4) | At least one confirmed booking. Click events in GA4 `affiliate_click`. Repo has no payout export. | Keep right-offer matching. Stop showing snapshot “From $” prices. |
| Viator `P00309183` + `campaign` | Same grids, private-charter cards | Homepage fourth card is the private yacht | Clicks tracked. No booking total in repo. | Premium intent on yacht/sailing pages. |
| AdSense | Infrastructure only | Units off | Dashboard still “Getting ready / ads.txt Not found” as of Sep 13 crawl. File is live. | Wait. Do not cover weather/safety. |
| Local listings | `/advertise` (replaces priced `/list-your-business`) | Inquiry form | No customers invented. `$99/mo` card removed. | Sell featured/sponsored after a real conversation. |
| Newsletter | Homepage Brief | `newsletter_signup` with `signup_page` and `signup_placement` | Signups stored server-side (`data/newsletter.json`, gitignored) and optional Mailchimp/ConvertKit sync if env is set. | Sponsorship only after a list exists and issues actually send. |

## Intent ranking

Money is more likely on experience and ownership intent than on raw weather pageviews.

1. Experience pages (architecture, fireworks, jet ski, kayak, sailing, yacht)
2. Chicago destination + homepage Popular
3. Boat ownership hub (after partner approval)
4. Marina / storage readers who own or will buy
5. Display ads last

## Content gaps (not built this pass)

Do not publish these until each can stand alone with current official figures:

- Cost of owning a boat in Chicago
- Harbor / slip planning guide with current CPD season rules
- Buying a first boat for Lake Michigan
- Winter storage directory of real yards

The ownership hub links into existing marina, launch, storage, and Lake Michigan guides instead.

## Sending the Brief later

Signups are accepted now. A real send still needs a configured email provider (Mailchimp or ConvertKit env vars already supported in `src/lib/newsletter-sync.ts`) and an editorial issue. Do not promise a weekly cadence until that exists.
