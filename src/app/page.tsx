"use client";

import { useMemo } from "react";
import { BannerSlider } from "@/components/BannerSlider";
import { WelcomeLine } from "@/components/WelcomeLine";
import { AboutSection } from "@/components/AboutSection";
import { StatsSection } from "@/components/StatsSection";
import { ExhibitionCategoriesSection } from "@/components/ExhibitionCategoriesSection";
import { WhySwitchSection } from "@/components/WhySwitchSection";
import { UpcomingCitiesSection } from "@/components/UpcomingCitiesSection";
import { FeaturedVideoSection } from "@/components/FeaturedVideoSection";
import { ImageGallerySection } from "@/components/ImageGallerySection";
import { MasonryGallerySection } from "@/components/MasonryGallerySection";
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

      <main id="home" className="min-h-screen relative overflow-x-hidden" aria-label="GES Worldex home">
        <div className="w-full max-w-[1700px] mx-auto px-4 md:px-8 lg:px-12 mt-2 md:mt-4 lg:mt-6">
          <div className="max-w-[1200px]">
            <WelcomeLine />
          </div>
        </div>

        <div className="mt-2 md:mt-4">
          <BannerSlider />
        </div>

        <AboutSection />
        <StatsSection />
        <ExhibitionCategoriesSection />
        <WhySwitchSection />
        <UpcomingCitiesSection />
        <FeaturedVideoSection />
        <ImageGallerySection />
        <MasonryGallerySection />
      </main>
    </>
  );
}
