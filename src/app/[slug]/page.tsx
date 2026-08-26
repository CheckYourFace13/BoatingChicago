import { notFound } from "next/navigation";
import { CategoryLanding } from "@/components/CategoryLanding";
import { GuideLanding } from "@/components/GuideLanding";
import { getAllCategorySlugs, getCategoryBySlug } from "@/data/categories";
import { getAllGuideSlugs, getGuideBySlug } from "@/data/guides";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categorySlugs = getAllCategorySlugs().map((slug) => ({ slug }));
  const guideSlugs = getAllGuideSlugs().map((slug) => ({ slug }));
  return [...categorySlugs, ...guideSlugs];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);
  if (category) {
    return buildMetadata({
      title: category.seoTitle,
      description: category.seoDescription,
      path: `/${slug}`,
    });
  }

  const guide = getGuideBySlug(slug);
  if (guide) {
    return buildMetadata({
      title: guide.seoTitle,
      description: guide.seoDescription,
      path: `/${slug}`,
    });
  }

  return {};
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);
  if (category) {
    return <CategoryLanding category={category} />;
  }

  const guide = getGuideBySlug(slug);
  if (guide) {
    return <GuideLanding guide={guide} />;
  }

  notFound();
}

// Prevent this dynamic route from catching unknown slugs at build time
export const dynamicParams = false;
