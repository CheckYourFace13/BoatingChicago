import { notFound } from "next/navigation";
import { CategoryLanding } from "@/components/CategoryLanding";
import { getAllCategorySlugs, getCategoryBySlug } from "@/data/categories";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return buildMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/${slug}`,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return <CategoryLanding category={category} />;
}

// Prevent this dynamic route from catching unknown slugs at build time
export const dynamicParams = false;
