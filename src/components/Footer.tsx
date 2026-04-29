"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Exhibitors", href: "/exhibitors" },
  { label: "Visitors", href: "/visitors" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/ges.india.inc/", icon: Instagram },
  { label: "X", href: "https://x.com/IndiaGes", icon: Twitter },
  { label: "Email", href: "mailto:info@gesindiaexh.com", icon: Mail },
];

const serviceLinks = [
  "Trade Show Planning",
  "Exhibition Design",
  "Visitor Experience",
  "Brand Activations",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--border)] bg-white/62 backdrop-blur-xl [html[data-theme='dark']_&]:bg-[#11182b]/82">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7fd8ef]/70 to-transparent" />
      <div className="mx-auto max-w-[1700px] px-4 py-12 md:px-8 md:py-14 lg:px-12 lg:py-16">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1fr]">
          <div className="max-w-[34rem]">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo-light.png"
                alt="GES Worldex"
                width={196}
                height={44}
                className="block h-10 w-auto object-contain md:h-11 [html[data-theme='dark']_&]:hidden"
              />
              <Image
                src="/logo-dark.png"
                alt="GES Worldex"
                width={196}
                height={44}
                className="hidden h-10 w-auto object-contain md:h-11 [html[data-theme='dark']_&]:block"
              />
            </Link>
            <p className="mt-4 max-w-[31rem] text-sm leading-7 text-[#315264] md:text-[0.98rem] [html[data-theme='dark']_&]:text-[#c5d4e8]">
              Premium exhibition and trade show experiences designed to connect brands, buyers, and industries with clarity.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href="mailto:info@gesindiaexh.com"
                className="inline-flex items-center gap-2 rounded-2xl border border-[#8fd6e7]/40 bg-white/68 px-4 py-3 text-sm font-semibold text-[#0c3e55] transition-colors hover:bg-white/88 [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-white/6 [html[data-theme='dark']_&]:text-[#e7f6ff]"
              >
                <Mail className="h-4 w-4" />
                info@gesindiaexh.com
              </a>
              <a
                href="tel:+919999999999"
                className="inline-flex items-center gap-2 rounded-2xl border border-[#8fd6e7]/40 bg-white/68 px-4 py-3 text-sm font-semibold text-[#0c3e55] transition-colors hover:bg-white/88 [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-white/6 [html[data-theme='dark']_&]:text-[#e7f6ff]"
              >
                <Phone className="h-4 w-4" />
                +91 99999 99999
              </a>
            </div>
          </div>

          <div>
            <p className="text-[0.72rem] font-black uppercase tracking-[0.24em] text-[#11627a] [html[data-theme='dark']_&]:text-cyan-200">
              Quick Links
            </p>
            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3.5 text-sm md:text-[0.96rem]">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-2 text-[#17384c] transition-colors hover:text-[#0da0c9] [html[data-theme='dark']_&]:text-[#d6e6fb] [html[data-theme='dark']_&]:hover:text-cyan-300"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.72rem] font-black uppercase tracking-[0.24em] text-[#11627a] [html[data-theme='dark']_&]:text-cyan-200">
              Focus Areas
            </p>
            <div className="mt-5 grid gap-3 text-sm md:text-[0.96rem]">
              {serviceLinks.map((service) => (
                <div
                  key={service}
                  className="rounded-2xl border border-[#8fd6e7]/26 bg-white/42 px-4 py-3 text-[#24475b] [html[data-theme='dark']_&]:border-white/8 [html[data-theme='dark']_&]:bg-white/5 [html[data-theme='dark']_&]:text-[#d6e6fb]"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.72rem] font-black uppercase tracking-[0.24em] text-[#11627a] [html[data-theme='dark']_&]:text-cyan-200">
              Reach Us
            </p>
            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3 text-sm leading-6 text-[#24475b] md:text-[0.96rem] [html[data-theme='dark']_&]:text-[#d6e6fb]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0f87aa]" />
                <span>India based exhibition and trade show partner serving premium business events.</span>
              </div>
              <a
                href="https://gesworldex.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-[#24475b] transition-colors hover:text-[#0da0c9] md:text-[0.96rem] [html[data-theme='dark']_&]:text-[#d6e6fb] [html[data-theme='dark']_&]:hover:text-cyan-300"
              >
                <Globe className="h-4 w-4 shrink-0 text-[#0f87aa]" />
                <span>gesworldex.com</span>
              </a>
            </div>

            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#8fd6e7]/40 bg-white/70 text-[#0f5973] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-white/7 [html[data-theme='dark']_&]:text-[#e7f6ff]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[color:var(--border)] pt-5 text-xs text-[#507084] md:flex-row md:items-center md:justify-between md:text-sm [html[data-theme='dark']_&]:text-[#9db3c9]">
          <p>© {new Date().getFullYear()} GES Worldex. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/contact" className="transition-colors hover:text-[#0da0c9] [html[data-theme='dark']_&]:hover:text-cyan-300">
              Start a conversation
            </Link>
            <Link href="/portfolio" className="transition-colors hover:text-[#0da0c9] [html[data-theme='dark']_&]:hover:text-cyan-300">
              View portfolio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
