"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RotatingText from "./ui/RotatingText";

const abtMain = "/about-images/abt-main.JPG";
const blob1 = "/about-images/blob1.JPG";
const blob2 = "/about-images/blob2.JPG";
const blob3 = "/about-images/blob3.JPG";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full max-w-[1700px] mx-auto px-4 md:px-8 lg:px-12 py-16 lg:py-24 overflow-visible">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">

        {/* Left Side: Complex Blob Design */}
        <div className="relative order-2 lg:order-1 flex justify-center items-center py-12 lg:py-0">
          <div className="relative w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[540px] lg:h-[540px]">

            {/* Big Background Blob */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 rounded-full border-[12px] border-white shadow-2xl overflow-hidden z-0"
            >
              <img src={abtMain} alt="About Big Content" className="w-full h-full object-cover" />
            </motion.div>

            {/* Small Blob 1 - Top Left Overlap */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-[140px] h-[140px] sm:w-[220px] sm:h-[220px] rounded-full border-[10px] sm:border-[12px] border-white z-20 overflow-hidden"
            >
              <img src={blob1} alt="About 1" className="w-full h-full object-cover" />
            </motion.div>

            {/* Small Blob 2 - Bottom Right Overlap */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-10 -right-4 sm:-bottom-14 sm:-right-10 w-[160px] h-[160px] sm:w-[250px] sm:h-[250px] rounded-full border-[10px] sm:border-[12px] border-white z-30 overflow-hidden"
            >
              <img src={blob2} alt="About 2" className="w-full h-full object-cover" />
            </motion.div>

            {/* Small Blob 3 - Middle Right Overlap */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute top-12 -right-12 sm:top-16 sm:-right-20 w-[110px] h-[110px] sm:w-[180px] sm:h-[180px] rounded-full border-[10px] sm:border-[12px] border-white z-10 overflow-hidden"
            >
              <img src={blob3} alt="About 3" className="w-full h-full object-cover" />
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-2 border-dashed border-foreground/10 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="order-1 lg:order-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
            className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl"
          >
            GES Worldex is a leading force in international exhibitions, dedicated to creating platforms where innovation meets opportunity. We bridge the gap between global service providers and emerging markets.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
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
            className="pt-4"
          >
            <button className="group relative px-8 py-4 bg-foreground text-background font-black text-sm uppercase tracking-widest rounded-full overflow-hidden transition-all hover:pr-12 active:scale-95">
              <span className="relative z-10 transition-all">Discover Our Story</span>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all w-5 h-5 z-10" />
              <div className="absolute inset-0 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
