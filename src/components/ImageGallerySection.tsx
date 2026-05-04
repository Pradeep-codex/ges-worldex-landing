"use client";

import { motion } from "framer-motion";
import DomeGallery from "@/components/DomeGallery";

export function ImageGallerySection() {
  return (
    <section className="relative mx-auto w-full max-w-[1700px] px-4 pb-24 pt-6 md:px-8 md:pb-28 md:pt-8 lg:px-12 lg:pb-32 lg:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mb-6 text-center md:mb-8"
      >
        <h2 className="mx-auto max-w-[12ch] text-[2rem] font-black uppercase tracking-[-0.06em] text-[#0d3142] sm:max-w-none sm:text-[2.6rem] md:text-[3.3rem] lg:text-[4.2rem] [html[data-theme='dark']_&]:text-white">
          GES Worldex All Over The World
        </h2>
      </motion.div>

      <div className="h-[520px] overflow-visible md:h-[700px] lg:h-[860px]">
        <DomeGallery
          fit={1.02}
          minRadius={760}
          maxVerticalRotationDeg={5}
          segments={34}
          dragDampening={4}
          grayscale={false}
        />
      </div>
    </section>
  );
}
