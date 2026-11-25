import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllCategorySlugs } from "@/data/categories";
import { getAllGeoHubSlugs } from "@/config/geo-hierarchy";
import {
  getAllPublishedDestinationSlugs,
  getAllPublishedLakeSlugs,
  getAllPublishedLaunchSlugs,
  getAllPublishedMarinaSlugs,
  getAllPublishedPreserveSlugs,
  getDestinationBySlug,
  getLakeBySlug,
  getLaunchBySlug,
  getMarinaBySlug,
  getPreserveAccessBySlug,
} from "@/data/geo";
import { getAllGuideSlugs, getGuideBySlug } from "@/data/guides";
import { getPublishedVendors } from "@/data/vendors";
import { shouldIndexCategorySlug } from "@/config/quality";

/** Only emit lastmod when we have a real content review/modification date. */
function lastModFromIso(iso: string | undefined): Date | undefined {
  if (!iso) return undefined;
  const d = new Date(`${iso}T12:00:00.000Z`);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function lastModFromSources(
  ...isos: (string | undefined)[]
): Date | undefined {
  const dates = isos
    .map((iso) => lastModFromIso(iso))
    .filter((d): d is Date => d !== undefined)
    .sort((a, b) => b.getTime() - a.getTime());
  return dates[0];
}

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
      url: `${baseUrl}/regions`,
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
      url: `${baseUrl}/forest-preserves`,
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
      url: `${baseUrl}/fuel-docks`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/transient-slips`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/river-paddling`,
      changeFrequency: "weekly",
      priority: 0.8,
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
    { url: `${baseUrl}/tools/fuel`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/tools/trip-time`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${baseUrl}/tools/ownership-cost`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/tools/slip-compare`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${baseUrl}/tools/anchor-scope`, changeFrequency: "monthly", priority: 0.55 },
    { url: `${baseUrl}/tools/conversions`, changeFrequency: "monthly", priority: 0.55 },
    { url: `${baseUrl}/tools/towing`, changeFrequency: "monthly", priority: 0.55 },
    { url: `${baseUrl}/tools/battery`, changeFrequency: "monthly", priority: 0.55 },
    { url: `${baseUrl}/kayak-canoe-sup`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/permits`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/calendar`, changeFrequency: "weekly", priority: 0.75 },
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
    // /llms.txt stays publicly reachable for AI crawlers but is omitted from
    // the sitemap — it is a machine-readable index, not a content landing page.
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

  const guidePages = getAllGuideSlugs().map((slug) => {
    const guide = getGuideBySlug(slug);
    const lastModified = lastModFromIso(guide?.lastReviewed);
    return {
      url: `${baseUrl}/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      ...(lastModified ? { lastModified } : {}),
    };
  });

  const regionPages = getAllGeoHubSlugs().map((slug) => ({
    url: `${baseUrl}/regions/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  const destinationPages = getAllPublishedDestinationSlugs().map((slug) => {
    const destination = getDestinationBySlug(slug);
    const lastModified = lastModFromSources(
      ...((destination?.officialLinks ?? []).map((l) => l.lastVerified) ?? []),
    );
    return {
      url: `${baseUrl}/destinations/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      ...(lastModified ? { lastModified } : {}),
    };
  });

  const lakePages = getAllPublishedLakeSlugs().map((slug) => {
    const lake = getLakeBySlug(slug);
    const lastModified = lastModFromSources(
      ...((lake?.officialLinks ?? []).map((l) => l.lastVerified) ?? []),
    );
    return {
      url: `${baseUrl}/lakes/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(lastModified ? { lastModified } : {}),
    };
  });

  const marinaPages = getAllPublishedMarinaSlugs().map((slug) => {
    const marina = getMarinaBySlug(slug);
    const lastModified = lastModFromIso(marina?.source.lastVerified);
    return {
      url: `${baseUrl}/marinas/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      ...(lastModified ? { lastModified } : {}),
    };
  });

  const launchPages = getAllPublishedLaunchSlugs().map((slug) => {
    const launch = getLaunchBySlug(slug);
    const lastModified = lastModFromIso(launch?.source.lastVerified);
    return {
      url: `${baseUrl}/boat-launches/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      ...(lastModified ? { lastModified } : {}),
    };
  });

  const preservePages = getAllPublishedPreserveSlugs().map((slug) => {
    const preserve = getPreserveAccessBySlug(slug);
    const lastModified = lastModFromIso(preserve?.source.lastVerified);
    return {
      url: `${baseUrl}/forest-preserves/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      ...(lastModified ? { lastModified } : {}),
    };
  });

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
    ...regionPages,
    ...destinationPages,
    ...lakePages,
    ...marinaPages,
    ...launchPages,
    ...preservePages,
    ...vendorPages,
  ];
}
