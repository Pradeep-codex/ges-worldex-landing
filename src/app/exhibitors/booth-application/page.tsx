import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

export const metadata: Metadata = { title: "Booth Application" };

export default async function BoothApplicationPage() {
  return (
    <main className="mx-auto w-full max-w-[1700px] px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-24">
      <section className="mx-auto max-w-[980px] rounded-[32px] border p-8 shadow-[0_24px_80px_rgba(47,35,24,0.08)] md:p-10">
        <div className="space-y-5">
          <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-sm font-black uppercase tracking-[0.2em] text-transparent">
            Booth Application
          </p>
          <h1
            className="welcome-display-font text-[clamp(2.3rem,6vw,4.4rem)] font-black leading-[0.94] tracking-tight"
            style={{ color: "var(--about-text-primary)" }}
          >
            The booth requirement application for SSI Delhi 2026 is now closed.
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed" style={{ color: "var(--about-text-secondary)" }}>
            For enquiries, contact admin at 9844000544.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="tel:+919844000544"
            className="inline-flex items-center gap-3 rounded-full bg-[#2f2318] px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-[#9f7b28] active:scale-95 [html[data-theme='dark']_&]:bg-[#d8b766] [html[data-theme='dark']_&]:text-[#071018] [html[data-theme='dark']_&]:hover:bg-[#f0d188]"
          >
            <Phone className="h-4 w-4" />
            Call Admin
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full border px-7 py-4 text-sm font-black uppercase tracking-widest transition-all hover:border-[#9f7b28] active:scale-95"
            style={{ borderColor: "var(--about-card-border)", color: "var(--about-text-primary)" }}
          >
            Contact Team
          </Link>
        </div>
      </section>
    </main>
  );
}
