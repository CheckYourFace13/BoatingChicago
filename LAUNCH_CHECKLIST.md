# Boating Chicago — Launch Checklist

## Environment variables

Copy `.env.example` to `.env.local` (local) or set in your hosting dashboard (production).

### Required for production

| Variable | Example | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://boatingchicago.com` | Canonical URL for SEO, sitemap, Open Graph |
| `LEADS_TO_EMAIL` | `hello@boatingchicago.com` | Receives Find a Boat & newsletter notifications |
| `FROM_EMAIL` | `Boating Chicago <hello@boatingchicago.com>` | Sender address (must be verified in Resend/SendGrid) |
| `RESEND_API_KEY` | `re_...` | Sends lead notification emails via [Resend](https://resend.com) |

### Recommended

| Variable | Purpose |
|---|---|
| `CONTACT_EMAIL` | Footer contact address |
| `NEXT_PUBLIC_AFFILIATE_BOATSETTER` | Tracked Boatsetter affiliate URL |
| `NEXT_PUBLIC_AFFILIATE_GETMYBOAT` | Tracked GetMyBoat affiliate URL |
| `NEXT_PUBLIC_AFFILIATE_FISHINGBOOKER` | Tracked FishingBooker affiliate URL |
| `NEXT_PUBLIC_AFFILIATE_VIATOR` | Tracked Viator affiliate URL |
| `NEXT_PUBLIC_AFFILIATE_CUSTOM` | Custom partner / direct booking link |

### Optional — email provider alternative

| Variable | Purpose |
|---|---|
| `SENDGRID_API_KEY` | Use SendGrid instead of Resend for lead emails |

### Optional — newsletter platform sync

| Variable | Purpose |
|---|---|
| `MAILCHIMP_API_KEY` | Auto-sync signups to Mailchimp |
| `MAILCHIMP_LIST_ID` | Mailchimp audience/list ID |
| `CONVERTKIT_API_KEY` | Auto-sync signups to ConvertKit |
| `CONVERTKIT_FORM_ID` | ConvertKit form ID |

> If email env vars are missing, forms still show success and leads are logged server-side. Local file storage (`data/leads.json`) works in development but is not reliable on serverless hosts — configure email for production.

---

## Local commands

```bash
cd c:\Users\chris\Projects\BoatingChicago
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Build command

```bash
npm run build
npm start
```

Verify build completes with no errors before deploying.

---

## Deployment notes

1. **Host:** Deploy to [Hostinger Node.js Web Apps](https://www.hostinger.com/web-apps-hosting/nextjs-hosting). See **[HOSTINGER_DEPLOYMENT.md](./HOSTINGER_DEPLOYMENT.md)** for exact build/start settings.
2. **Set all env vars** in Hostinger hPanel before going live.
3. **Verify Resend domain:** Add and verify `boatingchicago.com` in Resend so `FROM_EMAIL` can send.
4. **Test forms:** Submit a Find a Boat form and newsletter signup — confirm email arrives at `LEADS_TO_EMAIL`.
5. **Vendor listings:** Sample vendors are hidden (`isPublished: false`). Set `isPublished: true` in `src/data/vendors.ts` when onboarding real partners.

---

## Affiliate links to replace

Update these with your real tracked affiliate URLs before driving paid traffic:

- Boatsetter → `NEXT_PUBLIC_AFFILIATE_BOATSETTER`
- GetMyBoat → `NEXT_PUBLIC_AFFILIATE_GETMYBOAT`
- FishingBooker → `NEXT_PUBLIC_AFFILIATE_FISHINGBOOKER`
- Viator → `NEXT_PUBLIC_AFFILIATE_VIATOR`
- Custom partner → `NEXT_PUBLIC_AFFILIATE_CUSTOM`

Central config also lives in `src/config/affiliates.ts`.

---

## DNS reminder

Point your domain to your host:

| Record | Value |
|---|---|
| `A` or `CNAME` | Vercel / hosting provider instructions |
| `www` | Redirect to `boatingchicago.com` (or vice versa — pick one canonical) |

Confirm `NEXT_PUBLIC_SITE_URL=https://boatingchicago.com` matches your canonical domain.

---

## Google Search Console

1. Verify ownership of `boatingchicago.com` at [Google Search Console](https://search.google.com/search-console).
2. Submit sitemap: **`https://boatingchicago.com/sitemap.xml`**
3. Request indexing for homepage and top category pages:
   - `/boat-rentals-chicago`
   - `/party-boat-rentals-chicago`
   - `/yacht-rentals-chicago`
   - `/navy-pier-fireworks-boat-rentals`

---

## GA4 conversion tracking (optional)

Tracking hooks are in place via `data-track` attributes and `trackEvent()` in `src/lib/tracking.ts`.

Events fired:
- `affiliate_click` — affiliate partner link clicks
- `find_boat_submit` — Find a Boat form submissions
- `newsletter_signup` — email signups
- `list_business_click` — List Your Business CTA clicks

Add GA4 by inserting your measurement ID in `src/app/layout.tsx` when ready.

---

## Pre-launch checklist

- [ ] `.env.local` / production env vars set
- [ ] Resend domain verified, test lead email received
- [ ] Affiliate URLs updated with tracking params
- [ ] `npm run build` passes
- [ ] DNS pointed to production host
- [ ] Sitemap submitted in Google Search Console
- [ ] Forms tested on production URL
- [ ] No sample vendor pages publicly accessible
