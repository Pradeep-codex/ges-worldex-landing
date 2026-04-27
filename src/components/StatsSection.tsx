"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DESKTOP_BAND_HEIGHT = 320;
const MOBILE_BAND_HEIGHT = 176;
const MOBILE_SECTION_HEIGHT = 420;
const OVERFLOW_HEADROOM = 48;
const HIDDEN_OFFSET = 100;
const REVEAL_SPEED = 0.00155;
const IMAGE_HEIGHT = 680;
const FINAL_RISE_REDUCTION = 214;
const MOBILE_IMAGE_HEIGHT = 350;
const MOBILE_FINAL_RISE_REDUCTION = 112;
const MOBILE_STAGE_HEIGHT = 132;
const MOBILE_OVERFLOW_HEIGHT = 72;
const MOBILE_BREAKPOINT = 1024;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function CountUp({
  end,
  suffix = "",
  duration = 1400,
  start,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  start: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = clamp((now - startedAt) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [duration, end, start]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

function StatTile({
  accent,
  end,
  label,
  suffix,
  start,
}: {
  accent: string;
  end: number;
  label: string;
  suffix?: string;
  start: boolean;
}) {
  return (
    <div className="min-w-0 rounded-[18px] border border-white/75 bg-white/60 px-3 py-3 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <div
          className="h-9 w-1.5 rounded-full opacity-90"
          style={{ background: accent }}
        />
        <div className="min-w-0 flex-1">
          <div
            className="welcome-display-font text-[1.95rem] font-black leading-none tracking-[-0.08em] text-transparent sm:text-[2.2rem]"
            style={{
              backgroundImage: accent,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            <CountUp end={end} suffix={suffix} start={start} />
          </div>
          <div className="mt-1 truncate text-[0.7rem] font-black uppercase tracking-[0.24em] text-sky-700 sm:text-[0.78rem]">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactStat({
  accent,
  end,
  label,
  suffix,
  start,
}: {
  accent: string;
  end: number;
  label: string;
  suffix?: string;
  start: boolean;
}) {
  return (
    <div className="rounded-[16px] border border-white/70 bg-white/68 px-3 py-2.5 backdrop-blur-sm">
      <div
        className="h-1.5 w-12 rounded-full"
        style={{ background: accent }}
      />
      <div
        className="welcome-display-font mt-2 text-[1.28rem] font-black leading-none tracking-[-0.07em] text-transparent sm:text-[1.5rem]"
        style={{
          backgroundImage: accent,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        <CountUp end={end} suffix={suffix} start={start} />
      </div>
      <div className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.18em] text-sky-800/80 sm:text-[0.68rem]">
        {label}
      </div>
    </div>
  );
}

function MobileStatsDetails({ animateNumbers }: { animateNumbers: boolean }) {
  return (
    <div className="space-y-3 lg:hidden">
      <div className="space-y-1.5">
        <h2
          className="welcome-display-font max-w-[12ch] text-[1.42rem] font-black leading-[0.9] tracking-[-0.08em] text-transparent sm:text-[1.66rem]"
          style={{
            backgroundImage: "linear-gradient(95deg, #1d4ed8 0%, #06b6d4 55%, #2563eb 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Exhibition Metrics
        </h2>
        <p className="max-w-[34ch] text-[0.78rem] leading-relaxed text-sky-900/70 sm:text-[0.84rem]">
          Bigger reach, sharper brand presence, stronger product discovery.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <CompactStat
          accent="linear-gradient(180deg,#2563eb 0%,#1d4ed8 100%)"
          end={12}
          suffix="K+"
          label="Exhibitors"
          start={animateNumbers}
        />
        <CompactStat
          accent="linear-gradient(180deg,#0284c7 0%,#06b6d4 100%)"
          end={3}
          suffix="K+"
          label="Brands"
          start={animateNumbers}
        />
        <CompactStat
          accent="linear-gradient(180deg,#2563eb 0%,#0891b2 100%)"
          end={50}
          suffix="K+"
          label="Products"
          start={animateNumbers}
        />
        <CompactStat
          accent="linear-gradient(180deg,#1d4ed8 0%,#0ea5e9 100%)"
          end={500}
          suffix="K+"
          label="Visitors"
          start={animateNumbers}
        />
      </div>
    </div>
  );
}

function StatsBand({
  progress,
  animateNumbers,
  bandHeight,
}: {
  progress: number;
  animateNumbers: boolean;
  bandHeight: number;
}) {
  const imageTranslate = `${(1 - progress) * HIDDEN_OFFSET}%`;
  const imageScale = 1 + progress * 0.03;
  const loweredTranslate = `calc(${imageTranslate} + ${progress * FINAL_RISE_REDUCTION}px)`;
  const mobileLoweredTranslate = `calc(${imageTranslate} + ${progress * MOBILE_FINAL_RISE_REDUCTION}px)`;
  const overflowOpacity = clamp((progress - 0.42) / 0.18, 0, 1);

  return (
    <div
      className="relative rounded-[30px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(244,247,255,0.98)_55%,rgba(236,241,251,0.98)_100%)] shadow-[0_30px_90px_rgba(14,20,35,0.12)]"
      style={{ height: `${bandHeight}px` }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_36%),radial-gradient(circle_at_82%_18%,rgba(198,220,255,0.32),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(49,84,255,0.65),rgba(98,180,255,0.18),transparent)]" />
      <div className="pointer-events-none absolute left-[45%] top-8 hidden h-[calc(100%-4rem)] w-px bg-[linear-gradient(180deg,transparent,rgba(148,163,184,0.26),transparent)] lg:block" />

      <div className="relative h-full lg:hidden">
        <div className="flex h-full flex-col px-4 py-4 sm:px-5 sm:py-5">
          <div className="relative mt-auto h-[132px] sm:h-[140px]">
            <div className="absolute inset-x-0 bottom-0 h-full overflow-hidden">
              <div
                className="absolute bottom-0 inset-x-[8%] sm:inset-x-[12%]"
                style={{ height: `${MOBILE_IMAGE_HEIGHT}px` }}
              >
                <div
                  className="relative h-full w-full will-change-transform"
                  style={{
                    transform: `translateY(${mobileLoweredTranslate}) scale(${imageScale})`,
                    transformOrigin: "bottom center",
                  }}
                >
                  <Image
                    src="/stat-img.png"
                    alt="GES Worldex exhibition render"
                    fill
                    sizes="100vw"
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>

            <div
              className="pointer-events-none absolute inset-x-0 bottom-full overflow-hidden"
              style={{ height: `${MOBILE_OVERFLOW_HEIGHT}px` }}
            >
              <div
                className="absolute inset-x-[8%] sm:inset-x-[12%]"
                style={{
                  bottom: `${-MOBILE_STAGE_HEIGHT}px`,
                  height: `${MOBILE_IMAGE_HEIGHT}px`,
                  opacity: overflowOpacity,
                  transform: `translateY(${mobileLoweredTranslate}) scale(${imageScale})`,
                  transformOrigin: "bottom center",
                }}
              >
                <Image
                  src="/stat-img.png"
                  alt=""
                  fill
                  aria-hidden="true"
                  sizes="100vw"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden h-full lg:block">
        <div className="absolute inset-y-0 left-0 z-10 flex w-full flex-col justify-center gap-4 px-5 py-5 sm:px-6 sm:py-6 lg:w-[59%] lg:px-8 lg:py-7">
          <div className="max-w-[620px] pr-[40%] sm:pr-[35%] lg:pr-6">
            <div className="space-y-2.5">
              <h2
                className="welcome-display-font max-w-[11ch] text-[2.05rem] font-black leading-[0.88] tracking-[-0.08em] text-transparent sm:text-[2.35rem] lg:text-[2.65rem]"
                style={{
                  backgroundImage: "linear-gradient(95deg, #1d4ed8 0%, #06b6d4 55%, #2563eb 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Exhibition Metrics
              </h2>
              <p className="max-w-[30ch] text-[0.95rem] leading-relaxed text-sky-900/70 sm:text-[1rem]">
                Bigger reach, sharper brand presence, stronger product discovery.
              </p>
            </div>
          </div>

          <div className="grid max-w-[620px] grid-cols-2 gap-3 pr-[40%] sm:pr-[35%] lg:grid-cols-4 lg:gap-3 lg:pr-6">
            <StatTile
              accent="linear-gradient(180deg,#2563eb 0%,#1d4ed8 100%)"
              end={12}
              suffix="K+"
              label="Exhibitors"
              start={animateNumbers}
            />
            <StatTile
              accent="linear-gradient(180deg,#0284c7 0%,#06b6d4 100%)"
              end={3}
              suffix="K+"
              label="Brands"
              start={animateNumbers}
            />
            <StatTile
              accent="linear-gradient(180deg,#2563eb 0%,#0891b2 100%)"
              end={50}
              suffix="K+"
              label="Products"
              start={animateNumbers}
            />
            <StatTile
              accent="linear-gradient(180deg,#1d4ed8 0%,#0ea5e9 100%)"
              end={500}
              suffix="K+"
              label="Visitors"
              start={animateNumbers}
            />
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 w-[46%] sm:w-[42%] lg:w-[42%] xl:w-[43%]">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute bottom-0 inset-x-[-6%] sm:inset-x-[2%] lg:inset-x-[-3%] xl:inset-x-[-1%]"
              style={{ height: `${IMAGE_HEIGHT}px` }}
            >
              <div
                className="relative h-full w-full will-change-transform"
                style={{
                  transform: `translateY(${loweredTranslate}) scale(${imageScale})`,
                  transformOrigin: "bottom center",
                }}
              >
                <Image
                  src="/stat-img.png"
                  alt="GES Worldex exhibition render"
                  fill
                  sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 42vw, 100vw"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-full overflow-hidden"
            style={{ height: `${OVERFLOW_HEADROOM}px` }}
          >
            <div
                className="absolute inset-x-[-6%] sm:inset-x-[2%] lg:inset-x-[-3%] xl:inset-x-[-1%]"
              style={{
                bottom: `${-bandHeight}px`,
                height: `${IMAGE_HEIGHT}px`,
                opacity: overflowOpacity,
                transform: `translateY(${loweredTranslate}) scale(${imageScale})`,
                transformOrigin: "bottom center",
              }}
            >
              <Image
                src="/stat-img.png"
                alt=""
                fill
                aria-hidden="true"
                sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 42vw, 100vw"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const phaseRef = useRef<"idle" | "pinned" | "done">("idle");
  const scrollDirectionRef = useRef<"up" | "down">("down");
  const lastScrollYRef = useRef(0);
  const lastTriggerTopRef = useRef<number | null>(null);
  const canPinRef = useRef(true);
  const releaseReadyRef = useRef(false);
  const touchYRef = useRef<number | null>(null);

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "pinned" | "done">("idle");
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const syncLayout = () => {
      setIsMobileLayout(media.matches);
    };

    syncLayout();
    media.addEventListener("change", syncLayout);

    return () => {
      media.removeEventListener("change", syncLayout);
    };
  }, []);

  const animateNumbers = phase !== "idle" || progress > 0.04;
  const bandHeight = isMobileLayout ? MOBILE_BAND_HEIGHT : DESKTOP_BAND_HEIGHT;

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const nextScrollY = window.scrollY;

      if (nextScrollY > lastScrollYRef.current) {
        scrollDirectionRef.current = "down";
      } else if (nextScrollY < lastScrollYRef.current) {
        scrollDirectionRef.current = "up";
      }

      lastScrollYRef.current = nextScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const node = triggerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.999) {
          canPinRef.current = true;
          return;
        }

        if (
          phaseRef.current === "idle" &&
          canPinRef.current &&
          scrollDirectionRef.current === "down" &&
          progressRef.current < 1
        ) {
          canPinRef.current = false;
          setPhase("pinned");
        }
      },
      { threshold: [1] },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const node = triggerRef.current;
      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const bottomAnchor = viewportHeight - bandHeight;
      const previousTop = lastTriggerTopRef.current;
      lastTriggerTopRef.current = rect.top;

      if (phaseRef.current !== "done" || scrollDirectionRef.current !== "up" || !canPinRef.current) {
        return;
      }

      const crossedBottomAnchor = previousTop !== null && previousTop < bottomAnchor && rect.top >= bottomAnchor;
      const nearBottomAnchor = Math.abs(rect.top - bottomAnchor) <= 24;

      if (crossedBottomAnchor || nearBottomAnchor) {
        canPinRef.current = false;
        setPhase("pinned");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [bandHeight]);

  useEffect(() => {
    if (phase !== "pinned") {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverscroll = html.style.overscrollBehavior;
    const previousBodyOverscroll = body.style.overscrollBehavior;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";

    const finishPinnedSequence = () => {
      releaseReadyRef.current = false;
      canPinRef.current = true;
      setProgress(1);
      setPhase("done");
    };

    const releaseBackToScroll = () => {
      releaseReadyRef.current = false;
      canPinRef.current = true;
      setProgress(0);
      setPhase("idle");
    };

    const applyDelta = (delta: number) => {
      if (phaseRef.current !== "pinned") {
        return;
      }

      if (progressRef.current >= 1) {
        if (delta < -8) {
          const nextProgress = clamp(progressRef.current + delta * REVEAL_SPEED, 0, 1);
          progressRef.current = nextProgress;
          setProgress(nextProgress);
          return;
        }

        if (delta > 8) {
          finishPinnedSequence();
        }
        return;
      }

      const nextProgress = clamp(progressRef.current + delta * REVEAL_SPEED, 0, 1);
      progressRef.current = nextProgress;
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        releaseReadyRef.current = true;
        return;
      }

      if (nextProgress <= 0 && delta < -8) {
        releaseBackToScroll();
      }
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      applyDelta(event.deltaY);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const positiveKeys = ["ArrowDown", "PageDown", " "];
      const negativeKeys = ["ArrowUp", "PageUp"];

      if (positiveKeys.includes(event.key)) {
        event.preventDefault();
        applyDelta(120);
      }

      if (negativeKeys.includes(event.key)) {
        event.preventDefault();
        applyDelta(-120);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const nextY = event.touches[0]?.clientY;
      if (touchYRef.current === null || typeof nextY !== "number") {
        return;
      }

      event.preventDefault();
      applyDelta((touchYRef.current - nextY) * 1.35);
      touchYRef.current = nextY;
    };

    const onTouchEnd = () => {
      touchYRef.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      html.style.overscrollBehavior = previousHtmlOverscroll;
      body.style.overscrollBehavior = previousBodyOverscroll;

      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [phase]);

  return (
    <section
      className="relative mx-auto w-full max-w-[1700px] px-4 md:px-8 lg:px-12"
      style={{
        height: `${isMobileLayout ? MOBILE_SECTION_HEIGHT : DESKTOP_BAND_HEIGHT + OVERFLOW_HEADROOM}px`,
        paddingTop: `${OVERFLOW_HEADROOM}px`,
      }}
      aria-label="Statistics reveal section"
    >
      <div className="mb-4 px-1 lg:hidden">
        <MobileStatsDetails animateNumbers={animateNumbers} />
      </div>

      <div ref={triggerRef} className={phase === "pinned" ? "invisible" : "visible"}>
        <StatsBand
          progress={phase === "done" ? 1 : progress}
          animateNumbers={animateNumbers}
          bandHeight={bandHeight}
        />
      </div>

      {phase === "pinned" ? (
        <div className="fixed inset-x-0 bottom-0 z-[70]">
          <div className="mx-auto w-full max-w-[1700px] px-4 md:px-8 lg:px-12">
            <StatsBand progress={progress} animateNumbers={animateNumbers} bandHeight={bandHeight} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
