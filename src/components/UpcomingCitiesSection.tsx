"use client";

import Image from "next/image";
import { ArrowUpRight, Building2, CalendarDays, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const cityCards = [
  {
    id: "mumbai",
    city: "Mumbai",
    date: "14-16 Aug 2026",
    venue: "Jio World Convention Centre",
    copy:
      "A high-energy trade showcase built for jewellery, lifestyle, and design-led brand conversations.",
  },
  {
    id: "dubai",
    city: "Dubai",
    date: "08-10 Oct 2026",
    venue: "Dubai Exhibition Centre",
    copy:
      "A premium Gulf market edition focused on cross-border buyers, hospitality networks, and regional expansion.",
  },
  {
    id: "singapore",
    city: "Singapore",
    date: "19-21 Jan 2027",
    venue: "Marina Bay Sands Expo",
    copy:
      "A polished Asia-facing platform for future retail, mobility, interiors, and innovation-forward exhibitors.",
  },
] as const;

function CompactDestinationCard({
  city,
  date,
}: Pick<(typeof cityCards)[number], "city" | "date">) {
  return (
    <div className="rounded-[16px] border border-sky-100/80 bg-[linear-gradient(145deg,rgba(244,250,252,0.96)_0%,rgba(232,242,247,0.94)_100%)] px-3.5 py-3 shadow-[0_12px_28px_rgba(125,211,252,0.12)] [html[data-theme='dark']_&]:border-cyan-400/12 [html[data-theme='dark']_&]:bg-[linear-gradient(145deg,rgba(16,40,57,0.92)_0%,rgba(20,49,69,0.9)_100%)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-200/70 bg-[radial-gradient(circle_at_30%_30%,rgba(244,251,255,0.92),rgba(214,234,244,0.84)_100%)] text-[#14607a] [html[data-theme='dark']_&]:border-cyan-400/16 [html[data-theme='dark']_&]:bg-[radial-gradient(circle_at_30%_30%,rgba(35,78,101,0.88),rgba(16,40,57,0.92)_100%)] [html[data-theme='dark']_&]:text-cyan-200">
            <Building2 className="h-4.5 w-4.5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-[1rem] font-black leading-none text-[#18334b] [html[data-theme='dark']_&]:text-[#d9f4ff]">
              {city}
            </div>
            <div className="mt-1 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-[#55758b] [html[data-theme='dark']_&]:text-[#b8d9e7]">
              <CalendarDays className="h-3 w-3" />
              {date}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-sky-200/70 bg-white/70 px-2.5 py-1 text-[0.58rem] font-black uppercase tracking-[0.14em] text-[#14607a] [html[data-theme='dark']_&]:border-cyan-400/14 [html[data-theme='dark']_&]:bg-[#0d2940]/44 [html[data-theme='dark']_&]:text-cyan-200"
        >
          Explore
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function DestinationFlipCard({
  city,
  copy,
  date,
  venue,
}: (typeof cityCards)[number]) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const isFlipped = isHovered || isPinned;

  return (
    <motion.button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={() => setIsPinned((current) => !current)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-[250px] w-full rounded-[20px] text-left outline-none [perspective:1600px] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:h-[340px] md:rounded-[24px] [html[data-theme='dark']_&]:focus-visible:ring-offset-slate-950"
      aria-label={`${city} event card`}
      aria-pressed={isPinned}
    >
      <div
        className="relative h-full w-full rounded-[20px] transition-transform duration-700 [transform-style:preserve-3d] md:rounded-[24px]"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="absolute inset-0 rounded-[20px] border border-sky-200/55 bg-[linear-gradient(145deg,rgba(238,246,250,0.86)_0%,rgba(224,236,243,0.84)_100%)] p-4 shadow-[14px_14px_28px_rgba(115,151,182,0.16),-6px_-6px_14px_rgba(255,255,255,0.24),inset_1px_1px_0_rgba(255,255,255,0.4)] [backface-visibility:hidden] md:rounded-[24px] md:p-6 [html[data-theme='dark']_&]:border-cyan-400/18 [html[data-theme='dark']_&]:bg-[linear-gradient(145deg,rgba(17,38,56,0.9)_0%,rgba(21,49,70,0.88)_100%)] [html[data-theme='dark']_&]:shadow-[16px_16px_32px_rgba(4,18,34,0.34),inset_1px_1px_0_rgba(103,232,249,0.06)]">
          <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.8),rgba(37,99,235,0.65),transparent)] shadow-[0_0_16px_rgba(56,189,248,0.32)] md:inset-x-6" />
          <div className="flex h-full flex-col items-center text-center">
            <div className="mt-1.5 flex h-14 w-14 items-center justify-center rounded-full border border-sky-200/70 bg-[radial-gradient(circle_at_30%_30%,rgba(244,251,255,0.9),rgba(221,237,246,0.84)_60%,rgba(205,226,238,0.84)_100%)] text-[#14607a] shadow-[inset_4px_4px_8px_rgba(255,255,255,0.48),inset_-6px_-6px_12px_rgba(115,151,182,0.16),0_12px_24px_rgba(13,76,102,0.12)] md:mt-3 md:h-24 md:w-24 [html[data-theme='dark']_&]:border-cyan-400/18 [html[data-theme='dark']_&]:bg-[radial-gradient(circle_at_30%_30%,rgba(35,78,101,0.88),rgba(22,55,75,0.88)_55%,rgba(15,34,50,0.92)_100%)] [html[data-theme='dark']_&]:text-cyan-200 [html[data-theme='dark']_&]:shadow-[inset_4px_4px_8px_rgba(103,232,249,0.08),inset_-8px_-8px_14px_rgba(4,18,34,0.28),0_12px_24px_rgba(4,18,34,0.2)]">
              <Building2 className="h-6 w-6 md:h-10 md:w-10" />
            </div>

            <div className="mt-4 space-y-2 md:mt-8 md:space-y-3">
              <div className="text-[0.58rem] font-black uppercase tracking-[0.18em] text-[#14607a] md:text-[0.68rem] md:tracking-[0.24em] [html[data-theme='dark']_&]:text-cyan-200">
                Upcoming Location
              </div>
              <h3 className="welcome-display-font text-[1.4rem] font-black leading-[0.92] tracking-[-0.04em] text-[#15324c] md:text-[2rem] [html[data-theme='dark']_&]:text-[#d9f4ff]">
                {city}
              </h3>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/55 bg-white/28 px-3 py-1.5 text-[0.68rem] font-semibold text-[#33556f] shadow-[inset_1px_1px_0_rgba(255,255,255,0.28)] md:gap-2 md:px-4 md:py-2 md:text-[0.8rem] [html[data-theme='dark']_&]:border-cyan-400/16 [html[data-theme='dark']_&]:bg-[#0e2b3e]/42 [html[data-theme='dark']_&]:text-[#c9ebf6]">
                <CalendarDays className="h-3 w-3 md:h-3.5 md:w-3.5" />
                {date}
              </div>
            </div>

            <div className="mt-auto w-full pt-5 md:pt-8">
              <div className="mx-auto h-px w-16 bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.85),rgba(37,99,235,0.8),transparent)] shadow-[0_0_18px_rgba(56,189,248,0.38)] md:w-24" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-[20px] border border-sky-200/55 bg-[linear-gradient(145deg,rgba(239,246,250,0.86)_0%,rgba(225,236,243,0.84)_100%)] p-4 shadow-[14px_14px_28px_rgba(115,151,182,0.16),-6px_-6px_14px_rgba(255,255,255,0.24),inset_1px_1px_0_rgba(255,255,255,0.4)] [backface-visibility:hidden] [transform:rotateY(180deg)] md:rounded-[24px] md:p-6 [html[data-theme='dark']_&]:border-cyan-400/18 [html[data-theme='dark']_&]:bg-[linear-gradient(145deg,rgba(18,40,58,0.9)_0%,rgba(23,52,73,0.88)_100%)] [html[data-theme='dark']_&]:shadow-[16px_16px_32px_rgba(4,18,34,0.34),inset_1px_1px_0_rgba(103,232,249,0.06)]">
          <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.8),rgba(37,99,235,0.65),transparent)] shadow-[0_0_16px_rgba(56,189,248,0.32)] md:inset-x-6" />
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-1.5 text-[0.58rem] font-black uppercase tracking-[0.18em] text-[#14607a] md:gap-2 md:text-[0.68rem] md:tracking-[0.24em] [html[data-theme='dark']_&]:text-cyan-200">
              <MapPin className="h-3 w-3 md:h-3.5 md:w-3.5" />
              {city}
            </div>

            <div className="mt-3 rounded-[16px] border border-sky-200/50 bg-white/24 p-3 shadow-[inset_1px_1px_0_rgba(255,255,255,0.28)] md:mt-5 md:rounded-[20px] md:p-4 [html[data-theme='dark']_&]:border-cyan-400/14 [html[data-theme='dark']_&]:bg-[#0d2940]/34">
              <div className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#6a8aa2] md:text-[0.72rem] md:tracking-[0.2em] [html[data-theme='dark']_&]:text-[#8ec7d8]">
                Venue
              </div>
              <div className="mt-1.5 text-[0.88rem] font-black leading-snug text-[#17344d] md:mt-2 md:text-[1.05rem] [html[data-theme='dark']_&]:text-[#d9f4ff]">
                {venue}
              </div>
              <div className="mt-3 h-px bg-[linear-gradient(90deg,rgba(14,165,233,0.25),rgba(37,99,235,0.5),transparent)] md:mt-4" />
              <p className="mt-3 text-[0.76rem] leading-relaxed text-[#3b6078] md:mt-4 md:text-[0.92rem] [html[data-theme='dark']_&]:text-[#bfdeea]">
                {copy}
              </p>
            </div>

            <div className="mt-auto pt-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#54728b] md:pt-5 md:text-[0.74rem] md:tracking-[0.18em] [html[data-theme='dark']_&]:text-[#8ec7d8]">
              {date}
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export function UpcomingCitiesSection() {
  return (
    <section className="relative mx-auto w-full max-w-[1700px] px-4 pb-20 pt-4 md:px-8 md:pb-24 md:pt-8 lg:px-12 lg:pb-28 lg:pt-10">
      <div className="relative overflow-visible px-0 py-0 md:overflow-hidden md:rounded-[34px] md:bg-[linear-gradient(180deg,rgba(238,246,250,0.34)_0%,rgba(240,247,251,0.24)_48%,rgba(225,238,245,0.38)_100%)] md:px-7 md:py-8 md:shadow-[0_28px_70px_rgba(13,76,102,0.08)] lg:px-10 lg:py-10 [html[data-theme='dark']_&]:md:bg-[linear-gradient(180deg,rgba(10,32,47,0.52)_0%,rgba(14,40,58,0.4)_48%,rgba(16,46,64,0.58)_100%)] [html[data-theme='dark']_&]:md:shadow-[0_28px_70px_rgba(4,18,34,0.24)]">
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <Image
            src="/upcoming.png"
            alt=""
            fill
            aria-hidden="true"
            sizes="100vw"
            className="scale-[1.04] object-cover object-center opacity-[0.78] [html[data-theme='dark']_&]:opacity-[0.64]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden md:block md:bg-[linear-gradient(180deg,rgba(237,246,250,0.12)_0%,rgba(255,255,255,0.03)_22%,rgba(225,238,245,0.18)_100%),radial-gradient(circle_at_82%_18%,rgba(56,189,248,0.08),transparent_28%)] [html[data-theme='dark']_&]:md:bg-[linear-gradient(180deg,rgba(10,32,47,0.2)_0%,rgba(14,40,58,0.05)_22%,rgba(16,46,64,0.3)_100%),radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.08),transparent_28%)]" />
        <div className="pointer-events-none absolute inset-x-[8%] top-[-12%] hidden h-36 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.16)_0%,rgba(125,211,252,0.05)_42%,transparent_76%)] blur-3xl [html[data-theme='dark']_&]:bg-[radial-gradient(circle,rgba(34,211,238,0.14)_0%,rgba(34,211,238,0.04)_42%,transparent_76%)] md:block" />
        <div className="pointer-events-none absolute inset-x-[12%] bottom-[-16%] hidden h-40 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,rgba(59,130,246,0.03)_42%,transparent_76%)] blur-3xl [html[data-theme='dark']_&]:bg-[radial-gradient(circle,rgba(56,189,248,0.1)_0%,rgba(56,189,248,0.03)_42%,transparent_76%)] md:block" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-[1100px] px-0 py-2 text-center md:px-6 md:py-3"
          >
            <h2 className="welcome-display-font mx-auto text-[1.7rem] font-black leading-[0.98] tracking-[-0.04em] text-[#16334b] md:text-[2.55rem] md:whitespace-nowrap lg:text-[3rem] [html[data-theme='dark']_&]:text-[#d9f4ff]">
              City Editions Crafted To Feel Premium
            </h2>
            <p className="mx-auto mt-3 max-w-[58ch] text-[0.88rem] leading-relaxed text-[#16334b] md:mt-4 md:text-[1rem] [html[data-theme='dark']_&]:text-[#bfdeea]">
              Explore a refined preview of upcoming event destinations with tactile flip cards designed to feel calm, premium, and intentional.
            </p>
          </motion.div>

          <div className="mt-5 grid gap-2.5 md:hidden">
            {cityCards.map((card) => (
              <CompactDestinationCard key={card.id} city={card.city} date={card.date} />
            ))}
          </div>

          <div className="mt-6 hidden gap-3 md:mt-10 md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-3">
            {cityCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: index * 0.08, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <DestinationFlipCard {...card} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
