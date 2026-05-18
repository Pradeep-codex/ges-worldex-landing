"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck2,
  Eye,
  LayoutGrid,
  Lightbulb,
  Megaphone,
  Network,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

const pointIcons = {
  expertise: BadgeCheck,
  opportunities: BriefcaseBusiness,
  execution: CalendarCheck2,
  creative: Lightbulb,
  marketing: Megaphone,
  growth: TrendingUp,
  brands: Eye,
  networking: Network,
  curated: LayoutGrid,
  trends: ScanSearch,
  engaging: Sparkles,
  trusted: ShieldCheck,
} as const;

const switchContent = {
  exhibit: {
    eyebrow: "For Exhibitors",
    title: "Why Exhibit With Us",
    body:
      "Partner with GES Worldex India Pvt. Ltd. to showcase your brand on platforms designed to drive visibility, connections, and measurable business growth.",
    highlights: [
      { value: "27+", label: "years of expertise" },
      { value: "High", label: "value opportunities" },
      { value: "Strong", label: "growth focus" },
    ],
    points: [
      {
        icon: "expertise",
        title: "Proven Industry Expertise",
        description:
          "With more than 27 years of experience, we bring deep industry knowledge and strategic insight to help exhibitors achieve maximum impact.",
      },
      {
        icon: "opportunities",
        title: "High-Value Business Opportunities",
        description:
          "Our exhibitions are built to connect you with serious buyers, decision-makers, and industry professionals enabling meaningful partnerships.",
      },
      {
        icon: "execution",
        title: "Flawless Event Execution",
        description:
          "From booth planning to visitor flow, every detail is carefully managed to ensure a seamless and professional exhibiting experience.",
      },
      {
        icon: "creative",
        title: "Creative & Trend-Driven Platforms",
        description:
          "We design exhibitions that reflect current market trends, helping your brand stand out and attract the right audience.",
      },
      {
        icon: "marketing",
        title: "Powerful Marketing & Promotion",
        description:
          "Through integrated digital, social, and traditional campaigns, we ensure strong footfall and high visibility for your brand.",
      },
      {
        icon: "growth",
        title: "Long-Term Growth Focus",
        description:
          "We don’t just host events, we create platforms that support your business growth and brand positioning over time.",
      },
    ],
  },
  visit: {
    eyebrow: "For Visitors",
    title: "Why Visit Us",
    body:
      "Discover industry-leading exhibitions by GES Worldex India Pvt. Ltd., where innovation, networking, and opportunity come together in one place.",
    highlights: [
      { value: "Top", label: "brands & exhibitors" },
      { value: "Direct", label: "networking access" },
      { value: "Trusted", label: "professional platform" },
    ],
    points: [
      {
        icon: "brands",
        title: "Access to Top Brands & Exhibitors",
        description:
          "Explore a wide range of products and services from leading companies across multiple industries.",
      },
      {
        icon: "networking",
        title: "Meaningful Networking Opportunities",
        description:
          "Connect with business leaders, professionals, and innovators to build valuable relationships.",
      },
      {
        icon: "curated",
        title: "Curated & Well-Organized Experiences",
        description:
          "Our exhibitions are thoughtfully planned to ensure easy navigation, engaging displays, and a comfortable visitor experience.",
      },
      {
        icon: "trends",
        title: "Stay Ahead of Industry Trends",
        description:
          "Get firsthand exposure to the latest innovations, designs, and market developments.",
      },
      {
        icon: "engaging",
        title: "Engaging & Interactive Environment",
        description:
          "From live demonstrations to product showcases, every visit offers something insightful and memorable.",
      },
      {
        icon: "trusted",
        title: "Trusted & Professional Platform",
        description:
          "With years of expertise, we ensure every exhibition delivers quality, credibility, and value for visitors.",
      },
    ],
  },
} as const;

type SwitchMode = keyof typeof switchContent;

export function WhySwitchSection() {
  const [mode, setMode] = useState<SwitchMode>("exhibit");
  const content = switchContent[mode];

  const toggleControls = (
    <div className="inline-flex items-center rounded-full border border-[rgba(159,123,40,0.16)] bg-[linear-gradient(180deg,rgba(255,253,248,0.98)_0%,rgba(245,235,215,0.95)_100%)] p-1.5 shadow-[0_18px_46px_rgba(47,35,24,0.16),inset_1px_1px_0_rgba(255,255,255,0.82)] backdrop-blur-md [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(7,16,24,0.98)_0%,rgba(22,31,37,0.98)_100%)] [html[data-theme='dark']_&]:shadow-[10px_10px_24px_rgba(0,0,0,0.4),inset_1px_1px_0_rgba(255,255,255,0.08)]">
      <button
        type="button"
        onClick={() => setMode("exhibit")}
        className={`relative cursor-pointer rounded-full px-4 py-2.5 text-[0.74rem] font-black uppercase tracking-[0.18em] transition-colors md:px-5 ${
          mode === "exhibit"
            ? "text-slate-950 [html[data-theme='dark']_&]:text-slate-50"
            : "text-slate-500 [html[data-theme='dark']_&]:text-slate-400"
        }`}
      >
        {mode === "exhibit" ? (
          <motion.span
            layoutId="why-switch-pill"
            className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,250,240,1)_0%,rgba(216,183,102,0.54)_100%)] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.85),inset_-4px_-4px_10px_rgba(159,123,40,0.25)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(47,35,24,1)_0%,rgba(159,123,40,0.42)_100%)] [html[data-theme='dark']_&]:shadow-[inset_1px_1px_0_rgba(255,255,255,0.12),inset_-4px_-4px_10px_rgba(0,0,0,0.28)]"
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          />
        ) : null}
        <span className="relative z-10">Why Exhibit With Us</span>
      </button>

      <button
        type="button"
        onClick={() => setMode("visit")}
        className={`relative cursor-pointer rounded-full px-4 py-2.5 text-[0.74rem] font-black uppercase tracking-[0.18em] transition-colors md:px-5 ${
          mode === "visit"
            ? "text-slate-950 [html[data-theme='dark']_&]:text-slate-50"
            : "text-slate-500 [html[data-theme='dark']_&]:text-slate-400"
        }`}
      >
        {mode === "visit" ? (
          <motion.span
            layoutId="why-switch-pill"
            className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,250,240,1)_0%,rgba(216,183,102,0.54)_100%)] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.85),inset_-4px_-4px_10px_rgba(159,123,40,0.25)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(47,35,24,1)_0%,rgba(159,123,40,0.42)_100%)] [html[data-theme='dark']_&]:shadow-[inset_1px_1px_0_rgba(255,255,255,0.12),inset_-4px_-4px_10px_rgba(0,0,0,0.28)]"
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          />
        ) : null}
        <span className="relative z-10">Why Visit Us</span>
      </button>
    </div>
  );

  return (
    <section className="relative mx-auto w-full max-w-[1700px] px-4 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(159,123,40,0.25),transparent)]" />

      <div className="space-y-12 md:hidden">
        {(Object.entries(switchContent) as [SwitchMode, (typeof switchContent)[SwitchMode]][]).map(
          ([sectionMode, sectionContent]) => (
            <div key={sectionMode} className="space-y-5">
              <div className="space-y-3">
                <div className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-[#9f7b28] [html[data-theme='dark']_&]:text-[#d8b766]">
                  {sectionContent.eyebrow}
                </div>
                <h2 className="welcome-display-font max-w-[14ch] text-[2rem] font-black leading-[0.94] tracking-[-0.04em] text-slate-950 [html[data-theme='dark']_&]:text-slate-50">
                  {sectionContent.title}
                </h2>
                <p className="max-w-[34ch] text-[0.95rem] leading-relaxed text-slate-600 [html[data-theme='dark']_&]:text-slate-400">
                  {sectionContent.body}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {sectionContent.highlights.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`min-w-0 rounded-[8px] border px-3 py-3 shadow-[0_16px_34px_rgba(47,35,24,0.12),inset_1px_1px_0_rgba(255,255,255,0.78)] ${
                      index === sectionContent.highlights.length - 1 && sectionContent.highlights.length % 2 !== 0
                        ? "col-span-2"
                        : ""
                    }`}
                    style={{
                      backgroundColor: "var(--about-card-bg)",
                      borderColor: "var(--about-card-border)",
                    }}
                  >
                    <div className="mb-2 h-1.5 w-10 rounded-full bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] opacity-90" />
                    <div
                      className="welcome-display-font text-[1.1rem] font-black leading-none tracking-[-0.04em]"
                      style={{ color: "var(--about-text-primary)" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="mt-1 text-[0.64rem] font-black uppercase leading-tight tracking-[0.08em]"
                      style={{ color: "var(--about-text-secondary)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {sectionContent.points.map((point) => {
                  const Icon = pointIcons[point.icon];

                  return (
                    <div
                      key={`${sectionMode}-${point.title}`}
                      className="flex items-start gap-3 border-b border-slate-200/80 pb-3 [html[data-theme='dark']_&]:border-slate-800/80"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[rgba(159,123,40,0.12)] text-[#9f7b28] shadow-[inset_1px_1px_0_rgba(255,255,255,0.85)] [html[data-theme='dark']_&]:bg-white/10 [html[data-theme='dark']_&]:text-[#d8b766]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 text-[1rem] font-black leading-snug text-slate-900 [html[data-theme='dark']_&]:text-slate-100">
                        {point.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ),
        )}
      </div>

      <div className="hidden md:block">
        <div className="flex justify-center py-2 md:py-0">
          <div className="px-2 md:px-0">
            {toggleControls}
          </div>
        </div>

        <div className="relative z-10 mt-8 space-y-10 md:mt-10">

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="space-y-8 md:space-y-10"
            >
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
                <div className="space-y-4">
                  <div className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-[#9f7b28] [html[data-theme='dark']_&]:text-[#d8b766]">
                    {content.eyebrow}
                  </div>
                  <h2 className="welcome-display-font max-w-[14ch] text-[2.1rem] font-black leading-[0.92] tracking-[-0.04em] text-slate-950 md:text-[2.8rem] lg:max-w-[12ch] lg:text-[3.4rem] [html[data-theme='dark']_&]:text-slate-50">
                    {content.title}
                  </h2>
                  <p className="max-w-[62ch] text-[0.98rem] leading-relaxed text-slate-600 [html[data-theme='dark']_&]:text-slate-400">
                    {content.body}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {content.highlights.map((stat) => (
                    <div
                      key={stat.label}
                      className="min-w-0 rounded-[8px] border px-3 py-3 shadow-[0_16px_34px_rgba(47,35,24,0.12),inset_1px_1px_0_rgba(255,255,255,0.78)] md:px-4 md:py-4"
                      style={{
                        backgroundColor: "var(--about-card-bg)",
                        borderColor: "var(--about-card-border)",
                      }}
                    >
                      <div className="mb-2 h-1.5 w-10 rounded-full bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] opacity-90 md:mb-3 md:w-14" />
                      <div
                        className="welcome-display-font text-[1.15rem] font-black leading-none tracking-[-0.04em] md:text-[1.5rem]"
                        style={{ color: "var(--about-text-primary)" }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="mt-1 text-[0.6rem] font-black uppercase leading-tight tracking-[0.08em] md:text-[0.72rem] md:tracking-[0.18em]"
                        style={{ color: "var(--about-text-secondary)" }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {content.points.map((point, index) => (
                  <motion.div
                    key={`${mode}-${point.title}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, delay: index * 0.05 }}
                    className="h-full rounded-[24px] bg-[linear-gradient(180deg,rgba(255,253,248,0.96)_0%,rgba(245,235,215,0.9)_100%)] px-4 py-3 shadow-[0_22px_54px_rgba(47,35,24,0.14),inset_1px_1px_0_rgba(255,255,255,0.78)] md:grid md:grid-cols-[auto_1fr] md:items-start md:gap-4 md:rounded-[28px] md:px-4 md:py-4 [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(7,16,24,0.96)_0%,rgba(22,31,37,0.96)_100%)] [html[data-theme='dark']_&]:shadow-[10px_10px_22px_rgba(0,0,0,0.34),inset_1px_1px_0_rgba(255,255,255,0.08)]"
                  >
                    {(() => {
                      const Icon = pointIcons[point.icon];
                      return (
                        <div className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(159,123,40,0.12)] text-[#9f7b28] shadow-[inset_1px_1px_0_rgba(255,255,255,0.85)] md:flex [html[data-theme='dark']_&]:bg-white/10 [html[data-theme='dark']_&]:text-[#d8b766]">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                      );
                    })()}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#9f7b28] [html[data-theme='dark']_&]:text-[#d8b766]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="h-px flex-1 bg-[rgba(159,123,40,0.18)] [html[data-theme='dark']_&]:bg-white/10" />
                      </div>
                      <div className="text-[1rem] font-black leading-snug text-slate-900 [html[data-theme='dark']_&]:text-slate-100">
                        {point.title}
                      </div>
                      <div className="text-[0.9rem] leading-relaxed text-slate-600 md:text-[0.92rem] [html[data-theme='dark']_&]:text-slate-400">
                        {point.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
