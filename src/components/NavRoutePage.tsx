import Link from "next/link";
import { ArrowRight } from "lucide-react";

type NavRoutePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  points?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export function NavRoutePage({
  eyebrow,
  title,
  description,
  points = [],
  ctaLabel = "Start a conversation",
  ctaHref = "/contact",
}: NavRoutePageProps) {
  return (
    <main className="mx-auto w-full max-w-[1700px] px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-24">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="space-y-5">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-foreground md:text-6xl">
            {title}
          </h1>
        </div>
        <div className="space-y-6">
          <p className="max-w-2xl text-lg leading-relaxed text-foreground/70 md:text-xl">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-3 rounded-full bg-[#2f2318] px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-[#9f7b28] active:scale-95 [html[data-theme='dark']_&]:bg-[#d8b766] [html[data-theme='dark']_&]:text-[#071018] [html[data-theme='dark']_&]:hover:bg-[#f0d188]"
          >
            {ctaLabel}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {points.length > 0 && (
        <section className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20">
          {points.map((point) => (
            <div key={point} className="rounded-[8px] border border-foreground/10 bg-background/70 p-6 shadow-lg shadow-foreground/5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
                <ArrowRight className="h-4 w-4" />
              </div>
              <p className="mt-5 text-base font-bold leading-relaxed text-foreground/80">
                {point}
              </p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
