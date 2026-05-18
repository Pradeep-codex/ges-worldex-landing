"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { ContactPageCmsContent } from "@/sanity/lib/pages";

const officeAddress =
  "225 14th Cross, Sampige Rd, opposite Saibaba Temple, Malleshwaram, Bengaluru, Karnataka 560003";
const officeMapsUrl =
  "https://www.google.com/maps/place/ges+worldex+india+pvt.+ltd./@13.004581,77.5685899,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1624efa9c1ef:0x317e7a5909a91afa!8m2!3d13.004581!4d77.5711648!16s%2Fg%2F11j0bvh277?entry=ttu";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function ContactPageContent({ content }: { content?: ContactPageCmsContent | null }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (name.trim().length < 2) return false;
    if (!isValidEmail(email)) return false;
    if (message.trim().length < 10) return false;
    return status !== "sending";
  }, [email, message, name, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
        }),
      });

      const data = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string };
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to submit the form.");
    }
  }

  return (
    <main className="mx-auto w-full max-w-[1700px] px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-24">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-xs font-black uppercase tracking-[0.22em] text-transparent">
            {content?.eyebrow || "Contact"}
          </p>
          <h1
            className="welcome-display-font max-w-[16ch] text-[clamp(2.35rem,7vw,4.6rem)] font-black leading-[0.95] tracking-tight"
            style={{ color: "var(--about-text-primary)" }}
          >
            {content?.title || "Let's talk about your next exhibition move."}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "var(--about-text-secondary)" }}>
            {content?.description ||
              "Share your query and the GES Worldex team will get back to you with the right information for exhibitors, visitors, partnerships, and sponsorships."}
          </p>

          <div className="grid gap-3 pt-2">
            <InlineContactRow
              icon={Mail}
              label="Email"
              value={content?.email || "support@gesworldex.com"}
              href={`mailto:${content?.email || "support@gesworldex.com"}`}
            />
            <InlineContactRow
              icon={Phone}
              label="Phone"
              value={content?.phone || "+91 99450 12123"}
              href={`tel:${(content?.phone || "+91 99450 12123").replace(/[^\d+]/g, "")}`}
            />
            <InlineContactRow
              icon={MapPin}
              label="Head Office"
              value={content?.officeAddress || officeAddress}
              href={content?.officeMapsUrl || officeMapsUrl}
            />
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-[28px] border p-6 shadow-[0_24px_80px_rgba(47,35,24,0.08)] md:p-8"
          style={{
            background:
              "radial-gradient(90% 120% at 86% 12%, rgba(216,183,102,0.18) 0%, transparent 54%), var(--about-card-bg)",
            borderColor: "var(--about-card-border)",
          }}
        >
          <div className="absolute right-[-90px] top-[-120px] h-64 w-64 rounded-full border border-[rgba(159,123,40,0.14)]" />
          <div className="absolute bottom-[-120px] left-[-90px] h-72 w-72 rounded-full border border-[rgba(159,123,40,0.10)]" />

          <div className="relative space-y-3">
            <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-xs font-black uppercase tracking-[0.22em] text-transparent">
              {content?.formTitle ? "Contact Form" : "Contact Form"}
            </p>
            <h2 className="text-3xl font-black leading-tight md:text-4xl" style={{ color: "var(--about-text-primary)" }}>
              {content?.formTitle || "Send your query"}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--about-text-secondary)" }}>
              {content?.formDescription || "Provide details and we'll route it to the right team member."}
            </p>
          </div>

          <form onSubmit={onSubmit} className="relative mt-7 grid gap-4">
            <Field label="Name" required>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 w-full rounded-[16px] border bg-white/60 px-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-[#9f7b28] [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-slate-900/88 [html[data-theme='dark']_&]:text-slate-50 [html[data-theme='dark']_&]:placeholder:text-slate-500"
                style={{ borderColor: "var(--about-card-border)", color: "var(--about-text-primary)" }}
                placeholder="Your name"
                autoComplete="name"
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Email" required>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-[16px] border bg-white/60 px-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-[#9f7b28] [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-slate-900/88 [html[data-theme='dark']_&]:text-slate-50 [html[data-theme='dark']_&]:placeholder:text-slate-500"
                  style={{ borderColor: "var(--about-card-border)", color: "var(--about-text-primary)" }}
                  placeholder="name@company.com"
                  autoComplete="email"
                />
              </Field>
              <Field label="Phone">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 w-full rounded-[16px] border bg-white/60 px-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-[#9f7b28] [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-slate-900/88 [html[data-theme='dark']_&]:text-slate-50 [html[data-theme='dark']_&]:placeholder:text-slate-500"
                  style={{ borderColor: "var(--about-card-border)", color: "var(--about-text-primary)" }}
                  placeholder="+91 XXXXX XXXXX"
                  autoComplete="tel"
                />
              </Field>
            </div>

            <Field label="Your Query" required>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[140px] w-full resize-none rounded-[18px] border bg-white/60 px-4 py-3 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-[#9f7b28] [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-slate-900/88 [html[data-theme='dark']_&]:text-slate-50 [html[data-theme='dark']_&]:placeholder:text-slate-500"
                style={{ borderColor: "var(--about-card-border)", color: "var(--about-text-primary)" }}
                placeholder="Tell us what you are looking for..."
              />
            </Field>

            {status === "success" ? (
              <div
                className="rounded-[18px] border px-4 py-3 text-sm font-semibold"
                style={{
                  borderColor: "rgba(159,123,40,0.22)",
                  backgroundColor: "rgba(159,123,40,0.08)",
                  color: "var(--about-text-primary)",
                }}
              >
                Thanks, we received your message. Our team will reach out shortly.
              </div>
            ) : null}

            {status === "error" && error ? (
              <div
                className="rounded-[18px] border px-4 py-3 text-sm font-semibold"
                style={{
                  borderColor: "rgba(159,123,40,0.22)",
                  backgroundColor: "rgba(47,35,24,0.06)",
                  color: "var(--about-text-primary)",
                }}
              >
                {error}
              </div>
            ) : null}

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={!canSubmit}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#2f2318] px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-[#9f7b28] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href={`mailto:${content?.email || "support@gesworldex.com"}`}
                className="inline-flex w-full items-center justify-center rounded-full border px-7 py-4 text-sm font-black uppercase tracking-widest transition-all hover:border-[#9f7b28] active:scale-95 sm:w-fit"
                style={{ borderColor: "var(--about-card-border)", color: "var(--about-text-primary)" }}
              >
                Email Instead
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "var(--about-text-secondary)" }}>
        {label}
        {required ? <span style={{ color: "#9f7b28" }}> *</span> : null}
      </span>
      {children}
    </label>
  );
}

function InlineContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const sharedClassName =
    "group flex items-start gap-3 rounded-[18px] border px-4 py-3 transition-colors hover:border-[rgba(159,123,40,0.35)]";
  const sharedStyle = {
    borderColor: "var(--about-card-border)",
    backgroundColor: "var(--about-card-bg)",
  } as const;
  const content = (
    <>
      <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(159,123,40,0.12)] text-[#9f7b28]">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.68rem] font-black uppercase tracking-[0.18em]" style={{ color: "#9f7b28" }}>
          {label}
        </span>
        <span className="mt-1 block break-words text-sm font-semibold leading-relaxed" style={{ color: "var(--about-text-primary)" }}>
          {value}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className={sharedClassName}
        style={sharedStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={sharedClassName} style={sharedStyle}>
      {content}
    </div>
  );
}
