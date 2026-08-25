# Boating Chicago — Hostinger Node.js Deployment

Deploy **BoatingChicago.com** on [Hostinger Node.js Web Apps](https://www.hostinger.com/web-apps-hosting/nextjs-hosting) (Business or Cloud plan with Node.js enabled).

This app uses **Next.js App Router** with standard `next build` / `next start` — no Vercel-specific config required.

---

## Cursor / day-to-day deploy workflow

Production deploys from GitHub branch **`main`** via **Hostinger native Git auto-deploy** (preferred). No SSH upload. No laptop online required.

1. Make changes
2. Run `npm run build` locally (or rely on GitHub Actions build gate)
3. Commit
4. `git push origin main`
5. Hostinger automatically pulls, installs, builds, and restarts
6. GitHub Action **Deploy production** waits for `/api/deploy-info` to match the pushed SHA, then verifies live URLs and submits IndexNow

**You should not need to open Hostinger hPanel for routine deploys** once Git auto-deploy shows as connected.

### GitHub Actions

| Workflow | File | Role |
|---|---|---|
| **Deploy production** | `.github/workflows/deploy-production.yml` | Build gate → wait for Hostinger SHA → verify live site → IndexNow submit |
| **IndexNow** | `.github/workflows/indexnow.yml` | Weekly + manual reconciliation (and fallback after successful deploy) |

No GitHub repository secrets are required for the default Hostinger Git auto-deploy path.

Optional (not required for auto-deploy):

| Secret | Purpose |
|---|---|
| _(none for Method A)_ | Hostinger GitHub App manages its own webhook |

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
| **Branch** | **`main`** |

The `start` script binds to `0.0.0.0` and reads `PORT` from the Hostinger runtime:

```json
"start": "next start -H 0.0.0.0 -p ${PORT:-3000}"
```

If the app fails to respond, try this alternate start command in hPanel:

```bash
npm run start -- -p $PORT -H 0.0.0.0
```

---

## One-time: enable / repair Git auto-deploy

Hostinger’s Node.js product uses a **GitHub App** (not a manual SSH deploy). Auto-deployment is on when the connection is healthy.

1. In **hPanel → Websites**, open the BoatingChicago **Node.js** app.
2. Confirm status is **Connected with GitHub** for repo `CheckYourFace13/BoatingChicago`, branch **`main`**.
3. If status is **GitHub is not connected**, **Repository access missing**, or **Different GitHub account**:
   - Dashboard **⋮** → **Connect to GitHub** / **Manage access**
   - Authorize the Hostinger GitHub App
   - Grant access to **`CheckYourFace13/BoatingChicago`**
   - Confirm branch = **`main`**
4. Click **Redeploy** once so production matches latest `main`.
5. Confirm the dashboard shows an **Auto-deployment** chip.

After that, every `git push origin main` should trigger install → build → start automatically.

Docs: [Hostinger GitHub deployments](https://docs.hostinger.com/node.js/github)

### If pushes no longer deploy

1. Check hPanel connection status (table above).
2. Check GitHub → repo **Settings → Integrations → Applications** (or account **Settings → Applications**) for the Hostinger app — re-grant repo access if revoked.
3. Click **Redeploy** in hPanel.
4. Watch GitHub Action **Deploy production** — it fails loudly if `/api/deploy-info` never shows the new SHA.

---

## Environment variables

Set these in **Hostinger hPanel → your app → Environment variables** (not committed to Git).  
They **persist across deploys** — automation must not overwrite them.

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

### Recommended / optional

See `.env.example` for affiliate, AdSense, GA4, IndexNow, and newsletter vars.

> **Note:** Local file storage (`data/leads.json`) may not persist on Hostinger's managed runtime. Configure Resend email for reliable lead capture in production.

---

## Verify a deployment

After a push (or after Redeploy):

```bash
# Must match the commit you just pushed (full SHA from git rev-parse HEAD)
curl -s "https://boatingchicago.com/api/deploy-info"
```

Expect JSON like:

```json
{
  "buildSha": "<full git sha>",
  "nodeEnv": "production",
  "environment": "production",
  "indexNowKeyPath": "/525facfab7354dd3a4f44e32baa456a1.txt",
  "time": "..."
}
```

Also check:

| URL | Expect |
|---|---|
| `https://boatingchicago.com/` | HTTP 200 |
| `https://boatingchicago.com/api/deploy-info` | HTTP 200, `buildSha` = pushed commit |
| `https://boatingchicago.com/sitemap.xml` | HTTP 200 |
| `https://boatingchicago.com/robots.txt` | HTTP 200 |
| `https://boatingchicago.com/525facfab7354dd3a4f44e32baa456a1.txt` | HTTP 200, body exactly `525facfab7354dd3a4f44e32baa456a1` |

Local helper (same checks as CI):

```bash
EXPECTED_SHA=$(git rev-parse HEAD) bash scripts/verify-production.sh
```

GitHub → **Actions → Deploy production** shows pass/fail for each push.

---

## CDN / cache

Hostinger may serve stale HTML via **hcdn** / Cache Manager after a deploy.

- Native Node.js Git deploy does **not** document an automatic CDN purge API for this app type.
- CI uses **cache-busting query params** (`?v=<sha>`) when verifying.
- The IndexNow **canonical** key URL (no query) must still return 200 with the exact body.
- If deploy-info is new but homepage/key look stale: **hPanel → Advanced → Cache Manager → Purge all**.

Do not add global random `Cache-Control` hacks unless a specific path requires it.

---

## DNS setup

1. In Hostinger hPanel, attach **boatingchicago.com** to your Node.js web app.
2. Point DNS to Hostinger (nameservers or A/CNAME Hostinger provides).
3. Enable **SSL** (Let's Encrypt) — force HTTPS.
4. Choose one canonical host (`boatingchicago.com` or `www`) and redirect the other.

Confirm `NEXT_PUBLIC_SITE_URL=https://boatingchicago.com` matches your canonical domain.

---

## Local verification before deploy

```bash
cd c:\Users\chris\Projects\BoatingChicago
npm install
npm run build
# Windows PowerShell:
$env:PORT=3000; npx next start -H 0.0.0.0 -p 3000
```

Build without any `.env` file to confirm the app compiles with defaults only:

```bash
npm run build
```

---

## Recovery if automated deploy fails

| Symptom | Action |
|---|---|
| **Deploy production** times out waiting for SHA | Reconnect GitHub in hPanel → **Redeploy** |
| Build fails in GitHub Actions | Fix TypeScript/build locally; do not expect Hostinger to succeed either |
| Build fails only on Hostinger | Open **Deployments** log in hPanel; fix Node 20 / install / env issues |
| `/api/deploy-info` matches but homepage stale | Purge Cache Manager; hard-refresh |
| IndexNow key 404 | Confirm commit includes key route + rewrite; Redeploy; see IndexNow commits |
| 503 / app won't start | Confirm `npm run start`; check Runtime Logs |
| Wrong sitemap URLs | Set `NEXT_PUBLIC_SITE_URL` and Redeploy (embedded at build time) |

---

## Why not SSH / archive upload?

Safer default for this repo:

| Method | Used? | Why |
|---|---|---|
| **A. Native Hostinger Git auto-deploy** | **Yes (preferred)** | Official Node.js path; Hostinger builds on their servers; preserves hPanel env vars |
| B. Hostinger webhook + GitHub Actions | Only for generic Advanced Git (static/PHP), not Node.js build pipeline | |
| C. GitHub Actions SSH | Avoided — more secrets, risk of overwriting env / wrong root | |
| D. Hostinger API archive upload | Avoided for routine deploys — overwrites site contents; needs API token | |

---

## Post-launch testing checklist

- [ ] Homepage loads at `https://boatingchicago.com`
- [ ] `/api/deploy-info` returns current `main` SHA
- [ ] Category page loads (e.g. `/boat-rentals-chicago`)
- [ ] Find a Boat form submits and shows success
- [ ] `https://boatingchicago.com/sitemap.xml` loads
- [ ] `https://boatingchicago.com/robots.txt` allows indexing
- [ ] IndexNow key URL returns exact key body
- [ ] SSL active
- [ ] Push to `main` triggers Hostinger without opening hPanel

See also: [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md).
