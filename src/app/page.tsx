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

export default function Home() {
  const [isPortraitTabletHeroTight, setIsPortraitTabletHeroTight] = useState(false);

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
        className="relative min-h-screen overflow-x-hidden -mt-20 lg:-mt-24 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:-mt-32"
        aria-label="GES Worldex home"
        style={isPortraitTabletHeroTight ? { marginTop: "-24rem" } : undefined}
      >
        <HeroSectionDemo shellMode="home" tightPortraitTabletTop={isPortraitTabletHeroTight} />
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
