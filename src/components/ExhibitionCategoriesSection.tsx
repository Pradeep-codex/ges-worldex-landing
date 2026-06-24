"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { portfolioExhibitions } from "@/lib/portfolio";
import type { ExhibitionCategoriesSectionContent } from "@/sanity/lib/home";

const exhibitionCategories = [
  {
    id: "jewellery",
    title: "B2B Exhibition in Gold",
    titleLines: ["B2B Exhibition in", "Gold"],
    eyebrow: "Luxury trade experiences",
    description:
      "High-value showcase environments for fine jewellery brands, gemstone houses, designers, and premium buyers.",
    image: "/exhibition/jewellery.png",
    accentClass:
      "from-amber-300/30 via-yellow-200/18 to-amber-950/88 [box-shadow:inset_0_0_0_1px_rgba(252,211,77,0.18)]",
    mobileDotClass:
      "bg-amber-500 [html[data-theme='dark']_&]:bg-amber-300",
    badgeClass:
      "border-amber-200/45 bg-amber-300/18 text-amber-50",
  },
  {
    id: "silver",
    title: "B2B Exhibition in Silver",
    titleLines: ["B2B Exhibition in", "Silver"],
    eyebrow: "Refined precious-metal showcases",
    description:
      "Purpose-built environments for sterling silver collections, artisanal craftsmanship, gifting brands, and high-intent trade buyers.",
    image: "/exhibition/silver.png",
    accentClass:
      "from-slate-100/24 via-slate-200/16 to-slate-950/88 [box-shadow:inset_0_0_0_1px_rgba(226,232,240,0.18)]",
    mobileDotClass:
      "bg-slate-400 [html[data-theme='dark']_&]:bg-slate-300",
    badgeClass:
      "border-slate-200/40 bg-slate-100/14 text-slate-100",
  },
  {
    id: "construction",
    title: "Construction & Build Exhibitions",
    titleLines: ["Construction & Build", "Exhibitions"],
    eyebrow: "Built for industry scale",
    description:
      "Sector-focused exhibitions for infrastructure leaders, construction technologies, heavy materials, and project partnerships.",
    image: "/exhibition/construction.png",
    accentClass:
      "from-slate-100/10 via-slate-200/8 to-slate-950/86 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.08)]",
    mobileDotClass: "bg-[#9f7b28] [html[data-theme='dark']_&]:bg-[#d8b766]",
    badgeClass:
      "border-white/18 bg-black/20 text-white/80",
  },
  {
    id: "interior",
    title: "Interior & Furniture Exhibitions",
    titleLines: ["Interior & Furniture", "Exhibitions"],
    eyebrow: "Designed to inspire",
    description:
      "Immersive exhibition formats for furniture houses, decor brands, interior solutions, and design-led business discovery.",
    image: "/exhibition/interior-furniture.png",
    accentClass:
      "from-slate-100/10 via-slate-200/8 to-slate-950/86 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.08)]",
    mobileDotClass: "bg-[#9f7b28] [html[data-theme='dark']_&]:bg-[#d8b766]",
    badgeClass:
      "border-white/18 bg-black/20 text-white/80",
  },
  {
    id: "auto",
    title: "Auto & Mobility Exhibitions",
    titleLines: ["Auto & Mobility", "Exhibitions"],
    eyebrow: "Movement-driven showcases",
    description:
      "Future-ready platforms for automotive brands, EV ecosystems, components, smart mobility, and transport innovation.",
    image: "/exhibition/auto.png",
    accentClass:
      "from-slate-100/10 via-slate-200/8 to-slate-950/86 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.08)]",
    mobileDotClass: "bg-[#9f7b28] [html[data-theme='dark']_&]:bg-[#d8b766]",
    badgeClass:
      "border-white/18 bg-black/20 text-white/80",
  },
  {
    id: "lifestyle",
    title: "Lifestyle & Trade Exhibitions",
    titleLines: ["Lifestyle & Trade", "Exhibitions"],
    eyebrow: "Audience-first events",
    description:
      "Flexible trade-show experiences for consumer brands, lifestyle launches, curated retail, and broad-market engagement.",
    image: "/exhibition/lifestyle.png",
    accentClass:
      "from-slate-100/10 via-slate-200/8 to-slate-950/86 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.08)]",
    mobileDotClass: "bg-[#9f7b28] [html[data-theme='dark']_&]:bg-[#d8b766]",
    badgeClass:
      "border-white/18 bg-black/20 text-white/80",
  },
] as const;

function buildCategoryTitleLines(title: string) {
  if (title.startsWith("B2B Exhibition in ")) {
    return ["B2B Exhibition in", title.replace("B2B Exhibition in ", "")];
  }

  if (title.includes(" & ")) {
    return title.split(" & ").map((line, lineIndex) => (lineIndex === 0 ? `${line} &` : line));
  }

  return [title];
}

function resolveExhibitionCategories(content?: ExhibitionCategoriesSectionContent) {
  const categories = content?.categories?.length
    ? content.categories
        .filter((category) => category.title)
        .map((category, index) => {
          const fallback = exhibitionCategories[index % exhibitionCategories.length];
          const title = category.title || fallback.title;

          return {
            ...fallback,
            id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            title,
            titleLines: buildCategoryTitleLines(title),
            eyebrow: category.eyebrow || fallback.eyebrow,
            description: category.description || fallback.description,
            image: category.image || fallback.image,
          };
        })
    : exhibitionCategories;

  return {
    eyebrow: content?.eyebrow || "Our Exhibitions",
    title: content?.title || "Categories We Bring To Life",
    description:
      content?.description ||
      "We design and deliver sector-focused exhibition platforms that connect brands, buyers, partners, and industry decision-makers through purposeful trade environments.",
    mobileDescription:
      content?.description ||
      "Our exhibition portfolio spans specialized sectors built to connect focused buyers, brands, suppliers, and decision-makers.",
    categories,
  };
}

type ExhibitionHighlight = {
  id: string;
  title: string;
  imageSrc: string;
  darkImageSrc?: string;
  darkModeClassName?: string;
};

const exhibitionHighlights: ExhibitionHighlight[] = portfolioExhibitions.map((exhibition) => ({
  id: exhibition.id,
  title: exhibition.title,
  imageSrc: exhibition.image,
}));

export function ExhibitionCategoriesSection({
  content,
}: {
  content?: ExhibitionCategoriesSectionContent;
}) {
  const resolvedContent = resolveExhibitionCategories(content);
  const [activeId, setActiveId] = useState<string>(
    resolvedContent.categories[0]?.id ?? "",
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const reduceMotion = useReducedMotion();
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const marqueeLoopWidthRef = useRef(0);
  const marqueeSpeedRef = useRef(58);
  const marqueeXRef = useRef(0);

  const previewId = canHover && hoveredId ? hoveredId : activeId;

  useEffect(() => {
    const media = window.matchMedia("(hover: hover)");

    const syncHoverCapability = () => {
      setCanHover(media.matches);
      if (!media.matches) {
        setHoveredId(null);
      }
    };

    syncHoverCapability();
    media.addEventListener("change", syncHoverCapability);

    return () => {
      media.removeEventListener("change", syncHoverCapability);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const node = marqueeTrackRef.current;
    if (!node) {
      return;
    }

    const updateLoopWidth = () => {
      marqueeLoopWidthRef.current = node.scrollWidth / 2;
    };

    updateLoopWidth();

    const observer = new ResizeObserver(updateLoopWidth);
    observer.observe(node);
    window.addEventListener("resize", updateLoopWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLoopWidth);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const node = marqueeTrackRef.current;
    if (!node) {
      return;
    }

    let frameId = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      const loopWidth = marqueeLoopWidthRef.current;
      if (loopWidth) {
        const targetSpeed = isMarqueeHovered ? 0 : 58;
        const blend = 1 - Math.exp(-(isMarqueeHovered ? 0.0105 : 0.0048) * delta);
        marqueeSpeedRef.current += (targetSpeed - marqueeSpeedRef.current) * blend;

        if (Math.abs(marqueeSpeedRef.current) < 0.02 && targetSpeed === 0) {
          marqueeSpeedRef.current = 0;
        }

        let nextX = marqueeXRef.current - marqueeSpeedRef.current * (delta / 1000);

        if (nextX <= -loopWidth) {
          nextX += loopWidth;
        }

        if (nextX > 0) {
          nextX -= loopWidth;
        }

        marqueeXRef.current = nextX;
        node.style.transform = `translate3d(${nextX}px, 0, 0)`;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    node.style.transform = `translate3d(${marqueeXRef.current}px, 0, 0)`;
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isMarqueeHovered, reduceMotion]);

  return (
    <section
      className="relative mx-auto w-full max-w-[1700px] px-4 pb-16 pt-6 md:px-8 md:pb-20 md:pt-8 lg:px-12 lg:pb-24 lg:pt-10"
      aria-labelledby="exhibition-categories-heading"
    >
      <div className="relative px-0 py-0 md:overflow-hidden md:rounded-[34px] md:border md:border-[rgba(159,123,40,0.14)] md:bg-[linear-gradient(180deg,rgba(255,253,248,0.96)_0%,rgba(255,250,240,1)_42%,rgba(245,235,215,0.98)_100%)] md:px-6 md:py-6 md:shadow-[0_36px_100px_rgba(47,35,24,0.08)] lg:px-8 lg:py-8 [html[data-theme='dark']_&]:md:border-white/10 [html[data-theme='dark']_&]:md:bg-[linear-gradient(180deg,rgba(7,16,24,0.98)_0%,rgba(13,24,31,0.98)_48%,rgba(22,31,37,0.98)_100%)] [html[data-theme='dark']_&]:md:shadow-[0_36px_100px_rgba(0,0,0,0.32)]">
        <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_top_left,rgba(216,183,102,0.14),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(159,123,40,0.1),transparent_24%)] md:block" />

        <div className="relative z-10 flex flex-col gap-8 lg:gap-10">
          <div className="flex flex-col gap-4">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center rounded-full border border-[rgba(159,123,40,0.18)] bg-white/80 px-3 py-1 text-[0.66rem] font-black uppercase tracking-[0.24em] text-[#9f7b28] backdrop-blur-sm [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-[#071018]/70 [html[data-theme='dark']_&]:text-[#d8b766]">
                {resolvedContent.eyebrow}
              </div>
              <div className="space-y-3">
                <h2
                  id="exhibition-categories-heading"
                  className="welcome-display-font max-w-[12ch] text-[2rem] font-black leading-[0.94] tracking-[-0.035em] text-slate-950 md:text-[2.6rem] lg:text-[3.3rem] [html[data-theme='dark']_&]:text-slate-50"
                >
                  {resolvedContent.title}
                </h2>
                <p className="max-w-[58ch] text-sm leading-relaxed text-slate-600 md:text-[0.98rem] [html[data-theme='dark']_&]:text-slate-400">
                  {resolvedContent.description}
                </p>
              </div>
            </div>
          </div>

          <div
            className="hidden gap-3 lg:flex"
            onMouseLeave={canHover ? () => setHoveredId(null) : undefined}
          >
            {resolvedContent.categories.map((category, index) => {
              const expanded = previewId === category.id;

              return (
                <motion.button
                  key={category.id}
                  type="button"
                  layout
                  onMouseEnter={canHover ? () => setHoveredId(category.id) : undefined}
                  onFocus={canHover ? () => setHoveredId(category.id) : undefined}
                  onBlur={canHover ? () => setHoveredId(null) : undefined}
                  onClick={() => setActiveId(category.id)}
                  aria-pressed={activeId === category.id}
                  className="group relative flex h-[540px] min-w-0 cursor-pointer overflow-hidden rounded-[28px] border border-white/20 text-left outline-none ring-0 focus-visible:ring-2 focus-visible:ring-[#d8b766]"
                  animate={{
                    flexGrow: expanded ? 3.4 : 0.9,
                    filter: expanded ? "saturate(1) brightness(1)" : "saturate(0.84) brightness(0.86)",
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 170, damping: 24, mass: 0.75 }
                  }
                >
                  <div className="absolute inset-0 overflow-hidden rounded-[28px]">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(min-width: 1024px) 20vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <motion.div
                      animate={{ opacity: expanded ? 1 : 0.52 }}
                      transition={{ duration: reduceMotion ? 0 : 0.28 }}
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.12)_0%,rgba(2,6,23,0.22)_36%,rgba(2,6,23,0.86)_100%)]"
                    />
                    <div
                      className={`absolute inset-0 bg-[linear-gradient(180deg,var(--tw-gradient-from),var(--tw-gradient-via),var(--tw-gradient-to))] ${category.accentClass}`}
                    />

                    <motion.div
                      className="absolute bottom-5 left-3 z-20 flex items-end"
                      animate={{
                        opacity: expanded ? 0 : 1,
                        x: expanded ? -10 : 0,
                      }}
                      transition={{ duration: reduceMotion ? 0 : 0.22 }}
                    >
                      <div className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-[2rem] font-black uppercase leading-[0.82] tracking-[0.015em] text-white [text-shadow:0_10px_28px_rgba(0,0,0,0.6)]">
                        {category.titleLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    <AnimatePresence initial={false}>
                      {expanded ? (
                        <motion.div
                          key={category.id}
                          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                          exit={reduceMotion ? undefined : { opacity: 0, y: 18 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="absolute inset-x-0 bottom-0 z-20 overflow-hidden rounded-b-[28px]"
                        >
                          <div className="space-y-3 bg-[linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.74)_14%,rgba(2,6,23,0.96)_100%)] px-6 pb-6 pt-12">
                            <h3 className="welcome-display-font w-full text-[2.35rem] font-black leading-[0.95] tracking-[-0.04em] text-white">
                              {category.titleLines.map((line) => (
                                <span key={line} className="block">
                                  {line}
                                </span>
                              ))}
                            </h3>
                            <p className="w-full text-[1rem] leading-relaxed text-white/82">
                              {category.description}
                            </p>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-between p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`rounded-full border px-3 py-1 text-[0.64rem] font-black uppercase tracking-[0.2em] backdrop-blur-sm ${category.badgeClass}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="space-y-3 lg:hidden">
            <p className="text-[0.9rem] leading-relaxed text-slate-600 [html[data-theme='dark']_&]:text-slate-400">
              {resolvedContent.mobileDescription}
            </p>

            <div className="space-y-3">
              {resolvedContent.categories.map((category) => (
                <div key={category.id} className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${category.mobileDotClass}`}
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="text-[1rem] font-black leading-snug text-slate-900 [html[data-theme='dark']_&]:text-slate-100">
                      {category.titleLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </div>
                    <div className="text-[0.82rem] leading-relaxed text-slate-600 [html[data-theme='dark']_&]:text-slate-400">
                      {category.eyebrow}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-10 lg:mt-12">
        <div className="rounded-[30px] border border-[rgba(159,123,40,0.14)] bg-[linear-gradient(180deg,rgba(255,253,248,0.94)_0%,rgba(245,235,215,0.96)_100%)] px-4 py-5 md:px-6 md:py-6 lg:px-8 [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(7,16,24,0.92)_0%,rgba(13,24,31,0.96)_100%)]">
          <div className="mb-5 flex flex-col gap-2 md:mb-6">
            <div className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-[#9f7b28] [html[data-theme='dark']_&]:text-[#d8b766]">
              Exhibition Highlights
            </div>
            <h3 className="welcome-display-font max-w-3xl text-[1.7rem] font-black leading-[0.94] tracking-[-0.03em] text-slate-950 md:text-[2.1rem] [html[data-theme='dark']_&]:text-slate-50">
              A Visual Glimpse Into Our Exhibition Environments
            </h3>
          </div>

          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsMarqueeHovered(true)}
            onMouseLeave={() => setIsMarqueeHovered(false)}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-10 bg-[linear-gradient(90deg,#F6EBD8_0%,rgba(246,235,216,0)_100%)] [html[data-theme='dark']_&]:bg-[linear-gradient(90deg,rgba(7,16,24,1)_0%,rgba(7,16,24,0)_100%)]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-10 bg-[linear-gradient(270deg,#F6EBD8_0%,rgba(246,235,216,0)_100%)] [html[data-theme='dark']_&]:bg-[linear-gradient(270deg,rgba(7,16,24,1)_0%,rgba(7,16,24,0)_100%)]" />
            {reduceMotion ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
                {exhibitionHighlights.map((item) => (
                  <Link
                    key={item.id}
                    href={`/portfolio#${item.id}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-[22px] border border-[rgba(215,178,95,0.18)] bg-[linear-gradient(180deg,rgba(255,252,247,0.98)_0%,rgba(246,235,216,0.98)_100%)] text-left lg:cursor-pointer [html[data-theme='dark']_&]:border-[rgba(216,183,102,0.12)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(19,31,39,0.98)_0%,rgba(12,22,30,0.98)_100%)]"
                  >
                    <Image
                      src={item.imageSrc}
                      alt={`${item.title} logo`}
                      fill
                      sizes="(min-width: 1280px) 14vw, (min-width: 768px) 28vw, 44vw"
                      className={`object-contain p-4 transition-transform duration-500 ease-out lg:group-hover:scale-[1.02] ${
                        item.darkImageSrc ? "[html[data-theme='dark']_&]:hidden" : item.darkModeClassName ?? ""
                      }`}
                    />
                    {item.darkImageSrc ? (
                      <Image
                        src={item.darkImageSrc}
                        alt={`${item.title} logo`}
                        fill
                        sizes="(min-width: 1280px) 14vw, (min-width: 768px) 28vw, 44vw"
                        className="hidden object-contain p-4 transition-transform duration-500 ease-out lg:group-hover:scale-[1.02] [html[data-theme='dark']_&]:block"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.28)_0%,rgba(216,183,102,0.08)_100%)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(216,183,102,0.06)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,248,232,0.12)_0%,rgba(216,183,102,0.22)_52%,rgba(159,123,40,0.18)_100%)] opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100 [html[data-theme='dark']_&]:bg-[linear-gradient(145deg,rgba(8,20,30,0.18)_0%,rgba(20,39,50,0.42)_46%,rgba(216,183,102,0.18)_100%)]" />
                    <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100">
                      <div className="inline-flex items-center justify-center rounded-full border border-[rgba(159,123,40,0.28)] bg-[linear-gradient(180deg,rgba(255,251,241,0.98)_0%,rgba(240,214,155,0.96)_100%)] px-3.5 py-1.5 text-center text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#4e391d] shadow-[0_12px_24px_rgba(159,123,40,0.22)] backdrop-blur-sm [html[data-theme='dark']_&]:border-[rgba(216,183,102,0.28)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(15,29,39,0.96)_0%,rgba(29,50,61,0.94)_58%,rgba(216,183,102,0.26)_100%)] [html[data-theme='dark']_&]:text-[#fff1c8] [html[data-theme='dark']_&]:shadow-[0_12px_24px_rgba(0,0,0,0.34)]">
                        View In Portfolio
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="relative overflow-hidden">
                <div ref={marqueeTrackRef} className="flex w-max gap-9 will-change-transform">
                  {[...exhibitionHighlights, ...exhibitionHighlights].map((item, index) => (
                    <Link
                      key={`${item.id}-${index}`}
                      href={`/portfolio#${item.id}`}
                      className="group relative aspect-[4/3] w-[96px] shrink-0 overflow-hidden rounded-[22px] border border-[rgba(215,178,95,0.18)] bg-[linear-gradient(180deg,rgba(255,252,247,0.98)_0%,rgba(246,235,216,0.98)_100%)] text-left lg:cursor-pointer md:w-[180px] xl:w-[210px] [html[data-theme='dark']_&]:border-[rgba(216,183,102,0.12)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(19,31,39,0.98)_0%,rgba(12,22,30,0.98)_100%)]"
                    >
                      <Image
                        src={item.imageSrc}
                        alt={`${item.title} logo`}
                        fill
                        sizes="(min-width: 1280px) 19vw, (min-width: 768px) 28vw, 62vw"
                        className={`object-contain p-4 transition-transform duration-500 ease-out lg:group-hover:scale-[1.02] ${
                          item.darkImageSrc ? "[html[data-theme='dark']_&]:hidden" : item.darkModeClassName ?? ""
                        }`}
                      />
                      {item.darkImageSrc ? (
                        <Image
                          src={item.darkImageSrc}
                          alt={`${item.title} logo`}
                          fill
                          sizes="(min-width: 1280px) 19vw, (min-width: 768px) 28vw, 62vw"
                          className="hidden object-contain p-4 transition-transform duration-500 ease-out lg:group-hover:scale-[1.02] [html[data-theme='dark']_&]:block"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.28)_0%,rgba(216,183,102,0.08)_100%)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(216,183,102,0.06)_100%)]" />
                      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,248,232,0.12)_0%,rgba(216,183,102,0.22)_52%,rgba(159,123,40,0.18)_100%)] opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100 [html[data-theme='dark']_&]:bg-[linear-gradient(145deg,rgba(8,20,30,0.18)_0%,rgba(20,39,50,0.42)_46%,rgba(216,183,102,0.18)_100%)]" />
                      <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100">
                        <div className="inline-flex items-center justify-center rounded-full border border-[rgba(159,123,40,0.28)] bg-[linear-gradient(180deg,rgba(255,251,241,0.98)_0%,rgba(240,214,155,0.96)_100%)] px-3.5 py-1.5 text-center text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#4e391d] shadow-[0_12px_24px_rgba(159,123,40,0.22)] backdrop-blur-sm [html[data-theme='dark']_&]:border-[rgba(216,183,102,0.28)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(15,29,39,0.96)_0%,rgba(29,50,61,0.94)_58%,rgba(216,183,102,0.26)_100%)] [html[data-theme='dark']_&]:text-[#fff1c8] [html[data-theme='dark']_&]:shadow-[0_12px_24px_rgba(0,0,0,0.34)]">
                          View In Portfolio
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
