/**
 * GravyBlock connector (managed publishing feed).
 *
 * GravyBlock publishes approved content and page-level SEO improvements for this site
 * as a signed JSON feed. This file only READS that feed and verifies its Ed25519
 * signature against the public key below; an unsigned, altered or unreachable feed is
 * ignored and the site renders exactly as it would without the connector.
 *
 * Nothing here can write to the site, execute code, or change routing.
 */
import { createPublicKey, verify } from "node:crypto";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const GRAVYBLOCK_BUSINESS_ID = "9cb1c401-34d8-4f52-8dc9-b6a1e3aedecf";
const FEED_URL = `https://gravyblock.com/api/managed-site/${GRAVYBLOCK_BUSINESS_ID}/feed`;
const PUBLIC_KEY_B64 = "LCDWzuoPOCXYqSf8s4SOwjeZ4wjJbEnZw37HDA+c320=";
const SPKI_PREFIX = Buffer.from("302a300506032b6570032100", "hex");

export type ManagedItem = { slug: string; title: string; description: string | null; bodyHtml: string; coverImageUrl: string | null; publishedAt: string };
export type ManagedOverride = { path: string; title: string | null; description: string | null; ogImage: string | null; jsonLd: Record<string, unknown> | null };
export type ManagedFeed = { version: number; businessId: string; generatedAt: string; items: ManagedItem[]; overrides: ManagedOverride[] };

export async function getManagedFeed(): Promise<ManagedFeed | null> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 60 }, signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const sig = res.headers.get("x-gravyblock-signature");
    const body = await res.text();
    if (!sig) return null;
    const key = createPublicKey({ key: Buffer.concat([SPKI_PREFIX, Buffer.from(PUBLIC_KEY_B64, "base64")]), format: "der", type: "spki" });
    if (!verify(null, Buffer.from(body, "utf8"), key, Buffer.from(sig, "base64"))) return null;
    const feed = JSON.parse(body) as ManagedFeed;
    return feed.businessId === GRAVYBLOCK_BUSINESS_ID ? feed : null;
  } catch {
    return null;
  }
}

function safeUrl(u: string | null): string | null {
  if (!u) return null;
  try {
    const parsed = new URL(u);
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

/** buildMetadata + any signed GravyBlock override for this path (title, description, social image). */
export async function buildManagedMetadata(args: Parameters<typeof buildMetadata>[0]): Promise<Metadata> {
  const base = buildMetadata(args);
  const feed = await getManagedFeed();
  const path = args.path && args.path.length > 0 ? args.path : "/";
  const ov = feed?.overrides.find((o) => o.path === path);
  if (!ov) return base;
  const out: Metadata = { ...base };
  if (ov.title) {
    out.title = ov.title;
    out.openGraph = { ...(out.openGraph ?? {}), title: ov.title };
    out.twitter = { ...(out.twitter ?? {}), title: ov.title };
  }
  if (ov.description) {
    out.description = ov.description;
    out.openGraph = { ...(out.openGraph ?? {}), description: ov.description };
    out.twitter = { ...(out.twitter ?? {}), description: ov.description };
  }
  const img = safeUrl(ov.ogImage);
  if (img) {
    out.openGraph = { ...(out.openGraph ?? {}), images: [{ url: img }] };
    out.twitter = { ...(out.twitter ?? {}), images: [img] };
  }
  return out;
}
