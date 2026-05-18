"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { AboutPageCmsContent } from "@/sanity/lib/pages";

export function AboutHero({ content }: { content?: AboutPageCmsContent["hero"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imageBlur = useTransform(scrollYProgress, [0, 0.45, 1], [0, 3, 10]);
  const imageBrightness = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.88, 0.76]);
  const imageSaturate = useTransform(scrollYProgress, [0, 1], [1.02, 0.9]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.12, 0.2, 0.34]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.14, 0.2]);
  const imageFilter = useMotionTemplate`blur(${imageBlur}px) brightness(${imageBrightness}) saturate(${imageSaturate})`;

  useEffect(() => {
    const readTheme = () => {
      const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      setTheme(currentTheme);
    };

    readTheme();

    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const heroImageSrc =
    theme === "dark"
      ? content?.darkImage || "/aboutHero-dark.png"
      : content?.lightImage || "/aboutHero-light.png";

  return (
    <section ref={sectionRef} className="relative -mt-20 h-[132vh] lg:-mt-24" style={{ backgroundColor: 'var(--about-hero-bg)' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
          <motion.div
            className="absolute inset-0"
            style={{ filter: imageFilter }}
          >
            <Image
              src={heroImageSrc}
              alt="GES Worldex exhibition hero"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.42),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.38)_34%,rgba(255,255,255,0.08)_58%,rgba(255,255,255,0.14)_100%)]"
          style={{ opacity: veilOpacity }}
        />
        <motion.div
          className="absolute inset-y-0 left-0 w-[58%] bg-[radial-gradient(circle_at_22%_30%,rgba(255,255,255,0.28),transparent_36%),radial-gradient(circle_at_28%_54%,rgba(255,232,173,0.16),transparent_44%)]"
          style={{ opacity: glowOpacity }}
        />

        <div className="relative z-10 flex h-full items-center px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-[760px] lg:ml-4">
            <div className="space-y-6">
              <p className="text-xs font-black uppercase tracking-[0.32em] md:text-sm" style={{ color: 'var(--about-text-secondary)' }}>
                {content?.eyebrow || "About GES Worldex"}
              </p>
              <h1 className="max-w-[14ch] text-3xl font-black uppercase leading-[0.92] tracking-[0.02em] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[76px]" style={{ color: 'var(--about-text-primary)' }}>
                {content?.title || "Exhibition stories told through space."}
              </h1>
              <p className="max-w-[42rem] text-sm leading-7 tracking-[0.03em] sm:text-base md:text-lg md:leading-8" style={{ color: 'var(--about-text-secondary)' }}>
                {content?.description ||
                  "We create exhibition environments that give brands stronger visibility, clearer positioning, and meaningful business connection at scale."}
              </p>
              <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link
                  href={content?.cta?.href || "/contact"}
                  className="group inline-flex items-center gap-2 sm:gap-3 rounded-full bg-[#2f2318] px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-white transition-all hover:bg-[#9f7b28] active:scale-95 sm:px-7 sm:py-4 sm:text-sm [html[data-theme='dark']_&]:bg-[#d8b766] [html[data-theme='dark']_&]:text-[#071018] [html[data-theme='dark']_&]:hover:bg-[#f0d188]"
                >
                  {content?.cta?.label || "Talk To Our Team"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
