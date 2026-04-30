"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { LoaderScreen } from "@/components/loader-screen";

export function AppLoaderGate() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      if (window.sessionStorage.getItem("ges-site-loader-seen") === "true") {
        setIsLoading(false);
        return;
      }
    } catch {
      // Ignore storage access issues and continue with loader.
    }

    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    // Fail-safe: never allow the loader to block the app indefinitely.
    const fallbackTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => window.clearTimeout(fallbackTimer);
  }, [isLoading]);

  const handleLoaderComplete = useCallback(() => {
    try {
      window.sessionStorage.setItem("ges-site-loader-seen", "true");
    } catch {
      // Ignore storage access issues and always continue to the app.
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? <LoaderScreen key="site-loader" onComplete={handleLoaderComplete} /> : null}
    </AnimatePresence>
  );
}
