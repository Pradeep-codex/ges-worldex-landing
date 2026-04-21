"use client";

import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { LoaderScreen } from "@/components/loader-screen";
import { BannerSlider } from "@/components/BannerSlider";
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

      <main className="min-h-screen relative overflow-hidden" aria-label="GES Worldex home">
        {!isLoading && (
          <>
            <BannerSlider />
            
            {/* Simple Test Sections */}
            <div className="h-[100vh] flex items-center justify-center bg-white border-b border-slate-100">
               <p className="text-slate-300 font-bold uppercase tracking-widest">Scroll Down to Verify Header Hide</p>
            </div>
            
            <div className="h-[100vh] flex items-center justify-center bg-slate-50 border-b border-slate-100">
               <p className="text-slate-300 font-bold uppercase tracking-widest">Scroll Up lightly to Verify Header Show</p>
            </div>

            <div className="h-[100vh] flex items-center justify-center bg-white">
               <p className="text-slate-300 font-bold uppercase tracking-widest">End of Page</p>
            </div>
          </>
        )}
      </main>
    </>
  );
}
