import type { Metadata } from "next";
import { AboutHero } from "@/components/AboutHero";
import { OurStorySection } from "@/components/OurStorySection";
import { OurProcessSection } from "@/components/OurProcessSection";
import { ManagingDirectorSection } from "@/components/ManagingDirectorSection";
import { VisionMottoSection } from "@/components/VisionMottoSection";
import { TimelineSection } from "@/components/TimelineSection";

export const metadata: Metadata = {
  title: "About GES Worldex",
  description:
    "Learn how GES Worldex builds international exhibition platforms that connect service providers, brands, products, and business leaders.",
};

const metrics = [
  { value: "400+", label: "Exhibitions" },
  { value: "4K+", label: "Brands" },
  { value: "10M+", label: "Products" },
  { value: "100K+", label: "Visitors" },
];

export default function AboutPage() {
  return (
    <main className="relative w-full overflow-x-clip" style={{ backgroundColor: 'var(--about-bg-light)' }}>
      <AboutHero />

      <OurStorySection />

      <TimelineSection />

      <ManagingDirectorSection />

      <VisionMottoSection />

      <OurProcessSection />

      <section className="mx-auto w-full max-w-[1320px] px-3 sm:px-4 py-8 sm:py-12 md:px-8 md:py-16 lg:px-12" style={{ borderTopColor: 'var(--about-card-border)', borderTopWidth: '1px' }}>
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-3">
            <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-sm font-black uppercase tracking-[0.2em] text-transparent">
              Exhibition Metrics
            </p>
            <h2
              className="text-xl font-black tracking-tight sm:text-2xl md:text-3xl lg:text-5xl"
              style={{ color: "var(--about-text-primary)" }}
            >
              <span className="block">Expand Your Reach.</span>
              <span className="block">Elevate Your Brand.</span>
              <span className="block">Multiply Opportunities.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[8px] p-3 sm:p-4 md:p-5"
                style={{
                  backgroundColor: 'var(--about-card-bg)',
                  borderColor: 'var(--about-card-border)',
                  borderWidth: '1px'
                }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black" style={{ color: 'var(--about-text-primary)' }}>{metric.value}</div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--about-text-secondary)' }}>{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
