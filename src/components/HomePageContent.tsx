"use client";

import { useEffect, useMemo, useState } from "react";
import { HeroSectionDemo } from "@/components/HeroSectionDemo";
import { AboutSection } from "@/components/AboutSection";
import { StatsSection } from "@/components/StatsSection";
import { ExhibitionCategoriesSection } from "@/components/ExhibitionCategoriesSection";
import { WhySwitchSection } from "@/components/WhySwitchSection";
import { UpcomingCitiesSection } from "@/components/UpcomingCitiesSection";
import { FeaturedVideoSection } from "@/components/FeaturedVideoSection";
import { ImageGallerySection } from "@/components/ImageGallerySection";
import { defaultSeo, siteUrl } from "@/lib/seo";

type HomePageContentProps = {
  content?: any;
};

export function HomePageContent({ content }: HomePageContentProps) {
  const [isPortraitTabletHeroTight, setIsPortraitTabletHeroTight] = useState(false);

  const orgSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "GES Worldex",
      url: `${siteUrl}/home`,
      description: defaultSeo.description,
    }),
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateHeroViewport = () => {
      const isStrictPortraitTablet =
        window.matchMedia("(orientation: portrait) and (width: 834px) and (height: 1194px)")
          .matches ||
        (Math.abs(window.innerWidth - 834) <= 2 &&
          Math.abs(window.innerHeight - 1194) <= 2 &&
          window.innerHeight > window.innerWidth);

      setIsPortraitTabletHeroTight(isStrictPortraitTablet);
    };

    updateHeroViewport();
    window.addEventListener("resize", updateHeroViewport);

    return () => window.removeEventListener("resize", updateHeroViewport);
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <div
        id="home"
        className="relative min-h-screen overflow-x-hidden lg:-mt-24 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:-mt-32"
        aria-label="GES Worldex home"
        style={isPortraitTabletHeroTight ? { marginTop: "-24rem" } : undefined}
      >
        <HeroSectionDemo
          content={content?.heroSection}
          shellMode="home"
          tightPortraitTabletTop={isPortraitTabletHeroTight}
        />
        <AboutSection content={content?.aboutSection} />
        <StatsSection content={content?.statsSection} />
        <ExhibitionCategoriesSection content={content?.exhibitionCategoriesSection} />
        <WhySwitchSection content={content?.whySection} />
        <UpcomingCitiesSection content={content?.upcomingCitiesSection} />
        <FeaturedVideoSection content={content?.featuredVideoSection} />
        <ImageGallerySection content={content?.gallerySection} />
      </div>
    </>
  );
}
