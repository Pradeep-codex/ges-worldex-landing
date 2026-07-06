"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Phone,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Clock,
  MapPin
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { name: "Home", href: "/home" },
  { name: "About Us", href: "/about" },
  { 
    name: "Exhibitors", 
    href: "/exhibitors",
    subMenu: [
      { name: "Booth Application", href: "/exhibitors/booth-application", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "Floor Plan", href: "/exhibitors/floor-plan", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "Exhibitor Portal", href: "https://gesworldex.com/ep/index.php", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "Hotel Info", href: "/exhibitors/hotel-info", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "Vendor Info", href: "/exhibitors/vendor-info", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "Sponsorship Info", href: "/exhibitors/sponsorship", icon: <ArrowRight className="w-4 h-4" /> },
    ]
  },
  { 
    name: "Visitors", 
    href: "/visitors",
    subMenu: [
      { name: "Visitor Registration", href: "/visitors/registration", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "Floor Plan", href: "/visitors/floor-plan", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "Exhibitor List", href: "/visitors/exhibitor-list", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "Hotel Info", href: "/visitors/hotel-info", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "How to reach Venue?", href: "/visitors/how-to-reach", icon: <ArrowRight className="w-4 h-4" /> },
    ]
  },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

const socialIcons = [
  {
    name: "Instagram",
    color: "#E1306C",
    svg: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    href: "https://www.instagram.com/ges.india.inc/",
  },
  {
    name: "Facebook",
    color: "#1877F2",
    svg: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
    href: "https://www.facebook.com/ges.india.exh",
  },
  {
    name: "X (Twitter)",
    color: "#000000",
    svg: (
      <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.04 4.126H5.078z" />
      </svg>
    ),
    href: "https://x.com/IndiaGes",
  },
  {
    name: "Email",
    color: "#EA4335",
    svg: (
      <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="currentColor">
        <path d="M3 3h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm0 2v.011l9 5.25 9-5.25V5H3zm18 14V8.388l-9 5.25-9-5.25V19h18z" />
      </svg>
    ),
    href: "mailto:support@gesworldex.com",
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [expandedMobileSub, setExpandedMobileSub] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const desktopNavRef = useRef<HTMLElement | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isMobileMenuOpen) return;
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHasMounted(true);

    const mql = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(mql.matches);
    update();

    // Support older Safari
    // eslint-disable-next-line deprecation/deprecation
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    // eslint-disable-next-line deprecation/deprecation
    mql.addListener(update);
    // eslint-disable-next-line deprecation/deprecation
    return () => mql.removeListener(update);
  }, []);

  useEffect(() => {
    if (canHover) return;
    if (!hoveredNav) return;

    const onPointerDown = (e: PointerEvent) => {
      const navEl = desktopNavRef.current;
      if (!navEl) return;
      if (navEl.contains(e.target as Node)) return;
      setHoveredNav(null);
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [canHover, hoveredNav]);

  const activeNav =
    navItems.find((item) => item.href === pathname || (item.href !== "/home" && pathname.startsWith(`${item.href}/`)))?.name ||
    "Home";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Update URL hash without jumping
        window.history.pushState(null, "", href);
        setIsMobileMenuOpen(false);
      }
    }
  };

  const dropAnimation = {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    transition: (order = 0) => ({
      duration: 0.24,
      ease: "easeOut" as const,
      delay: Math.min(order * 0.015, 0.09),
    }),
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -110,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 inset-x-0 z-[300] py-4 will-change-transform"
      >
        <div className="mx-auto px-4 lg:px-6 w-full max-w-full">
          <div
            className={`flex items-center justify-between w-full h-full gap-2 lg:gap-4 relative ${isScrolled
              ? "bg-background/75 backdrop-blur-2xl shadow-[0_10px_36px_rgba(0,0,0,0.08)] border border-[color:var(--border)] rounded-full px-4 lg:px-6 py-2 mx-auto"
              : "bg-transparent px-2 py-2"
              }`}
          >
            <div className="flex flex-1 items-center justify-start">
                <motion.div
                initial={dropAnimation.initial}
                animate={dropAnimation.animate}
                transition={dropAnimation.transition()}
              >
                <Link
                  href="/home"
                  className="flex items-center group transition-transform duration-300 active:scale-95"
                >
                  <img
                    src="/logo-light.png"
                    alt="GES Worldex"
                    className="block [html[data-theme='dark']_&]:hidden h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-16 w-auto object-contain drop-shadow-sm"
                  />
                  <img
                    src="/logo-dark.png"
                    alt="GES Worldex"
                    className="hidden [html[data-theme='dark']_&]:block h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-16 w-auto object-contain drop-shadow-sm"
                  />
                </Link>
              </motion.div>
            </div>

            <div className="hidden xl:flex flex-none justify-center z-20">
              <nav
                className="flex items-center relative bg-background/40 p-1.5 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),inset_0_-1px_1px_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.05)] border border-[color:var(--border)] backdrop-blur-2xl px-2"
                onMouseLeave={() => setHoveredNav(null)}
                ref={desktopNavRef}
              >
                {navItems.map((item, idx) => {
                  const isFocused = (hoveredNav || activeNav) === item.name;

                  return (
                    <motion.div
                      key={item.name}
                      className="flex items-center relative"
                      initial={dropAnimation.initial}
                      animate={dropAnimation.animate}
                      transition={dropAnimation.transition(idx + 1)}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          if (item.subMenu) {
                            e.preventDefault();
                            if (!canHover) {
                              setHoveredNav((prev) => (prev === item.name ? null : item.name));
                            }
                            return;
                          }
                          handleNavClick(e, item.href);
                        }}
                        className={`relative px-4 xl:px-6 py-2.5 text-[14px] xl:text-[15.5px] font-black tracking-tight xl:tracking-wide transition-all z-10 rounded-full whitespace-nowrap flex items-center gap-1.5 ${isFocused ? "text-[#111521] scale-105" : "text-foreground/60 hover:text-foreground"
                          }`}
                        onMouseEnter={() => setHoveredNav(item.name)}
                      >
                        <span className="relative z-10">{item.name}</span>
                        {item.subMenu && (
                          <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${hoveredNav === item.name ? "rotate-180" : ""}`} />
                        )}

                        {isFocused && (
                          <motion.div
                            layoutId="navDrop"
                            className="absolute inset-0 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.1)] z-0 rounded-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 420,
                              damping: 32,
                              opacity: { duration: 0.15 }
                            }}
                          />
                        )}
                      </Link>

                      {item.subMenu && (
                        <AnimatePresence>
                          {hoveredNav === item.name && (
                            <motion.div
                              initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
                              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
                              exit={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              onMouseEnter={() => setHoveredNav(item.name)}
                              onMouseLeave={() => setHoveredNav(null)}
                              className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[400]"
                            >
                              <div className="bg-background border border-[color:var(--border)] p-2.5 rounded-[24px] shadow-[0_30px_90px_rgba(0,0,0,0.22)] min-w-[320px]">
                                <motion.div
                                  initial="hidden"
                                  animate="visible"
                                  variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                      opacity: 1,
                                      transition: {
                                        staggerChildren: 0.05
                                      }
                                    }
                                  }}
                                  className="flex flex-col gap-1"
                                >
                                  {item.subMenu.map((sub) => (
                                    <motion.div
                                      key={sub.name}
                                      variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
                                      }}
                                    >
                                      <Link
                                        href={sub.href}
                                        className="group flex items-center justify-between p-3.5 rounded-xl hover:bg-foreground/5 transition-all border border-transparent hover:border-[color:var(--border)]"
                                      >
                                        <div className="flex flex-col">
                                          <span className="text-[14px] xl:text-[15px] font-black text-foreground tracking-tight">{sub.name}</span>
                                          <span className="text-[10px] text-foreground/45 font-bold uppercase tracking-widest mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                                        </div>
                                        <div className="w-7 h-7 rounded-full bg-foreground/8 flex items-center justify-center text-foreground/55 group-hover:bg-foreground group-hover:text-background transition-all transform group-hover:translate-x-1">
                                          {sub.icon}
                                        </div>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}

                      {idx < navItems.length - 1 && (
                        <div className="w-[1px] h-[14px] mx-1 bg-foreground/15 rounded-full shrink-0 z-10" />
                      )}
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-1 justify-end items-center gap-3">
              <div className="hidden 2xl:flex items-center gap-2">
                {socialIcons.map((social, idx) => {
                  return (
                    <motion.div
                      key={social.name}
                      initial={dropAnimation.initial}
                      animate={dropAnimation.animate}
                      transition={dropAnimation.transition(idx + 1)}
                      className="relative group flex items-center justify-center p-[7px] rounded-full cursor-pointer text-foreground/70 bg-background/40 border border-[color:var(--border)] transition-transform duration-300 transform hover:scale-110 z-30"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#ffffff";
                        e.currentTarget.style.backgroundColor = social.color;
                        e.currentTarget.style.borderColor = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "";
                        e.currentTarget.style.backgroundColor = "";
                        e.currentTarget.style.borderColor = "";
                      }}
                    >
                      <Link
                        href={social.href}
                        className="flex items-center justify-center relative z-10"
                        aria-label={social.name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.svg}
                      </Link>

                      <div className="absolute top-0 opacity-0 invisible group-hover:visible group-hover:-top-[45px] group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 ease-out z-[100] flex justify-center">
                        <div
                          className="text-white text-[14px] font-semibold px-[8px] py-[5px] rounded-[5px] shadow-[0_10px_10px_rgba(0,0,0,0.1)] whitespace-nowrap relative"
                          style={{ backgroundColor: social.color }}
                        >
                          {social.name}
                          <div
                            className="absolute h-[8px] w-[8px] -bottom-[3px] left-1/2 -translate-x-1/2 rotate-45"
                            style={{ backgroundColor: social.color }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                className="h-5 w-[1px] bg-foreground/15 hidden xl:block rounded-full mx-1"
                initial={dropAnimation.initial}
                animate={dropAnimation.animate}
                transition={dropAnimation.transition(1)}
              />

              <motion.div
                initial={dropAnimation.initial}
                animate={dropAnimation.animate}
                transition={dropAnimation.transition(2)}
                className="hidden xl:block"
              >
                <ThemeToggle className="shadow-none border-none xl:border-[color:var(--border)]" />
              </motion.div>

              <motion.a
                href="tel:+919945012123"
                initial={dropAnimation.initial}
                animate={dropAnimation.animate}
                transition={dropAnimation.transition(3)}
                className="hidden xl:flex items-center gap-2 text-foreground/75 bg-background/55 px-4 xl:px-6 py-2 xl:py-2.5 rounded-full shadow-[0_14px_40px_rgba(0,0,0,0.10)] hover:shadow-[0_18px_55px_rgba(0,0,0,0.16)] transition-all duration-300 group border border-[color:var(--border)] backdrop-blur-xl"
              >
                <Phone className="w-[16px] xl:w-[17px] h-[16px] xl:h-[17px] stroke-[2.5]" />
                <span className="text-[13px] xl:text-[14.5px] font-bold tracking-tight xl:tracking-wide whitespace-nowrap text-foreground">
                  +91 99450 12123
                </span>
              </motion.a>

              <motion.div
                className="xl:hidden flex items-center gap-2"
                initial={dropAnimation.initial}
                animate={dropAnimation.animate}
                transition={dropAnimation.transition(1)}
              >
                <ThemeToggle className="shadow-none" />
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-10 h-10 flex flex-col items-center justify-center p-0 rounded-xl bg-background/55 shadow-[0_14px_40px_rgba(0,0,0,0.10)] active:shadow-[0_10px_28px_rgba(0,0,0,0.12)] border border-[color:var(--border)] backdrop-blur-xl transition-shadow duration-200"
                  aria-label="Toggle Menu"
                >
                  <Menu className="w-5 h-5 text-foreground" />
                </button>
              </motion.div>

            </div>
          </div>
        </div>
      </motion.header>

        {hasMounted && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-[10000] xl:hidden">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Sidebar Content */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 240 }}
                className="absolute inset-y-0 right-0 h-full w-[85%] max-w-[380px] bg-background flex flex-col rounded-l-[32px] shadow-2xl overflow-hidden border-l border-white/10"
              >
                {/* Header inside mobile menu - Integrated feel */}
                <div className="flex items-center justify-between px-7 py-8 border-b border-foreground/5 mb-2">
                  <Link href="/home" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src="/logo-light.png" alt="Logo" className="block [html[data-theme='dark']_&]:hidden h-8 w-auto opacity-90" />
                    <img src="/logo-dark.png" alt="Logo" className="hidden [html[data-theme='dark']_&]:block h-8 w-auto opacity-90" />
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground/[0.03] text-foreground/40 transition-colors active:bg-foreground/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto px-7 py-4">
                  <nav className="flex flex-col gap-2">
                    {[
                      { name: "Home", href: "/home" },
                      { name: "About Us", href: "/about" },
                      { name: "Exhibitors", href: "/exhibitors", hasSub: true },
                      { name: "Visitors", href: "/visitors", hasSub: true },
                      { name: "Testimonials", href: "/testimonials" },
                      { name: "Portfolio", href: "/portfolio" },
                      { name: "Contact", href: "/contact" },
                    ].map((item) => {
                      const originalItem = navItems.find(n => n.name === item.name);
                      const isExpanded = expandedMobileSub === item.name;

                      return (
                        <div key={item.name} className="flex flex-col gap-1">
                          <div className="flex items-center justify-between py-3.5">
                            <Link
                              href={item.href}
                              onClick={(e) => {
                                if (item.hasSub) {
                                  e.preventDefault();
                                  setExpandedMobileSub(isExpanded ? null : item.name);
                                  return;
                                }
                                handleNavClick(e, item.href);
                                setIsMobileMenuOpen(false);
                              }}
                              className={`text-[19px] font-bold tracking-tight transition-all duration-300 ${pathname === item.href ? "text-indigo-600" : "text-foreground/80"}`}
                            >
                              {item.name}
                            </Link>
                            {item.hasSub && (
                              <button
                                onClick={() => setExpandedMobileSub(isExpanded ? null : item.name)}
                                className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 ${isExpanded ? "rotate-180 bg-indigo-600/10 text-indigo-600" : "bg-foreground/[0.03] text-foreground/30"}`}
                              >
                                <ChevronDown className="w-5 h-5" />
                              </button>
                            )}
                          </div>

                          <AnimatePresence>
                            {item.hasSub && isExpanded && originalItem?.subMenu && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-foreground/[0.02] rounded-2xl mb-2"
                              >
                                <div className="flex flex-col gap-4 p-5 pl-7 border-l-2 border-indigo-600/20">
                                  {originalItem.subMenu.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      href={sub.href}
                                      className="text-[15px] font-semibold text-foreground/60 hover:text-indigo-600 flex items-center gap-3 transition-colors"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      <div className="w-1 h-1 rounded-full bg-indigo-600/40" />
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          <div className="h-[1px] w-full bg-foreground/[0.04]" />
                        </div>
                      );
                    })}
                  </nav>

                  <div className="mt-14 space-y-8">
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold tracking-[0.15em] text-foreground/25 uppercase pl-1">Inquiries</p>
                      <a href="tel:+919945012123" className="flex items-center gap-4 text-foreground/70 font-bold text-lg hover:text-indigo-600 transition-colors">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-600/5 flex items-center justify-center text-indigo-600">
                          <Phone className="w-5 h-5" />
                        </div>
                        +91 99450 12123
                      </a>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] font-bold tracking-[0.15em] text-foreground/25 uppercase pl-1">Location</p>
                      <div className="text-foreground/50 font-medium leading-relaxed p-5 bg-foreground/[0.02] rounded-2xl text-[14px] border border-foreground/[0.03]">
                        12, Ground Floor, 2nd Main,<br />
                        RMV 2nd Stage, Bangalore
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-7 bg-foreground/[0.02] border-t border-foreground/[0.04] mt-auto">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[10px] text-foreground/20 uppercase tracking-[0.15em]">Social Hub</span>
                    <div className="flex gap-4">
                      {socialIcons.map((social) => (
                        <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-foreground/30 hover:text-indigo-600 transition-all">
                          <div className="w-5 h-5">{social.svg}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
