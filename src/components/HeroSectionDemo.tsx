"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CalendarDays, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { exhibitionSlides, getSlideOrder, type ExhibitionSlide } from "@/lib/exhibitionSlides";

const demoNavItems = [
  { name: "Home", href: "/home" },
  { name: "About Us", href: "/about" },
  { name: "Exhibitors", href: "/exhibitors" },
  { name: "Visitors", href: "/visitors" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

const demoSocialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/ges.india.inc/", icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/ges.india.exh", icon: Facebook },
  { name: "Email", href: "mailto:support@gesworldex.com", icon: Mail },
];

type HeroSectionDemoProps = {
  content?: any;
  shellMode?: "demo" | "home";
  tightPortraitTabletTop?: boolean;
};

type ThemeMode = "light" | "dark";

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
};

export function HeroSectionDemo({
  content,
  shellMode = "demo",
  tightPortraitTabletTop = false,
}: HeroSectionDemoProps) {
  const slides = useMemo(() => {
    const resolvedSlides = content?.slides?.length
      ? content.slides
          .filter((slide: HeroContentSlide) => slide.title)
          .map((slide: HeroContentSlide, index: number) => {
            const fallback = exhibitionSlides[index % exhibitionSlides.length];

            return {
              ...fallback,
              id: (slide.title || fallback.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
              description: slide.description || fallback.description,
              title: slide.title || fallback.title,
              subtitle: slide.subtitle || fallback.subtitle,
              edition: slide.edition || fallback.edition,
              date: slide.date || fallback.date,
              location: slide.location || fallback.location,
              venue: slide.venue || fallback.venue,
              image: slide.image || fallback.image,
            };
          })
      : exhibitionSlides;

    return [...resolvedSlides].sort((a, b) => {
      const imageOrderDiff = getSlideOrder(a.image) - getSlideOrder(b.image);
      if (imageOrderDiff !== 0) return imageOrderDiff;
      return getSlideOrder(a.title) - getSlideOrder(b.title);
    });
  }, [content]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const isHomeHero = shellMode === "home";
  const showHeroNav = shellMode === "demo";
  const isLightHome = shellMode === "home" && themeMode !== "dark";
  const activeSlide = slides[activeIndex] ?? slides[0] ?? exhibitionSlides[0];

  const orderedSlides = useMemo(
    () => slides.map((_: ExhibitionSlide, index: number) => slides[(activeIndex + index) % slides.length]),
    [activeIndex, slides],
  );

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [slides]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const readTheme = () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      setThemeMode(nextTheme);
    };

    readTheme();

    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      data-hero-shell={shellMode}
      className={`relative overflow-hidden ${
        isHomeHero
          ? `min-h-0 ${isLightHome ? "bg-transparent text-[#241b14]" : "bg-transparent text-white"}`
          : "min-h-screen bg-[#070707] text-white"
      }`}
      style={tightPortraitTabletTop ? { marginTop: "-6rem" } : undefined}
    >
      {isHomeHero ? null : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_28%,rgba(133,98,34,0.16),transparent_30%),radial-gradient(circle_at_78%_32%,rgba(216,183,102,0.12),transparent_30%),linear-gradient(135deg,rgba(10,10,10,1)_0%,rgba(17,13,10,0.98)_56%,rgba(10,10,10,1)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(7,7,7,0.96)_0%,rgba(7,7,7,0.46)_55%,transparent_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(circle_at_center,rgba(216,183,102,0.18),transparent_58%)] blur-3xl" />
          <div className="absolute left-[-12%] top-[18%] h-[36rem] w-[36rem] rounded-full border border-[rgba(216,183,102,0.08)]" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-[linear-gradient(180deg,transparent_0%,rgba(216,183,102,0.04)_36%,transparent_100%)]" />
          <div className="absolute bottom-0 left-[-8%] h-[22rem] w-[60%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(216,183,102,0.14),transparent_62%)] blur-3xl" />
          <div className="absolute right-[-12%] top-[12%] h-[24rem] w-[28rem] bg-[radial-gradient(circle,rgba(216,183,102,0.08),transparent_64%)] blur-3xl" />
        </>
      )}

      {showHeroNav ? (
        <div className="relative mx-auto w-full max-w-[1700px] px-4 py-6 md:px-8 lg:px-12 lg:py-8">
          <div className="rounded-[28px] border border-[rgba(216,183,102,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Link href="/home" aria-label="GES Worldex home">
                  <Image
                    src="/logo-dark.png"
                    alt="GES Worldex India Pvt. Ltd."
                    width={180}
                    height={52}
                    className="h-10 w-auto object-contain"
                  />
                </Link>
              </div>

              <div className="hidden items-center gap-8 lg:flex">
                {demoNavItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative text-[0.98rem] font-semibold transition-colors ${
                      index === 0 ? "text-[#f0d188]" : "text-white/82 hover:text-white"
                    }`}
                  >
                    {item.name}
                    {index === 0 ? (
                      <span className="absolute -bottom-3 left-0 h-[2px] w-11 rounded-full bg-[linear-gradient(90deg,#f2d38c,#d8b766)]" />
                    ) : null}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {demoSocialLinks.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(216,183,102,0.38)] bg-white/[0.03] text-[#f0d188] backdrop-blur-sm transition-colors hover:bg-white/[0.07]"
                    aria-label={name}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
                <a
                  href="tel:+919945012123"
                  className="hidden items-center gap-2 rounded-full border border-[rgba(216,183,102,0.38)] bg-white/[0.03] px-5 py-3 text-[0.95rem] font-semibold text-[#f6e6be] backdrop-blur-sm md:inline-flex"
                >
                  <Phone className="h-4 w-4" />
                  +91 99450 12123
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`relative mx-auto w-full max-w-[1700px] px-4 pb-8 md:px-8 md:pb-10 lg:hidden [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:hidden ${
          showHeroNav ? "pt-6" : "pt-8"
        }`}
        style={tightPortraitTabletTop ? { paddingTop: "0.75rem" } : undefined}
      >
        <div className="mx-auto max-w-[46rem]">
          <div className="relative mt-2">
            <div
              className={`relative h-[15rem] overflow-hidden rounded-[28px] sm:h-[18rem] md:h-[21rem] ${
                isLightHome
                  ? "border border-[rgba(206,166,94,0.42)] shadow-[0_22px_64px_rgba(96,62,22,0.14)]"
                  : "border border-[rgba(233,203,129,0.34)] shadow-[0_28px_80px_rgba(0,0,0,0.34)]"
              }`}
            >
              <motion.div
                className="flex h-full"
                animate={{ x: `-${activeIndex * 100}%` }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              >
                {slides.map((slide: ExhibitionSlide) => (
                  <div key={`${slide.id}-compact`} className="relative h-full min-w-full">
                    <Image
                      src={slide.image}
                      alt={`${slide.title} showcase`}
                      fill
                      sizes="(min-width: 768px) 86vw, 94vw"
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08)_0%,rgba(8,8,8,0.16)_42%,rgba(8,8,8,0.58)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-[radial-gradient(circle_at_bottom,rgba(216,183,102,0.18),transparent_70%)]" />
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="mt-4 flex justify-center">
              <div className="flex items-center gap-2.5">
                {slides.map((slide: ExhibitionSlide, index: number) => (
                  <button
                    key={`${slide.id}-compact-dot`}
                    type="button"
                    onClick={() => {
                      setActiveIndex(index);
                    }}
                    aria-label={`Show ${slide.title}`}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: activeIndex === index ? "2.4rem" : "0.6rem",
                      background:
                        activeIndex === index
                          ? "#d6ad5e"
                          : isLightHome
                            ? "rgba(124,92,52,0.24)"
                            : "rgba(255,255,255,0.24)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${activeSlide.id}-compact-details`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={`mt-4 rounded-[24px] border p-4 shadow-[0_16px_44px_rgba(34,24,14,0.08)] backdrop-blur-xl sm:p-5 ${
                isLightHome
                  ? "border-[rgba(177,132,63,0.14)] bg-white/86"
                  : "border-[rgba(216,183,102,0.12)] bg-slate-950/72"
              }`}
            >
              <div
                className={`text-[0.64rem] font-black uppercase tracking-[0.16em] ${
                  isLightHome ? "text-[#b1843f]" : "text-[#d8b766]"
                }`}
              >
                {activeSlide.eyebrow}
              </div>
              <h1
                className={`welcome-display-font mt-2.5 text-[1.55rem] font-black leading-[0.98] tracking-[-0.03em] sm:text-[2rem] ${
                  isLightHome ? "text-[#221a12]" : "text-white"
                }`}
              >
                {activeSlide.title}
              </h1>
              <p className={`mt-2.5 text-[0.9rem] leading-6 sm:text-[0.98rem] ${isLightHome ? "text-[#5f5446]" : "text-white/74"}`}>
                {activeSlide.subtitle}
              </p>
              <p className={`mt-2 text-[0.82rem] leading-5 sm:text-sm sm:leading-6 ${isLightHome ? "text-[#736553]" : "text-white/56"}`}>
                {activeSlide.description}
              </p>

              <div className={`mt-4 grid gap-2 text-[0.82rem] sm:grid-cols-2 sm:text-sm ${isLightHome ? "text-[#5f5446]" : "text-white/76"}`}>
                <div
                  className={`flex items-start gap-2.5 rounded-[16px] border px-3 py-2.5 ${
                    isLightHome
                      ? "border-[rgba(177,132,63,0.12)] bg-[#fffaf1]"
                      : "border-[rgba(216,183,102,0.12)] bg-white/[0.03]"
                  }`}
                >
                  <CalendarDays className={`mt-0.5 h-4 w-4 shrink-0 ${isLightHome ? "text-[#b1843f]" : "text-[#d8b766]"}`} />
                  <span>{activeSlide.date}</span>
                </div>
                <div
                  className={`flex items-start gap-2.5 rounded-[16px] border px-3 py-2.5 ${
                    isLightHome
                      ? "border-[rgba(177,132,63,0.12)] bg-[#fffaf1]"
                      : "border-[rgba(216,183,102,0.12)] bg-white/[0.03]"
                  }`}
                >
                  <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${isLightHome ? "text-[#b1843f]" : "text-[#d8b766]"}`} />
                  <span>{activeSlide.location}</span>
                </div>
                <div
                  className={`flex items-start gap-2.5 rounded-[16px] border px-3 py-2.5 sm:col-span-2 ${
                    isLightHome
                      ? "border-[rgba(177,132,63,0.12)] bg-[#fffaf1]"
                      : "border-[rgba(216,183,102,0.12)] bg-white/[0.03]"
                  }`}
                >
                  <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${isLightHome ? "text-[#b1843f]" : "text-[#d8b766]"}`} />
                  <span>{activeSlide.venue}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <div
                  className={`rounded-full border px-2.5 py-1.5 text-[0.68rem] font-semibold ${
                    isLightHome
                      ? "border-[rgba(177,132,63,0.14)] bg-white/72 text-[#6a5b49]"
                      : "border-[rgba(216,183,102,0.14)] bg-white/[0.03] text-white/62"
                  }`}
                >
                  Buyer-focused audience
                </div>
                <div
                  className={`rounded-full border px-3 py-2 text-[0.76rem] font-semibold ${
                    isLightHome
                      ? "border-[rgba(177,132,63,0.14)] bg-white/72 text-[#6a5b49]"
                      : "border-[rgba(216,183,102,0.14)] bg-white/[0.03] text-white/62"
                  }`}
                >
                  Premium venue experience
                </div>
              </div>

              <Link
                href="https://gesworldex.com/ssidelhi"
                className={`mt-5 inline-flex items-center gap-2.5 rounded-[16px] px-5 py-2.5 text-[0.82rem] font-black transition-transform duration-300 hover:-translate-y-0.5 ${
                  isLightHome
                    ? "bg-[linear-gradient(180deg,#efcf88_0%,#d6ad5e_100%)] text-[#20170f] shadow-[0_18px_30px_rgba(177,132,63,0.22)]"
                    : "bg-[linear-gradient(180deg,#f2d38c_0%,#d8b766_100%)] text-[#17120b] shadow-[0_18px_32px_rgba(216,183,102,0.22)]"
                }`}
              >
                Register Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        className={`relative mx-auto hidden min-h-[calc(100vh-7.5rem)] w-full max-w-[1700px] gap-14 px-4 pb-10 md:px-8 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-12 lg:pb-12 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:grid [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:grid-cols-[0.78fr_1.22fr] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:gap-8 ${
          showHeroNav
            ? "pt-6 lg:pt-10"
            : "pt-8 lg:pt-10 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:pt-2"
        }`}
        style={tightPortraitTabletTop ? { paddingTop: "0", alignContent: "start" } : undefined}
      >
        <div className="relative z-10 max-w-[35rem] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:-mt-8">
          <div className="relative h-[21rem] sm:h-[22rem] lg:h-[23rem] [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:h-[18rem]">
            <AnimatePresence initial={false}>
              <motion.div
                key={activeSlide.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-[0.72rem] font-black uppercase tracking-[0.16em] ${
                      isLightHome
                        ? "border-[rgba(177,132,63,0.2)] bg-white/68 text-[#b1843f]"
                        : "border-[rgba(216,183,102,0.24)] bg-white/[0.04] text-[#d8b766]"
                    }`}
                  >
                    {activeSlide.edition}
                  </span>
                  <span
                    className={`text-[0.78rem] font-semibold uppercase tracking-[0.18em] ${
                      isLightHome ? "text-[#8a775e]" : "text-white/48"
                    }`}
                  >
                    Premium Trade Showcase
                  </span>
                </div>

                <h1
                  className={`welcome-display-font mt-5 max-w-[11ch] text-[clamp(2rem,4vw,3.55rem)] font-black leading-[0.97] tracking-[-0.03em] ${
                    isLightHome ? "text-[#221a12]" : "text-white"
                  }`}
                >
                  {activeSlide.title}
                </h1>

                <p className={`mt-4 max-w-[30rem] text-[0.96rem] leading-7 md:text-[1rem] ${isLightHome ? "text-[#5f5446]" : "text-white/72"}`}>
                  {activeSlide.subtitle}
                </p>

                <div className={`mt-5 flex flex-col gap-3 text-sm sm:text-[0.96rem] ${isLightHome ? "text-[#5f5446]" : "text-white/74"}`}>
                  <div className="inline-flex items-center gap-3">
                    <CalendarDays className={`h-4.5 w-4.5 shrink-0 ${isLightHome ? "text-[#b1843f]" : "text-[#d8b766]"}`} />
                    <span>{activeSlide.date}</span>
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <MapPin className={`h-4.5 w-4.5 shrink-0 ${isLightHome ? "text-[#b1843f]" : "text-[#d8b766]"}`} />
                    <span>{activeSlide.location}</span>
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <MapPin className={`h-4.5 w-4.5 shrink-0 ${isLightHome ? "text-[#b1843f]" : "text-[#d8b766]"}`} />
                    <span>{activeSlide.venue}</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <div
                    className={`rounded-[16px] border px-3 py-2 text-[0.78rem] font-semibold ${
                      isLightHome
                        ? "border-[rgba(177,132,63,0.14)] bg-white/56 text-[#6a5b49]"
                        : "border-[rgba(216,183,102,0.14)] bg-white/[0.03] text-white/62"
                    }`}
                  >
                    Buyer-focused audience
                  </div>
                  <div
                    className={`rounded-[16px] border px-3 py-2 text-[0.78rem] font-semibold ${
                      isLightHome
                        ? "border-[rgba(177,132,63,0.14)] bg-white/56 text-[#6a5b49]"
                        : "border-[rgba(216,183,102,0.14)] bg-white/[0.03] text-white/62"
                    }`}
                  >
                    Premium venue experience
                  </div>
                </div>

                <Link
                  href="https://gesworldex.com/ssidelhi"
                  className={`mt-6 inline-flex items-center gap-3 rounded-[18px] px-6 py-3 text-sm font-black transition-transform duration-300 hover:-translate-y-0.5 ${
                    isLightHome
                      ? "bg-[linear-gradient(180deg,#efcf88_0%,#d6ad5e_100%)] text-[#20170f] shadow-[0_18px_30px_rgba(177,132,63,0.22)]"
                      : "bg-[linear-gradient(180deg,#f2d38c_0%,#d8b766_100%)] text-[#17120b] shadow-[0_18px_32px_rgba(216,183,102,0.22)]"
                  }`}
                >
                  Register Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative overflow-visible min-h-[620px] lg:min-h-[840px]">
          <div className="relative min-h-[620px] w-full overflow-visible lg:min-h-[840px]">
            {orderedSlides.slice(0, 4).map((slide: ExhibitionSlide, stackIndex: number) => {
              const widths = ["72%", "39%", "28%", "20%"];
              const lefts = ["0%", "41%", "55.5%", "66.5%"];
              const bottoms = ["2.8rem", "4.4rem", "5.8rem", "7rem"];
              const transforms = [
                "perspective(2400px) translate3d(0, 0, 5rem) rotateY(-7deg) rotateX(1.2deg) rotateZ(0.35deg) scale(1)",
                "perspective(2400px) translate3d(0, 0, -1.2rem) rotateY(-14deg) rotateX(1.1deg) rotateZ(0.65deg) scale(0.986)",
                "perspective(2400px) translate3d(0, 0, -2.8rem) rotateY(-19deg) rotateX(0.98deg) rotateZ(0.88deg) scale(0.966)",
                "perspective(2400px) translate3d(0, 0, -4.4rem) rotateY(-24deg) rotateX(0.82deg) rotateZ(1deg) scale(0.938)",
              ];
              const origins = ["center center", "right center", "right center", "right center"];
              const heightClasses = [
                "h-[24rem] lg:h-[36rem]",
                "h-[21.5rem] lg:h-[32rem]",
                "h-[19rem] lg:h-[28rem]",
                "h-[17rem] lg:h-[25rem]",
              ];
              const opacity = 1;
              const zIndex = 30 - stackIndex;
              const filters = isLightHome
                ? [
                    "none",
                    "brightness(0.98) saturate(0.92)",
                    "brightness(0.93) saturate(0.84)",
                    "blur(0.9px) brightness(0.88) saturate(0.78)",
                  ]
                : [
                    "none",
                    "brightness(0.88) saturate(0.92)",
                    "brightness(0.78) saturate(0.82)",
                    "blur(0.9px) brightness(0.68) saturate(0.74)",
                  ];

              return (
                <motion.article
                  key={slide.id}
                  layout
                  initial={false}
                  transition={{ layout: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } }}
                  className={`absolute overflow-hidden rounded-[36px] lg:rounded-[52px] will-change-transform ${heightClasses[stackIndex]}`}
                  style={{
                    left: lefts[stackIndex],
                    bottom: bottoms[stackIndex],
                    width: widths[stackIndex],
                    opacity,
                    zIndex,
                    transform: transforms[stackIndex],
                    transformOrigin: origins[stackIndex],
                    filter: filters[stackIndex],
                    boxShadow: "none",
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={`${slide.title} showcase`}
                    fill
                    sizes="(min-width: 1024px) 58vw, 90vw"
                    className="rounded-[inherit] object-contain"
                  />
                </motion.article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goToPrevious}
            className={`absolute -left-4 top-[44%] z-[200] inline-flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300 lg:-left-8 ${
              isLightHome
                ? "border-[rgba(177,132,63,0.16)] bg-white/86 text-[#3b2c1d] shadow-[0_16px_30px_rgba(177,132,63,0.12)] hover:border-[rgba(177,132,63,0.3)] hover:text-[#b1843f]"
                : "border-[rgba(216,183,102,0.22)] bg-black/26 text-white/88 hover:border-[rgba(216,183,102,0.4)] hover:text-[#f0d188]"
            }`}
            aria-label="Show previous hero image"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            className={`absolute right-0 top-[44%] z-40 inline-flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border text-[#17120b] transition-transform duration-300 hover:scale-[1.03] lg:right-2 ${
              isLightHome
                ? "border-[rgba(177,132,63,0.34)] bg-[linear-gradient(180deg,#efcf88_0%,#d6ad5e_100%)] shadow-[0_16px_34px_rgba(177,132,63,0.2)]"
                : "border-[rgba(216,183,102,0.45)] bg-[linear-gradient(180deg,#f2d38c_0%,#d8b766_100%)] shadow-[0_16px_34px_rgba(216,183,102,0.26)]"
            }`}
            aria-label="Show next hero image"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
            {slides.map((slide: ExhibitionSlide, index: number) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                }}
                aria-label={`Show ${slide.title}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === index ? "2.25rem" : "0.55rem",
                  background: activeIndex === index ? "#d6ad5e" : isLightHome ? "rgba(124,92,52,0.22)" : "rgba(255,255,255,0.28)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
