import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfolioExhibitions } from "@/lib/portfolio";

export function PortfolioExhibitionSections() {
  return (
    <section
      id="portfolio-exhibitions"
      className="mx-auto w-full max-w-[1700px] px-4 pb-16 md:px-8 md:pb-20 lg:px-12 lg:pb-24"
      aria-label="Portfolio exhibitions"
    >
      <div className="space-y-8 lg:space-y-10">
        {portfolioExhibitions.map((exhibition, index) => {
          const isReversed = index % 2 === 1;

          return (
            <article
              key={exhibition.id}
              id={exhibition.id}
              className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/72 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm [html[data-theme='dark']_&]:border-slate-800/80 [html[data-theme='dark']_&]:bg-slate-950/68"
            >
              <div className={`grid gap-0 lg:grid-cols-2 ${isReversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative min-h-[280px] overflow-hidden bg-white lg:min-h-[460px] [html[data-theme='dark']_&]:bg-slate-950">
                  <Image
                    src={exhibition.image}
                    alt={exhibition.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain p-8 md:p-12"
                  />
                  <div className="absolute left-5 top-5 rounded-full border border-slate-200/80 bg-white/84 px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur-md [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-slate-950/70 [html[data-theme='dark']_&]:text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-8 p-6 md:p-8 lg:p-10">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="text-[0.7rem] font-black uppercase tracking-[0.24em] text-sky-700 [html[data-theme='dark']_&]:text-sky-300">
                        {exhibition.label}
                      </p>
                      <h2 className="welcome-display-font text-[2.35rem] font-black leading-[0.94] tracking-tight text-slate-950 md:text-[3.2rem] [html[data-theme='dark']_&]:text-slate-50">
                        {exhibition.title}
                      </h2>
                      <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg [html[data-theme='dark']_&]:text-slate-300">
                        {exhibition.overview}
                      </p>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {exhibition.focus.map((item) => (
                        <div
                          key={item}
                          className="rounded-full bg-slate-100/80 px-4 py-2 text-sm font-bold text-slate-600 [html[data-theme='dark']_&]:bg-slate-900/80 [html[data-theme='dark']_&]:text-slate-300"
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/portfolio/${exhibition.id}`}
                      className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#2f2318] px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[#9f7b28] active:scale-95 [html[data-theme='dark']_&]:bg-[#d8b766] [html[data-theme='dark']_&]:text-[#071018] [html[data-theme='dark']_&]:hover:bg-[#f0d188]"
                    >
                      Explore Editions
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
