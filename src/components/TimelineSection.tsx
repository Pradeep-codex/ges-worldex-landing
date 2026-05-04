"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

const timelineFrames = Array.from({ length: 121 }, (_, index) => {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/timeline/V1__${frameNumber}.png`;
});

const storyMoments = [
  {
    title: "A vision takes shape",
    label: "2000s",
    body: "At the turn of the new millennium, a group of experienced and forward-thinking exhibition professionals came together with a shared ambition to redefine how trade exhibitions are conceptualized and delivered across India. They envisioned platforms that went beyond conventional displays, focusing instead on curated, theme-led environments that could elevate business interactions and create meaningful industry connections. This collective vision laid the foundation for what would become GES Worldex India Pvt. Ltd.",
  },
  {
    title: "Execution at scale",
    label: "400+ Shows",
    body: "Over the years, GES Worldex India Pvt. Ltd. established itself as a trusted name by successfully delivering more than 400 exhibitions across diverse industries. Each event was executed with a balance of creative planning and operational discipline, ensuring consistency, quality, and impact at scale. This phase marked the company’s evolution from a growing organization into a reliable industry leader capable of managing large-scale, high-value exhibitions.",
  },
  {
    title: "Markets connected",
    label: "Pan India",
    body: "With a strong presence across multiple cities and regions, GES Worldex expanded its reach to build truly Pan-India exhibition platforms. These platforms enabled brands, buyers, and industry communities to come together with greater purpose, facilitating stronger networking, enhanced visibility, and more effective business engagement. The focus remained on creating environments where meaningful connections could thrive.",
  },
  {
    title: "Experience-led growth",
    label: "Today",
    body: "Today, GES Worldex India Pvt. Ltd. continues to evolve with a clear focus on experience-driven exhibitions. Every event is thoughtfully designed as a platform that not only showcases innovation but also drives tangible business outcomes. With an emphasis on quality, engagement, and long-term value, the company remains committed to creating exhibitions that inspire, connect, and contribute to sustained growth for all stakeholders.",
  },
] as const;

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
      initial={{ opacity: 0, y: 18, x: align === "center" ? 0 : isRight ? 24 : -24 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -12, x: align === "center" ? 0 : isRight ? 18 : -18 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute inset-y-0 z-30 flex items-center ${align === "left" ? "left-0 justify-start" : align === "right" ? "right-0 justify-end" : "inset-x-0 justify-center"}`}
    >
      <div
        className={`w-full max-w-[32rem] space-y-4 xl:max-w-[35rem] ${
          align === "left"
            ? "pr-6 xl:pr-12"
            : align === "right"
              ? "pl-6 xl:pl-12"
              : "text-center"
        }`}
      >
        <p className={`text-[0.72rem] font-black uppercase tracking-[0.28em] text-[#9f7b28] ${align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left"}`}>
          {label}
        </p>
        <h3 className={`text-[1.95rem] font-black leading-[1.02] tracking-[-0.05em] xl:text-[2.25rem] ${align === "center" ? "text-center" : "text-left"}`} style={{ color: 'var(--about-text-primary)' }}>
          {title}
        </h3>
        <p className={`text-[15px] leading-7 tracking-[0.02em] xl:text-base xl:leading-8 ${align === "center" ? "text-center" : "text-justify"}`} style={{ color: 'var(--about-text-secondary)' }}>
          {body}
        </p>
      </div>
    </motion.article>
  );
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    timelineFrames.forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(storyMoments.length - 1, Math.floor(latest * storyMoments.length));
    const nextFrameIndex = Math.min(
      timelineFrames.length - 1,
      Math.round(latest * (timelineFrames.length - 1)),
    );

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    setActiveFrameIndex((current) => (current === nextFrameIndex ? current : nextFrameIndex));
  });

  const activeMoment = storyMoments[activeIndex];
  const activeSide = activeIndex % 2 === 0 ? "left" : "right";

  return (
    <section ref={sectionRef} className="relative h-[340vh]" style={{ backgroundColor: 'var(--about-bg-light)' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="mx-auto flex h-full w-full max-w-[1720px] flex-col px-3 sm:px-4 pb-6 sm:pb-8 pt-0 sm:pt-1 md:px-8 md:pb-10 md:pt-2 lg:px-12">
          <div className="relative z-40 flex justify-center pt-4 sm:pt-6 pb-3 sm:pb-4 md:pb-5">
            <h2 className="text-base font-black uppercase tracking-[0.22em] sm:text-lg md:text-xl lg:text-2xl" style={{ color: 'var(--about-text-primary)' }}>
              Our Journey
            </h2>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            <div className="pointer-events-none absolute inset-0 z-30 hidden lg:block">
              <AnimatePresence mode="wait">
                <StoryPanel
                  key={`${activeSide}-${activeIndex}`}
                  align={activeSide}
                  body={activeMoment.body}
                  index={activeIndex}
                  label={activeMoment.label}
                  title={activeMoment.title}
                />
              </AnimatePresence>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[500px] sm:max-w-[650px] md:max-w-[750px] lg:max-w-[860px] overflow-hidden rounded-[22px]">
              <img
                src={timelineFrames[activeFrameIndex]}
                alt=""
                draggable={false}
                className="block h-auto w-full rounded-[22px] select-none"
              />
            </div>
          </div>

          <div className="relative mx-auto mt-5 h-[180px] w-full max-w-[36rem] lg:hidden">
            <AnimatePresence mode="wait">
              <StoryPanel
                key={`mobile-${activeIndex}`}
                align="center"
                body={activeMoment.body}
                index={activeIndex}
                label={activeMoment.label}
                title={activeMoment.title}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
