import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllCategorySlugs } from "@/data/categories";
import {
  getAllPublishedDestinationSlugs,
  getAllPublishedLakeSlugs,
  getAllPublishedLaunchSlugs,
  getAllPublishedMarinaSlugs,
} from "@/data/geo";
import { getAllGuideSlugs } from "@/data/guides";
import { getPublishedVendors } from "@/data/vendors";
import { getChicagoNews } from "@/lib/news";
import { getChicagoWeather } from "@/lib/weather";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    {
      url: `${baseUrl}/destinations`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lakes`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/marinas`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/boat-launches`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/guides`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/events`,
      changeFrequency: "daily",
      priority: 0.75,
    },
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

  const guidePages = getAllGuideSlugs().map((slug) => ({
    url: `${baseUrl}/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const destinationPages = getAllPublishedDestinationSlugs().map((slug) => ({
    url: `${baseUrl}/destinations/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const lakePages = getAllPublishedLakeSlugs().map((slug) => ({
    url: `${baseUrl}/lakes/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const marinaPages = getAllPublishedMarinaSlugs().map((slug) => ({
    url: `${baseUrl}/marinas/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const launchPages = getAllPublishedLaunchSlugs().map((slug) => ({
    url: `${baseUrl}/boat-launches/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
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

  return [
    ...staticPages,
    ...categoryPages,
    ...guidePages,
    ...destinationPages,
    ...lakePages,
    ...marinaPages,
    ...launchPages,
    ...vendorPages,
    ...newsPages,
  ];
}
