"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { LoaderScreen } from "@/components/loader-screen";

export function AppLoaderGate() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("ges-site-loader-seen") === "true") {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsLoading(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleLoaderComplete = useMemo(
    () => () => {
      window.sessionStorage.setItem("ges-site-loader-seen", "true");
      setIsLoading(false);
    },
    [],
  );

  return (
    <AnimatePresence mode="wait">
      {isLoading ? <LoaderScreen key="site-loader" onComplete={handleLoaderComplete} /> : null}
    </AnimatePresence>
  );
}
