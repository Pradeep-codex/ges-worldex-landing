"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

type LoaderScreenProps = {
  onComplete: () => void;
};

export function LoaderScreen({ onComplete }: LoaderScreenProps) {
  useEffect(() => {
    // Crisp, fast 1.2 second loader so users aren't waiting long!
    const timer = window.setTimeout(() => {
      onComplete();
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 overflow-hidden loader-screen"
    >
      <img
        src="/logo.png"
        alt="GES Worldex logo"
        className="h-auto w-[180px] sm:w-[220px]"
      />

      <div>
        <div className="loader"></div>
      </div>
    </motion.div>
  );
}
