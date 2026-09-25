# Security Audit — BoatingChicago

Date: 2026-09-24

## What Hostinger reported

Hostinger’s Node vulnerability scan listed **32** findings on the previously deployed tree:

| Severity | Count |
| --- | ---: |
| Critical | 2 (both `next`) |
| High | 18 |
| Moderate | 12 |

Those advisories mapped to **next**, **sharp** (libvips/libheif), and transitive dev tooling (**js-yaml**, **browserslist**, **brace-expansion**, **nanoid**, **postcss**, **baseline-browser-mapping**). No Prisma. No committed secrets (`.env.example` only; no `.env` in git).

## npm audit

| | Critical | High | Moderate | Low |
| --- | ---: | ---: | ---: | ---: |
| Before (`next@16.2.10`) | 1 | 6 | 1 | 0 |
| After | **0** | **0** | **0** | **0** |

Actions:

- Upgraded `next` and `eslint-config-next` to **16.3.6** (patch within 16.x; not a major).
- Ran `npm audit fix` without `--force`.
- Re-ran `npm audit`: **0 vulnerabilities**.

Hostinger’s 32 count should drop after this deployment is scanned. The scanner lags the latest deploy.

## Application checks

- Contact stays on `/contact`. No public email or phone in the UI.
- No click-to-call added.
- Response headers added: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.
- A strict Content-Security-Policy was **not** enabled. Next.js and Google Analytics need inline bootstrap scripts; a tight CSP would break production without a nonce setup. Documented instead of shipping a policy that blocks the site.

## Remaining

None in `npm audit` at the time of this pass.
