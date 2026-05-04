import Image from "next/image";
import { ArrowRight } from "lucide-react";

const processHighlights = [
  "Strategic concept development",
  "Theme-led exhibition planning",
  "End-to-end vendor coordination",
  "On-ground execution support",
];

export function OurProcessSection() {
  return (
    <section className="px-3 sm:px-4 py-12 sm:py-20 md:px-8 md:py-24 lg:px-12 lg:py-28" style={{ backgroundColor: 'var(--about-bg-light)' }}>
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-3 sm:-inset-4 rounded-[34px] bg-[linear-gradient(135deg,rgba(199,162,74,0.22),rgba(255,255,255,0),rgba(23,19,13,0.08))] dark:bg-[linear-gradient(135deg,rgba(90,70,40,0.06),rgba(0,0,0,0),rgba(0,0,0,0.18))] blur-xl" />
          <div className="relative aspect-[16/11] overflow-hidden rounded-[20px] sm:rounded-[28px] bg-[#ece5d8] dark:bg-[#0b0a08] shadow-[0_28px_80px_rgba(23,19,13,0.18)] dark:shadow-none">
            <Image
              src="/about-images/abt1.JPG"
              alt="GES Worldex exhibition planning process"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(199,162,74,0.08),rgba(23,19,13,0.12))] dark:bg-[linear-gradient(135deg,rgba(0,0,0,0.06),rgba(90,70,40,0.04),rgba(0,0,0,0.18))]" />
          </div>
        </div>

        <div className="order-1 flex items-center lg:order-2">
          <div className="max-w-[520px] space-y-7">
            <div className="h-1 w-16 rounded-full bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)]" />
            <div className="space-y-4">
              <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-sm font-black uppercase tracking-[0.22em] text-transparent">
                Our Process
              </p>
              <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl" style={{ color: 'var(--about-text-primary)' }}>
                From clear strategy to flawless exhibition delivery.
              </h2>
              <p className="text-base leading-8 md:text-lg" style={{ color: 'var(--about-text-secondary)' }}>
                We begin with the business objective, shape it into a focused exhibition concept, and manage every operational detail so the final experience feels seamless, purposeful, and built for measurable impact.
              </p>
            </div>

            <div className="grid gap-3">
              {processHighlights.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-bold md:text-base" style={{ color: 'var(--about-text-primary)' }}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#e6d3a7]" style={{ backgroundColor: 'rgba(199, 162, 74, 0.14)' }}>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
