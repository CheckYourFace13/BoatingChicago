import { getCategoryBySlug } from "@/data/categories";
import { getGuideBySlug } from "@/data/guides";
import {
  brandedOgImage,
  ogContentType,
  ogSize,
} from "@/lib/og-image";

export const alt = "Boating Chicago page preview";
export const size = ogSize;
export const contentType = ogContentType;

function titleForSlug(slug: string): string {
  return (
    getGuideBySlug(slug)?.title ||
    getCategoryBySlug(slug)?.title ||
    "Chicago boating guide"
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = titleForSlug(slug);
  return brandedOgImage({
    title,
    alt: `${title} — Boating Chicago`,
  });
}
