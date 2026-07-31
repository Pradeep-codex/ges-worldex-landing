import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Phone } from "lucide-react";
import { getExhibitorPageSetting } from "@/lib/exhibitorPageSettings";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Booth Application" };
export const dynamic = "force-dynamic";

export default async function BoothApplicationPage() {
  const setting = await getExhibitorPageSetting("exhibitors/booth-application");

  if (setting?.pageMode === "url" && setting.externalUrl) {
    redirect(setting.externalUrl);
  }

  const content = mergeNavPageContent(
    navPageFallbacks["exhibitors/booth-application"],
    setting?.staticContent,
  );
  const primaryCtaLabel = setting?.staticContent?.primaryCtaLabel || "Call Admin";
  const primaryCtaHref = setting?.staticContent?.primaryCtaHref || "tel:+919844000544";
  const secondaryCtaLabel = setting?.staticContent?.secondaryCtaLabel || "Contact Team";
  const secondaryCtaHref = setting?.staticContent?.secondaryCtaHref || "/contact";
  const isPhoneCta = primaryCtaHref.startsWith("tel:");

  return (
    <main className="mx-auto w-full max-w-[1700px] px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-24">
      <section className="mx-auto max-w-[980px] rounded-[32px] border p-8 shadow-[0_24px_80px_rgba(47,35,24,0.08)] md:p-10">
        <div className="space-y-5">
          <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-sm font-black uppercase tracking-[0.2em] text-transparent">
            {content.eyebrow}
          </p>
          <h1
            className="welcome-display-font text-[clamp(2.3rem,6vw,4.4rem)] font-black leading-[0.94] tracking-tight"
            style={{ color: "var(--about-text-primary)" }}
          >
            {content.title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed" style={{ color: "var(--about-text-secondary)" }}>
            {content.description}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={primaryCtaHref}
            className="inline-flex items-center gap-3 rounded-full bg-[#2f2318] px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-[#9f7b28] active:scale-95 [html[data-theme='dark']_&]:bg-[#d8b766] [html[data-theme='dark']_&]:text-[#071018] [html[data-theme='dark']_&]:hover:bg-[#f0d188]"
          >
            {isPhoneCta ? <Phone className="h-4 w-4" /> : null}
            {primaryCtaLabel}
          </a>
          <Link
            href={secondaryCtaHref}
            className="inline-flex items-center gap-3 rounded-full border px-7 py-4 text-sm font-black uppercase tracking-widest transition-all hover:border-[#9f7b28] active:scale-95"
            style={{ borderColor: "var(--about-card-border)", color: "var(--about-text-primary)" }}
          >
            {secondaryCtaLabel}
          </Link>
        </div>

        {content.points.length > 0 ? (
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {content.points.map((point) => (
              <div
                key={point}
                className="rounded-[18px] border px-4 py-3 text-sm font-bold"
                style={{ borderColor: "var(--about-card-border)", color: "var(--about-text-secondary)" }}
              >
                {point}
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
