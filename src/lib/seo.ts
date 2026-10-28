import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getCategoryBySlug } from "@/data/categories";
import { getGuideBySlug } from "@/data/guides";

/** Avoid `About Boating Chicago | Boating Chicago` when the child title already names the brand. */
export function resolveMetadataTitle(title: string): Metadata["title"] {
  return title.includes(siteConfig.name) ? { absolute: title } : title;
}

/** File-based OG routes plus a sitewide branded fallback. */
export function socialImagePath(path: string): string {
  const normalized = !path || path === "/" ? "/" : path;
  if (normalized.startsWith("/storage")) return "/storage/opengraph-image";
  if (normalized.startsWith("/events")) return "/events/opengraph-image";
  if (normalized.startsWith("/weather")) return "/weather/opengraph-image";
  if (normalized.startsWith("/marinas")) return "/marinas/opengraph-image";
  if (normalized.startsWith("/destinations")) return "/destinations/opengraph-image";
  if (normalized.startsWith("/guides")) return "/guides/opengraph-image";
  const parts = normalized.split("/").filter(Boolean);
  if (parts.length === 1) {
    const slug = parts[0];
    if (getGuideBySlug(slug) || getCategoryBySlug(slug)) {
      return `/${slug}/opengraph-image`;
    }
  }
  return "/opengraph-image";
}

export function buildMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const image = {
    url: socialImagePath(path),
    width: 1200,
    height: 630,
    alt: `${title} — ${siteConfig.name}`,
  };

  return {
    title: resolveMetadataTitle(title),
    description,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
