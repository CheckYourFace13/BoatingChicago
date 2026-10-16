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
import { shouldIndexCategorySlug } from "@/config/quality";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

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
      url: `${baseUrl}/storage`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/float-plan`,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/tools/trip-checklist`,
      changeFrequency: "monthly",
      priority: 0.65,
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
    },
    {
      url: `${baseUrl}/news`,
      changeFrequency: "hourly",
      priority: 0.8,
    },
    // Include /vendors only when real partner listings exist (avoids thin directory)
    ...(getPublishedVendors().length
      ? [
          {
            url: `${baseUrl}/vendors`,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : []),
    {
      url: `${baseUrl}/boat-ownership`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/advertise`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/subscribe`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/llms.txt`,
      changeFrequency: "monthly",
      priority: 0.3,
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

  const categoryPages = getAllCategorySlugs()
    .filter((slug) => shouldIndexCategorySlug(slug))
    .map((slug) => ({
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

  // Automated news items never qualify for standalone /news/[slug] pages
  // (see documentation/NEWS_INDEXING_POLICY.md), so do not fetch weather/news here.

  return [
    ...staticPages,
    ...categoryPages,
    ...guidePages,
    ...destinationPages,
    ...lakePages,
    ...marinaPages,
    ...launchPages,
    ...vendorPages,
  ];
}
