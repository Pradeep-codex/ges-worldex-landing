import type { Metadata } from "next";
import { AboutHero } from "@/components/AboutHero";
import { OurStorySection } from "@/components/OurStorySection";
import { OurProcessSection } from "@/components/OurProcessSection";
import { VisionMottoSection } from "@/components/VisionMottoSection";
import { TimelineSection } from "@/components/TimelineSection";

export const metadata: Metadata = {
  title: "About GES Worldex",
  description:
    "Learn how GES Worldex builds international exhibition platforms that connect service providers, brands, products, and business leaders.",
};

const metrics = [
  { value: "12K+", label: "Exhibitors" },
  { value: "3K+", label: "Brands" },
  { value: "50K+", label: "Products" },
  { value: "500K+", label: "Visitors" },
];

export default function AboutPage() {
  return (
    <main className="relative w-full overflow-x-clip bg-[#f8f6f2]">
      <AboutHero />

      <OurStorySection />

      <VisionMottoSection />

      <OurProcessSection />

      <TimelineSection />

      <section className="mx-auto w-full max-w-[1320px] border-t border-[#17130d]/10 px-4 py-12 md:px-8 md:py-16 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-3">
            <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-sm font-black uppercase tracking-[0.2em] text-transparent">
              Exhibition Metrics
            </p>
            <h2 className="text-3xl font-black tracking-tight text-[#17130d] md:text-5xl">
              Bigger reach, sharper brand presence, stronger product discovery.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-[8px] border border-[#17130d]/10 bg-white/50 p-5 shadow-lg shadow-[#17130d]/5">
                <div className="text-3xl font-black text-[#17130d] md:text-4xl">{metric.value}</div>
                <div className="mt-2 text-sm font-bold uppercase tracking-widest text-[#5f574c]">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
