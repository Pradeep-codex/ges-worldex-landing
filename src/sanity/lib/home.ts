import { client } from "./client";
import { homePageQuery } from "./queries";
import { isSanityConfigured } from "../env";

export type SanityStat = {
  value?: number;
  suffix?: string;
  label?: string;
};

export type HomeStatsSection = {
  eyebrow?: string;
  headline?: string[];
  description?: string;
  stats?: SanityStat[];
};

export type HomeHeroSlide = {
  title?: string;
  subtitle?: string;
  description?: string;
  edition?: string;
  date?: string;
  venue?: string;
  image?: string;
  imageAlt?: string;
};

export type HomeHeroSection = {
  slides?: HomeHeroSlide[];
};

export type HomeAboutSection = {
  eyebrow?: string;
  titlePrefix?: string;
  titleSuffix?: string;
  rotatingPhrases?: string[];
  description?: string;
  bullets?: string[];
  cta?: {
    label?: string;
    href?: string;
  };
  images?: {
    src?: string;
    alt?: string;
  }[];
};

export type ExhibitionCategoriesSectionContent = {
  eyebrow?: string;
  title?: string;
  description?: string;
  categories?: {
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

export type WhySectionContent = {
  tabs?: {
    key?: "exhibit" | "visit";
    eyebrow?: string;
    title?: string;
    body?: string;
    highlights?: SanityStat[];
    points?: {
      title?: string;
      eyebrow?: string;
      description?: string;
    }[];
  }[];
};

export type UpcomingCitiesSectionContent = {
  title?: string;
  description?: string;
  cities?: {
    city?: string;
    date?: string;
    venue?: string;
    copy?: string;
  }[];
};

export type FeaturedVideoSectionContent = {
  title?: string;
  description?: string;
  youtubeUrl?: string;
  embedUrl?: string;
};

export type GallerySectionContent = {
  title?: string;
};

export type HomePageContent = {
  heroSection?: HomeHeroSection;
  aboutSection?: HomeAboutSection;
  statsSection?: HomeStatsSection;
  exhibitionCategoriesSection?: ExhibitionCategoriesSectionContent;
  whySection?: WhySectionContent;
  upcomingCitiesSection?: UpcomingCitiesSectionContent;
  featuredVideoSection?: FeaturedVideoSectionContent;
  gallerySection?: GallerySectionContent;
};

export async function getHomePageContent(): Promise<HomePageContent | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await client.fetch<HomePageContent | null>(
      homePageQuery,
      {},
      { next: { revalidate: 60 } },
    );
  } catch (error) {
    console.warn("Sanity home page fetch failed", error);
    return null;
  }
}
