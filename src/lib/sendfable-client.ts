/**
 * SendFable first-party API client for Chicago Boating Brief.
 * Secrets stay in env vars — never log emails or tokens.
 */

const BRIEF_TAG = "Chicago Boating Brief";

function baseUrl(): string | null {
  const raw = process.env.SENDFABLE_API_URL?.trim() || "https://sendfable.com";
  return raw.replace(/\/$/, "") || null;
}

function apiSecret(): string | null {
  return process.env.SENDFABLE_API_SECRET?.trim() || null;
}

export function isSendfableConfigured(): boolean {
  return Boolean(baseUrl() && apiSecret());
}

async function sfFetch<T>(
  path: string,
  init?: RequestInit
): Promise<{ ok: true; data: T } | { ok: false; status: number; error: string }> {
  const root = baseUrl();
  const secret = apiSecret();
  if (!root || !secret) {
    return { ok: false, status: 503, error: "SendFable not configured" };
  }

  try {
    const res = await fetch(`${root}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    });
    const json = (await res.json().catch(() => ({}))) as T & { error?: string };
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: json.error || `SendFable HTTP ${res.status}`,
      };
    }
    return { ok: true, data: json };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err instanceof Error ? err.message : "SendFable request failed",
    };
  }
}

export async function sendfableUpsertContact(input: {
  email: string;
  source?: string;
}): Promise<{ ok: true; contactId?: string; created: boolean } | { ok: false; error: string }> {
  const result = await sfFetch<{
    ok?: boolean;
    contactId?: string;
    created?: boolean;
    suppressed?: boolean;
  }>("/api/v1/contacts/upsert", {
    method: "POST",
    body: JSON.stringify({
      email: input.email,
      source: input.source || "boatingchicago",
      tagName: BRIEF_TAG,
    }),
  });
  if (!result.ok) return { ok: false, error: result.error };
  return {
    ok: true,
    contactId: result.data.contactId,
    created: Boolean(result.data.created),
  };
}

export async function sendfableCreateCampaign(input: {
  name: string;
  subject: string;
  previewText?: string;
  htmlBody: string;
  scheduledAt?: string | null;
  draftOnly?: boolean;
}): Promise<
  | { ok: true; campaignId: string; status: string; scheduledAt: string | null; badge: boolean }
  | { ok: false; error: string; status: number }
> {
  const result = await sfFetch<{
    campaignId: string;
    status: string;
    scheduledAt: string | null;
    badge: boolean;
  }>("/api/v1/campaigns", {
    method: "POST",
    body: JSON.stringify({
      name: input.name,
      subject: input.subject,
      previewText: input.previewText,
      htmlBody: input.htmlBody,
      tagName: BRIEF_TAG,
      scheduledAt: input.scheduledAt,
      draftOnly: input.draftOnly,
    }),
  });
  if (!result.ok) return { ok: false, error: result.error, status: result.status };
  return {
    ok: true,
    campaignId: result.data.campaignId,
    status: result.data.status,
    scheduledAt: result.data.scheduledAt,
    badge: result.data.badge,
  };
}

export async function sendfableTestCampaign(input: {
  campaignId: string;
  email: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const result = await sfFetch<{ ok?: boolean }>("/api/v1/campaigns/test", {
    method: "POST",
    body: JSON.stringify(input),
  });
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true };
}

export async function sendfableCancelCampaign(
  campaignId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const result = await sfFetch<{ ok?: boolean }>("/api/v1/campaigns/cancel", {
    method: "POST",
    body: JSON.stringify({ campaignId }),
  });
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true };
}

export async function sendfableStatus(): Promise<
  | {
      ok: true;
      data: {
        campaignSendEnabled?: boolean;
        mailingAddressSet?: boolean;
        badge?: boolean;
        plan?: string;
        audience?: { name: string; subscribed: number; totalTagged: number };
        lastSent?: {
          id: string;
          name: string;
          subject: string | null;
          sentAt: string | null;
          sentCount: number;
          openCount: number;
          clickCount: number;
        } | null;
        nextScheduled?: {
          id: string;
          name: string;
          subject: string | null;
          scheduledAt: string | null;
        } | null;
      };
    }
  | { ok: false; error: string }
> {
  const result = await sfFetch<{
    campaignSendEnabled?: boolean;
    mailingAddressSet?: boolean;
    badge?: boolean;
    plan?: string;
    audience?: { name: string; subscribed: number; totalTagged: number };
    lastSent?: {
      id: string;
      name: string;
      subject: string | null;
      sentAt: string | null;
      sentCount: number;
      openCount: number;
      clickCount: number;
    } | null;
    nextScheduled?: {
      id: string;
      name: string;
      subject: string | null;
      scheduledAt: string | null;
    } | null;
  }>("/api/v1/status");
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true, data: result.data };
}

export { BRIEF_TAG };
