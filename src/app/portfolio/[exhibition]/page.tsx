import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Sparkles } from "lucide-react";
import {
  getEditionMetrics,
  getPortfolioExhibition,
  portfolioExhibitions,
} from "@/lib/portfolio";

type PortfolioDetailPageProps = {
  params: Promise<{
    exhibition: string;
  }>;
};

type ExhibitionThemeStyle = CSSProperties & {
  "--accent": string;
  "--accent-soft": string;
  "--ink": string;
};

export function generateStaticParams() {
  return portfolioExhibitions.map((exhibition) => ({
    exhibition: exhibition.id,
  }));
}

export async function generateMetadata({
  params,
}: PortfolioDetailPageProps): Promise<Metadata> {
  const { exhibition: exhibitionId } = await params;
  const exhibition = getPortfolioExhibition(exhibitionId);

  if (!exhibition) {
    return {
      title: "Portfolio Exhibition",
    };
  }

  return {
    title: exhibition.title,
    description: exhibition.overview,
  };
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { exhibition: exhibitionId } = await params;
  const exhibition = getPortfolioExhibition(exhibitionId);

  if (!exhibition) {
    notFound();
  }

  const themeStyle: ExhibitionThemeStyle = {
    "--accent": exhibition.theme.accent,
    "--accent-soft": exhibition.theme.accentSoft,
    "--ink": exhibition.theme.ink,
  };

  const featuredStats = exhibition.editions
    .flatMap((edition) => getEditionMetrics(edition))
    .reduce<Record<string, number>>((acc, metric) => {
      acc[metric.label] = (acc[metric.label] ?? 0) + metric.value;
      return acc;
    }, {});

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={themeStyle}>
      <section className="mx-auto w-full max-w-[1700px] px-4 pb-12 pt-10 md:px-8 md:pb-16 md:pt-14 lg:px-12 lg:pb-18">
        <Link
          href="/portfolio#portfolio-exhibitions"
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/76 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-700 shadow-sm transition-colors hover:text-[color:var(--accent)] [html[data-theme='dark']_&]:bg-slate-900/72 [html[data-theme='dark']_&]:text-slate-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Portfolio
        </Link>

        <div className="overflow-hidden rounded-[34px] bg-[color:var(--ink)] shadow-[0_32px_110px_rgba(15,23,42,0.2)]">
          <div className="grid min-h-[680px] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative flex flex-col justify-between p-6 text-white md:p-10 lg:p-12">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),transparent_42%),radial-gradient(circle_at_18%_12%,var(--accent)_0%,transparent_34%)] opacity-80" />
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-white/82 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-[color:var(--accent)]" />
                  {exhibition.label}
                </div>
                <div className="space-y-5">
                  <h1 className="welcome-display-font max-w-[10ch] text-[3.4rem] font-black leading-[0.88] tracking-tight md:text-[5.4rem]">
                    {exhibition.title}
                  </h1>
                  <p className="max-w-xl text-base leading-relaxed text-white/72 md:text-lg">
                    {exhibition.overview}
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-10 grid gap-3 sm:grid-cols-2">
                {exhibition.focus.map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-bold text-white/76 backdrop-blur-md"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative grid min-h-[520px] grid-rows-[1fr_auto] bg-white">
              <div className="relative m-4 overflow-hidden rounded-[26px] bg-[color:var(--accent-soft)] md:m-6">
                <Image
                  src={exhibition.detailImage}
                  alt={`${exhibition.title} exhibition environment`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 92vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0.34)_100%)]" />

                <div className="absolute bottom-5 left-5 right-5 rounded-[22px] bg-white/92 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                  <div className="relative h-24">
                    <Image
                      src={exhibition.image}
                      alt={`${exhibition.title} logo`}
                      fill
                      sizes="(min-width: 1024px) 38vw, 80vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 px-4 pb-4 md:px-6 md:pb-6">
                {exhibition.galleryImages.map((image) => (
                  <div
                    key={image}
                    className="relative h-28 overflow-hidden rounded-[18px] bg-slate-100"
                  >
                    <Image
                      src={image}
                      alt={`${exhibition.title} visual`}
                      fill
                      sizes="(min-width: 1024px) 18vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1700px] px-4 pb-16 md:px-8 md:pb-20 lg:px-12 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[28px] bg-[color:var(--ink)] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-white/58">
                Editions
              </p>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-6xl font-black leading-none text-[color:var(--accent)]">
                  {exhibition.editions.length || "-"}
                </span>
                <span className="pb-2 text-sm font-bold uppercase tracking-[0.14em] text-white/54">
                  Records
                </span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-white/68">
                A color-coded performance view built to compare each edition without making the page feel like a spreadsheet.
              </p>
            </div>

            {Object.keys(featuredStats).length > 0 ? (
              <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] [html[data-theme='dark']_&]:bg-slate-950">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-[color:var(--accent)]">
                  Cumulative Impact
                </p>
                <div className="mt-5 grid gap-3">
                  {Object.entries(featuredStats).map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[18px] bg-[color:var(--accent-soft)] px-4 py-4"
                    >
                      <div className="text-3xl font-black leading-none text-slate-950">
                        {value.toLocaleString("en-IN")}
                      </div>
                      <div className="mt-2 text-[0.66rem] font-black uppercase tracking-[0.12em] text-slate-600">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="relative min-h-[240px] overflow-hidden rounded-[28px] bg-white shadow-[0_18px_60px_rgba(15,23,42,0.06)] [html[data-theme='dark']_&]:bg-slate-950">
              <Image
                src={exhibition.image}
                alt={`${exhibition.title} mark`}
                fill
                sizes="(min-width: 1024px) 22vw, 92vw"
                className="object-contain p-8"
              />
            </div>
          </aside>

          <div className="space-y-5">
            {exhibition.editions.length > 0 ? (
              exhibition.editions.map((edition, index) => {
                const metrics = getEditionMetrics(edition);
                const visual = exhibition.galleryImages[index % exhibition.galleryImages.length];

                return (
                  <article
                    key={`${edition.name}-${edition.date}`}
                    className="group overflow-hidden rounded-[30px] bg-white shadow-[0_18px_70px_rgba(15,23,42,0.065)] transition-transform duration-300 hover:-translate-y-1 [html[data-theme='dark']_&]:bg-slate-950"
                  >
                    <div className="grid lg:grid-cols-[210px_1fr]">
                      <div className="relative min-h-[190px] bg-[color:var(--accent-soft)]">
                        <Image
                          src={visual}
                          alt={`${edition.name} visual`}
                          fill
                          sizes="(min-width: 1024px) 18vw, 92vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.36))]" />
                        <div className="absolute bottom-4 left-4 rounded-full bg-white/92 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-slate-900 backdrop-blur-md">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="p-5 md:p-6">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[0.72rem] font-black uppercase tracking-[0.15em] text-[color:var(--accent)]">
                              <CalendarDays className="h-3.5 w-3.5" />
                              {edition.date}
                            </div>
                            <h2 className="text-2xl font-black text-slate-950 md:text-3xl [html[data-theme='dark']_&]:text-slate-50">
                              {edition.name}
                            </h2>
                          </div>
                          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-slate-600 [html[data-theme='dark']_&]:bg-slate-900 [html[data-theme='dark']_&]:text-slate-300">
                            <MapPin className="h-3.5 w-3.5" />
                            {edition.city}
                          </div>
                        </div>

                        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                          {metrics.map(({ label, value }) => (
                            <div
                              key={label}
                              className="rounded-[18px] border border-slate-200/70 bg-slate-50 px-4 py-4 [html[data-theme='dark']_&]:border-slate-800 [html[data-theme='dark']_&]:bg-slate-900/70"
                            >
                              <div className="text-[2rem] font-black leading-none text-slate-950 [html[data-theme='dark']_&]:text-slate-50">
                                {value.toLocaleString("en-IN")}
                              </div>
                              <div className="mt-2 text-[0.66rem] font-black uppercase leading-snug tracking-[0.12em] text-slate-500">
                                {label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="grid min-h-[420px] overflow-hidden rounded-[30px] bg-white shadow-[0_18px_70px_rgba(15,23,42,0.065)] lg:grid-cols-[0.9fr_1.1fr] [html[data-theme='dark']_&]:bg-slate-950">
                <div className="relative min-h-[260px] bg-[color:var(--accent-soft)]">
                  <Image
                    src={exhibition.detailImage}
                    alt={`${exhibition.title} preview`}
                    fill
                    sizes="(min-width: 1024px) 36vw, 92vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <h2 className="text-3xl font-black text-slate-950 [html[data-theme='dark']_&]:text-slate-50">
                    Edition statistics coming soon
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 [html[data-theme='dark']_&]:text-slate-400">
                    This page is ready for city-wise edition data and image additions when the statistics are available.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
