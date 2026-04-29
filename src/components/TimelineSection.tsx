"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineSteps = [
  {
    year: "2000s",
    title: "A vision takes shape",
    body: "A team of exhibition professionals came together to rethink how theme-led trade platforms could be planned, built, and experienced across India.",
  },
  {
    year: "400+ Shows",
    title: "Execution at scale",
    body: "GES Worldex India Pvt. Ltd. expanded its footprint with hundreds of successful exhibitions, balancing creative planning with disciplined delivery.",
  },
  {
    year: "Pan India",
    title: "Markets connected",
    body: "The company built exhibition environments that help brands, buyers, and industry communities meet with stronger intent and sharper visibility.",
  },
  {
    year: "Today",
    title: "Experience-led growth",
    body: "Every event is treated as a platform to inspire, connect, and grow, with business outcomes at the center of the exhibition experience.",
  },
];

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 420]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f8f6f2_0%,#f2ece2_52%,#f8f6f2_100%)] px-4 py-24 md:px-8 md:py-28 lg:px-12 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(90deg,#17130d_1px,transparent_1px),linear-gradient(#17130d_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-sm font-black uppercase tracking-[0.24em] text-transparent">
            Timeline
          </p>
          <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#17130d] md:text-5xl">
            A story of vision, scale, and consistent excellence.
          </h2>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-5 top-0 h-full w-px bg-[#17130d]/10 md:left-1/2 md:-translate-x-1/2" />

          <motion.div
            style={{ rotateY, rotateX }}
            className="sticky top-32 z-10 mx-auto hidden h-24 w-24 items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#8d6a1e,#d8b766,#fff0a8,#9f7b28)] shadow-[0_26px_70px_rgba(159,123,40,0.28)] md:flex"
          >
            <div className="h-14 w-14 rounded-[18px] border border-white/45 bg-white/16 shadow-[inset_0_0_24px_rgba(255,255,255,0.28)]" />
          </motion.div>

          <div className="-mt-24 space-y-24 md:space-y-28">
            {timelineSteps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={step.title} className="relative grid gap-8 md:grid-cols-2 md:gap-16">
                  <div className={`relative ${isLeft ? "md:pr-14" : "md:col-start-2 md:pl-14"}`}>
                    <span className="absolute -left-[2px] top-8 z-20 h-4 w-4 rounded-full border-4 border-[#f8f6f2] bg-[#c7a24a] shadow-[0_0_0_8px_rgba(199,162,74,0.12)] md:hidden" />
                    <span
                      className={`absolute top-8 z-20 hidden h-4 w-4 rounded-full border-4 border-[#f8f6f2] bg-[#c7a24a] shadow-[0_0_0_8px_rgba(199,162,74,0.12)] md:block ${
                        isLeft ? "-right-2" : "-left-2"
                      }`}
                    />

                    <motion.article
                      initial={{
                        opacity: 0,
                        x: isLeft ? -56 : 56,
                        y: 24,
                        scale: 0.96,
                        clipPath: "inset(0 18% 0 18% round 20px)",
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        clipPath: "inset(0 0% 0 0% round 20px)",
                      }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                      className="ml-10 rounded-[20px] bg-[#fffdf8]/86 p-7 shadow-[0_22px_70px_rgba(23,19,13,0.08)] ring-1 ring-[#17130d]/6 md:ml-0 md:p-8"
                    >
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9f7b28]">
                        {step.year}
                      </p>
                      <h3 className="mt-3 text-2xl font-black tracking-tight text-[#17130d] md:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-[#62594d]">
                        {step.body}
                      </p>
                    </motion.article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
