"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

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
        <h3 className={`text-[1.95rem] font-black leading-[1.02] tracking-[-0.05em] text-[#17130d] xl:text-[2.25rem] ${align === "center" ? "text-center" : "text-left"}`}>
          {title}
        </h3>
        <p className={`text-[15px] leading-7 tracking-[0.02em] text-[#62594d] xl:text-base xl:leading-8 ${align === "center" ? "text-center" : "text-justify"}`}>
          {body}
        </p>
      </div>
    </motion.article>
  );
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoDurationRef = useRef(0);
  const progressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, []);

  useEffect(() => {
    const syncVideoToProgress = (progress = progressRef.current) => {
      const video = videoRef.current;
      if (!video) {
        return;
      }

      const duration = videoDurationRef.current || Math.min(video.duration || 0, 7);
      if (duration <= 0) {
        return;
      }

      videoDurationRef.current = duration;
      const targetTime = progress * duration;

      if (!video.paused) {
        video.pause();
      }

      if (Math.abs(video.currentTime - targetTime) <= 0.01) {
        return;
      }

      video.currentTime = targetTime;
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        syncVideoToProgress();
      }
    };

    const handleWindowRefresh = () => {
      syncVideoToProgress();
    };

    const video = videoRef.current;
    if (!video) {
      return;
    }

    const handleLoaded = () => {
      videoDurationRef.current = Math.min(video.duration || 0, 7);
      syncVideoToProgress();
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("canplay", handleLoaded);
    window.addEventListener("resize", handleWindowRefresh);
    window.addEventListener("focus", handleWindowRefresh);
    window.addEventListener("pageshow", handleWindowRefresh);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    syncVideoToProgress();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("canplay", handleLoaded);
      window.removeEventListener("resize", handleWindowRefresh);
      window.removeEventListener("focus", handleWindowRefresh);
      window.removeEventListener("pageshow", handleWindowRefresh);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    progressRef.current = latest;
    const nextIndex = Math.min(storyMoments.length - 1, Math.floor(latest * storyMoments.length));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const duration = videoDurationRef.current || Math.min(video.duration || 0, 7);
    if (duration <= 0) {
      return;
    }

    videoDurationRef.current = duration;
    const targetTime = latest * duration;

    if (!video.paused) {
      video.pause();
    }

    if (Math.abs(video.currentTime - targetTime) > 0.01) {
      video.currentTime = targetTime;
    }
  });

  const activeMoment = storyMoments[activeIndex];
  const activeSide = activeIndex % 2 === 0 ? "left" : "right";

  return (
    <section ref={sectionRef} className="relative h-[340vh] bg-[#f8f6f2]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="mx-auto flex h-full w-full max-w-[1720px] flex-col px-4 pb-8 pt-8 md:px-8 md:pb-10 md:pt-10 lg:px-12">
          <div className="relative z-40 mx-auto max-w-[980px] text-center">
            <h2 className="text-[2.5rem] font-black leading-[0.95] tracking-[-0.06em] text-[#17130d] md:text-[3.4rem] lg:text-[4.2rem]">
              A story of vision, scale, and consistent excellence.
            </h2>
            <p className="mx-auto mt-3 max-w-[36rem] text-sm leading-6 tracking-[0.02em] text-[#62594d] md:text-base">
              Center video, alternating story reveals, scroll-led playback.
            </p>
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

            <div className="relative z-10 mx-auto w-full max-w-[860px] overflow-hidden rounded-[22px]">
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                className="block h-auto w-full rounded-[22px]"
                onLoadedMetadata={() => {
                  const video = videoRef.current;
                  if (!video) {
                    return;
                  }

                  videoDurationRef.current = Math.min(video.duration || 0, 7);
                  video.currentTime = progressRef.current * videoDurationRef.current;
                }}
              >
                <source src="/timeline.mp4" type="video/mp4" />
              </video>
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
