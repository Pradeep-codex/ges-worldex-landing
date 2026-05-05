"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { getEditionMetrics, portfolioExhibitions } from "@/lib/portfolio";

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

const metricMeta: Record<string, { label: string; note: string }> = {
  visitors: { label: "Visitors", note: "Across editions" },
  exhibitors: { label: "Exhibitors", note: "Participated" },
  reputedJewellers: { label: "Jewellers", note: "Featured" },
  stalls: { label: "Stalls", note: "Built and managed" },
  hostedBuyers: { label: "Hosted buyers", note: "Curated attendance" },
  jewelleryDesigns: { label: "Designs", note: "On showcase" },
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const totalImages = images.length;
  const goToPreviousImage = () => {
    setActiveImageIndex((current) => (current - 1 + totalImages) % totalImages);
  };
  const goToNextImage = () => {
    setActiveImageIndex((current) => (current + 1) % totalImages);
  };

  useEffect(() => {
    if (totalImages <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % totalImages);
    }, 1800);

    return () => window.clearInterval(timer);
  }, [totalImages]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-[color:var(--portfolio-accent-soft)]">
        <motion.div
          className="flex h-full"
          animate={{ x: `${activeImageIndex * -100}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {images.map((image, index) => (
            <div key={`${image}-${index}`} className="relative h-full min-w-full">
              <Image
                src={image}
                alt={`${title} gallery ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.04)_0%,rgba(10,10,10,0.18)_100%)]" />
      </div>

      {totalImages > 1 ? (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={goToPreviousImage}
            className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--about-card-border)] bg-white/80 text-slate-700 transition-colors hover:text-[color:var(--portfolio-accent)] [html[data-theme='dark']_&]:bg-slate-950/80 [html[data-theme='dark']_&]:text-slate-200"
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
                  onClick={() => setActiveImageIndex(index)}
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
            className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--about-card-border)] bg-white/80 text-slate-700 transition-colors hover:text-[color:var(--portfolio-accent)] [html[data-theme='dark']_&]:bg-slate-950/80 [html[data-theme='dark']_&]:text-slate-200"
            aria-label={`Show next ${title} gallery image`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function PortfolioShowcase() {
  const [activeExhibitionIndex, setActiveExhibitionIndex] = useState(0);
  const [hoveredExhibitionIndex, setHoveredExhibitionIndex] = useState<number | null>(null);
  const contentTopRef = useRef<HTMLDivElement | null>(null);
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

  return (
    <section
      className="relative mx-auto w-full max-w-[1720px] px-3 pb-16 pt-5 sm:px-4 md:px-8 md:pb-20 md:pt-6 lg:px-12 lg:pb-24 lg:pt-8"
      style={themeStyle}
    >
      <div className="pointer-events-none absolute inset-x-10 top-0 h-56 bg-[radial-gradient(circle_at_center,rgba(212,180,101,0.16),transparent_68%)] blur-3xl" />

      <div className="relative space-y-6 lg:space-y-0">
        <aside className="lg:fixed lg:left-[max(3rem,calc((100vw-1720px)/2+3rem))] lg:top-24 lg:z-10 lg:h-[calc(100vh-7rem)] lg:w-[300px] lg:overflow-hidden xl:w-[320px]">
          <div className="flex h-full flex-col overflow-hidden rounded-[30px] border border-[color:var(--about-card-border)] bg-white/88 p-4 shadow-[0_24px_80px_rgba(34,24,14,0.08)] backdrop-blur-xl [html[data-theme='dark']_&]:bg-slate-950/80">
            <div className="border-b border-[color:var(--about-card-border)] pb-4">
              <h1 className="text-3xl font-black tracking-tight text-slate-950 [html[data-theme='dark']_&]:text-slate-50">
                Our Shows
              </h1>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto pr-1">
              <div className="space-y-2">
                {portfolioExhibitions.map((item, index) => {
                  const isActive = index === activeExhibitionIndex;
                  const isHighlighted =
                    hoveredExhibitionIndex === index ||
                    (hoveredExhibitionIndex == null && isActive);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleExhibitionChange(index)}
                      onMouseEnter={() => setHoveredExhibitionIndex(index)}
                      onMouseLeave={() => setHoveredExhibitionIndex(null)}
                      onFocus={() => setHoveredExhibitionIndex(index)}
                      onBlur={() => setHoveredExhibitionIndex(null)}
                      className="group relative w-full cursor-pointer overflow-hidden px-3 py-3 text-left transition-colors duration-300"
                    >
                      {isHighlighted ? (
                        <motion.div
                          layoutId="portfolio-sidebar-highlight"
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(135deg, color-mix(in srgb, var(--portfolio-accent) 16%, white), color-mix(in srgb, var(--portfolio-accent) 4%, transparent) 68%)",
                            border: "1px solid color-mix(in srgb, var(--portfolio-accent) 38%, transparent)",
                          }}
                          transition={{ type: "spring", stiffness: 360, damping: 30, mass: 0.8 }}
                        />
                      ) : null}

                      <div className="flex items-start justify-between gap-3">
                        <div className="relative z-10 min-w-0">
                          <div
                            className={`text-[1rem] font-semibold leading-snug transition-colors duration-300 ${
                              isHighlighted
                                ? "text-[color:var(--portfolio-accent)]"
                                : "text-slate-900 group-hover:text-[color:var(--portfolio-accent)] [html[data-theme='dark']_&]:text-slate-100"
                            }`}
                          >
                            {item.title}
                          </div>
                          <div className="mt-1 text-[0.72rem] font-black uppercase tracking-[0.16em] text-slate-500 [html[data-theme='dark']_&]:text-slate-400">
                            {item.editions.length > 0 ? `${item.editions.length} Editions` : "Coming soon"}
                          </div>
                        </div>

                        <div
                          className={`mt-1 shrink-0 text-[0.72rem] font-black transition-colors duration-300 ${
                            isHighlighted
                              ? "text-[color:var(--portfolio-accent)]"
                              : "text-slate-400 group-hover:text-[color:var(--portfolio-accent)]"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div
                        className={`relative z-10 mt-3 h-px w-full transition-all duration-300 ${
                          isHighlighted ? "opacity-100" : "opacity-55 group-hover:opacity-100"
                        }`}
                        style={{
                          background: isHighlighted
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

        <div ref={contentTopRef} className="space-y-6 lg:pl-[324px] xl:pl-[348px]">
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
              <div className="grid gap-px bg-[color:var(--about-card-border)] sm:grid-cols-2 xl:grid-cols-5">
              {summaryCards.map((card) => (
                <div
                  key={card.label}
                  className="flex min-h-[132px] flex-col justify-center bg-white/94 px-5 py-5 text-left [html[data-theme='dark']_&]:bg-slate-950 md:px-6"
                >
                  <div className="text-[2.4rem] font-black leading-none tracking-tight text-slate-950 [html[data-theme='dark']_&]:text-slate-50 md:text-[2.8rem]">
                    {card.value}
                  </div>
                  <div className="mt-3 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[color:var(--portfolio-accent)]">
                    {card.label}
                  </div>
                  <div className="mt-1 text-sm leading-snug text-slate-500 [html[data-theme='dark']_&]:text-slate-400">
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
                      <div className="flex flex-col gap-6 pt-2">
                        <div className="space-y-4">
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
                          <div className="grid grid-cols-2 gap-x-5 gap-y-4 border-t border-[color:var(--about-card-border)] pt-5">
                            {metrics.map(({ label, value }) => (
                              <div key={label} className="min-w-0">
                                <div className="text-[1.7rem] font-black leading-none text-slate-950 [html[data-theme='dark']_&]:text-slate-50">
                                  {numberFormatter.format(value)}
                                </div>
                                <div className="mt-1 text-[0.74rem] font-black uppercase tracking-[0.14em] text-[color:var(--portfolio-accent)]">
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

                      <EditionGallery
                        accent={exhibition.theme.accent}
                        images={previewImages}
                        title={edition.name}
                      />
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
