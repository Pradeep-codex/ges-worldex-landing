import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PortfolioIntro() {
  return (
    <section className="relative mx-auto w-full max-w-[1700px] overflow-hidden px-4 pb-10 pt-10 md:px-8 md:pb-14 md:pt-14 lg:px-12 lg:pb-18 lg:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-sky-200 bg-white/75 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.24em] text-sky-700 shadow-sm backdrop-blur-sm [html[data-theme='dark']_&]:border-sky-400/20 [html[data-theme='dark']_&]:bg-slate-900/70 [html[data-theme='dark']_&]:text-sky-200">
            Portfolio
          </div>

          <div className="space-y-5">
            <h1 className="welcome-display-font max-w-[12ch] text-[3rem] font-black leading-[0.9] tracking-tight text-slate-950 md:text-[4.5rem] lg:text-[5.4rem] [html[data-theme='dark']_&]:text-slate-50">
              Exhibition Platforms Built For Impact
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-xl [html[data-theme='dark']_&]:text-slate-300">
              A focused look at the expo environments GES Worldex develops across luxury, infrastructure,
              design, mobility, and trade-led categories, with edition-level snapshots for every platform.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="#portfolio-exhibitions"
              className="group inline-flex items-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-sky-700 active:scale-95 [html[data-theme='dark']_&]:bg-white [html[data-theme='dark']_&]:text-slate-950 [html[data-theme='dark']_&]:hover:bg-sky-200"
            >
              Explore Work
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white/70 px-7 py-4 text-sm font-black uppercase tracking-widest text-slate-800 backdrop-blur-sm transition-all hover:border-sky-300 hover:text-sky-700 active:scale-95 [html[data-theme='dark']_&]:border-slate-700 [html[data-theme='dark']_&]:bg-slate-900/60 [html[data-theme='dark']_&]:text-slate-100 [html[data-theme='dark']_&]:hover:border-sky-400"
            >
              Start Inquiry
            </Link>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[34px] border border-white/60 bg-slate-950 shadow-[0_34px_100px_rgba(15,23,42,0.18)] [html[data-theme='dark']_&]:border-white/10">
          <Image
            src="/exhibition/expo1.jpg"
            alt="GES Worldex exhibition portfolio"
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 92vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.28)_42%,rgba(2,6,23,0.9)_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="grid grid-cols-3 gap-3">
              {[
                ["6", "Core exhibition lines"],
                ["400+", "Projects delivered"],
                ["20+", "Strategic markets"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[8px] border p-4 backdrop-blur-md"
                  style={{
                    backgroundColor: "rgba(255, 253, 248, 0.9)",
                    borderColor: "var(--about-card-border)",
                  }}
                >
                  <div className="text-2xl font-black md:text-3xl" style={{ color: "var(--about-text-primary)" }}>
                    {value}
                  </div>
                  <div
                    className="mt-1 text-[0.68rem] font-bold uppercase leading-snug tracking-[0.16em]"
                    style={{ color: "var(--about-text-secondary)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
