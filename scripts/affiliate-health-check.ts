/**
 * Read-only affiliate health check.
 * Usage: npx tsx scripts/affiliate-health-check.ts
 *
 * Surfaces expired date-window creatives and destination HTTP failures.
 * Does not publish, rotate, or send campaigns. Editorial rank is unused.
 */
import {
  isBrandsmartBlackFridayWindow,
} from "../src/config/impact-programs";
import {
  listPlacedShoppingOffers,
  SHOPPING_PAGE_SLOTS,
} from "../src/data/partner-shopping";
import { resolveAdvertisers } from "../src/lib/affiliate-registry";

type CheckRow = {
  id: string;
  href: string;
  status: number | "error";
  finalHost: string;
  note: string;
};

async function probe(url: string): Promise<CheckRow> {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(12000),
      headers: { "User-Agent": "BoatingChicagoAffiliateHealthCheck/1.0" },
    });
    const finalHost = new URL(res.url).hostname;
    return {
      id: url,
      href: url,
      status: res.status,
      finalHost,
      note: res.ok ? "ok" : "non-2xx",
    };
  } catch (err) {
    return {
      id: url,
      href: url,
      status: "error",
      finalHost: "",
      note: err instanceof Error ? err.message : "fetch failed",
    };
  }
}

async function main() {
  const now = new Date();
  console.log(`affiliate-health-check ${now.toISOString()}`);
  console.log(
    `brandsmart_bf_window=${isBrandsmartBlackFridayWindow(now)} (America/Chicago 2026-10-28 00:00 to 2026-11-29 00:00 exclusive)`,
  );

  console.log("\n# Placed shopping slots");
  for (const [page, specs] of Object.entries(SHOPPING_PAGE_SLOTS)) {
    console.log(`- /${page}: ${specs.map((s) => s.offerId).join(", ")}`);
  }

  console.log("\n# Destination probes (one GET per unique click base)");
  const unique = [...new Set(listPlacedShoppingOffers().map((o) => o.clickBase))];
  const results: CheckRow[] = [];
  for (const href of unique) {
    const row = await probe(href);
    results.push(row);
    console.log(`${row.status}\t${row.finalHost || "-"}\t${href}\t${row.note}`);
  }

  console.log("\n# Registry rows (approved but editorial-dark unless enabled)");
  for (const row of resolveAdvertisers()) {
    if (row.approvalStatus !== "approved") continue;
    console.log(
      `${row.id}\t${row.network}\t${row.advertiserId || "-"}\tenabled=${row.enabled}\t${row.trackedDestination || ""}`,
    );
  }

  const failed = results.filter((r) => r.status === "error" || (typeof r.status === "number" && r.status >= 400));
  console.log(
    `\n# Review: ${failed.length} destination failure(s). Human review still required for commissions, creatives, and property permission.`,
  );
  if (failed.length) process.exitCode = 1;
}

main();
