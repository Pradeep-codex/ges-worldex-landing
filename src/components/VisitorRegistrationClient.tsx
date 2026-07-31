"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, X } from "lucide-react";
import { exhibitionSlides, getSlideOrder, type ExhibitionSlide } from "@/lib/exhibitionSlides";

const INTEREST_ENDPOINT =
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL || "/api/visitor-interest";

type RegistrationSlide = ExhibitionSlide & {
  isActive: boolean;
};

type HeroContentSlide = {
  id?: string;
  title?: string;
  description?: string;
  subtitle?: string;
  edition?: string;
  date?: string;
  location?: string;
  venue?: string;
  image?: string;
  buttonAction?: "register" | "interested";
  registerUrl?: string;
  enableExhibitorBooking?: boolean;
  boothBookingUrl?: string;
  boothBookingButtonLabel?: string;
};

type InterestType = "visiting" | "exhibiting";

export type RegistrationHeroContent = {
  slides?: HeroContentSlide[];
};

type VisitorRegistrationClientProps = {
  content?: RegistrationHeroContent;
  eyebrow?: string;
  title?: string;
  description?: string;
};

function normalizeMobileNumber(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

function getStableSlideId(title: string, index: number) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${base || "registration-show"}-${index}`;
}

function resolveRegistrationCards(content?: RegistrationHeroContent): RegistrationSlide[] {
  const resolvedSlides: ExhibitionSlide[] = content?.slides?.length
    ? content.slides
        .filter((slide: HeroContentSlide) => slide.title)
        .map((slide: HeroContentSlide, index: number) => {
          const fallback = exhibitionSlides[index % exhibitionSlides.length];
          const title = slide.title || fallback.title;

          return {
            ...fallback,
            id: getStableSlideId(title, index),
            description: slide.description || fallback.description,
            title,
            subtitle: slide.subtitle || fallback.subtitle,
            edition: slide.edition || fallback.edition,
            date: slide.date || fallback.date,
            location: slide.location || fallback.location,
            venue: slide.venue || fallback.venue,
            image: slide.image || fallback.image,
            buttonAction: slide.buttonAction || fallback.buttonAction,
            registerUrl: slide.registerUrl || fallback.registerUrl,
            enableExhibitorBooking: slide.enableExhibitorBooking ?? fallback.enableExhibitorBooking,
            boothBookingUrl: slide.boothBookingUrl || fallback.boothBookingUrl,
            boothBookingButtonLabel:
              slide.boothBookingButtonLabel || fallback.boothBookingButtonLabel,
          };
        })
    : exhibitionSlides;

  const orderedSlides = [...resolvedSlides].sort((a, b) => {
    const imageOrderDiff = getSlideOrder(a.image) - getSlideOrder(b.image);
    if (imageOrderDiff !== 0) return imageOrderDiff;
    return getSlideOrder(a.title) - getSlideOrder(b.title);
  });

  return [
    ...orderedSlides.map((slide) => ({
      ...slide,
      isActive: slide.buttonAction === "register" && Boolean(slide.registerUrl),
    })),
  ];
}

export function VisitorRegistrationClient({
  content,
  eyebrow = "Visitor Registration",
  title = "Choose the show you want to visit.",
  description = "Explore the upcoming exhibition lineup and pick the event that matches your business interest. Each show card highlights the venue, date, and banner artwork in the same GES Worldex theme.",
}: VisitorRegistrationClientProps) {
  const registrationCards = useMemo(() => resolveRegistrationCards(content), [content]);
  const [activeFormId, setActiveFormId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [interestedIn, setInterestedIn] = useState<InterestType>("visiting");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const activeSlide = registrationCards.find((slide) => slide.id === activeFormId) ?? null;
  const canBookStall =
    interestedIn === "exhibiting" &&
    Boolean(activeSlide?.enableExhibitorBooking && activeSlide?.boothBookingUrl);
  const submitLabel =
    submitState === "submitting"
      ? "Submitting..."
      : canBookStall
        ? activeSlide?.boothBookingButtonLabel?.trim() || "Book Booth Now"
        : "Submit";

  const closeModal = () => {
    setActiveFormId(null);
    setCompanyName("");
    setMobileNumber("");
    setInterestedIn("visiting");
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

    if (interestedIn !== "visiting" && interestedIn !== "exhibiting") {
      setSubmitState("error");
      setSubmitMessage("Please choose what you're interested in.");
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
          interestedIn,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (isDirectWebhook) {
        if (interestedIn === "exhibiting" && activeSlide.enableExhibitorBooking && activeSlide.boothBookingUrl) {
          window.location.href = activeSlide.boothBookingUrl;
          return;
        }

        setSubmitState("success");
        setSubmitMessage("Interest submitted successfully.");
        setCompanyName("");
        setMobileNumber("");
        setInterestedIn("visiting");
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
      setInterestedIn("visiting");

      if (interestedIn === "exhibiting" && activeSlide.enableExhibitorBooking && activeSlide.boothBookingUrl) {
        window.location.href = activeSlide.boothBookingUrl;
      }
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
            {eyebrow}
          </p>
          <h1
            className="welcome-display-font max-w-[12ch] text-[clamp(2.6rem,7vw,5rem)] font-black leading-[0.94] tracking-tight"
            style={{ color: "var(--about-text-primary)" }}
          >
            {title}
          </h1>
        </div>
        <div className="space-y-6">
          <p
            className="max-w-2xl text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--about-text-secondary)" }}
          >
            {description}
          </p>
        </div>
      </section>

      <section className="mt-12 flex flex-wrap justify-center gap-6 xl:gap-8">
        {registrationCards.map((slide) => (
          <article
            key={slide.id}
            className="flex w-full max-w-[24rem] flex-col overflow-hidden rounded-[22px] border shadow-[0_18px_56px_rgba(47,35,24,0.08)] md:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1.34rem)]"
            style={{
              backgroundColor: "var(--about-card-bg)",
              borderColor: "var(--about-card-border)",
            }}
          >
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
                        href={slide.registerUrl}
                        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#2f2318] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition-all hover:bg-[#9f7b28] active:scale-95 [html[data-theme='dark']_&]:border [html[data-theme='dark']_&]:border-[rgba(255,242,203,0.72)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,#fff2cb_0%,#f3dfab_52%,#d8b766_100%)] [html[data-theme='dark']_&]:text-[#071018] [html[data-theme='dark']_&]:shadow-[0_22px_42px_rgba(0,0,0,0.32)] [html[data-theme='dark']_&]:hover:bg-[linear-gradient(180deg,#fff7de_0%,#f6e5b8_52%,#e0c279_100%)] [html[data-theme='dark']_&]:hover:shadow-[0_26px_52px_rgba(0,0,0,0.38)]"
                      >
                        Register
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveFormId(slide.id);
                          setInterestedIn("visiting");
                          setSubmitState("idle");
                          setSubmitMessage(null);
                        }}
                        className="group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-[#cda24c] bg-[linear-gradient(180deg,rgba(255,247,232,0.95)_0%,rgba(244,221,171,0.92)_100%)] px-5 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-[#20170f] shadow-[0_18px_34px_rgba(159,123,40,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9f7b28] hover:shadow-[0_24px_40px_rgba(159,123,40,0.2)] active:scale-95 [html[data-theme='dark']_&]:border-[rgba(243,223,171,0.72)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(255,242,203,0.18)_0%,rgba(243,223,171,0.12)_100%)] [html[data-theme='dark']_&]:text-[#fff6df] [html[data-theme='dark']_&]:shadow-[0_22px_38px_rgba(0,0,0,0.26)] [html[data-theme='dark']_&]:hover:border-[rgba(255,242,203,0.92)] [html[data-theme='dark']_&]:hover:bg-[linear-gradient(180deg,#fff2cb_0%,#f3dfab_52%,#d8b766_100%)] [html[data-theme='dark']_&]:hover:text-[#071018] [html[data-theme='dark']_&]:hover:shadow-[0_26px_50px_rgba(0,0,0,0.36)]"
                      >
                        Interested
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    )}
                  </div>
                </div>
              </>
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
            <label className="grid gap-1.5">
              <span className="text-[0.68rem] font-black uppercase tracking-[0.16em]" style={{ color: "var(--about-text-secondary)" }}>
                Interested In
              </span>
              <select
                value={interestedIn}
                onChange={(e) => setInterestedIn(e.target.value as InterestType)}
                className="h-12 rounded-[14px] border bg-white/60 px-4 text-sm font-semibold outline-none [html[data-theme='dark']_&]:bg-slate-900/88"
                style={{ borderColor: "var(--about-card-border)", color: "var(--about-text-primary)" }}
                required
              >
                <option value="visiting">Visitor Interest</option>
                <option value="exhibiting">Exhibitor Interest</option>
              </select>
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
              {submitLabel}
            </button>
          </form>
        </div>
      </div>
    ) : null}
    </>
  );
}
