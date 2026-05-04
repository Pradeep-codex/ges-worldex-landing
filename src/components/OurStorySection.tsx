"use client";

import { motion } from "framer-motion";

export function OurStorySection() {
  return (
    <section className="relative overflow-hidden px-3 sm:px-4 pt-12 sm:pt-20 md:pt-24 lg:pt-28 pb-2 sm:pb-4 md:pb-6 lg:pb-8" style={{ backgroundColor: 'var(--about-bg-light)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#17130d_0.8px,transparent_0.8px)] [background-size:18px_18px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.24 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto grid w-full max-w-[1320px] gap-6 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14"
      >
        <div className="space-y-4">
          <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-xs font-black uppercase tracking-[0.28em] text-transparent md:text-sm">
            Our Story
          </p>
          <h2 className="max-w-[13ch] text-2xl font-black leading-[0.98] tracking-[-0.05em] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[56px]" style={{ color: 'var(--about-text-primary)' }}>
            Built on vision, shaped by experience.
          </h2>
        </div>

        <div className="space-y-6 text-[16px] leading-[1.9] tracking-[0.02em] md:text-[17px]" style={{ color: 'var(--about-text-secondary)' }}>
          <p className="font-semibold" style={{ color: 'var(--about-text-primary)' }}>
            More than two decades ago, a group of passionate professionals came together with one vision: to rethink how exhibitions are created across India.
          </p>
          <p>
            That vision became GES Worldex, a company built to turn trade events into sharper, more immersive, and more commercially meaningful experiences.
          </p>
          <p>
            With 400+ exhibitions delivered across Pan India, our journey has always been about creating spaces where brands, buyers, and industries connect with purpose.
          </p>
          <p className="font-medium">
            Every event we design carries that same belief forward: exhibitions should not just be seen, they should move people and markets.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
