#!/usr/bin/env bash
# Wait for Hostinger to serve the expected Git SHA, then verify live URLs.
# Usage: EXPECTED_SHA=<40-char-sha> ./scripts/verify-production.sh
set -euo pipefail

SITE="${SITE_URL:-https://boatingchicago.com}"
EXPECTED_SHA="${EXPECTED_SHA:?EXPECTED_SHA is required}"
SHORT_SHA="${EXPECTED_SHA:0:7}"
MAX_ATTEMPTS="${MAX_ATTEMPTS:-36}"   # ~18 min at 30s
SLEEP_SECS="${SLEEP_SECS:-30}"
INDEXNOW_KEY="525facfab7354dd3a4f44e32baa456a1"
INDEXNOW_PATH="/${INDEXNOW_KEY}.txt"

echo "Waiting for production deploy SHA=${EXPECTED_SHA}"
echo "Site: ${SITE}"

deploy_ok=0
for i in $(seq 1 "${MAX_ATTEMPTS}"); do
  bust="v=${EXPECTED_SHA}&t=$(date +%s)"
  code=$(curl -sS -o /tmp/deploy-info.json -w "%{http_code}" \
    "${SITE}/api/deploy-info?${bust}" || echo "000")
  body=$(tr -d '\r\n' </tmp/deploy-info.json 2>/dev/null || true)
  echo "attempt ${i}/${MAX_ATTEMPTS}: deploy-info HTTP ${code} body=${body}"

  if [ "${code}" = "200" ] && echo "${body}" | grep -q "\"buildSha\":\"${EXPECTED_SHA}\""; then
    echo "Deploy SHA matched."
    deploy_ok=1
    break
  fi
  # Accept short SHA match if full SHA was truncated at build time
  if [ "${code}" = "200" ] && echo "${body}" | grep -q "\"buildSha\":\"${SHORT_SHA}"; then
    echo "Deploy SHA matched (prefix ${SHORT_SHA})."
    deploy_ok=1
    break
  fi
  sleep "${SLEEP_SECS}"
done

if [ "${deploy_ok}" != "1" ]; then
  echo "::error::Hostinger did not serve buildSha=${EXPECTED_SHA} within timeout."
  echo "Native Git auto-deploy is likely disconnected. In hPanel:"
  echo "  1. Open the BoatingChicago Node.js app"
  echo "  2. Confirm GitHub status is Connected for CheckYourFace13/BoatingChicago @ main"
  echo "  3. Click Redeploy, then confirm the Auto-deployment chip is active"
  exit 1
fi

check_200() {
  local path="$1"
  local label="$2"
  local bust="v=${EXPECTED_SHA}&t=$(date +%s)"
  local url="${SITE}${path}?${bust}"
  local code
  code=$(curl -sS -o /tmp/verify-body.bin -w "%{http_code}" -L "${url}" || echo "000")
  echo "${label}: HTTP ${code} (${url})"
  if [ "${code}" != "200" ]; then
    echo "::error::${label} failed (expected HTTP 200, got ${code})"
    return 1
  fi
  return 0
}

# Post-SHA responsiveness gate: catch hung Node after Hostinger process switch.
# Deploy logs showed multiple rapid Next.js "Ready" starts; the process can accept
# the SHA probe then stop answering. Probe /api/health with a hard timeout.
echo "Checking post-deploy health responsiveness..."
health_ok=0
for i in $(seq 1 12); do
  health_code=$(curl -sS -m 15 -o /tmp/health.json -w "%{http_code}" \
    "${SITE}/api/health?t=$(date +%s)" || echo "000")
  health_body=$(tr -d '\r\n' </tmp/health.json 2>/dev/null || true)
  echo "health attempt ${i}/12: HTTP ${health_code} body=${health_body}"
  if [ "${health_code}" = "200" ] && echo "${health_body}" | grep -q '"ok":true'; then
    health_ok=1
    break
  fi
  sleep 10
done
if [ "${health_ok}" != "1" ]; then
  echo "::error::Production /api/health did not respond after SHA match — possible hung Node process."
  echo "Action: restart the Node.js application in hPanel (or hosting_nodejs_restart-application), then re-run verify."
  exit 1
fi

fail=0
check_200 "/" "homepage" || fail=1
check_200 "/sitemap.xml" "sitemap" || fail=1
check_200 "/robots.txt" "robots.txt" || fail=1
check_200 "/api/health" "health" || fail=1
check_200 "/tools" "tools hub" || fail=1
check_200 "/tools/fuel" "fuel calculator" || fail=1
check_200 "/kayak-canoe-sup" "kayak finder" || fail=1
check_200 "/permits" "permits" || fail=1
check_200 "/calendar" "calendar" || fail=1
check_200 "/boat-launches" "boat launches" || fail=1
check_200 "/marinas" "marinas" || fail=1
check_200 "/destinations" "destinations" || fail=1
check_200 "/fuel-docks" "fuel docks" || fail=1
check_200 "/transient-slips" "transient slips" || fail=1
check_200 "/river-paddling" "river paddling" || fail=1
check_200 "/aquatic-invasive-species-boater-rules" "AIS guide" || fail=1
check_200 "/fishing-licenses-great-lakes-states" "fishing licenses" || fail=1
check_200 "/about" "about" || fail=1
check_200 "/chicago-boat-storage-guide" "storage guide" || fail=1
check_200 "/chicago-boat-detailing-guide" "detailing guide" || fail=1
check_200 "/chicago-dining-cruises" "dining cruises" || fail=1
check_200 "/weather/embed" "conditions embed docs" || fail=1
check_200 "/embed/conditions?location=chicago" "conditions embed card" || fail=1
check_200 "/chicago-playpen-guide" "protected playpen guide" || fail=1
check_200 "/chicago-transient-dockage" "protected transient dockage" || fail=1

# Canonical (no query) + cache-busted key URL
key_code=$(curl -sS -o /tmp/indexnow-key.txt -w "%{http_code}" \
  "${SITE}${INDEXNOW_PATH}" || echo "000")
key_body=$(tr -d '\r\n' </tmp/indexnow-key.txt || true)
echo "IndexNow key (canonical): HTTP ${key_code} body=[${key_body}]"

key_bust_code=$(curl -sS -o /tmp/indexnow-key-bust.txt -w "%{http_code}" \
  "${SITE}${INDEXNOW_PATH}?v=${EXPECTED_SHA}" || echo "000")
key_bust_body=$(tr -d '\r\n' </tmp/indexnow-key-bust.txt || true)
echo "IndexNow key (cache-bust): HTTP ${key_bust_code} body=[${key_bust_body}]"

if [ "${key_code}" != "200" ] || [ "${key_body}" != "${INDEXNOW_KEY}" ]; then
  echo "::error::IndexNow key URL failed exact verification on canonical URL"
  if [ "${key_bust_code}" = "200" ] && [ "${key_bust_body}" = "${INDEXNOW_KEY}" ]; then
    echo "::warning::Cache-busted key URL is correct but canonical URL is still stale (CDN)."
    echo "Purge Hostinger cache: hPanel → Advanced → Cache Manager → Purge all"
  fi
  fail=1
fi

# Report canonical vs busted homepage freshness (informational)
home_etag=$(curl -sSI "${SITE}/" | tr -d '\r' | grep -i '^etag:' || true)
home_bust_etag=$(curl -sSI "${SITE}/?v=${EXPECTED_SHA}" | tr -d '\r' | grep -i '^etag:' || true)
echo "homepage etag canonical: ${home_etag}"
echo "homepage etag cache-bust: ${home_bust_etag}"

if [ "${fail}" != "0" ]; then
  echo "::error::Production verification failed"
  exit 1
fi

echo "Production verification passed for SHA ${EXPECTED_SHA}"
