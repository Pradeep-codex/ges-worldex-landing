"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

type LoaderScreenProps = {
  onComplete: () => void;
};

export function LoaderScreen({ onComplete }: LoaderScreenProps) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2200);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden loader-screen"
      aria-label="Loading"
    >
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/logo.png"
            alt="GES Worldex logo"
            width={220}
            height={90}
            priority
            className="h-auto w-[180px] sm:w-[220px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}
        >
          <div className="loader" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
