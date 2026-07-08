import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllCategorySlugs } from "@/data/categories";
import { getPublishedVendors } from "@/data/vendors";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/vendors`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/list-your-business`, changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const categoryPages = getAllCategorySlugs().map((slug) => ({
    url: `${baseUrl}/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const vendorPages = getPublishedVendors().map((v) => ({
    url: `${baseUrl}/vendors/${v.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...vendorPages];
}
