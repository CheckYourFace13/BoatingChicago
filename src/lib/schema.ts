import { siteConfig } from "@/config/site";
import type { CategoryFAQ } from "@/types";

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

export function buildFAQSchema(faqs: CategoryFAQ[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** Vendor listing LocalBusiness only — not used for the publisher. */
export function buildLocalBusinessSchema({
  name,
  description,
  url,
  areaServed = "Chicago, IL",
  priceRange,
  image,
}: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
  priceRange?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    areaServed,
    ...(priceRange ? { priceRange } : {}),
    ...(image ? { image } : {}),
    parentOrganization: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/icon-512.png`,
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook].filter(
      Boolean
    ),
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Southern Lake Michigan & nearby inland lakes",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${siteConfig.url}${siteConfig.contactPath}`,
      areaServed: "US",
      availableLanguage: "English",
    },
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http")
        ? item.path
        : `${siteConfig.url}${item.path}`,
    })),
  };
}

export function buildArticleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const url = path.startsWith("http") ? path : `${siteConfig.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : { dateModified: datePublished }),
  };
}

/**
 * Place schema for verified marina/harbor/launch locations.
 * Only includes fields present in our verified records — never invents
 * ratings, hours, prices, coordinates, or phone numbers.
 */
export function buildMarinaPlaceSchema({
  name,
  description,
  path,
  officialWebsite,
  telephone,
  bodyOfWater,
  containedInName,
}: {
  name: string;
  description: string;
  path: string;
  officialWebsite?: string;
  telephone?: string;
  bodyOfWater?: string;
  containedInName?: string;
}) {
  const url = `${siteConfig.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Marina",
    "@id": `${url}#place`,
    name,
    description,
    url,
    ...(officialWebsite ? { sameAs: officialWebsite } : {}),
    ...(telephone ? { telephone } : {}),
    ...(bodyOfWater
      ? {
          additionalProperty: {
            "@type": "PropertyValue",
            name: "bodyOfWater",
            value: bodyOfWater,
          },
        }
      : {}),
    ...(containedInName
      ? {
          containedInPlace: {
            "@type": "Place",
            name: containedInName,
          },
        }
      : {}),
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function buildLaunchPlaceSchema({
  name,
  description,
  path,
  bodyOfWater,
  containedInName,
  officialSourceUrl,
}: {
  name: string;
  description: string;
  path: string;
  bodyOfWater?: string;
  containedInName?: string;
  officialSourceUrl?: string;
}) {
  const url = `${siteConfig.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${url}#place`,
    name,
    description,
    url,
    ...(officialSourceUrl ? { sameAs: officialSourceUrl } : {}),
    ...(bodyOfWater
      ? {
          additionalProperty: {
            "@type": "PropertyValue",
            name: "bodyOfWater",
            value: bodyOfWater,
          },
        }
      : {}),
    ...(containedInName
      ? {
          containedInPlace: {
            "@type": "Place",
            name: containedInName,
          },
        }
      : {}),
    isPartOf: { "@id": WEBSITE_ID },
  };
}
