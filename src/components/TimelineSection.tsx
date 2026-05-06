"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const timelineSlides = [
  {
    image: "/timline/t1.png",
    title: "A vision takes shape",
    label: "2000s",
    body: "At the turn of the new millennium, a group of experienced and forward-thinking exhibition professionals came together with a shared ambition to redefine how trade exhibitions are conceptualized and delivered across India. They envisioned platforms that went beyond conventional displays, focusing instead on curated, theme-led environments that could elevate business interactions and create meaningful industry connections. This collective vision laid the foundation for what would become GES Worldex India Pvt. Ltd.",
  },
  {
    image: "/timline/t2.png",
    title: "Execution at scale",
    label: "400+ Shows",
    body: "Over the years, GES Worldex India Pvt. Ltd. established itself as a trusted name by successfully delivering more than 400 exhibitions across diverse industries. Each event was executed with a balance of creative planning and operational discipline, ensuring consistency, quality, and impact at scale. This phase marked the company’s evolution from a growing organization into a reliable industry leader capable of managing large-scale, high-value exhibitions.",
  },
  {
    image: "/timline/t3.png",
    title: "Markets connected",
    label: "Pan India",
    body: "With a strong presence across multiple cities and regions, GES Worldex expanded its reach to build truly Pan-India exhibition platforms. These platforms enabled brands, buyers, and industry communities to come together with greater purpose, facilitating stronger networking, enhanced visibility, and more effective business engagement. The focus remained on creating environments where meaningful connections could thrive.",
  },
  {
    image: "/timline/t4.png",
    title: "Experience-led growth",
    label: "Today",
    body: "Today, GES Worldex India Pvt. Ltd. continues to evolve with a clear focus on experience-driven exhibitions. Every event is thoughtfully designed as a platform that not only showcases innovation but also drives tangible business outcomes. With an emphasis on quality, engagement, and long-term value, the company remains committed to creating exhibitions that inspire, connect, and contribute to sustained growth for all stakeholders.",
  },
] as const;

const timelineScrollViewportMultiplier = 2.35;

type StoryPanelProps = {
  align: "left" | "right" | "center";
  body: string;
  index: number;
  label: string;
  title: string;
};

function StoryPanel({ align, body, index, label, title }: StoryPanelProps) {
  const isRight = align === "right";

  return (
    <motion.article
      key={`${align}-${index}`}
      initial={{ opacity: 0, y: 22, x: align === "center" ? 0 : isRight ? 26 : -26 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -16, x: align === "center" ? 0 : isRight ? 18 : -18 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className={
        align === "center"
          ? "relative z-30 flex w-full justify-start"
          : `absolute inset-y-0 z-30 flex items-center ${align === "left" ? "left-0 justify-start" : "right-0 justify-end"}`
      }
    >
      <div
        className={`w-full max-w-[32rem] space-y-4 xl:max-w-[35rem] [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:max-w-[21rem] ${
          align === "left"
            ? "pr-6 xl:pr-12 [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:pr-3"
            : align === "right"
              ? "pl-6 xl:pl-12 [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:pl-3"
              : "text-left"
        }`}
      >
        <p className={`text-[0.72rem] font-black uppercase tracking-[0.28em] text-[#9f7b28] ${align === "right" ? "text-right" : "text-left"}`}>
          {label}
        </p>
        <h3
          className="text-left text-[1.95rem] font-black leading-[1.02] tracking-[-0.05em] xl:text-[2.25rem] [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:text-[1.45rem]"
          style={{ color: "var(--about-text-primary)" }}
        >
          {title}
        </h3>
        <p
          className="text-left text-[15px] leading-7 tracking-[0.02em] xl:text-base xl:leading-8 [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:text-[0.82rem] [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:leading-5"
          style={{ color: "var(--about-text-secondary)" }}
        >
          {body}
        </p>
      </div>
    </motion.article>
  );
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    timelineSlides.forEach((slide) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = slide.image;
    });
  }, []);

  useEffect(() => {
    let ticking = false;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const updateScrollProgress = () => {
      ticking = false;
      const node = sectionRef.current;
      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const scrollableDistance = Math.max(node.offsetHeight - window.innerHeight, 1);
      const nextProgress = clamp(-rect.top / scrollableDistance, 0, 1);
      setScrollProgress(nextProgress);
    };

    const requestProgressUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);
    window.addEventListener("load", requestProgressUpdate);

    return () => {
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      window.removeEventListener("load", requestProgressUpdate);
    };
  }, []);

  const activeIndex = Math.min(
    timelineSlides.length - 1,
    Math.round(scrollProgress * (timelineSlides.length - 1)),
  );
  const activeSlide = timelineSlides[activeIndex];
  const activeSide = activeIndex % 2 === 0 ? "left" : "right";

  const renderTimelineContent = (mobileKeyPrefix: string) => (
    <div className="mx-auto flex h-full w-full max-w-[1720px] flex-col px-3 pb-6 pt-0 sm:px-4 sm:pb-8 sm:pt-1 md:px-8 md:pb-10 md:pt-2 lg:px-12">
      <div className="relative z-40 pb-3 pt-4 sm:pb-5 sm:pt-8 md:pb-6 md:pt-10">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-3 sm:items-center sm:text-center">
          <h2
            className="text-[1.45rem] font-black tracking-[-0.04em] sm:text-[1.9rem] md:text-[2.4rem] lg:text-[3.15rem]"
            style={{ color: "var(--about-text-primary)" }}
          >
            The GES Worldex Growth Story
          </h2>
          <p
            className="max-w-3xl text-sm leading-relaxed sm:text-[0.98rem] md:text-[1.08rem] lg:text-[1.16rem]"
            style={{ color: "var(--about-text-secondary)" }}
          >
            A timeline of milestones that shaped GES Worldex into a trusted exhibition company, built through consistent execution, industry insight, and long-term business relationships.
          </p>
        </div>
      </div>

      <div className="relative flex flex-none items-start justify-center pt-0 sm:min-h-0 sm:flex-1 sm:items-center sm:pt-2 md:pt-3 [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:px-8">
        <div className="pointer-events-none absolute inset-0 z-30 hidden lg:block">
          <AnimatePresence mode="wait">
            <StoryPanel
              key={`${mobileKeyPrefix}-${activeSide}-${activeIndex}`}
              align={activeSide}
              body={activeSlide.body}
              index={activeIndex}
              label={activeSlide.label}
              title={activeSlide.title}
            />
          </AnimatePresence>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[340px] sm:max-w-[430px] md:max-w-[500px] lg:max-w-[560px] [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:max-w-[390px]">
          <div className="mx-auto w-full max-w-[310px] overflow-hidden rounded-[20px] sm:max-w-[390px] md:max-w-[460px] lg:max-w-[520px] [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:max-w-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${mobileKeyPrefix}-image-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.015 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[5/6] w-full overflow-hidden rounded-[20px]"
              >
                <Image
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 550px, (min-width: 768px) 480px, 315px"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-4 w-full max-w-[36rem] lg:hidden">
        <AnimatePresence mode="wait">
          <StoryPanel
            key={`${mobileKeyPrefix}-mobile-${activeIndex}`}
            align="center"
            body={activeSlide.body}
            index={activeIndex}
            label={activeSlide.label}
            title={activeSlide.title}
          />
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        backgroundColor: "var(--about-bg-light)",
        height: `${timelineScrollViewportMultiplier * 100}vh`,
      }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: "var(--about-bg-light)" }}
      >
        {renderTimelineContent("sticky")}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px w-full max-w-[1320px] bg-[linear-gradient(90deg,transparent,rgba(143,116,48,0.22)_18%,rgba(143,116,48,0.4)_50%,rgba(143,116,48,0.22)_82%,transparent)] shadow-[0_4px_12px_rgba(143,116,48,0.14)]" />
    </section>
  );
}
