"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
    <div
      className="min-w-0 rounded-[8px] border px-3 py-3 backdrop-blur-sm"
      style={{
        backgroundColor: "var(--about-card-bg)",
        borderColor: "var(--about-card-border)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div
          className="h-9 w-1.5 rounded-full opacity-90"
          style={{ background: "linear-gradient(180deg,#9f7b28,#d8b766)" }}
        />
        <div className="min-w-0 flex-1">
          <div
            className="welcome-display-font text-[1.55rem] font-black leading-none tracking-[-0.06em] sm:text-[1.72rem] xl:text-[1.9rem]"
            style={{ color: "var(--about-text-primary)" }}
          >
            <CountUp end={end} suffix={suffix} start={start} />
          </div>
          <div
            className="mt-1 text-[0.64rem] font-black uppercase leading-tight tracking-[0.12em] sm:text-[0.68rem] xl:text-[0.72rem]"
            style={{ color: "var(--about-text-secondary)" }}
          >
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
    <div
      className="rounded-[8px] border px-3.5 py-3 shadow-[0_16px_32px_rgba(47,35,24,0.08)]"
      style={{
        backgroundColor: "var(--about-card-bg)",
        borderColor: "var(--about-card-border)",
      }}
    >
      <div
        className="h-1.5 w-12 rounded-full opacity-95"
        style={{ background: "linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)" }}
      />
      <div
        className="welcome-display-font mt-2.5 text-[1.14rem] font-black leading-none tracking-[-0.05em] sm:text-[1.32rem]"
        style={{ color: "var(--about-text-primary)" }}
      >
        <CountUp end={end} suffix={suffix} start={start} />
      </div>
      <div
        className="mt-1.5 text-[0.6rem] font-black uppercase leading-tight tracking-[0.12em] sm:text-[0.66rem]"
        style={{ color: "var(--about-text-secondary)" }}
      >
        {label}
      </div>
    </div>
  );
}

function MobileStatsDetails({ animateNumbers }: { animateNumbers: boolean }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-[0.62rem] font-black uppercase tracking-[0.24em] text-transparent">
          Exhibition Metrics
        </div>
        <h2
          className="welcome-display-font max-w-[16ch] text-[1.42rem] font-black leading-[0.98] tracking-[-0.03em] sm:text-[1.62rem]"
          style={{ color: "var(--about-text-primary)" }}
        >
          <span className="block">Expand Your Reach.</span>
          <span className="block">Elevate Your Brand.</span>
          <span className="block">Multiply Opportunities.</span>
        </h2>
        <p
          className="max-w-[34ch] text-[0.9rem] font-semibold leading-relaxed sm:text-[0.98rem]"
          style={{ color: "var(--about-text-secondary)" }}
        >
          A Platform that&apos;s Built for Scale, Visibility &amp; Business Impact.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <CompactStat
          accent="linear-gradient(180deg,#2563eb 0%,#1d4ed8 100%)"
          end={400}
          suffix="+"
          label="Exhibitions"
          start={animateNumbers}
        />
        <CompactStat
          accent="linear-gradient(180deg,#0284c7 0%,#06b6d4 100%)"
          end={4}
          suffix="K+"
          label="Brands"
          start={animateNumbers}
        />
        <CompactStat
          accent="linear-gradient(180deg,#2563eb 0%,#0891b2 100%)"
          end={10}
          suffix="M+"
          label="Products"
          start={animateNumbers}
        />
        <CompactStat
          accent="linear-gradient(180deg,#1d4ed8 0%,#0ea5e9 100%)"
          end={100}
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
  return (
    <div className="relative overflow-visible rounded-[26px] border border-[rgba(23,19,13,0.1)] bg-[linear-gradient(135deg,rgba(255,253,248,0.98)_0%,rgba(250,244,231,0.98)_55%,rgba(241,230,205,0.98)_100%)] shadow-[0_24px_70px_rgba(47,35,24,0.1)] [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-[linear-gradient(135deg,rgba(7,16,24,0.96)_0%,rgba(13,24,31,0.98)_55%,rgba(22,31,37,0.98)_100%)] [html[data-theme='dark']_&]:shadow-[0_24px_70px_rgba(0,0,0,0.36)]">
      <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top_left,rgba(255,250,240,0.94),transparent_36%),radial-gradient(circle_at_82%_18%,rgba(216,183,102,0.22),transparent_30%)] [html[data-theme='dark']_&]:bg-[radial-gradient(circle_at_top_left,rgba(216,183,102,0.12),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(159,123,40,0.1),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(159,123,40,0.6),rgba(216,183,102,0.2),transparent)] [html[data-theme='dark']_&]:bg-[linear-gradient(90deg,transparent,rgba(216,183,102,0.34),rgba(159,123,40,0.12),transparent)]" />

      <div className="relative z-10 grid gap-5 px-4 py-4 sm:px-5 sm:py-5 md:grid-cols-[minmax(0,1fr)_minmax(250px,0.72fr)] md:items-end md:gap-1 md:px-6 md:py-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.95fr)] lg:gap-2 lg:px-7 xl:grid-cols-[minmax(0,1fr)_minmax(560px,0.95fr)] xl:px-8">
        <div className="space-y-4 lg:hidden">
          <MobileStatsDetails animateNumbers={animateNumbers} />
        </div>

        <div className="hidden lg:flex lg:flex-col lg:justify-center lg:gap-4">
          <div className="max-w-[720px] space-y-2.5">
            <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-sm font-black uppercase tracking-[0.2em] text-transparent">
              Exhibition Metrics
            </p>
            <h2
              className="welcome-display-font max-w-none text-[1.9rem] font-black leading-[0.95] tracking-[-0.03em] sm:text-[2.15rem] lg:text-[2.35rem]"
              style={{ color: "var(--about-text-primary)" }}
            >
              <span className="block whitespace-nowrap">Expand Your Reach.</span>
              <span className="block whitespace-nowrap">Elevate Your Brand.</span>
              <span className="block whitespace-nowrap">Multiply Opportunities.</span>
            </h2>
            <p
              className="max-w-[42ch] text-base font-semibold leading-relaxed"
              style={{ color: "var(--about-text-secondary)" }}
            >
              A Platform that&apos;s Built for Scale, Visibility &amp; Business Impact.
            </p>
          </div>

          <div className="grid max-w-[720px] grid-cols-2 gap-2.5 lg:grid-cols-4">
            <StatTile
              accent="linear-gradient(180deg,#2563eb 0%,#1d4ed8 100%)"
              end={400}
              suffix="+"
              label="Exhibitions"
              start={animateNumbers}
            />
            <StatTile
              accent="linear-gradient(180deg,#0284c7 0%,#06b6d4 100%)"
              end={4}
              suffix="K+"
              label="Brands"
              start={animateNumbers}
            />
            <StatTile
              accent="linear-gradient(180deg,#2563eb 0%,#0891b2 100%)"
              end={10}
              suffix="M+"
              label="Products"
              start={animateNumbers}
            />
            <StatTile
              accent="linear-gradient(180deg,#1d4ed8 0%,#0ea5e9 100%)"
              end={100}
              suffix="K+"
              label="Visitors"
              start={animateNumbers}
            />
          </div>
        </div>

        <div className="relative z-30 hidden min-h-[170px] items-end justify-start overflow-visible md:flex lg:min-h-[190px]">
          <div
            className={`relative h-[220px] w-full max-w-[420px] origin-top-center overflow-visible transition-[transform,opacity] duration-700 ease-out md:max-w-[460px] lg:h-[280px] lg:max-w-[620px] xl:max-w-[760px] ${
              isVisible
                ? "translate-x-[5%] translate-y-[-2%] scale-[0.78] opacity-100 lg:translate-x-[3%] lg:translate-y-[-8%] lg:scale-[1.08] xl:translate-x-[2%] xl:translate-y-[-10%] xl:scale-[1.22]"
                : "translate-x-[5%] translate-y-[calc(-2%_-_36px)] scale-[0.68] opacity-0 lg:translate-x-[3%] lg:translate-y-[calc(-8%_-_40px)] lg:scale-[0.92] xl:translate-x-[2%] xl:translate-y-[calc(-10%_-_40px)] xl:scale-[1.02]"
            }`}
          >
            <div
              className="pointer-events-none absolute inset-x-[-10%] top-[-125px] hidden h-[500px] md:block lg:inset-x-[-14%] lg:top-[-185px] lg:h-[650px] xl:top-[-210px] xl:h-[700px]"
            >
              <div className="relative h-full w-full">
                <div className="absolute inset-y-0 left-8 right-8 lg:left-12 lg:right-12 xl:left-16 xl:right-16">
                  <Image
                    src="/stats-exhibition-model-2026.png"
                    alt="GES Worldex exhibition render"
                    fill
                    sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 42vw, (min-width: 768px) 36vw, 0vw"
                    className="object-contain object-bottom"
                    style={{ objectPosition: "45% bottom" }}
                  />
                </div>
              </div>
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
      className="relative z-20 mx-auto mt-8 w-full max-w-[1700px] overflow-visible px-4 pb-20 pt-6 md:mt-12 md:px-8 md:pb-24 md:pt-8 lg:mt-16 lg:px-12 lg:pb-28 lg:pt-10"
      aria-label="Statistics section"
    >
      <StatsBand animateNumbers={hasEntered} isVisible={hasEntered} />
    </section>
  );
}
