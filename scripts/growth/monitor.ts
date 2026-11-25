/**
 * Stale verification, broken official links, seasonal notes, source failures.
 * Bounded probes — no paid APIs; skip after MAX_PROBES.
 */
import type { MonitorFinding } from "./types";

const MAX_PROBES = 40;
const STALE_DAYS = 180;
const UA = "BoatingChicagoGrowthMonitor/1.0 (+https://boatingchicago.com)";

export interface MonitorTarget {
  label: string;
  url: string;
  lastVerified?: string;
  seasonalNote?: string;
}

function daysSince(iso: string, now: Date): number | null {
  const t = Date.parse(`${iso}T12:00:00Z`);
  if (!Number.isFinite(t)) return null;
  return (now.getTime() - t) / (1000 * 60 * 60 * 24);
}

export async function probeUrl(
  url: string,
): Promise<{ ok: boolean; status: number | "error"; detail: string }> {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": UA },
    });
    if (res.ok) return { ok: true, status: res.status, detail: "ok" };
    return {
      ok: false,
      status: res.status,
      detail: `HTTP ${res.status}`,
    };
  } catch (err) {
    return {
      ok: false,
      status: "error",
      detail: err instanceof Error ? err.message : "fetch failed",
    };
  }
}

export async function runMonitor(
  targets: MonitorTarget[],
  now: Date = new Date(),
  options: { probe?: boolean; maxProbes?: number } = {},
): Promise<MonitorFinding[]> {
  const findings: MonitorFinding[] = [];
  const maxProbes = options.maxProbes ?? MAX_PROBES;
  let probed = 0;

  for (const target of targets) {
    if (target.lastVerified) {
      const age = daysSince(target.lastVerified, now);
      if (age != null && age > STALE_DAYS) {
        findings.push({
          kind: "stale-verification",
          severity: "warn",
          target: target.label,
          detail: `lastVerified ${target.lastVerified} is ${Math.floor(age)} days old (>${STALE_DAYS}).`,
          url: target.url,
        });
      }
    }

    if (target.seasonalNote) {
      findings.push({
        kind: "seasonal-note",
        severity: "info",
        target: target.label,
        detail: `Has seasonal access note — confirm dates still match operator page: ${target.seasonalNote.slice(0, 120)}`,
        url: target.url,
      });
    }

    if (options.probe === false) continue;
    if (probed >= maxProbes) {
      findings.push({
        kind: "source-failure",
        severity: "info",
        target: "monitor-cap",
        detail: `Probe cap ${maxProbes} reached; remaining URLs skipped this run.`,
      });
      break;
    }
    probed += 1;
    const result = await probeUrl(target.url);
    if (!result.ok) {
      findings.push({
        kind: "broken-link",
        severity: "error",
        target: target.label,
        detail: result.detail,
        url: target.url,
      });
    }
  }

  return findings;
}

/** Collect official links from published geo entities for monitoring. */
export function collectOfficialTargets(input: {
  destinations: {
    slug: string;
    officialLinks: { name: string; url: string; lastVerified?: string }[];
  }[];
  lakes: {
    slug: string;
    officialLinks: { name: string; url: string; lastVerified?: string }[];
  }[];
  marinas: {
    slug: string;
    source: { name: string; url: string; lastVerified?: string };
    seasonalAccessNote?: string;
  }[];
  launches: {
    slug: string;
    source: { name: string; url: string; lastVerified?: string };
    seasonalAccessNote?: string;
  }[];
}): MonitorTarget[] {
  const out: MonitorTarget[] = [];
  for (const d of input.destinations) {
    for (const link of d.officialLinks) {
      out.push({
        label: `destination:${d.slug}:${link.name}`,
        url: link.url,
        lastVerified: link.lastVerified,
      });
    }
  }
  for (const l of input.lakes) {
    for (const link of l.officialLinks) {
      out.push({
        label: `lake:${l.slug}:${link.name}`,
        url: link.url,
        lastVerified: link.lastVerified,
      });
    }
  }
  for (const m of input.marinas) {
    out.push({
      label: `marina:${m.slug}`,
      url: m.source.url,
      lastVerified: m.source.lastVerified,
      seasonalNote: m.seasonalAccessNote,
    });
  }
  for (const l of input.launches) {
    out.push({
      label: `launch:${l.slug}`,
      url: l.source.url,
      lastVerified: l.source.lastVerified,
      seasonalNote: l.seasonalAccessNote,
    });
  }
  return out;
}
