import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllCategorySlugs } from "@/data/categories";
import { getPublishedVendors } from "@/data/vendors";
import { getChicagoNews } from "@/lib/news";
import { getChicagoWeather } from "@/lib/weather";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    {
      url: `${baseUrl}/weather`,
      changeFrequency: "hourly",
      priority: 0.85,
      lastModified: now,
    },
    {
      url: `${baseUrl}/news`,
      changeFrequency: "hourly",
      priority: 0.8,
      lastModified: now,
    },
    { url: `${baseUrl}/vendors`, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${baseUrl}/list-your-business`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${baseUrl}/affiliate-disclosure`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.4 },
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

  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const weather = await getChicagoWeather();
    const feed = await getChicagoNews({ alerts: weather.alerts });
    newsPages = feed.items
      .filter((i) => i.isPublished && i.qualifiesForArticlePage)
      .slice(0, 40)
      .map((i) => ({
        url: `${baseUrl}/news/${i.slug}`,
        changeFrequency: "daily" as const,
        priority: 0.55,
        lastModified: i.sourcePublishedAt
          ? new Date(i.sourcePublishedAt)
          : now,
      }));
  } catch {
    newsPages = [];
  }

  return [...staticPages, ...categoryPages, ...vendorPages, ...newsPages];
}
