"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MOBILE_IMAGE_HEIGHT = 280;
const DESKTOP_IMAGE_HEIGHT = 620;

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
    <div className="min-w-0 rounded-[18px] border border-white/75 bg-white/68 px-3 py-3 backdrop-blur-sm [html[data-theme='dark']_&]:border-slate-700/80 [html[data-theme='dark']_&]:bg-slate-900/72">
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
          <div className="mt-1 truncate text-[0.7rem] font-black uppercase tracking-[0.24em] text-sky-700 sm:text-[0.78rem] [html[data-theme='dark']_&]:text-slate-300">
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
    <div className="rounded-[20px] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(241,245,249,0.98)_100%)] px-3.5 py-3 shadow-[0_16px_32px_rgba(148,163,184,0.18)] [html[data-theme='dark']_&]:border-slate-700/80 [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(30,41,59,0.94)_0%,rgba(51,65,85,0.94)_100%)] [html[data-theme='dark']_&]:shadow-[0_16px_32px_rgba(2,6,23,0.22)]">
      <div
        className="h-1.5 w-12 rounded-full opacity-95"
        style={{ background: accent }}
      />
      <div
        className="welcome-display-font mt-2.5 text-[1.38rem] font-black leading-none tracking-[-0.07em] text-transparent sm:text-[1.56rem]"
        style={{
          backgroundImage: accent,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        <CountUp end={end} suffix={suffix} start={start} />
      </div>
      <div className="mt-1.5 text-[0.62rem] font-black uppercase tracking-[0.2em] text-slate-600 sm:text-[0.68rem] [html[data-theme='dark']_&]:text-slate-300">
        {label}
      </div>
    </div>
  );
}

function MobileStatsDetails({ animateNumbers }: { animateNumbers: boolean }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="inline-flex rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.24em] text-slate-300">
          Exhibition Metrics
        </div>
        <h2 className="welcome-display-font max-w-[12ch] text-[1.52rem] font-black leading-[0.94] tracking-[-0.03em] text-slate-950 sm:text-[1.72rem] [html[data-theme='dark']_&]:text-slate-100">
          Bigger Reach, Stronger Visibility
        </h2>
        <p className="max-w-[34ch] text-[0.8rem] leading-relaxed text-slate-600 sm:text-[0.86rem] [html[data-theme='dark']_&]:text-slate-400">
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
  animateNumbers,
  isVisible,
}: {
  animateNumbers: boolean;
  isVisible: boolean;
}) {
  const imageTransform = isVisible
    ? "translateY(63%) scale(1.23)"
    : "translateY(calc(63% + 52px)) scale(0.96)";

  return (
    <div className="relative overflow-visible rounded-[30px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(244,247,255,0.98)_55%,rgba(236,241,251,0.98)_100%)] shadow-[0_30px_90px_rgba(14,20,35,0.12)] [html[data-theme='dark']_&]:border-slate-700/80 [html[data-theme='dark']_&]:bg-[linear-gradient(135deg,rgba(15,23,42,0.96)_0%,rgba(17,24,39,0.98)_55%,rgba(30,41,59,0.98)_100%)] [html[data-theme='dark']_&]:shadow-[0_30px_90px_rgba(2,6,23,0.4)]">
      <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.94),transparent_36%),radial-gradient(circle_at_82%_18%,rgba(198,220,255,0.32),transparent_30%)] [html[data-theme='dark']_&]:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(14,165,233,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(49,84,255,0.65),rgba(98,180,255,0.18),transparent)] [html[data-theme='dark']_&]:bg-[linear-gradient(90deg,transparent,rgba(96,165,250,0.34),rgba(56,189,248,0.12),transparent)]" />

      <div className="relative z-10 grid gap-6 px-4 py-4 sm:px-5 sm:py-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-end lg:gap-5 lg:px-8 lg:py-6 xl:px-10">
        <div className="space-y-4 lg:hidden">
          <MobileStatsDetails animateNumbers={animateNumbers} />
        </div>

        <div className="hidden lg:flex lg:flex-col lg:justify-center lg:gap-4">
          <div className="max-w-[620px] space-y-2.5">
            <h2
              className="welcome-display-font max-w-[11ch] text-[2.05rem] font-black leading-[0.92] tracking-[-0.035em] text-transparent sm:text-[2.35rem] lg:text-[2.65rem]"
              style={{
                backgroundImage: "linear-gradient(95deg, #1d4ed8 0%, #06b6d4 55%, #2563eb 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Exhibition Metrics
            </h2>
            <p className="max-w-[30ch] text-[0.95rem] leading-relaxed text-sky-900/70 sm:text-[1rem] [html[data-theme='dark']_&]:text-slate-400">
              Bigger reach, sharper brand presence, stronger product discovery.
            </p>
          </div>

          <div className="grid max-w-[620px] grid-cols-2 gap-3 lg:grid-cols-4">
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

        <div className="relative hidden min-h-[220px] items-end justify-center lg:flex lg:justify-end">
          <div
            className="relative w-full max-w-[420px] overflow-visible transition-[transform,opacity] duration-700 ease-out lg:max-w-[520px]"
            style={{
              height: `${MOBILE_IMAGE_HEIGHT}px`,
              opacity: isVisible ? 1 : 0,
              transform: imageTransform,
              transformOrigin: "bottom center",
            }}
          >
            <div
              className="absolute inset-x-[-2%] bottom-[-64px] hidden lg:block"
              style={{ height: `${DESKTOP_IMAGE_HEIGHT}px` }}
            >
              <Image
                src="/stat-img.png"
                alt="GES Worldex exhibition render"
                fill
                sizes="(min-width: 1280px) 36vw, (min-width: 1024px) 32vw, 100vw"
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
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || hasEntered) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setHasEntered(true);
        observer.disconnect();
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasEntered]);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-[1700px] px-4 pb-20 pt-6 md:px-8 md:pb-24 md:pt-8 lg:px-12 lg:pb-28 lg:pt-10"
      aria-label="Statistics section"
    >
      <StatsBand animateNumbers={hasEntered} isVisible={hasEntered} />
    </section>
  );
}
