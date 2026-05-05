"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import RotatingText from "./ui/RotatingText";

const visionCardClass =
  "absolute w-[42%] aspect-[3/4] overflow-hidden rounded-[30px] will-change-transform sm:rounded-[38px]";

const visionCards = [
  {
    className: "left-[2%] top-[24%]",
    baseZ: 10,
    rotate: -4,
    group: "secondary",
    src: "/about-images/abt1.JPG",
    alt: "GES Worldex exhibition planning",
  },
  {
    className: "left-[22%] top-[8%]",
    baseZ: 30,
    rotate: 0,
    group: "primary",
    src: "/about-images/abt2.JPG",
    alt: "GES Worldex trade show audience",
  },
  {
    className: "left-[50%] top-[24%]",
    baseZ: 20,
    rotate: 5,
    group: "secondary",
    src: "/about-images/abt3.JPG",
    alt: "GES Worldex business networking",
  },
] as const;

export function AboutSection() {
  const [activeVisionGroup, setActiveVisionGroup] = useState<"primary" | "secondary">("primary");
  const revealViewport = { once: true, amount: 0.2 } as const;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveVisionGroup((current) => (current === "primary" ? "secondary" : "primary"));
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="relative z-0 isolate mx-auto mt-10 w-full max-w-[1700px] overflow-x-clip rounded-[32px] border px-4 pt-12 pb-6 md:mt-14 md:px-8 md:pt-16 md:pb-10 lg:mt-20 lg:px-12 lg:pt-28 lg:pb-20"
      style={{
        backgroundColor: "var(--about-section-bg)",
        backgroundImage: "var(--about-section-overlay)",
        borderColor: "var(--about-card-border)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0),rgba(23,19,13,0.08))] opacity-60 [html[data-theme='dark']_&]:bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0),rgba(0,0,0,0.14))]" />
      <div className="grid grid-cols-1 items-center gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-24">

        {/* Left Side: Shuffled Focus Cards */}
        <div className="relative order-2 flex items-center justify-center py-3 sm:py-6 lg:order-1 lg:py-2">
          <div className="relative w-[340px] h-[330px] sm:w-[560px] sm:h-[430px] lg:w-[700px] lg:h-[500px]">
            {visionCards.map((card, index) => {
              const isFocused = card.group === activeVisionGroup;

              return (
                <motion.div
                  key={card.src}
                  className={`${visionCardClass} ${card.className}`}
                  style={{
                    zIndex: isFocused ? card.baseZ + 40 : card.baseZ,
                    backgroundColor: "var(--about-card-bg)",
                  }}
                  animate={{
                    scale: isFocused ? 1.045 : 0.96,
                    rotate: isFocused ? 0 : card.rotate,
                    y: isFocused ? -10 : 0,
                    filter: isFocused ? "brightness(1.05) saturate(1.05)" : "brightness(0.74) saturate(0.82)",
                    boxShadow: isFocused
                      ? "var(--about-section-shadow)"
                      : "0 18px 42px rgba(23, 19, 13, 0.12)",
                  }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <img
                    src={card.src}
                    alt={card.alt}
                    className="h-full w-full rounded-[30px] object-cover sm:rounded-[38px]"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <motion.div
                    className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,253,243,0.04),rgba(37,31,34,0.18))] dark:bg-[linear-gradient(145deg,rgba(30,25,20,0.3),rgba(100,80,60,0.15))]"
                    animate={{ opacity: isFocused ? 0.08 : 0.48 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>
              );
            })}

          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="order-1 lg:order-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={revealViewport}
            className="space-y-4"
          >
            <h3
              className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--about-section-accent)" }}
            >
              Our Vision
            </h3>
            <h2
              className="flex flex-col gap-4 text-4xl font-black leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
              style={{ color: "var(--about-text-primary)" }}
            >
              <span>We Build Powerful</span>
              <div className="flex">
                <RotatingText
                  texts={['Exhibitions', 'Trade Shows', 'Business Connections', 'Brand Showcases', 'Industry Platforms']}
                  mainClassName="inline-flex rounded-xl px-3 py-1 sm:px-4 sm:py-2"
                  style={{
                    backgroundColor: "var(--about-section-accent)",
                    color: "var(--about-section-accent-text)",
                  }}
                  staggerFrom="last"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-120%", opacity: 0 }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3500}
                  splitBy="characters"
                  auto
                  loop
                />
              </div>
              <div>
                <span className="welcome-gradient-text uppercase tracking-tighter">Experiences</span>
              </div>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={revealViewport}
            className="max-w-xl text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--about-text-secondary)" }}
          >
            GES Worldex is a leading force in international exhibitions, dedicated to creating platforms where innovation meets opportunity. We bridge the gap between global service providers and emerging markets.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={revealViewport}
            className="space-y-4"
          >
            {[
              "15+ Years of Industry Excellence",
              "Presence in 20+ Global Strategic Markets",
              "Connecting 50,000+ Business Leaders Annually"
            ].map((item: string, idx: number) => (
              <li
                key={idx}
                className="group flex items-center gap-3 font-semibold"
                style={{ color: "var(--about-text-primary)" }}
              >
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--about-section-accent)] transition-all group-hover:bg-[var(--about-section-chip-hover)] group-hover:text-white"
                  style={{ backgroundColor: "var(--about-section-chip-bg)" }}
                >
                  <ArrowRight className="w-3 h-3" />
                </div>
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={revealViewport}
            className="pt-4"
          >
            <Link
              href="/about"
              className="group relative inline-flex overflow-hidden rounded-full px-8 py-4 text-sm font-black uppercase tracking-widest transition-all hover:pr-12 active:scale-95"
              style={{
                backgroundColor: "var(--about-section-button-bg)",
                color: "var(--about-section-button-text)",
              }}
            >
              <span className="relative z-10 transition-all">Discover Our Story</span>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all w-5 h-5 z-10" />
              <div
                className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ backgroundColor: "var(--about-section-button-hover)" }}
              />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
