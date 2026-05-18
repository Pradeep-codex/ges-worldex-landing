import { client } from "./client";
import {
  aboutPageQuery,
  contactPageQuery,
  genericPageQuery,
  portfolioItemsQuery,
} from "./queries";
import { isSanityConfigured } from "../env";
import type { PortfolioExhibition } from "@/lib/portfolio";

export type GenericPageContent = {
  title?: string;
  eyebrow?: string;
  description?: string;
  heroImage?: string;
  heroImageAlt?: string;
  cards?: {
    title?: string;
    eyebrow?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    link?: {
      label?: string;
      href?: string;
    };
  }[];
};

export type ContactPageCmsContent = {
  eyebrow?: string;
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  officeAddress?: string;
  officeMapsUrl?: string;
  formTitle?: string;
  formDescription?: string;
};

export type AboutPageCmsContent = {
  hero?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    cta?: {
      label?: string;
      href?: string;
    };
    lightImage?: string;
    lightImageAlt?: string;
    darkImage?: string;
    darkImageAlt?: string;
  };
  story?: {
    eyebrow?: string;
    title?: string;
    paragraphs?: string[];
  };
};

export type SanityPortfolioItem = Omit<PortfolioExhibition, "theme" | "editions"> & {
  editions?: {
    name?: string;
    date?: string;
    city?: string;
    stats?: {
      value?: number;
      suffix?: string;
      label?: string;
    }[];
  }[];
};

async function fetchSanity<T>(query: string, params = {}): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await client.fetch<T | null>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.warn("Sanity page fetch failed", error);
    return null;
  }
}

export function getGenericPageContent(slug: string) {
  return fetchSanity<GenericPageContent>(genericPageQuery, { slug });
}

export function getContactPageContent() {
  return fetchSanity<ContactPageCmsContent>(contactPageQuery);
}

export function getAboutPageContent() {
  return fetchSanity<AboutPageCmsContent>(aboutPageQuery);
}

export function getPortfolioItems() {
  return fetchSanity<SanityPortfolioItem[]>(portfolioItemsQuery);
}
