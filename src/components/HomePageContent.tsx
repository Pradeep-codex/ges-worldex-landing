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

function TermsConditionsSection() {
  return (
    <section className="relative z-20 w-full px-4 py-10 md:px-8 md:py-12 lg:px-12 lg:py-14">
      <div className="mb-12 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(159,123,40,0.42),transparent)]" />
      <div className="relative z-10 w-full rounded-[28px] bg-[linear-gradient(180deg,rgba(255,253,248,0.88)_0%,rgba(245,235,215,0.9)_100%)] p-5 shadow-[0_18px_40px_rgba(47,35,24,0.08)] md:p-8 lg:p-10 [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(7,16,24,0.88)_0%,rgba(22,31,37,0.9)_100%)] [html[data-theme='dark']_&]:shadow-[0_18px_40px_rgba(0,0,0,0.2)]">
        <div className="mx-auto max-w-[1540px]">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-4">
              <div className="text-[0.7rem] font-black uppercase tracking-[0.24em] text-[#9f7b28] [html[data-theme='dark']_&]:text-[#d8b766]">
                Terms & Conditions
              </div>
              <h2 className="welcome-display-font max-w-[10ch] text-[2.2rem] font-black leading-[0.96] tracking-[-0.05em] text-slate-950 md:text-[2.8rem] [html[data-theme='dark']_&]:text-slate-50">
                Terms & Conditions
              </h2>
              <p className="text-base leading-7 text-slate-600 [html[data-theme='dark']_&]:text-slate-300">
                Welcome to <span className="font-semibold text-slate-900 [html[data-theme='dark']_&]:text-slate-50">gesworldex.com</span>
              </p>
              <p className="text-base leading-7 text-slate-600 [html[data-theme='dark']_&]:text-slate-300">
                These Terms & Conditions govern your use of our website and services. By accessing or using our website,
                you agree to comply with and be bound by these terms.
              </p>
            </div>

            <div className="space-y-6 text-sm leading-7 text-slate-700 [html[data-theme='dark']_&]:text-slate-300">
              <div>
                <h3 className="mb-3 text-base font-black uppercase tracking-[0.14em] text-[#8f6411] [html[data-theme='dark']_&]:text-[#efbf56]">
                  Services Offered
                </h3>
                <ul className="space-y-2 list-disc pl-5 marker:text-[#9f7b28]">
                  <li>Booth bookings for exhibitors</li>
                  <li>Furniture rental services</li>
                  <li>Visitor registration and ticketing</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-base font-black uppercase tracking-[0.14em] text-[#8f6411] [html[data-theme='dark']_&]:text-[#efbf56]">
                  Booking and Payments
                </h3>
                <p>
                  All bookings for exhibitor booths, furniture, and visitor registration require payment through our designated
                  payment gateways.
                </p>
                <p className="mt-2">
                  Payments are to be made as per the specified amounts at the time of booking.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-base font-black uppercase tracking-[0.14em] text-[#8f6411] [html[data-theme='dark']_&]:text-[#efbf56]">
                  Exhibitor and Visitor Responsibilities
                </h3>
                <p>
                  Exhibitors must provide accurate information for their booth and adhere to the exhibition guidelines.
                </p>
                <p className="mt-2">
                  Visitors must register in advance and comply with event rules.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-base font-black uppercase tracking-[0.14em] text-[#8f6411] [html[data-theme='dark']_&]:text-[#efbf56]">
                  Changes to Terms
                </h3>
                <p>
                  We reserve the right to modify these Terms & Conditions at any time. Changes will be effective upon
                  posting on the website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
        <TermsConditionsSection />
        <UpcomingCitiesSection content={content?.heroSection} />
        <FeaturedVideoSection content={content?.featuredVideoSection} />
        <ImageGallerySection content={content?.gallerySection} />
      </div>
    </>
  );
}
