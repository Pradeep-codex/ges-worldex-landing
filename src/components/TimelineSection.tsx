"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const timelineFrames = Array.from({ length: 144 }, (_, index) => {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/timline/b_b_a_d_mp__${frameNumber}.png`;
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
              : "text-center"
        }`}
      >
        <p className={`text-[0.72rem] font-black uppercase tracking-[0.28em] text-[#9f7b28] ${align === "right" ? "text-right" : align === "center" ? "text-left" : "text-left"}`}>
          {label}
        </p>
        <h3 className={`text-[1.95rem] font-black leading-[1.02] tracking-[-0.05em] xl:text-[2.25rem] [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:text-[1.45rem] text-left`} style={{ color: 'var(--about-text-primary)' }}>
          {title}
        </h3>
        <p className="text-[15px] leading-7 tracking-[0.02em] text-justify xl:text-base xl:leading-8 [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:text-[0.82rem] [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:leading-5" style={{ color: 'var(--about-text-secondary)' }}>
          {body}
        </p>
      </div>
    </motion.article>
  );
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sectionTopRef = useRef(0);
  const progressRef = useRef(0);
  const pinStateRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    pinStateRef.current = isPinned;
  }, [isPinned]);

  useEffect(() => {
    timelineFrames.forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    const updateSectionTop = () => {
      const node = sectionRef.current;
      if (!node) {
        return;
      }

      sectionTopRef.current = node.getBoundingClientRect().top + window.scrollY;
    };

    updateSectionTop();
    window.addEventListener("resize", updateSectionTop);
    window.addEventListener("load", updateSectionTop);

    return () => {
      window.removeEventListener("resize", updateSectionTop);
      window.removeEventListener("load", updateSectionTop);
    };
  }, []);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);
    const progressDistance = window.innerWidth >= 1024 ? 960 : 760;

    const updateTimelineProgress = (deltaY: number) => {
      const sectionTop = sectionTopRef.current;
      const sectionRect = sectionRef.current?.getBoundingClientRect();
      const progress = progressRef.current;
      const isNearViewportTop = sectionRect
        ? sectionRect.top <= 180 && sectionRect.top >= -180
        : false;
      const hasEnoughVisibleArea = sectionRect
        ? sectionRect.bottom >= window.innerHeight * 0.35
        : false;
      const canEnterFromTop =
        deltaY > 0 &&
        isNearViewportTop &&
        hasEnoughVisibleArea &&
        progress < 1;
      const canReEnterFromBottom =
        deltaY < 0 &&
        isNearViewportTop &&
        hasEnoughVisibleArea &&
        progress > 0;
      const canAdvanceWhilePinned =
        pinStateRef.current &&
        ((deltaY > 0 && progress < 1) || (deltaY < 0 && progress > 0));

      if (!canEnterFromTop && !canReEnterFromBottom && !canAdvanceWhilePinned) {
        return false;
      }

      window.scrollTo({ top: sectionTop, behavior: "auto" });

      if (!pinStateRef.current) {
        pinStateRef.current = true;
        setIsPinned(true);
      }

      const nextProgress = clamp(progress + deltaY / progressDistance, 0, 1);
      progressRef.current = nextProgress;
      setScrollProgress(nextProgress);

      if ((nextProgress === 1 && deltaY > 0) || (nextProgress === 0 && deltaY < 0)) {
        pinStateRef.current = false;

        window.requestAnimationFrame(() => {
          setIsPinned(false);
          window.scrollTo({
            top: sectionTop + (nextProgress === 1 ? 1 : -1),
            behavior: "auto",
          });
        });
      }

      return true;
    };

    const onWheel = (event: WheelEvent) => {
      if (updateTimelineProgress(event.deltaY)) {
        event.preventDefault();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const currentTouchY = event.touches[0]?.clientY;
      const startY = touchStartYRef.current;

      if (currentTouchY == null || startY == null) {
        return;
      }

      const deltaY = (startY - currentTouchY) * 1.35;
      if (Math.abs(deltaY) < 3) {
        return;
      }

      if (updateTimelineProgress(deltaY)) {
        event.preventDefault();
        touchStartYRef.current = currentTouchY;
      }
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const activeIndex = Math.min(
    storyMoments.length - 1,
    Math.floor(scrollProgress * storyMoments.length),
  );
  const activeFrameIndex = Math.min(
    timelineFrames.length - 1,
    Math.round(scrollProgress * (timelineFrames.length - 1)),
  );
  const activeMoment = storyMoments[activeIndex];
  const activeSide = activeIndex % 2 === 0 ? "left" : "right";
  const renderTimelineContent = (mobileKeyPrefix: string) => (
    <div className="mx-auto flex h-full w-full max-w-[1720px] flex-col px-3 pb-6 pt-0 sm:px-4 sm:pb-8 sm:pt-1 md:px-8 md:pb-10 md:pt-2 lg:px-12">
      <div className="relative z-40 pb-1 pt-4 sm:pb-4 sm:pt-8 md:pb-5 md:pt-10">
        <div className="flex justify-start sm:justify-center">
          <h2 className="text-base font-black uppercase tracking-[0.22em] sm:text-lg md:text-xl lg:text-2xl" style={{ color: 'var(--about-text-primary)' }}>
            Our Journey
          </h2>
        </div>
      </div>

      <div className="relative flex flex-none items-start justify-center pt-0 sm:min-h-0 sm:flex-1 sm:items-center sm:pt-2 md:pt-3 [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:px-8">
        <div className="pointer-events-none absolute inset-0 z-30 hidden lg:block">
          <AnimatePresence mode="wait">
            <StoryPanel
              key={`${mobileKeyPrefix}-${activeSide}-${activeIndex}`}
              align={activeSide}
              body={activeMoment.body}
              index={activeIndex}
              label={activeMoment.label}
              title={activeMoment.title}
            />
          </AnimatePresence>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[350px] rounded-[28px] px-3 py-2 sm:max-w-[460px] sm:px-4 sm:py-3 md:max-w-[530px] md:px-5 md:py-4 lg:max-w-[630px] [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:max-w-[420px] [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:px-3 [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:py-2">
          <div className="mx-auto w-full max-w-[315px] overflow-hidden rounded-[22px] sm:max-w-[410px] md:max-w-[480px] lg:max-w-[550px] [@media(min-width:768px)_and_(max-width:1279px)_and_(orientation:landscape)]:max-w-[390px]">
            <img
              src={timelineFrames[activeFrameIndex]}
              alt=""
              draggable={false}
              className="block h-auto w-full rounded-[22px] select-none"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-4 w-full max-w-[36rem] lg:hidden">
        <AnimatePresence mode="wait">
          <StoryPanel
            key={`${mobileKeyPrefix}-mobile-${activeIndex}`}
            align="center"
            body={activeMoment.body}
            index={activeIndex}
            label={activeMoment.label}
            title={activeMoment.title}
          />
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen"
      style={{ backgroundColor: 'var(--about-bg-light)' }}
    >
      <div className={isPinned ? "pointer-events-none opacity-0" : ""}>
        <div className="h-screen overflow-hidden">
          {renderTimelineContent("static")}
        </div>
      </div>

      {isPinned ? (
        <div
          className="fixed inset-x-0 top-0 z-50 h-screen overflow-hidden"
          style={{ backgroundColor: 'var(--about-bg-light)' }}
        >
          {renderTimelineContent("pinned")}
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px w-full max-w-[1320px] bg-[linear-gradient(90deg,transparent,rgba(143,116,48,0.22)_18%,rgba(143,116,48,0.4)_50%,rgba(143,116,48,0.22)_82%,transparent)] shadow-[0_4px_12px_rgba(143,116,48,0.14)]" />
    </section>
  );
}
