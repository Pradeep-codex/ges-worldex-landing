"use client";

import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { LoaderScreen } from "@/components/loader-screen";
import { BannerSlider } from "@/components/BannerSlider";
import { WelcomeLine } from "@/components/WelcomeLine";
import { AboutSection } from "@/components/AboutSection";
import { StatsSection } from "@/components/StatsSection";
import { ExhibitionCategoriesSection } from "@/components/ExhibitionCategoriesSection";
import { WhySwitchSection } from "@/components/WhySwitchSection";
import { defaultSeo, siteUrl } from "@/lib/seo";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

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

  const handleLoaderComplete = useMemo(() => () => setIsLoading(false), []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <AnimatePresence mode="wait">
        {isLoading ? <LoaderScreen key="loader" onComplete={handleLoaderComplete} /> : null}
      </AnimatePresence>

      <main id="home" className="min-h-screen relative overflow-x-hidden" aria-label="GES Worldex home">
        {!isLoading && (
          <>
            <div className="w-full max-w-[1700px] mx-auto px-4 md:px-8 lg:px-12 mt-2 md:mt-4 lg:mt-6">
              <div className="max-w-[1200px]">
                <WelcomeLine />
              </div>
            </div>

            <div className="mt-2 md:mt-4">
              <BannerSlider />
            </div>

            <AboutSection />
            <div className="mt-8 md:mt-12 lg:mt-16">
              <StatsSection />
            </div>
            <ExhibitionCategoriesSection />
            <WhySwitchSection />
            {/* Simple Test Sections */}
            <div className="h-[100vh] flex items-center justify-center bg-transparent border-b border-[color:var(--border)]">
              <p className="text-foreground/65 font-bold uppercase tracking-widest">Scroll Down to Verify Header Hide</p>
            </div>
            
            <div className="h-[100vh] flex items-center justify-center bg-transparent border-b border-[color:var(--border)]">
              <p className="text-foreground/65 font-bold uppercase tracking-widest">Scroll Up lightly to Verify Header Show</p>
            </div>

            <div className="h-[100vh] flex items-center justify-center bg-transparent">
              <p className="text-foreground/65 font-bold uppercase tracking-widest">End of Page</p>
            </div>
          </>
        )}
      </main>
    </>
  );
}
