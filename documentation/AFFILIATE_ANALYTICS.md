# Affiliate Analytics (GA4)

Simple guide for reading BoatingChicago affiliate click performance in Google Analytics 4.

BoatingChicago fires one `affiliate_click` event each time someone clicks a GetYourGuide or Viator experience link.

---

## Before you start

1. Open [Google Analytics](https://analytics.google.com/).
2. Select the **BoatingChicago** property.
3. Wait 24–48 hours after deploy for new event parameters to appear in standard reports (Realtime shows sooner).

Useful event parameters on every `affiliate_click`:

| Parameter | Meaning |
| --- | --- |
| `page_path` | Page where the click happened (e.g. `/`, `/weather`) |
| `product_name` / `product_id` | Experience clicked |
| `provider` | `getyourguide` or `viator` |
| `placement` | Module type (`homepage_popular`, `weather_contextual`, …) |
| `section` | Section label (`popular_on_the_water`, …) |
| `position` | Card order: `1`, `2`, `3`, `4` |
| `cta_text` | Button label clicked |
| `landing_page` | First page of that browser session |
| `initial_referrer` | First referrer host for the session (or `(direct)`) |
| `utm_source` / `utm_medium` / `utm_campaign` | First-touch UTMs for the session (if present) |

---

## A. Which PAGE generated the most affiliate clicks

1. Go to **Reports → Engagement → Events**.
2. Click **`affiliate_click`**.
3. Open **Explore** (or **Explorations → Blank**).
4. Create a Free-form exploration:
   - **Rows:** `page_path`
   - **Values:** Event count (`affiliate_click`)
5. Sort by event count descending.

**Faster path (after params are registered):**  
**Reports → Engagement → Events → affiliate_click →** look for the `page_path` dimension card.

---

## B. Which PRODUCT gets the most clicks

Same exploration as above, but:

- **Rows:** `product_name` (or `product_id`)
- **Values:** Event count

Optional secondary row: `provider`.

---

## C. Which HOMEPAGE POSITION gets the most clicks

1. Create an exploration.
2. Add a filter: `page_path` **exactly matches** `/`  
   AND `placement` **exactly matches** `homepage_popular`.
3. **Rows:** `position`
4. **Values:** Event count

Position `1` is the first card, `2` the second, etc.

---

## D. GetYourGuide vs Viator clicks

1. Exploration with **Rows:** `provider`
2. **Values:** Event count for `affiliate_click`
3. Optional filter: date range for the period you care about

---

## E. Which landing pages eventually produce affiliate clicks

This answers: “Someone landed on weather, then later clicked an affiliate link somewhere.”

1. Exploration (Free form).
2. **Rows:** `landing_page`
3. Optional second dimension: `page_path` (where the click finally happened)
4. **Values:** Event count for `affiliate_click`

Also useful:

- **Rows:** `initial_referrer`
- **Rows:** `utm_source` / `utm_medium` / `utm_campaign` (when campaigns were tagged)

---

## F. Affiliate click-through rate (where measurable)

GA4 does not invent “impressions” for our cards automatically. Practical CTR proxies:

### Homepage Popular module (recommended)

1. Exploration.
2. Metric A: **Views** of page path `/` (or Sessions on `/`).
3. Metric B: Event count of `affiliate_click` where:
   - `page_path` = `/`
   - `placement` = `homepage_popular`
4. CTR ≈ (affiliate clicks on homepage Popular) ÷ (homepage views or sessions).

### Sitewide affiliate CTR (rough)

CTR ≈ (all `affiliate_click` events) ÷ (all sessions) for the same date range.

Do **not** treat this as a true card-impression CTR — it is a conversion-rate style proxy.

---

## Realtime check (after a deploy)

1. **Reports → Realtime**
2. Click a GetYourGuide/Viator card on the live site
3. Confirm an `affiliate_click` appears within ~30 seconds
4. Expand event parameters and confirm `placement`, `position`, `landing_page`, `provider`

---

## Partner dashboards (booking attribution)

GA4 tracks **clicks**. Bookings appear in partner portals:

- **GetYourGuide Partner Portal → Analytics / Campaigns**  
  Campaign labels come from the official `cmp` URL parameter (e.g. `homepage-popular-1`).
- **Viator Partner → reporting / campaign**  
  Campaign labels come from the official `campaign` URL parameter.

Partner IDs must stay:

- GetYourGuide `partner_id=HISQ5ML`
- Viator `pid=P00309183`

---

## Tips

- Register custom dimensions in GA4 Admin if a parameter does not appear in Explorations after 48 hours (Event-scoped dimensions for each parameter you care about).
- Prefer date ranges of 7+ days once traffic is steady.
- Do not compare raw click counts across pages with very different traffic without also checking page views.
