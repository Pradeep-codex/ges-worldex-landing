"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import RotatingText from "./ui/RotatingText";

const visionCardClass =
  "absolute w-[42%] aspect-[3/4] overflow-hidden rounded-[30px] bg-[#f4f1ea] will-change-transform sm:rounded-[38px]";

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
      className="relative z-0 isolate mx-auto w-full max-w-[1700px] overflow-x-clip px-4 pt-12 pb-6 md:px-8 md:pt-16 md:pb-10 lg:px-12 lg:pt-28 lg:pb-20"
    >
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
                  style={{ zIndex: isFocused ? card.baseZ + 40 : card.baseZ }}
                  animate={{
                    scale: isFocused ? 1.045 : 0.96,
                    rotate: isFocused ? 0 : card.rotate,
                    y: isFocused ? -10 : 0,
                    filter: isFocused ? "brightness(1.05) saturate(1.05)" : "brightness(0.74) saturate(0.82)",
                    boxShadow: isFocused
                      ? "0 0 36px rgba(17, 24, 39, 0.28), 0 28px 72px rgba(17, 24, 39, 0.3), 0 10px 24px rgba(255, 255, 255, 0.18)"
                      : "0 0 22px rgba(17, 24, 39, 0.18), 0 18px 42px rgba(17, 24, 39, 0.2), 0 6px 16px rgba(255, 255, 255, 0.12)",
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
                    className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,253,243,0.04),rgba(37,31,34,0.18))]"
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
            <h3 className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.2em] text-sm">
              Our Vision
            </h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight flex flex-col gap-4">
              <span>We Build Powerful</span>
              <div className="flex">
                <RotatingText
                  texts={['Exhibitions', 'Trade Shows', 'Business Connections', 'Brand Showcases', 'Industry Platforms']}
                  mainClassName="px-3 sm:px-4 bg-indigo-600 text-white rounded-xl py-1 sm:py-2 inline-flex"
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
            className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl"
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
              <li key={idx} className="flex items-center gap-3 text-foreground/80 font-semibold group">
                <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all">
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
            <Link href="/about" className="group relative inline-flex px-8 py-4 bg-foreground text-background font-black text-sm uppercase tracking-widest rounded-full overflow-hidden transition-all hover:pr-12 active:scale-95">
              <span className="relative z-10 transition-all">Discover Our Story</span>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all w-5 h-5 z-10" />
              <div className="absolute inset-0 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          </motion.div>
        
        </div>

      </div>
    </section>
  );
}
