"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, X } from "lucide-react";
import { exhibitionSlides } from "@/lib/exhibitionSlides";

const INTEREST_ENDPOINT =
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL || "/api/visitor-interest";

function normalizeMobileNumber(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

const registrationCards = [
  ...exhibitionSlides.map((slide) => ({
    ...slide,
    isActive: slide.title === "Delhi's 3rd Edition - 2026",
    isPlaceholder: false,
  })),
  {
    id: "ssi-coming-soon-placeholder",
    cityLabel: "",
    title: "",
    description: "",
    date: "",
    venue: "",
    image: "",
    isActive: false,
    isPlaceholder: true,
  },
];

export function VisitorRegistrationClient() {
  const [activeFormId, setActiveFormId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const activeSlide = registrationCards.find((slide) => slide.id === activeFormId) ?? null;

  const closeModal = () => {
    setActiveFormId(null);
    setCompanyName("");
    setMobileNumber("");
    setSubmitState("idle");
    setSubmitMessage(null);
  };

  async function handleInterestSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!activeSlide) return;

    const normalizedCompanyName = companyName.trim();
    const normalizedMobileNumber = normalizeMobileNumber(mobileNumber);

    if (normalizedCompanyName.length < 2) {
      setSubmitState("error");
      setSubmitMessage("Please enter your company name.");
      return;
    }

    if (normalizedMobileNumber.length !== 10) {
      setSubmitState("error");
      setSubmitMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitState("submitting");
    setSubmitMessage(null);

    try {
      const isDirectWebhook = INTEREST_ENDPOINT !== "/api/visitor-interest";
      const response = await fetch(INTEREST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        mode: isDirectWebhook ? "no-cors" : "cors",
        body: JSON.stringify({
          companyName: normalizedCompanyName,
          mobileNumber: normalizedMobileNumber,
          showTitle: activeSlide.title,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (isDirectWebhook) {
        setSubmitState("success");
        setSubmitMessage("Interest submitted successfully.");
        setCompanyName("");
        setMobileNumber("");
        return;
      }

      const data = (await response.json().catch(() => null)) as null | { ok?: boolean; error?: string };
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Unable to submit your interest.");
      }

      setSubmitState("success");
      setSubmitMessage("Interest submitted successfully.");
      setCompanyName("");
      setMobileNumber("");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "Unable to submit your interest.");
    }
  }

  return (
    <>
    <main className={`${activeFormId ? "pointer-events-none select-none blur-[10px]" : ""} mx-auto max-w-[1700px] px-4 py-12 transition-[filter] duration-300 md:px-8 md:py-16 lg:px-12 lg:py-24`}>
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="space-y-5">
          <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-sm font-black uppercase tracking-[0.2em] text-transparent">
            Visitor Registration
          </p>
          <h1
            className="welcome-display-font max-w-[12ch] text-[clamp(2.6rem,7vw,5rem)] font-black leading-[0.94] tracking-tight"
            style={{ color: "var(--about-text-primary)" }}
          >
            Choose the show you want to visit.
          </h1>
        </div>
        <div className="space-y-6">
          <p
            className="max-w-2xl text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--about-text-secondary)" }}
          >
            Explore the upcoming exhibition lineup and pick the event that matches your business interest. Each show card highlights the venue, date, and banner artwork in the same GES Worldex theme.
          </p>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {registrationCards.map((slide) => (
          <article
            key={slide.id}
            className="flex h-full flex-col overflow-hidden rounded-[22px] border shadow-[0_18px_56px_rgba(47,35,24,0.08)]"
            style={{
              backgroundColor: "var(--about-card-bg)",
              borderColor: "var(--about-card-border)",
            }}
          >
            {slide.isPlaceholder ? (
              <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="aspect-[4/3] rounded-[18px] bg-[rgba(159,123,40,0.08)]" />
                <div className="space-y-3">
                  <div className="h-3 w-24 rounded-full bg-[rgba(159,123,40,0.12)]" />
                  <div className="h-6 w-3/4 rounded-full bg-[rgba(47,35,24,0.08)]" />
                  <div className="h-4 w-full rounded-full bg-[rgba(47,35,24,0.06)]" />
                  <div className="h-4 w-5/6 rounded-full bg-[rgba(47,35,24,0.06)]" />
                </div>
                <div className="grid gap-3">
                  <div className="h-[4.25rem] rounded-[16px] border bg-[rgba(159,123,40,0.04)]" style={{ borderColor: "var(--about-card-border)" }} />
                  <div className="h-[4.75rem] rounded-[16px] border bg-[rgba(159,123,40,0.04)]" style={{ borderColor: "var(--about-card-border)" }} />
                </div>
                <div
                  className="mt-auto inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-[rgba(159,123,40,0.18)] bg-[linear-gradient(180deg,rgba(255,247,232,0.92)_0%,rgba(244,221,171,0.88)_100%)] px-5 py-3.5 text-sm font-black uppercase tracking-[0.12em] shadow-[0_18px_34px_rgba(159,123,40,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01]"
                  style={{
                    borderColor: "var(--about-card-border)",
                    color: "var(--about-text-primary)",
                  }}
                >
                  Interested
                </div>
              </div>
            ) : (
              <>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(min-width: 1280px) 23vw, (min-width: 768px) 46vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-4">
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#9f7b28]">
                      {slide.cityLabel}
                    </p>
                    <h2
                      className="min-h-[3.5rem] text-lg font-black leading-tight"
                      style={{ color: "var(--about-text-primary)" }}
                    >
                      {slide.title}
                    </h2>
                    <p
                      className="min-h-[6rem] text-sm leading-6"
                      style={{ color: "var(--about-text-secondary)" }}
                    >
                      {slide.description}
                    </p>
                  </div>

                  <div className="grid gap-3 text-sm" style={{ color: "var(--about-text-secondary)" }}>
                    <div className="flex min-h-[4.25rem] items-start gap-3 rounded-[16px] border px-3 py-2.5" style={{ borderColor: "var(--about-card-border)" }}>
                      <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#9f7b28]" />
                      <span>{slide.date}</span>
                    </div>
                    <div className="flex min-h-[4.75rem] items-start gap-3 rounded-[16px] border px-3 py-2.5" style={{ borderColor: "var(--about-card-border)" }}>
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#9f7b28]" />
                      <span>{slide.venue}</span>
                    </div>
                  </div>

                  <div className="mt-auto space-y-3">
                    {slide.isActive ? (
                      <a
                        href="https://gesworldex.com/ssidelhi"
                        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#2f2318] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition-all hover:bg-[#9f7b28] active:scale-95 [html[data-theme='dark']_&]:bg-[#d8b766] [html[data-theme='dark']_&]:text-[#071018] [html[data-theme='dark']_&]:hover:bg-[#f0d188]"
                      >
                        Register
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveFormId(slide.id);
                          setSubmitState("idle");
                          setSubmitMessage(null);
                        }}
                        className="group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-[#cda24c] bg-[linear-gradient(180deg,rgba(255,247,232,0.95)_0%,rgba(244,221,171,0.92)_100%)] px-5 py-3.5 text-sm font-black uppercase tracking-[0.12em] shadow-[0_18px_34px_rgba(159,123,40,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9f7b28] hover:shadow-[0_24px_40px_rgba(159,123,40,0.2)] active:scale-95"
                        style={{
                          color: "var(--about-text-primary)",
                        }}
                      >
                        Interested
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </article>
        ))}
      </section>
    </main>
    {activeSlide ? (
      <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[rgba(10,12,16,0.34)] px-4 py-8 backdrop-blur-md">
        <div
          className="w-full max-w-[28rem] rounded-[28px] border p-5 shadow-[0_30px_90px_rgba(20,14,10,0.18)] md:p-6"
          style={{
            backgroundColor: "var(--about-card-bg)",
            borderColor: "var(--about-card-border)",
          }}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9f7b28]">
                Show Interest
              </p>
              <h2 className="text-2xl font-black leading-tight" style={{ color: "var(--about-text-primary)" }}>
                {activeSlide.title}
              </h2>
              <p className="text-sm leading-6" style={{ color: "var(--about-text-secondary)" }}>
                Share your company details and we will capture your interest against this show.
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
              style={{ borderColor: "var(--about-card-border)", color: "var(--about-text-secondary)" }}
              aria-label="Close interest form"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          <form className="grid gap-4" onSubmit={handleInterestSubmit}>
            <input type="hidden" value={activeSlide.title} name="showTitle" />
            <label className="grid gap-1.5">
              <span className="text-[0.68rem] font-black uppercase tracking-[0.16em]" style={{ color: "var(--about-text-secondary)" }}>
                Show
              </span>
              <div
                className="rounded-[14px] border px-4 py-3 text-sm font-semibold"
                style={{ borderColor: "var(--about-card-border)", color: "var(--about-text-primary)" }}
              >
                {activeSlide.title}
              </div>
            </label>
            <label className="grid gap-1.5">
              <span className="text-[0.68rem] font-black uppercase tracking-[0.16em]" style={{ color: "var(--about-text-secondary)" }}>
                Company Name
              </span>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your company name"
                className="h-12 rounded-[14px] border bg-white/60 px-4 text-sm font-semibold outline-none [html[data-theme='dark']_&]:bg-slate-900/88"
                style={{ borderColor: "var(--about-card-border)", color: "var(--about-text-primary)" }}
                required
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-[0.68rem] font-black uppercase tracking-[0.16em]" style={{ color: "var(--about-text-secondary)" }}>
                Mobile Number
              </span>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(normalizeMobileNumber(e.target.value))}
                placeholder="Enter 10-digit mobile number"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                pattern="[0-9]{10}"
                className="h-12 rounded-[14px] border bg-white/60 px-4 text-sm font-semibold outline-none [html[data-theme='dark']_&]:bg-slate-900/88"
                style={{ borderColor: "var(--about-card-border)", color: "var(--about-text-primary)" }}
                required
              />
            </label>

            {submitMessage ? (
              <div
                className="rounded-[16px] border px-4 py-3 text-sm font-semibold"
                style={{
                  borderColor: "rgba(159,123,40,0.22)",
                  backgroundColor: submitState === "success" ? "rgba(159,123,40,0.08)" : "rgba(47,35,24,0.06)",
                  color: "var(--about-text-primary)",
                }}
              >
                {submitMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitState === "submitting"}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#2f2318] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 [html[data-theme='dark']_&]:bg-[#d8b766] [html[data-theme='dark']_&]:text-[#071018]"
            >
              {submitState === "submitting" ? "Submitting..." : "Submit Interest"}
            </button>
          </form>
        </div>
      </div>
    ) : null}
    </>
  );
}
