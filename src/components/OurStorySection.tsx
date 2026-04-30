"use client";

import { motion } from "framer-motion";

export function OurStorySection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8f6f2_0%,#f3eee5_100%)] px-4 py-20 md:px-8 md:py-24 lg:px-12 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#17130d_0.8px,transparent_0.8px)] [background-size:18px_18px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.24 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto grid w-full max-w-[1320px] gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14"
      >
        <div className="space-y-4">
          <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-xs font-black uppercase tracking-[0.28em] text-transparent md:text-sm">
            Our Story
          </p>
          <h2 className="max-w-[13ch] text-3xl font-black leading-[0.98] tracking-[-0.05em] text-[#17130d] md:text-5xl lg:text-[56px]">
            Built on vision, shaped by experience.
          </h2>
        </div>

        <div className="space-y-6 text-[16px] leading-[1.9] tracking-[0.02em] text-[#4d463c] md:text-[17px]">
          <p className="font-semibold text-[#2a241b]">
            More than two decades ago, a group of passionate professionals came together with one vision: to rethink how exhibitions are created across India.
          </p>
          <p>
            That vision became GES Worldex, a company built to turn trade events into sharper, more immersive, and more commercially meaningful experiences.
          </p>
          <p>
            With 400+ exhibitions delivered across Pan India, our journey has always been about creating spaces where brands, buyers, and industries connect with purpose.
          </p>
          <p className="font-medium text-[#3c3429]">
            Every event we design carries that same belief forward: exhibitions should not just be seen, they should move people and markets.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
