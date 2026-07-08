import type { AffiliatePartner } from "@/config/affiliates";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  groupSize: string;
  budget: string;
  eventType: string;
  preferredArea: string;
  needCaptain: string;
  notes: string;
  source: string;
  createdAt: string;
}

export interface NewsletterSignup {
  id: string;
  email: string;
  source: string;
  createdAt: string;
}

export interface Vendor {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  location: string;
  description: string;
  longDescription: string;
  capacity?: string;
  pricingRange?: string;
  featured: boolean;
  sponsored: boolean;
  isPublished: boolean;
  phone?: string;
  website?: string;
  services: string[];
  areas: string[];
}

export interface CategoryFAQ {
  question: string;
  answer: string;
}

export interface CategoryPage {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string;
  bestFor: { title: string; description: string; icon: string }[];
  affiliates: AffiliatePartner[];
  relatedSlugs: string[];
  faqs: CategoryFAQ[];
  vendors: string[];
  seasonalPromos?: string[];
}

export interface SeasonalPromo {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  emoji: string;
  activeMonths: number[];
}
