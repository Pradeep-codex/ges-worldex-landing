"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CalendarDays, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

type DemoSlide = {
  id: string;
  eyebrow: string;
  headline: string;
  highlight: string;
  description: string;
  title: string;
  subtitle: string;
  edition: string;
  date: string;
  venue: string;
  image: string;
};

const demoSlides: DemoSlide[] = [
  {
    id: "silver-show",
    eyebrow: "Global Exhibitions",
    headline: "Crafting Large-Scale Industry",
    highlight: "Experiences",
    description: "Flagship trade environments designed for serious buyers, premium brand visibility, and high-value exhibition conversations.",
    title: "Silver Show of India",
    subtitle: "A B2B exhibition on silver jewellery, design, and trade networking.",
    edition: "3rd Edition",
    date: "06 - 09 Dec 2024",
    venue: "Bombay Exhibition Centre, Mumbai",
    image: "/demo-banner.png",
  },
  {
    id: "south-jewellery",
    eyebrow: "Curated Trade Floors",
    headline: "Building South India’s Most",
    highlight: "Focused Jewellery Showcases",
    description: "Layered exhibition planning, strong buyer targeting, and polished category storytelling for jewellery manufacturers and retailers.",
    title: "South Jewellery Show",
    subtitle: "Curated floors for serious jewellery buyers, retailers, and manufacturers.",
    edition: "8th Edition",
    date: "18 - 20 Jan 2025",
    venue: "BIEC, Bengaluru",
    image: "/demo-banner2.png",
  },
  {
    id: "industry-lifestyle",
    eyebrow: "Immersive Display Design",
    headline: "Shaping Exhibition Spaces That",
    highlight: "Draw Premium Attention",
    description: "Cinematic staging, elevated presentation, and destination-style trade experiences that make every launch feel important.",
    title: "Lifestyle Expo Forum",
    subtitle: "Immersive trade environments designed to spotlight product storytelling.",
    edition: "Featured Showcase",
    date: "22 - 24 Feb 2025",
    venue: "Hyderabad International Convention Centre",
    image: "/demo-banner3.png",
  },
  {
    id: "interior-build",
    eyebrow: "Venue-Scale Execution",
    headline: "Delivering Confident Shows With",
    highlight: "Luxury Production Flow",
    description: "From floor planning to live visitor movement, every layer is built to feel sharp, efficient, and commercially premium.",
    title: "Interior Build Summit",
    subtitle: "Premium category zones for sourcing, launches, and B2B conversations.",
    edition: "Design Week",
    date: "11 - 14 Apr 2025",
    venue: "Chennai Trade Centre",
    image: "/demo-banner.png",
  },
];

const demoNavItems = [
  { name: "Home", href: "/" },
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
  { name: "Email", href: "mailto:info@gesindiaexh.com", icon: Mail },
];

type HeroSectionDemoProps = {
  shellMode?: "demo" | "home";
  tightPortraitTabletTop?: boolean;
};

type ThemeMode = "light" | "dark";

export function HeroSectionDemo({
  shellMode = "demo",
  tightPortraitTabletTop = false,
}: HeroSectionDemoProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const isHomeHero = shellMode === "home";
  const showHeroNav = shellMode === "demo";
  const isLightHome = shellMode === "home" && themeMode !== "dark";
  const activeSlide = demoSlides[activeIndex];

  const orderedSlides = useMemo(
    () => demoSlides.map((_, index) => demoSlides[(activeIndex + index) % demoSlides.length]),
    [activeIndex],
  );

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % demoSlides.length);
  };

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + demoSlides.length) % demoSlides.length);
  };

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
      setActiveIndex((current) => (current + 1) % demoSlides.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      data-hero-shell={shellMode}
      className={`relative min-h-screen overflow-hidden ${
        isHomeHero ? (isLightHome ? "bg-transparent text-[#241b14]" : "bg-transparent text-white") : "bg-[#070707] text-white"
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
                <Link href="/" aria-label="GES Worldex home">
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
        className={`relative mx-auto grid min-h-[calc(100vh-7.5rem)] w-full max-w-[1700px] gap-14 px-4 pb-10 md:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-12 lg:pb-12 ${
          showHeroNav
            ? "pt-6 lg:pt-10"
            : "pt-24 lg:pt-28 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:pt-2"
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
                  href="/visitors/registration"
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

        <div className="relative overflow-visible min-h-[560px] lg:min-h-[760px]">
          <div className="relative mx-auto min-h-[560px] w-full max-w-[980px] overflow-hidden lg:min-h-[760px]">
            {orderedSlides.slice(0, 4).map((slide, stackIndex) => {
              const widths = ["78%", "31%", "21%", "15%"];
              const lefts = ["0%", "57.5%", "72.5%", "82.5%"];
              const bottoms = ["4.4rem", "6.2rem", "7rem", "7.7rem"];
              const transforms = [
                "perspective(2400px) translate3d(0, 0, 5rem) rotateY(-7deg) rotateX(1.2deg) rotateZ(0.35deg) scale(1)",
                "perspective(2400px) translate3d(0, 0, -1.8rem) rotateY(-16deg) rotateX(1.15deg) rotateZ(0.7deg) scale(0.982)",
                "perspective(2400px) translate3d(0, 0, -4rem) rotateY(-22deg) rotateX(1deg) rotateZ(0.95deg) scale(0.955)",
                "perspective(2400px) translate3d(0, 0, -6.2rem) rotateY(-28deg) rotateX(0.85deg) rotateZ(1.1deg) scale(0.91)",
              ];
              const origins = ["center center", "right center", "right center", "right center"];
              const heightClasses = [
                "h-[25rem] lg:h-[39rem]",
                "h-[24rem] lg:h-[36.5rem]",
                "h-[22.5rem] lg:h-[33rem]",
                "h-[20.5rem] lg:h-[29.5rem]",
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
                  className={`absolute overflow-hidden rounded-[28px] backdrop-blur-[12px] will-change-transform ${heightClasses[stackIndex]} ${
                    isLightHome
                      ? "border border-[rgba(206,166,94,0.48)] bg-[linear-gradient(180deg,rgba(255,251,243,0.68)_0%,rgba(247,238,220,0.42)_100%)] shadow-[0_0_0_1px_rgba(236,212,162,0.34),0_24px_70px_rgba(96,62,22,0.14)]"
                      : "border border-[rgba(233,203,129,0.56)] bg-[linear-gradient(180deg,rgba(12,18,28,0.82)_0%,rgba(12,18,28,0.5)_100%)] shadow-[0_0_0_1px_rgba(244,217,150,0.14),0_30px_90px_rgba(0,0,0,0.46)]"
                  }`}
                  style={{
                    left: lefts[stackIndex],
                    bottom: bottoms[stackIndex],
                    width: widths[stackIndex],
                    opacity,
                    zIndex,
                    transform: transforms[stackIndex],
                    transformOrigin: origins[stackIndex],
                    filter: filters[stackIndex],
                    boxShadow:
                      isLightHome
                        ? stackIndex === 0
                          ? "0 0 0 1px rgba(240,219,176,0.62), 0 0 0 2px rgba(216,183,102,0.18), 0 0 20px rgba(223,186,118,0.16)"
                          : stackIndex === 1
                            ? "0 0 0 1px rgba(236,208,152,0.44), 0 0 16px rgba(223,186,118,0.14), 0 24px 52px rgba(89,62,29,0.14)"
                            : stackIndex === 2
                              ? "0 0 0 1px rgba(231,199,138,0.36), 0 0 13px rgba(223,186,118,0.12), 0 18px 38px rgba(89,62,29,0.12)"
                              : "0 0 0 1px rgba(226,191,127,0.32), 0 0 10px rgba(223,186,118,0.1), 0 14px 28px rgba(89,62,29,0.1)"
                        : stackIndex === 0
                          ? "0 0 0 1px rgba(252,229,176,0.6), 0 0 0 2px rgba(216,183,102,0.18), 0 0 24px rgba(240,210,138,0.24)"
                          : stackIndex === 1
                            ? "0 0 0 1px rgba(248,220,156,0.44), 0 0 18px rgba(232,199,122,0.18), 0 26px 68px rgba(0,0,0,0.42)"
                            : stackIndex === 2
                              ? "0 0 0 1px rgba(244,214,150,0.34), 0 0 14px rgba(228,193,114,0.14), 0 18px 46px rgba(0,0,0,0.34)"
                              : "0 0 0 1px rgba(239,207,141,0.3), 0 0 12px rgba(222,188,110,0.1), 0 14px 34px rgba(0,0,0,0.28)",
                  }}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-[28px] ${
                      isLightHome ? "border border-[rgba(255,248,233,0.86)]" : "border border-[rgba(255,239,208,0.62)]"
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute inset-[1px] rounded-[27px] ${
                      isLightHome
                        ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0)_24%,rgba(255,246,223,0)_76%,rgba(232,196,117,0.16)_100%)]"
                        : "bg-[linear-gradient(135deg,rgba(255,241,196,0.24)_0%,rgba(255,241,196,0)_24%,rgba(255,241,196,0)_76%,rgba(255,222,154,0.2)_100%)]"
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-[28px] ${
                      isLightHome
                        ? "bg-[radial-gradient(circle_at_9%_10%,rgba(255,255,255,0.74),transparent_14%),radial-gradient(circle_at_91%_9%,rgba(240,211,153,0.64),transparent_14%),radial-gradient(circle_at_9%_92%,rgba(232,196,117,0.28),transparent_16%),radial-gradient(circle_at_92%_90%,rgba(255,255,255,0.34),transparent_14%)]"
                        : "bg-[radial-gradient(circle_at_9%_10%,rgba(255,243,214,0.36),transparent_14%),radial-gradient(circle_at_91%_9%,rgba(245,209,136,0.52),transparent_14%),radial-gradient(circle_at_9%_92%,rgba(232,196,117,0.22),transparent_16%),radial-gradient(circle_at_92%_90%,rgba(255,233,186,0.18),transparent_14%)]"
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-[28px] ${
                      isLightHome
                        ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.78),inset_1px_0_0_rgba(240,214,156,0.24),inset_-1px_0_0_rgba(240,214,156,0.18)]"
                        : "shadow-[inset_0_1px_0_rgba(255,246,223,0.52),inset_1px_0_0_rgba(246,216,145,0.28),inset_-1px_0_0_rgba(246,216,145,0.22)]"
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute left-[10%] right-[10%] top-0 h-px ${
                      isLightHome
                        ? "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.96),rgba(240,211,153,0.42),transparent)]"
                        : "bg-[linear-gradient(90deg,transparent,rgba(255,241,196,0.82),rgba(240,210,138,0.32),transparent)]"
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute inset-x-[14%] top-[6%] h-[22%] -rotate-[8deg] blur-2xl ${
                      isLightHome
                        ? "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),rgba(255,245,217,0.32),transparent)]"
                        : "bg-[linear-gradient(90deg,transparent,rgba(255,242,214,0.08),rgba(245,209,136,0.18),transparent)]"
                    }`}
                  />
                  <Image
                    src={slide.image}
                    alt={`${slide.title} showcase`}
                    fill
                    sizes="(min-width: 1024px) 54vw, 90vw"
                    className="object-cover"
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
            {demoSlides.map((slide, index) => (
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
