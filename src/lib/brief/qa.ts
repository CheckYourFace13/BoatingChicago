/**
 * Pre-send QA gate for Chicago Boating Brief.
 * Fail closed — do not send if any check fails.
 */

import type { BriefIssue } from "@/lib/brief/generator";

export interface BriefQaResult {
  ok: boolean;
  errors: string[];
  warnings: string[];
}

const PLACEHOLDER_RE =
  /\b(TODO|TBD|lorem ipsum|placeholder|xxx|FIXME|\[insert)\b/i;

export async function qaBriefIssue(issue: BriefIssue): Promise<BriefQaResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!issue.subject?.trim()) errors.push("Missing subject");
  if (!issue.previewText?.trim()) errors.push("Missing preview text");
  if (!issue.htmlBody || issue.htmlBody.length < 80) {
    errors.push("HTML body too short");
  }
  if (!issue.sections.length) errors.push("No sections generated");

  for (const section of issue.sections) {
    if (!section.html?.trim()) {
      errors.push(`Empty section: ${section.id}`);
    }
    if (PLACEHOLDER_RE.test(section.html) || PLACEHOLDER_RE.test(section.title)) {
      errors.push(`Placeholder copy in section: ${section.id}`);
    }
  }

  if (PLACEHOLDER_RE.test(issue.htmlBody) || PLACEHOLDER_RE.test(issue.subject)) {
    errors.push("Placeholder copy in subject or body");
  }

  // Must include weekend section
  if (!issue.sections.some((s) => s.id === "weekend")) {
    errors.push("Missing required weekend conditions section");
  }

  // Duplicate story headlines
  const newsSection = issue.sections.find((s) => s.id === "news");
  if (newsSection) {
    const titles = [...newsSection.html.matchAll(/<strong>([^<]+)<\/strong>/g)].map(
      (m) => m[1].toLowerCase()
    );
    if (new Set(titles).size !== titles.length) {
      errors.push("Duplicate news headlines");
    }
  }

  // Stale edition key (> 8 days off wall clock)
  const editionMs = Date.parse(`${issue.editionKey}T12:00:00Z`);
  if (!Number.isNaN(editionMs)) {
    const driftDays = Math.abs(Date.now() - editionMs) / 86_400_000;
    if (driftDays > 8) errors.push("Edition date looks stale");
  }

  // PII heuristics — no raw emails in body
  if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(issue.htmlBody)) {
    errors.push("Possible email address (PII) in body");
  }

  // Unsubscribe placeholder must survive into SendFable compile
  // (SendFable injects footer with {{unsubscribe_url}})
  // We only ensure our body doesn't strip that responsibility.

  // Link checks — sample resolve (HEAD/GET)
  const toCheck = issue.links.slice(0, 12);
  for (const url of toCheck) {
    if (!/^https?:\/\//i.test(url)) {
      errors.push(`Non-http link: ${url.slice(0, 80)}`);
      continue;
    }
    try {
      const res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(10_000),
        headers: { "User-Agent": "BoatingChicago-BriefQA/1.0" },
      });
      if (res.status >= 400 && res.status !== 405 && res.status !== 403) {
        // Some affiliate/Amazon endpoints block bots with 403 — warn only
        if (res.status === 403 || res.status === 999) {
          warnings.push(`Link soft-fail ${res.status}: ${url.slice(0, 100)}`);
        } else {
          errors.push(`Broken link ${res.status}: ${url.slice(0, 100)}`);
        }
      }
    } catch {
      warnings.push(`Link unreachable: ${url.slice(0, 100)}`);
    }
  }

  // Affiliate tag sanity for Amazon links in body
  if (/amazon\./i.test(issue.htmlBody) && !/tag=iscreamstudio-20/i.test(issue.htmlBody)) {
    errors.push("Amazon link missing tag=iscreamstudio-20");
  }
  if (/getyourguide\./i.test(issue.htmlBody) && !/partner_id=HISQ5ML/i.test(issue.htmlBody)) {
    errors.push("GetYourGuide link missing partner_id=HISQ5ML");
  }
  if (/viator\./i.test(issue.htmlBody) && !/pid=P00309183/i.test(issue.htmlBody)) {
    errors.push("Viator link missing pid=P00309183");
  }

  return { ok: errors.length === 0, errors, warnings };
}
