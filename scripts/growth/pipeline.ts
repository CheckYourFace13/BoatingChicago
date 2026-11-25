/**
 * Friday growth pipeline orchestrator.
 *
 * Modes:
 *   check   — discover, gate, monitor (default in CI)
 *   propose — also write reviewable proposal artifact
 *   apply   — write gate-passing candidates into batch3 TS (opt-in)
 *
 * Never invents metrics. Never force-pushes main.
 *
 * Run: npx tsx scripts/growth/pipeline.ts [--mode=check|propose|apply] [--probe] [--limit-probes=N]
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { discover, loadResearchQueue } from "./discovery";
import {
  collectOfficialTargets,
  runMonitor,
  type MonitorTarget,
} from "./monitor";
import { inventoryCounts } from "./registry";
import {
  planPublish,
  writeProposalArtifact,
  applyCandidatesToBatch3,
  MAX_AUTO_PUBLISH,
} from "./publish";
import type { PipelineReport } from "./types";
import {
  getPublishedDestinations,
  getPublishedLakes,
  getPublishedLaunches,
  getPublishedMarinas,
} from "../../src/data/geo";

function parseArgs(argv: string[]) {
  const modeArg = argv.find((a) => a.startsWith("--mode="));
  const mode = (modeArg?.split("=")[1] ?? "check") as
    | "check"
    | "propose"
    | "apply"
    | "test";
  const probe = argv.includes("--probe");
  const limitArg = argv.find((a) => a.startsWith("--limit-probes="));
  const maxProbes = limitArg ? Number(limitArg.split("=")[1]) : 25;
  return { mode, probe, maxProbes };
}

function metricsBlock(): PipelineReport["metrics"] {
  const hasGsc = Boolean(process.env.GSC_SERVICE_ACCOUNT_JSON);
  const hasAdsense = Boolean(process.env.ADSENSE_API_TOKEN);
  const hasAffiliate = Boolean(process.env.AFFILIATE_REPORT_TOKEN);
  return {
    searchConsole: hasGsc ? "ok" : "unavailable",
    adsense: hasAdsense ? "ok" : "unavailable",
    affiliate: hasAffiliate ? "ok" : "unavailable",
    note: hasGsc || hasAdsense || hasAffiliate
      ? "At least one metrics secret is present; values still require the matching API client."
      : "GSC, AdSense, and affiliate metrics unavailable — no authorized API credentials in this environment. Do not invent numbers.",
  };
}

function updateQueueWithSeeds(
  newDiscoveries: { name: string; state?: string; status: string; notes?: string }[],
): void {
  if (!newDiscoveries.length) return;
  const path = "data/geo-research-queue.json";
  const doc = JSON.parse(readFileSync(path, "utf8")) as {
    updated: string;
    policy: string;
    items: unknown[];
  };
  const existing = new Set(
    (doc.items as { name: string }[]).map((i) => i.name.toLowerCase()),
  );
  for (const d of newDiscoveries) {
    if (existing.has(d.name.toLowerCase())) continue;
    (doc.items as object[]).push({
      name: d.name,
      state: d.state,
      status: d.status,
      notes: d.notes,
    });
  }
  doc.updated = new Date().toISOString().slice(0, 10);
  writeFileSync(path, JSON.stringify(doc, null, 2) + "\n", "utf8");
}

export async function runPipeline(
  argv: string[] = process.argv.slice(2),
): Promise<PipelineReport> {
  const { mode, probe, maxProbes } = parseArgs(argv);
  const inventoryBefore = inventoryCounts();
  const discovery = discover({ includeSeeds: true });

  // Persist new seed discoveries into the queue (deduped) for ongoing research.
  updateQueueWithSeeds(discovery.newDiscoveries);

  const plan = planPublish(discovery.candidates);

  let proposalPath: string | undefined;
  let published: string[] = [];
  let applied = false;

  const autoPublishEnabled =
    process.env.GROWTH_AUTO_PUBLISH === "true" || mode === "apply";

  if (mode === "propose" || mode === "check" || mode === "test") {
    mkdirSync("data/growth-proposals", { recursive: true });
    proposalPath = writeProposalArtifact(plan.ready, plan.rejected);
  }

  if (autoPublishEnabled && plan.ready.length > 0 && mode === "apply") {
    const written = applyCandidatesToBatch3(plan.ready);
    published = plan.ready.map((c) => c.slug);
    applied = written.length > 0;
  }

  // Monitor: prefer destinations + a capped sample of marina/launch sources.
  const destTargets = collectOfficialTargets({
    destinations: getPublishedDestinations(),
    lakes: [],
    marinas: [],
    launches: [],
  });
  const marinaLaunchSample: MonitorTarget[] = [
    ...getPublishedMarinas().slice(0, 8).map((m) => ({
      label: `marina:${m.slug}`,
      url: m.source.url,
      lastVerified: m.source.lastVerified,
      seasonalNote: m.seasonalAccessNote,
    })),
    ...getPublishedLaunches().slice(0, 8).map((l) => ({
      label: `launch:${l.slug}`,
      url: l.source.url,
      lastVerified: l.source.lastVerified,
      seasonalNote: l.seasonalAccessNote,
    })),
  ];
  // Cap destination probes: first + last few to spread geography without unbounded fetch.
  const destSample = [
    ...destTargets.slice(0, 10),
    ...destTargets.slice(-5),
  ];
  const monitor = await runMonitor([...destSample, ...marinaLaunchSample], new Date(), {
    probe,
    maxProbes,
  });

  const enrichments: string[] = [];
  for (const f of monitor) {
    if (f.kind === "broken-link") {
      enrichments.push(`FLAG broken: ${f.target} — ${f.detail}`);
    }
  }
  // Successful probes on stale items → recommend verification bump (not silent rewrite).
  for (const t of [...destSample, ...marinaLaunchSample]) {
    if (t.lastVerified) {
      const age =
        (Date.now() - Date.parse(`${t.lastVerified}T12:00:00Z`)) /
        (1000 * 60 * 60 * 24);
      if (age > 120) {
        enrichments.push(
          `Review verification date for ${t.label} (lastVerified ${t.lastVerified}).`,
        );
      }
    }
  }

  const metrics = metricsBlock();
  const queue = loadResearchQueue();

  const report: PipelineReport = {
    generatedAt: new Date().toISOString(),
    mode,
    inventoryBefore,
    inventoryAfter: inventoryCounts(),
    discovered: discovery.newDiscoveries.length + discovery.candidates.length,
    duplicatesRejected:
      discovery.duplicatesRejected.length + plan.duplicatesRejected,
    unsourcedRejected: plan.unsourcedRejected,
    qualityRejected: plan.qualityRejected,
    ready: plan.ready.map((c) => c.slug),
    published,
    proposed: plan.ready.map((c) => c.slug),
    enrichments: enrichments.slice(0, 40),
    monitor,
    metrics,
    publication: {
      autoPublishEnabled,
      applied,
      reviewablePath: proposalPath,
      note: applied
        ? `Applied ≤${MAX_AUTO_PUBLISH} gate-passing candidates to batch3. Run tests/build before deploy.`
        : autoPublishEnabled
          ? "AUTO_PUBLISH enabled but no ready candidates or mode≠apply."
          : "Publication not applied. Review data/growth-proposals and merge via normal PR/deploy. Set GROWTH_AUTO_PUBLISH=true with --mode=apply only after gates pass.",
    },
    ownerActions: [
      ...(metrics.searchConsole === "unavailable"
        ? ["Optional: add GSC API credentials to include Search Console in Friday reports."]
        : []),
      ...(metrics.adsense === "unavailable"
        ? ["Optional: add AdSense API credentials for revenue metrics (dashboard Auto ads stay untouched)."]
        : []),
      "Confirm GitHub Actions is enabled for this repo and the Weekly growth summary workflow can run schedules.",
      `Research queue items: ${queue.items.length}. Prioritize ready candidates and hub-only Tippecanoe access notes.`,
      "Broken-link monitor findings need human source replacement before republish.",
    ],
  };

  mkdirSync("data", { recursive: true });
  writeFileSync(
    "data/weekly-growth-summary-latest.json",
    JSON.stringify(report, null, 2),
    "utf8",
  );
  console.log(JSON.stringify(report, null, 2));
  return report;
}
