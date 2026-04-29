"use client";

import { motion } from "framer-motion";

const stats = ["400+ Exhibitions", "Pan India Presence", "20+ Years Experience"];

export function OurStorySection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8f6f2_0%,#f3eee5_100%)] px-4 py-24 md:px-8 md:py-28 lg:px-12 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:radial-gradient(#17130d_0.8px,transparent_0.8px)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.46),rgba(255,255,255,0))]" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[780px]"
      >
        <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-center text-xs font-black uppercase tracking-[0.28em] text-transparent md:text-sm">
          Our Story
        </p>

        <h2 className="mx-auto mt-5 max-w-[720px] text-center text-4xl font-black leading-[1.02] tracking-tight text-[#17130d] md:text-5xl lg:text-[58px]">
          Built on vision, shaped by experience.
        </h2>

        <div className="mt-10 space-y-8 text-[17px] leading-[1.78] text-[#62594d] md:text-lg">
          <p className="font-semibold text-[#2a241b]">
            More than two decades ago, a group of passionate and forward-thinking professionals united with a shared vision to redefine how exhibitions are conceptualized and executed across India. This vision laid the foundation for GES Worldex India Pvt. Ltd., which today stands as one of the nation’s most trusted names in theme-based exhibition planning and management.
          </p>

          <div className="grid gap-4 border-y border-[#17130d]/10 py-7 text-center sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat} className="space-y-1">
                <p className="text-2xl font-black leading-tight text-[#17130d] md:text-[28px]">
                  {stat.split(" ")[0]}
                </p>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b7b63]">
                  {stat.replace(`${stat.split(" ")[0]} `, "") || stat}
                </p>
              </div>
            ))}
          </div>

          <p>
            With over 400+ successful exhibitions delivered across Pan India, we have consistently transformed traditional trade shows into dynamic, interactive, and business-focused experiences. Our exhibitions not only showcase innovation but also create impactful platforms that connect businesses, customers, and emerging industry trends.
          </p>

          <p className="border-l-4 border-[#c7a24a] pl-6 font-medium text-[#3b3327]">
            The journey of GES Worldex India Pvt. Ltd. is one of evolution, perseverance, and an unwavering commitment to excellence, a testament to our belief that every event is an opportunity to inspire, connect, and grow.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
