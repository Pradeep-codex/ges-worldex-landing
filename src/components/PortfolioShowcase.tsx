"use client";

import type { CSSProperties } from "react";
import type { Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { getEditionMetrics, portfolioExhibitions, type PortfolioExhibition } from "@/lib/portfolio";

type PortfolioThemeStyle = CSSProperties & {
  "--portfolio-accent": string;
  "--portfolio-accent-soft": string;
  "--portfolio-ink": string;
};

const numberFormatter = new Intl.NumberFormat("en-IN");
const compactFormatter = new Intl.NumberFormat("en-IN", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const DESKTOP_SIDEBAR_TOP = 96;
const DESKTOP_BREAKPOINT = 1024;

const metricMeta: Record<string, { label: string; note: string }> = {
  visitors: { label: "Visitors", note: "Across editions" },
  exhibitors: { label: "Exhibitors", note: "Participated" },
  reputedJewellers: { label: "Jewellers", note: "Featured" },
  stalls: { label: "Stalls", note: "Built and managed" },
  hostedBuyers: { label: "Hosted buyers", note: "Curated attendance" },
  jewelleryDesigns: { label: "Designs", note: "On showcase" },
};

const galleryImageVariants: Variants = {
  enter: (slideDirection: number) => ({
    x: slideDirection > 0 ? "7%" : "-7%",
    opacity: 0,
    scale: 1.03,
  }),
  center: {
    x: "0%",
    opacity: 1,
    scale: 1,
  },
  exit: (slideDirection: number) => ({
    x: slideDirection > 0 ? "-7%" : "7%",
    opacity: 0,
    scale: 0.985,
  }),
};

function extractYear(date: string) {
  const match = date.match(/\b(19|20)\d{2}\b/);
  return match?.[0] ?? "Recent";
}

function getPrimaryLocation(cities: string[]) {
  if (cities.length === 0) {
    return "Pan India";
  }

  const counts = cities.reduce<Record<string, number>>((acc, city) => {
    acc[city] = (acc[city] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).sort((left, right) => right[1] - left[1])[0]?.[0] ?? cities[0];
}

function formatCount(value: number) {
  if (value >= 1000) {
    return compactFormatter.format(value).toUpperCase();
  }

  return numberFormatter.format(value);
}

function buildEditionPreviewImages(images: string[], fallback: string) {
  const source = Array.from(new Set(images.filter(Boolean)));
  return source.length > 0 ? source : [fallback];
}

function EditionGallery({
  accent,
  images,
  title,
}: {
  accent: string;
  images: string[];
  title: string;
}) {
  const totalImages = images.length;
  const imageKey = images.join("|");
  const [{ index: activeImageIndex, direction }, setSlideState] = useState({
    index: 0,
    direction: 1,
  });
  const visibleImageIndex = totalImages > 0 ? Math.min(activeImageIndex, totalImages - 1) : 0;

  const showImage = (nextIndex: number) => {
    if (totalImages <= 0) {
      return;
    }

    setSlideState((current) => {
      const normalizedIndex = (nextIndex + totalImages) % totalImages;
      let nextDirection = normalizedIndex > current.index ? 1 : -1;

      if (current.index === totalImages - 1 && normalizedIndex === 0) {
        nextDirection = 1;
      }

      if (current.index === 0 && normalizedIndex === totalImages - 1) {
        nextDirection = -1;
      }

      return {
        index: normalizedIndex,
        direction: nextDirection,
      };
    });
  };

  const goToPreviousImage = () => {
    showImage(activeImageIndex - 1);
  };
  const goToNextImage = () => {
    showImage(activeImageIndex + 1);
  };

  useEffect(() => {
    setSlideState({ index: 0, direction: 1 });
  }, [imageKey]);

  useEffect(() => {
    if (totalImages <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setSlideState((current) => ({
        index: (current.index + 1) % totalImages,
        direction: 1,
      }));
    }, 3200);

    return () => window.clearInterval(timer);
  }, [totalImages]);

  return (
    <div className="space-y-4 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:space-y-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-[color:var(--portfolio-accent-soft)] [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:aspect-[16/7]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {images[visibleImageIndex] ? (
            <motion.div
              key={`${images[visibleImageIndex]}-${visibleImageIndex}`}
              custom={direction}
              className="absolute inset-0"
              variants={galleryImageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={images[visibleImageIndex]}
                alt={`${title} gallery ${visibleImageIndex + 1}`}
                fill
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="object-cover"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.04)_0%,rgba(10,10,10,0.18)_100%)]" />
      </div>

      {totalImages > 1 ? (
        <div className="flex items-center justify-center gap-3 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:gap-2.5">
          <button
            type="button"
            onClick={goToPreviousImage}
            className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--about-card-border)] bg-white/80 text-slate-700 transition-colors hover:text-[color:var(--portfolio-accent)] [html[data-theme='dark']_&]:bg-slate-950/80 [html[data-theme='dark']_&]:text-slate-200 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:h-8 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:w-8"
            aria-label={`Show previous ${title} gallery image`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center justify-center gap-2">
            {images.map((image, index) => {
              const isActive = index === activeImageIndex;

              return (
                <button
                  key={`${image}-dot-${index}`}
                  type="button"
                  onClick={() => showImage(index)}
                  className="h-2.5 rounded-full transition-all duration-300"
                  aria-label={`Show ${title} gallery image ${index + 1}`}
                  style={{
                    width: isActive ? "1.9rem" : "0.55rem",
                    background: isActive ? accent : "rgba(148,163,184,0.34)",
                  }}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={goToNextImage}
            className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--about-card-border)] bg-white/80 text-slate-700 transition-colors hover:text-[color:var(--portfolio-accent)] [html[data-theme='dark']_&]:bg-slate-950/80 [html[data-theme='dark']_&]:text-slate-200 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:h-8 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:w-8"
            aria-label={`Show next ${title} gallery image`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

function MobilePortfolioSection({
  exhibition,
  activeEditionIndex,
  isLast,
  onEditionChange,
}: {
  exhibition: PortfolioExhibition;
  activeEditionIndex: number;
  isLast: boolean;
  onEditionChange: (editionIndex: number) => void;
}) {
  const sectionStyle: PortfolioThemeStyle = {
    "--portfolio-accent": exhibition.theme.accent,
    "--portfolio-accent-soft": exhibition.theme.accentSoft,
    "--portfolio-ink": exhibition.theme.ink,
  };
  const hasEditions = exhibition.editions.length > 0;
  const displayedEditions = hasEditions ? [...exhibition.editions].reverse() : [];
  const safeEditionIndex = hasEditions
    ? Math.min(activeEditionIndex, displayedEditions.length - 1)
    : 0;
  const activeEdition = hasEditions ? displayedEditions[safeEditionIndex] : null;
  const activeEditionSourceIndex = activeEdition
    ? exhibition.editions.indexOf(activeEdition)
    : 0;
  const metrics = activeEdition ? getEditionMetrics(activeEdition) : [];
  const previewImages = buildEditionPreviewImages(
    activeEdition
      ? [
          exhibition.galleryImages[activeEditionSourceIndex % exhibition.galleryImages.length] ??
            exhibition.image,
          exhibition.detailImage,
          ...exhibition.galleryImages,
        ]
      : [exhibition.detailImage, ...exhibition.galleryImages],
    exhibition.image,
  );

  return (
    <article id={`show-${exhibition.id}`} className="overflow-hidden scroll-mt-[110px]" style={sectionStyle}>
      <div className="px-3 pb-4">
        <div className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-[color:var(--portfolio-accent)]">
          {exhibition.label}
        </div>
        <div className="mt-2">
          <h2 className="welcome-display-font max-w-[11ch] text-[2rem] font-black leading-[0.92] tracking-[-0.03em] text-slate-950 [html[data-theme='dark']_&]:text-slate-50">
            {exhibition.title}
          </h2>
        </div>
      </div>

      {hasEditions ? (
        <>
          <div className="border-b border-[color:var(--about-card-border)] px-3 pb-2">
            <div className="-mx-3 flex gap-5 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {displayedEditions.map((edition, index) => {
                  const isActive = index === safeEditionIndex;

                  return (
                    <button
                      key={`${exhibition.id}-${edition.name}-${edition.date}`}
                      type="button"
                      onClick={() => onEditionChange(index)}
                      className="relative shrink-0 pb-2 text-left transition-colors duration-300"
                      style={{
                        color: isActive ? "var(--portfolio-accent)" : "var(--about-text-secondary)",
                      }}
                      aria-pressed={isActive}
                    >
                      <div className="text-[0.82rem] font-semibold leading-tight text-slate-950 [html[data-theme='dark']_&]:text-slate-100">
                        {edition.name}
                      </div>
                      <div
                        className="absolute bottom-0 left-0 h-[3px] rounded-full transition-all duration-300"
                        style={{
                          width: isActive ? "100%" : "0%",
                          background: "var(--portfolio-accent)",
                          boxShadow: isActive
                            ? "0 0 0.75rem color-mix(in srgb, var(--portfolio-accent) 45%, transparent)"
                            : "none",
                          opacity: isActive ? 1 : 0.2,
                        }}
                      />
                    </button>
                  );
                })}
            </div>
          </div>

          {activeEdition ? (
            <motion.div
              key={`${exhibition.id}-${activeEdition.name}-${activeEdition.date}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 px-0 pb-6"
            >
              <div className="px-3">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[0.8rem] font-semibold text-slate-500 [html[data-theme='dark']_&]:text-slate-300">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-[color:var(--portfolio-accent)]" />
                    {activeEdition.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[color:var(--portfolio-accent)]" />
                    {activeEdition.city}
                  </span>
                </div>

                {metrics.length > 0 ? (
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:gap-3">
                    {metrics.map(({ label, value }) => (
                      <div
                        key={label}
                        className="rounded-[14px] border border-[color:var(--about-card-border)] bg-white/84 px-2.5 py-2 [html[data-theme='dark']_&]:bg-slate-900/80 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:px-3.5 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:py-3"
                      >
                        <div className="text-[1rem] font-black leading-none text-slate-950 [html[data-theme='dark']_&]:text-slate-50 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:text-[1.5rem]">
                          {numberFormatter.format(value)}
                        </div>
                        <div className="mt-1 text-[0.52rem] font-black uppercase tracking-[0.08em] text-[color:var(--portfolio-accent)] [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:text-[0.62rem]">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 rounded-[18px] border border-dashed border-[color:var(--about-card-border)] px-3 py-3 text-sm text-slate-500 [html[data-theme='dark']_&]:text-slate-400">
                    Stats for this edition will be added soon.
                  </div>
                )}
              </div>

              <EditionGallery
                accent={exhibition.theme.accent}
                images={previewImages}
                title={activeEdition.name}
              />
            </motion.div>
          ) : null}
        </>
      ) : (
        <div className="space-y-4 px-0 pb-6">
          <EditionGallery
            accent={exhibition.theme.accent}
            images={previewImages}
            title={exhibition.title}
          />

          <div className="px-3 text-sm leading-relaxed text-slate-500 [html[data-theme='dark']_&]:text-slate-400">
            Edition archive coming soon for this show.
          </div>
        </div>
      )}

      {!isLast ? (
        <div className="px-3 pb-1">
          <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(15,23,42,0.16),transparent)] shadow-[0_8px_18px_rgba(15,23,42,0.08)] [html[data-theme='dark']_&]:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] [html[data-theme='dark']_&]:shadow-[0_8px_18px_rgba(0,0,0,0.28)]" />
        </div>
      ) : null}
    </article>
  );
}

export function PortfolioShowcase() {
  const [activeExhibitionIndex, setActiveExhibitionIndex] = useState(0);
  const [hoveredExhibitionIndex, setHoveredExhibitionIndex] = useState<number | null>(null);
  const [mobileEditionIndexes, setMobileEditionIndexes] = useState(() =>
    portfolioExhibitions.map(() => 0),
  );
  const [sidebarStyle, setSidebarStyle] = useState<CSSProperties>({});
  const contentTopRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const sidebarTrackRef = useRef<HTMLElement | null>(null);
  const sidebarPanelRef = useRef<HTMLDivElement | null>(null);
  const exhibition = portfolioExhibitions[activeExhibitionIndex];
  const editionCount = exhibition.editions.length;
  const maxSummaryCards = 5;

  const summaryCards = useMemo(() => {
    const totals = exhibition.editions.reduce<Record<string, number>>((acc, edition) => {
      Object.entries(edition.stats).forEach(([key, value]) => {
        if (typeof value === "number") {
          acc[key] = (acc[key] ?? 0) + value;
        }
      });
      return acc;
    }, {});

    const cards = [
      {
        label: "Editions",
        note: editionCount > 0 ? "Completed" : "Pipeline",
        value: String(editionCount),
      },
    ];

    const preferredKeys = [
      "visitors",
      "exhibitors",
      "reputedJewellers",
      "stalls",
      "hostedBuyers",
      "jewelleryDesigns",
    ];

    preferredKeys.forEach((key) => {
      const value = totals[key];
      const meta = metricMeta[key];

      if (cards.length >= maxSummaryCards || value == null || !meta) {
        return;
      }

      cards.push({
        label: meta.label,
        note: meta.note,
        value: formatCount(value),
      });
    });

    if (cards.length < maxSummaryCards) {
      cards.push({
        label: "Cities",
        note: "Host locations",
        value: String(new Set(exhibition.editions.map((edition) => edition.city)).size || 1),
      });
    }

    while (cards.length < maxSummaryCards) {
      cards.push({
        label: "Focus tracks",
        note: "Show pillars",
        value: String(exhibition.focus.length),
      });
    }

    return cards.slice(0, maxSummaryCards);
  }, [editionCount, exhibition.editions, exhibition.focus.length, maxSummaryCards]);

  const showcaseMeta = useMemo(() => {
    const cities = exhibition.editions.map((edition) => edition.city);
    const firstYear = exhibition.editions[0]?.date ? extractYear(exhibition.editions[0].date) : "Ongoing";

    return {
      firstYear,
      location: getPrimaryLocation(cities),
    };
  }, [exhibition.editions]);

  const themeStyle: PortfolioThemeStyle = {
    "--portfolio-accent": exhibition.theme.accent,
    "--portfolio-accent-soft": exhibition.theme.accentSoft,
    "--portfolio-ink": exhibition.theme.ink,
  };

  const handleExhibitionChange = (index: number) => {
    setActiveExhibitionIndex(index);
    setHoveredExhibitionIndex(null);

    const exhibitionId = portfolioExhibitions[index]?.id;
    if (exhibitionId) {
      window.history.replaceState(null, "", `#${exhibitionId}`);
    }

    const contentTop = contentTopRef.current;
    if (!contentTop) {
      return;
    }

    const targetTop = window.scrollY + contentTop.getBoundingClientRect().top - 96;
    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });
  };

  const handleMobileEditionChange = (showIndex: number, editionIndex: number) => {
    setMobileEditionIndexes((current) =>
      current.map((value, index) => (index === showIndex ? editionIndex : value)),
    );
  };

  useEffect(() => {
    const applyHashSelection = () => {
      const raw = window.location.hash ? window.location.hash.slice(1) : "";
      const hash = decodeURIComponent(raw);
      if (!hash) {
        return;
      }

      const idx = portfolioExhibitions.findIndex((item) => item.id === hash);
      if (idx < 0) {
        return;
      }

      setActiveExhibitionIndex(idx);
      setHoveredExhibitionIndex(null);

      // Mobile renders all sections, so we can scroll to the anchor.
      // Desktop renders a single detail panel; the anchor is rendered for the active show below.
      window.setTimeout(() => {
        const contentTop = contentTopRef.current;
        if (!contentTop) return;

        // On mobile/tablet we have a real anchor per show.
        // On desktop we scroll to the content top so the active panel is aligned correctly.
        const mobileAnchor = document.getElementById(`show-${hash}`);
        if (mobileAnchor) {
          mobileAnchor.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }

        const targetTop = window.scrollY + contentTop.getBoundingClientRect().top - 96;
        window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
      }, 50);
    };

    applyHashSelection();
    window.addEventListener("hashchange", applyHashSelection);
    return () => window.removeEventListener("hashchange", applyHashSelection);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateSidebarPosition = () => {
      const section = sectionRef.current;
      const sidebarTrack = sidebarTrackRef.current;
      const sidebarPanel = sidebarPanelRef.current;

      if (!section || !sidebarTrack || !sidebarPanel || window.innerWidth < DESKTOP_BREAKPOINT) {
        setSidebarStyle({});
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const sidebarTrackRect = sidebarTrack.getBoundingClientRect();
      const panelHeight = sidebarPanel.offsetHeight;
      const sidebarTrackHeight = sidebarTrackRect.height;
      const startFixedScrollY = window.scrollY + sidebarTrackRect.top - DESKTOP_SIDEBAR_TOP;
      const stopFixedScrollY =
        window.scrollY + sectionRect.bottom - DESKTOP_SIDEBAR_TOP - panelHeight;

      if (window.scrollY <= startFixedScrollY) {
        setSidebarStyle({
          position: "relative",
          width: "100%",
        });
        return;
      }

      if (window.scrollY < stopFixedScrollY) {
        setSidebarStyle({
          position: "fixed",
          top: `${DESKTOP_SIDEBAR_TOP}px`,
          left: `${sidebarTrackRect.left}px`,
          width: `${sidebarTrackRect.width}px`,
          zIndex: 20,
        });
        return;
      }

      setSidebarStyle({
        position: "absolute",
        top: `${Math.max(sidebarTrackHeight - panelHeight, 0)}px`,
        left: 0,
        width: "100%",
      });
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateSidebarPosition);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [activeExhibitionIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-[1720px] px-3 pb-16 pt-5 sm:px-4 md:px-8 md:pb-20 md:pt-6 lg:px-12 lg:pb-24 lg:pt-8"
      style={themeStyle}
    >
      <div className="pointer-events-none absolute inset-x-10 top-0 h-56 bg-[radial-gradient(circle_at_center,rgba(212,180,101,0.16),transparent_68%)] blur-3xl" />

      <div className="relative -mx-3 space-y-8 lg:hidden">
        {portfolioExhibitions.map((item, index) => (
          <MobilePortfolioSection
            key={item.id}
            exhibition={item}
            activeEditionIndex={mobileEditionIndexes[index] ?? 0}
            isLast={index === portfolioExhibitions.length - 1}
            onEditionChange={(editionIndex) => handleMobileEditionChange(index, editionIndex)}
          />
        ))}
      </div>

      <div className="relative hidden lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-7">
        <aside ref={sidebarTrackRef} className="relative">
          <div
            ref={sidebarPanelRef}
            className="flex flex-col overflow-hidden rounded-[30px] border border-[color:var(--about-card-border)] bg-white/88 p-4 shadow-[0_24px_80px_rgba(34,24,14,0.08)] backdrop-blur-xl [html[data-theme='dark']_&]:bg-slate-950/80 lg:h-[calc(100vh-7rem)]"
            style={sidebarStyle}
          >
            <div className="border-b border-[color:var(--about-card-border)] pb-4">
              <h1 className="text-3xl font-black tracking-tight text-slate-950 [html[data-theme='dark']_&]:text-slate-50">
                Our Shows
              </h1>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto pr-1">
              <div className="space-y-2">
                {portfolioExhibitions.map((item, index) => {
                  const isActive = index === activeExhibitionIndex;
                  const isHovered = hoveredExhibitionIndex === index;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleExhibitionChange(index)}
                      onMouseEnter={() => setHoveredExhibitionIndex(index)}
                      onMouseLeave={() => setHoveredExhibitionIndex(null)}
                      onFocus={() => setHoveredExhibitionIndex(index)}
                      onBlur={() => setHoveredExhibitionIndex(null)}
                      className="group relative isolate w-full cursor-pointer overflow-hidden px-3 py-3 text-left transition-colors duration-300"
                    >
                      {isActive ? (
                        <motion.div
                          layoutId="portfolio-sidebar-highlight"
                          className="pointer-events-none absolute inset-0 z-0"
                          style={{
                            background:
                              "linear-gradient(135deg, color-mix(in srgb, var(--portfolio-accent) 24%, transparent), color-mix(in srgb, var(--portfolio-accent) 6%, transparent) 70%)",
                            border: "1px solid color-mix(in srgb, var(--portfolio-accent) 64%, transparent)",
                            boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--portfolio-accent) 12%, transparent)",
                          }}
                          transition={{ type: "spring", stiffness: 360, damping: 30, mass: 0.8 }}
                        />
                      ) : null}

                      <div
                        className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-out ${
                          isHovered && !isActive ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          background:
                            "linear-gradient(135deg, color-mix(in srgb, var(--portfolio-accent) 14%, transparent), color-mix(in srgb, var(--portfolio-accent) 4%, transparent) 72%)",
                          border: "1px solid color-mix(in srgb, var(--portfolio-accent) 30%, transparent)",
                        }}
                      />

                      <div className="relative z-10 flex items-start justify-between gap-3">
                        <div className="relative z-10 min-w-0">
                          <div
                            className={`text-[1rem] font-semibold leading-snug transition-colors duration-300 ${
                              isActive
                                ? "text-[color:var(--portfolio-accent)]"
                                : "text-slate-900 group-hover:text-[color:var(--portfolio-accent)] [html[data-theme='dark']_&]:text-slate-100"
                            }`}
                          >
                            {item.title}
                          </div>
                          <div
                            className={`mt-1 text-[0.72rem] font-black uppercase tracking-[0.16em] transition-colors duration-300 ${
                              isActive
                                ? "text-slate-800 [html[data-theme='dark']_&]:text-slate-50"
                                : "text-slate-500 [html[data-theme='dark']_&]:text-slate-400"
                            }`}
                          >
                            {item.editions.length > 0 ? `${item.editions.length} Editions` : "Coming soon"}
                          </div>
                        </div>

                        <div
                          className={`mt-1 shrink-0 text-[0.72rem] font-black transition-colors duration-300 ${
                            isActive
                              ? "text-[color:var(--portfolio-accent)]"
                              : "text-slate-400 group-hover:text-[color:var(--portfolio-accent)]"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div
                        className={`relative z-10 mt-3 h-px w-full transition-all duration-300 ${
                          isActive ? "opacity-100" : "opacity-55 group-hover:opacity-100"
                        }`}
                        style={{
                          background: isActive
                            ? "linear-gradient(90deg,var(--portfolio-accent),rgba(159,123,40,0.12))"
                            : "linear-gradient(90deg,rgba(148,163,184,0.45),rgba(148,163,184,0.08))",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <div ref={contentTopRef} className="min-w-0 space-y-6">
          <article className="overflow-hidden rounded-[32px] border border-[color:var(--about-card-border)] bg-white/84 shadow-[0_26px_90px_rgba(22,16,10,0.08)] backdrop-blur-xl [html[data-theme='dark']_&]:bg-slate-950/82">
            <div className="relative min-h-[360px] overflow-hidden rounded-[32px] bg-[color:var(--portfolio-ink)] md:min-h-[420px]">
              <Image
                src={exhibition.detailImage}
                alt={exhibition.title}
                fill
                priority
                sizes="(min-width: 1280px) 68vw, 96vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,6,0.9)_0%,rgba(7,7,6,0.76)_32%,rgba(7,7,6,0.22)_68%,rgba(7,7,6,0.12)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,color-mix(in_srgb,var(--portfolio-accent)_28%,transparent),transparent_36%)]" />

              <div className="relative z-10 flex min-h-[360px] flex-col justify-between p-6 text-white md:min-h-[420px] md:p-8 lg:p-10">
                <div className="max-w-[44rem] space-y-4">
                  <h2 className="welcome-display-font max-w-[12ch] text-[2.7rem] font-black leading-[0.92] tracking-tight sm:text-[3.3rem] lg:text-[4.1rem]">
                    {exhibition.title}
                  </h2>
                  <p className="max-w-[36rem] text-base leading-relaxed text-white/80 md:text-lg">
                    {exhibition.overview}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold text-white/84">
                  <div className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-[color:var(--portfolio-accent)]" />
                    Since {showcaseMeta.firstYear}
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[color:var(--portfolio-accent)]" />
                    {showcaseMeta.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[color:var(--about-card-border)] bg-white/94 [html[data-theme='dark']_&]:bg-slate-950">
              <div className="grid gap-px bg-[color:var(--about-card-border)] sm:grid-cols-2 md:max-lg:grid-cols-3 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:grid-cols-5 [@media(min-width:1181px)_and_(max-width:1279px)]:grid-cols-5 xl:grid-cols-5">
                {summaryCards.map((card) => (
                  <div
                    key={card.label}
                    className="flex min-h-[132px] flex-col justify-center bg-white/94 px-5 py-5 text-left [html[data-theme='dark']_&]:bg-slate-950 md:px-6 md:max-lg:min-h-[92px] md:max-lg:px-3.5 md:max-lg:py-3.5 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:min-h-[108px] [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:px-4.5 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:py-4 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:min-h-[92px] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:px-3 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:py-3 [@media(min-width:1181px)_and_(max-width:1279px)]:min-h-[96px] [@media(min-width:1181px)_and_(max-width:1279px)]:px-3.5 [@media(min-width:1181px)_and_(max-width:1279px)]:py-3.5"
                  >
                    <div className="text-[2.4rem] font-black leading-none tracking-tight text-slate-950 [html[data-theme='dark']_&]:text-slate-50 md:text-[2.8rem] md:max-lg:text-[1.7rem] [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:text-[2.2rem] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:text-[1.65rem] [@media(min-width:1181px)_and_(max-width:1279px)]:text-[1.8rem]">
                      {card.value}
                    </div>
                    <div className="mt-3 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[color:var(--portfolio-accent)] md:max-lg:mt-2 md:max-lg:text-[0.58rem] md:max-lg:tracking-[0.14em] [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:text-[0.64rem] [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:tracking-[0.15em] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:mt-2 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:text-[0.56rem] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:tracking-[0.14em] [@media(min-width:1181px)_and_(max-width:1279px)]:mt-2 [@media(min-width:1181px)_and_(max-width:1279px)]:text-[0.6rem] [@media(min-width:1181px)_and_(max-width:1279px)]:tracking-[0.14em]">
                      {card.label}
                    </div>
                    <div className="mt-1 text-sm leading-snug text-slate-500 [html[data-theme='dark']_&]:text-slate-400 md:max-lg:text-[0.74rem] md:max-lg:leading-[1.2] [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:text-[0.8rem] [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:leading-[1.25] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:text-[0.72rem] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:leading-[1.2] [@media(min-width:1181px)_and_(max-width:1279px)]:text-[0.76rem] [@media(min-width:1181px)_and_(max-width:1279px)]:leading-[1.2]">
                      {card.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <section className="space-y-4">
            {editionCount > 0 ? (
              exhibition.editions.map((edition, index) => {
                const metrics = getEditionMetrics(edition);
                const visual = exhibition.galleryImages[index % exhibition.galleryImages.length] ?? exhibition.image;
                const previewImages = buildEditionPreviewImages(
                  [visual, exhibition.detailImage, ...exhibition.galleryImages],
                  exhibition.image,
                );
                const year = extractYear(edition.date);

                return (
                  <article
                    key={`${exhibition.id}-${edition.name}-${edition.date}`}
                    className="border-b border-[color:var(--about-card-border)] pb-8 last:border-b-0 last:pb-0"
                  >
                    <div className="grid gap-8 py-4 lg:grid-cols-[minmax(0,0.54fr)_minmax(0,1fr)] lg:items-start">
                      <div className="flex flex-col gap-6 pt-2 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:contents">
                        <div className="space-y-4 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:order-1">
                          <h3 className="text-[2.2rem] font-black tracking-tight text-slate-950 [html[data-theme='dark']_&]:text-slate-50 md:text-[2.8rem]">
                            {edition.name}
                          </h3>

                          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-slate-500 [html[data-theme='dark']_&]:text-slate-400">
                            <span className="inline-flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-[color:var(--portfolio-accent)]" />
                              {edition.date}
                            </span>
                            <span className="inline-flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-[color:var(--portfolio-accent)]" />
                              {edition.city}
                            </span>
                          </div>

                          <p className="max-w-[29rem] text-sm leading-relaxed text-slate-600 [html[data-theme='dark']_&]:text-slate-300 md:text-base">
                            {`${exhibition.title} in ${edition.city}, ${year}. Clean highlights, key numbers, and a quick gallery view from this edition.`}
                          </p>
                        </div>

                        {metrics.length > 0 ? (
                          <div className="grid grid-cols-2 gap-x-5 gap-y-4 border-t border-[color:var(--about-card-border)] pt-5 lg:rounded-[18px] lg:border lg:border-[color:var(--about-card-border)] lg:bg-white/78 lg:px-4 lg:py-3 lg:shadow-[0_10px_28px_rgba(18,18,18,0.05)] lg:border-t-0 lg:pt-3 lg:[html[data-theme='dark']_&]:bg-slate-950/78 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:gap-x-6 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:gap-y-5 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:px-5 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:py-4 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:order-3 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:col-span-2 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:grid-cols-4 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:items-center [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:gap-x-2 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:gap-y-0 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:rounded-[18px] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:border [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:border-[color:var(--about-card-border)] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:bg-white/78 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:px-4 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:py-3 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:shadow-[0_10px_28px_rgba(18,18,18,0.05)] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:[html[data-theme='dark']_&]:bg-slate-950/78 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:border-t-0 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:pt-3">
                            {metrics.map(({ label, value }) => (
                              <div key={label} className="min-w-0 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:text-center">
                                <div className="text-[1.7rem] font-black leading-none text-slate-950 [html[data-theme='dark']_&]:text-slate-50 [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:text-[2.2rem] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:text-[1.25rem]">
                                  {numberFormatter.format(value)}
                                </div>
                                <div className="mt-1 text-[0.74rem] font-black uppercase tracking-[0.14em] text-[color:var(--portfolio-accent)] [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:text-[0.76rem] [@media(orientation:portrait)_and_(min-width:768px)_and_(max-width:1023px)]:tracking-[0.12em] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:text-[0.58rem] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:tracking-[0.1em]">
                                  {label}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="border-t border-[color:var(--about-card-border)] pt-5 text-sm text-slate-500 [html[data-theme='dark']_&]:text-slate-400">
                            Stats for this edition will be added soon.
                          </div>
                        )}
                      </div>

                      <div className="[@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1279px)]:order-2">
                        <EditionGallery
                          accent={exhibition.theme.accent}
                          images={previewImages}
                          title={edition.name}
                        />
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="rounded-[28px] border border-dashed border-[color:var(--about-card-border)] bg-white/86 px-6 py-10 text-center shadow-[0_22px_80px_rgba(18,18,18,0.06)] backdrop-blur-xl [html[data-theme='dark']_&]:bg-slate-950/82">
                <div className="text-2xl font-black text-slate-950 [html[data-theme='dark']_&]:text-slate-50">
                  Edition archive coming soon
                </div>
                <p className="mt-2 text-sm text-slate-500 [html[data-theme='dark']_&]:text-slate-400">
                  This show will appear here with its full edition list once data is ready.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
