"use client";

import { useMemo } from "react";
import { HeroSectionDemo } from "@/components/HeroSectionDemo";
import { AboutSection } from "@/components/AboutSection";
import { StatsSection } from "@/components/StatsSection";
import { ExhibitionCategoriesSection } from "@/components/ExhibitionCategoriesSection";
import { WhySwitchSection } from "@/components/WhySwitchSection";
import { UpcomingCitiesSection } from "@/components/UpcomingCitiesSection";
import { FeaturedVideoSection } from "@/components/FeaturedVideoSection";
import { ImageGallerySection } from "@/components/ImageGallerySection";
import { defaultSeo, siteUrl } from "@/lib/seo";

export default function Home() {
  const orgSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "GES Worldex",
      url: siteUrl,
      description: defaultSeo.description,
    }),
    [],
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <div
        id="home"
        className="relative min-h-screen overflow-x-hidden -mt-20 lg:-mt-24"
        aria-label="GES Worldex home"
      >
        <HeroSectionDemo shellMode="home" />
        <AboutSection />
        <StatsSection />
        <ExhibitionCategoriesSection />
        <WhySwitchSection />
        <UpcomingCitiesSection />
        <FeaturedVideoSection />
        <ImageGallerySection />
      </div>
    </>
  );
}
