import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getCategoryBySlug } from "@/data/categories";
import { getGuideBySlug } from "@/data/guides";

/** Avoid `About Boating Chicago | Boating Chicago` when the child title already names the brand. */
export function resolveMetadataTitle(title: string): Metadata["title"] {
  return title.includes(siteConfig.name) ? { absolute: title } : title;
}

/**
 * Truncate meta descriptions at a sentence or word boundary.
 * Avoids mid-word cuts from naive `.slice(0, 155)` call sites.
 */
export function truncateMetaDescription(
  text: string,
  maxLength = 155
): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return "";
  if (normalized.length <= maxLength) return normalized;

  const budget = Math.max(40, maxLength);
  const window = normalized.slice(0, budget + 1);

  const sentenceEnd = Math.max(
    window.lastIndexOf(". "),
    window.lastIndexOf("! "),
    window.lastIndexOf("? ")
  );
  if (sentenceEnd >= Math.floor(budget * 0.55)) {
    return normalized.slice(0, sentenceEnd + 1).trim();
  }

  const truncated = normalized.slice(0, budget);
  const lastSpace = truncated.lastIndexOf(" ");
  const atWord =
    lastSpace >= Math.floor(budget * 0.6)
      ? truncated.slice(0, lastSpace)
      : truncated;
  return atWord.replace(/[.,;:]+$/u, "").trim();
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
  const imagePath = socialImagePath(path);
  const imageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${siteConfig.url}${imagePath}`;
  const image = {
    url: imageUrl,
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
      images: [imageUrl],
    },
  };
}
