# Boating Chicago — Hostinger Node.js Deployment

Deploy **BoatingChicago.com** on [Hostinger Node.js Web Apps](https://www.hostinger.com/web-apps-hosting/nextjs-hosting) (Business or Cloud plan with Node.js enabled).

This app uses **Next.js App Router** with standard `next build` / `next start` — no Vercel-specific config required.

---

## Hostinger hPanel settings

When adding the website via **Websites → Add Website → Node.js Apps → Import Git Repository**, use:

| Setting | Value |
|---|---|
| **Framework** | Next.js (auto-detected) |
| **Node.js version** | **20** (LTS — matches `engines` in `package.json`) |
| **Install command** | `npm ci` (or `npm install` if no lockfile issues) |
| **Build command** | `npm run build` |
| **Start command** | `npm run start` |
| **Output directory** | `.next` (auto-detected for Next.js) |
| **Entry file** | Leave blank — Next.js starts via the npm `start` script |

The `start` script binds to `0.0.0.0` and reads `PORT` from the Hostinger runtime:

```json
"start": "next start -H 0.0.0.0 -p ${PORT:-3000}"
```

If the app fails to respond, try this alternate start command in hPanel:

```bash
npm run start -- -p $PORT -H 0.0.0.0
```

---

## Environment variables

Set these in **Hostinger hPanel → your app → Environment variables** (not committed to Git).

### Required for production SEO

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://boatingchicago.com` |

Set this **before** running the build on Hostinger so metadata and sitemap URLs are correct.

### Required for lead email notifications

| Variable | Example |
|---|---|
| `LEADS_TO_EMAIL` | `hello@boatingchicago.com` |
| `FROM_EMAIL` | `Boating Chicago <hello@boatingchicago.com>` |
| `RESEND_API_KEY` | `re_xxxxxxxx` |

Verify your domain in [Resend](https://resend.com) before going live.

### Recommended

| Variable | Purpose |
|---|---|
| `CONTACT_EMAIL` | Footer contact address |
| `NODE_ENV` | `production` (Hostinger usually sets this automatically) |
| `NEXT_PUBLIC_AFFILIATE_BOATSETTER` | Tracked Boatsetter URL |
| `NEXT_PUBLIC_AFFILIATE_GETMYBOAT` | Tracked GetMyBoat URL |
| `NEXT_PUBLIC_AFFILIATE_FISHINGBOOKER` | Tracked FishingBooker URL |
| `NEXT_PUBLIC_AFFILIATE_VIATOR` | Tracked Viator URL |
| `NEXT_PUBLIC_AFFILIATE_CUSTOM` | Custom partner link |

### Optional

| Variable | Purpose |
|---|---|
| `SENDGRID_API_KEY` | Use SendGrid instead of Resend |
| `MAILCHIMP_API_KEY` | Sync newsletter signups to Mailchimp |
| `MAILCHIMP_LIST_ID` | Mailchimp audience ID |
| `CONVERTKIT_API_KEY` | Sync newsletter signups to ConvertKit |
| `CONVERTKIT_FORM_ID` | ConvertKit form ID |

### Boot behavior without env vars

The app **does not require env vars to start**:

- Missing affiliate vars → built-in fallback URLs in `src/config/affiliates.ts`
- Missing email vars → forms still return success; leads logged server-side via `console.log`
- Missing `NEXT_PUBLIC_SITE_URL` → defaults to `https://boatingchicago.com`

> **Note:** Local file storage (`data/leads.json`) may not persist on Hostinger's managed runtime. Configure Resend email for reliable lead capture in production.

---

## DNS setup

1. In Hostinger hPanel, attach **boatingchicago.com** to your Node.js web app.
2. Point DNS to Hostinger:
   - If using Hostinger nameservers, the app domain is configured in hPanel.
   - If using external DNS, add the A record or CNAME Hostinger provides for your web app.
3. Enable **SSL** (free Let's Encrypt) in hPanel — force HTTPS.
4. Choose one canonical host (`boatingchicago.com` or `www.boatingchicago.com`) and redirect the other.

Confirm `NEXT_PUBLIC_SITE_URL=https://boatingchicago.com` matches your canonical domain.

---

## Local verification before deploy

```bash
cd c:\Users\chris\Projects\BoatingChicago
npm install
npm run build
set PORT=3000 && npm run start    # Windows
# PORT=3000 npm run start         # macOS/Linux
```

Open [http://localhost:3000](http://localhost:3000) and test forms.

Build without any `.env` file to confirm the app compiles with defaults only:

```bash
npm run build
```

---

## Deploy workflow

1. Push code to GitHub (include `package-lock.json`, exclude `node_modules/` and `.env.local`).
2. Connect repo in Hostinger hPanel.
3. Set environment variables (at minimum `NEXT_PUBLIC_SITE_URL` and email vars).
4. Click **Deploy** — Hostinger runs install → build → start.
5. Attach custom domain and enable SSL.

After changing `NEXT_PUBLIC_*` variables, **redeploy/rebuild** — they are embedded at build time.

---

## Post-launch testing checklist

- [ ] Homepage loads at `https://boatingchicago.com`
- [ ] Category page loads (e.g. `/boat-rentals-chicago`)
- [ ] `/vendors` shows partner onboarding (no sample vendor listings)
- [ ] `/vendors/sample-chicago-party-boat-partner` returns 404
- [ ] Find a Boat form submits and shows success
- [ ] Lead email arrives at `LEADS_TO_EMAIL` (if Resend configured)
- [ ] Newsletter signup works
- [ ] Affiliate links open correctly (Boatsetter, GetMyBoat, etc.)
- [ ] `https://boatingchicago.com/sitemap.xml` loads with 18 public URLs
- [ ] `https://boatingchicago.com/robots.txt` allows indexing
- [ ] SSL certificate active (HTTPS, no mixed content warnings)
- [ ] Submit sitemap in [Google Search Console](https://search.google.com/search-console)

---

## Troubleshooting

| Problem | Fix |
|---|---|
| 503 / app won't start | Confirm start command is `npm run start`; check Hostinger deploy logs |
| Wrong port | Ensure start script uses `$PORT` / `-H 0.0.0.0` |
| Build fails | Run `npm run build` locally; fix TypeScript errors first |
| Wrong URLs in sitemap | Set `NEXT_PUBLIC_SITE_URL` and redeploy |
| Forms succeed but no email | Add `RESEND_API_KEY`, `FROM_EMAIL`, `LEADS_TO_EMAIL`; verify domain in Resend |
| Node version mismatch | Set Node.js **20** in hPanel to match `package.json` engines |

See also: [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) for affiliate setup and monetization next steps.
