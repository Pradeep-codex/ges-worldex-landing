"use client";

import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { LoaderScreen } from "@/components/loader-screen";
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <AnimatePresence mode="wait">
        {isLoading ? <LoaderScreen key="loader" onComplete={() => setIsLoading(false)} /> : null}
      </AnimatePresence>

      <main className="min-h-screen bg-[#050506]" aria-label="GES Worldex home" />
    </>
  );
}
