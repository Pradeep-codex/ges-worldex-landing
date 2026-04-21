"use client";

import { useState, useMemo } from "react";
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

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { 
    name: "Exhibitors", 
    href: "/exhibitors",
    subMenu: [
      { name: "Booth Application", href: "/exhibitors/booth-application", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "Floor Plan", href: "/exhibitors/floor-plan", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "Exhibitor Portal", href: "/exhibitors/portal", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "Hotel Info", href: "/exhibitors/hotel-info", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "Vendor Info", href: "/exhibitors/vendor-info", icon: <ArrowRight className="w-4 h-4" /> },
      { name: "Sponsorship Info", href: "/exhibitors/sponsorship", icon: <ArrowRight className="w-4 h-4" /> },
    ]
  },
  { name: "Visitors", href: "/visitors" },
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
    href: "mailto:info@gesindiaexh.com",
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [expandedMobileSub, setExpandedMobileSub] = useState<string | null>(null);
  const pathname = usePathname();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setIsScrolled(latest > 50);
  });

  const activeNav = navItems.find((item) => item.href === pathname)?.name || "Home";

  const dropAnimation = {
    initial: { opacity: 0, y: -25 },
    animate: { opacity: 1, y: 0 },
    transition: (delayMs: number) => ({
      duration: 0.7,
      ease: "easeOut" as const,
      delay: delayMs,
    }),
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -110,
      }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out py-4"
    >
      <div className="mx-auto px-4 lg:px-6 w-full max-w-full transition-all duration-500">
        <div
          className={`flex items-center justify-between w-full h-full gap-2 lg:gap-4 transition-all duration-500 ease-in-out relative ${
            isScrolled
              ? "bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-slate-100 rounded-full px-4 lg:px-6 py-2 mx-auto"
              : "bg-transparent px-2 py-2"
          }`}
        >
          <div className="flex flex-1 items-center justify-start">
            <motion.div
              initial={dropAnimation.initial}
              animate={dropAnimation.animate}
              transition={dropAnimation.transition(1.3)}
            >
              <Link
                href="/"
                className="flex items-center group transition-transform duration-300 active:scale-95"
              >
                <img
                  src="/logo.png"
                  alt="GES Worldex"
                  className="h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-16 w-auto object-contain drop-shadow-sm"
                />
              </Link>
            </motion.div>
          </div>

          <div className="hidden xl:flex flex-none justify-center z-20">
            <nav className="flex items-center relative bg-[#f1f5f9]/80 p-2 rounded-full shadow-[inset_4px_4px_10px_rgba(163,177,198,0.4),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] border border-white/60 backdrop-blur-xl">
              {navItems.map((item, idx) => {
                const isHoveredOrActive = (hoveredNav || activeNav) === item.name;

                return (
                  <motion.div
                    key={item.name}
                    className="flex items-center relative"
                    initial={dropAnimation.initial}
                    animate={dropAnimation.animate}
                    transition={dropAnimation.transition(1.4 + idx * 0.1)}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-3.5 xl:px-5 py-2.5 text-[12px] xl:text-[14px] font-bold tracking-tight xl:tracking-wide transition-all z-10 rounded-full whitespace-nowrap flex items-center gap-1.5 ${
                        isHoveredOrActive ? "text-slate-800 scale-105" : "text-slate-500 hover:text-slate-700"
                      }`}
                      onMouseEnter={() => setHoveredNav(item.name)}
                      onMouseLeave={() => setHoveredNav(null)}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {item.subMenu && (
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${hoveredNav === item.name ? "rotate-180" : ""}`} />
                      )}
                      
                      {(hoveredNav === item.name || activeNav === item.name) && (
                        <motion.div
                          layoutId="navDrop"
                          className="absolute inset-0 bg-white shadow-[2px_2px_5px_rgba(163,177,198,0.4),-2px_-2px_5px_rgba(255,255,255,1)] z-0 rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>

                    {item.subMenu && (
                      <AnimatePresence>
                        {hoveredNav === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            onMouseEnter={() => setHoveredNav(item.name)}
                            onMouseLeave={() => setHoveredNav(null)}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-[100]"
                          >
                            <div className="bg-white/95 backdrop-blur-2xl border border-white p-4 rounded-[28px] shadow-[20px_20px_60px_rgba(0,0,0,0.08),-10px_-10px_40px_rgba(255,255,255,0.7)] min-w-[440px]">
                              <div className="grid grid-cols-2 gap-2">
                                {item.subMenu.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                                  >
                                    <div className="flex flex-col">
                                      <span className="text-[13px] font-black text-slate-800 tracking-tight">{sub.name}</span>
                                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Launch</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all transform group-hover:translate-x-1">
                                      {sub.icon}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {idx < navItems.length - 1 && (
                      <div className="w-[1px] h-[14px] mx-1 bg-slate-200 rounded-full shrink-0 z-10" />
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
                    transition={dropAnimation.transition(1.9 + idx * 0.1)}
                    className="relative group flex items-center justify-center p-[7px] rounded-full cursor-pointer text-slate-800 bg-transparent border border-slate-800 transition-transform duration-300 transform hover:scale-110 z-30"
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
               className="h-5 w-[1px] bg-slate-200 hidden lg:block rounded-full"
               initial={dropAnimation.initial}
               animate={dropAnimation.animate}
               transition={dropAnimation.transition(2.2)} 
            />

            <motion.a
              href="tel:+919945012123"
              initial={dropAnimation.initial}
              animate={dropAnimation.animate}
              transition={dropAnimation.transition(2.3)} 
              className="hidden lg:flex items-center gap-2 text-slate-700 bg-[#f4f7fb] px-4 xl:px-6 py-2 xl:py-2.5 rounded-full shadow-[5px_5px_12px_rgba(163,177,198,0.5),-5px_-5px_12px_rgba(255,255,255,1)] hover:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] transition-all duration-300 group border border-white/50"
            >
              <Phone className="w-[16px] xl:w-[17px] h-[16px] xl:h-[17px] stroke-[2.5]" />
              <span className="text-[13px] xl:text-[14.5px] font-bold tracking-tight xl:tracking-wide whitespace-nowrap text-slate-800">
                +91 99450 12123
              </span>
            </motion.a>

            <motion.div
              className="xl:hidden flex items-center"
              initial={dropAnimation.initial}
              animate={dropAnimation.animate}
              transition={dropAnimation.transition(1.5)}
            >
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex flex-col items-center justify-center p-0 rounded-xl bg-[#f4f7fb] shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] active:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] transition-shadow duration-200"
                aria-label="Toggle Menu"
              >
                <Menu className="w-5 h-5 text-slate-900" />
              </button>
            </motion.div>
            
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="xl:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="xl:hidden fixed top-0 right-0 h-full w-[85%] max-w-[380px] bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.1)] z-[60] flex flex-col rounded-l-[40px] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <img src="/logo.png" alt="GES Worldex" className="h-8 w-auto" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <nav className="flex flex-col gap-6">
                  {navItems.map((item, idx) => (
                    <motion.div 
                      key={item.name} 
                      className="flex flex-col border-b border-slate-50 pb-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex items-center justify-between">
                        <Link 
                          href={item.href}
                          className={`text-xl font-black ${pathname === item.href ? "text-slate-900" : "text-slate-500"}`}
                          onClick={() => !item.subMenu && setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {item.subMenu && (
                          <button 
                            onClick={() => setExpandedMobileSub(expandedMobileSub === item.name ? null : item.name)}
                            className={`w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 transition-all duration-300 ${expandedMobileSub === item.name ? "rotate-180 bg-slate-900 text-white" : "text-slate-400"}`}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      {/* Mobile Sub-Menu Accordion */}
                      <AnimatePresence>
                        {item.subMenu && expandedMobileSub === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-4 pl-4 pt-4 mt-2 border-l-2 border-slate-100">
                              {item.subMenu.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="text-[15px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-3 active:translate-x-2 transition-transform"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-12 space-y-8">
                  <div className="space-y-4">
                    <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Contact Details</p>
                    <div className="space-y-3 font-bold">
                      <a href="tel:+919945012123" className="flex items-center gap-3 text-slate-800 text-lg">
                         <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                            <Phone className="w-4 h-4" />
                         </div>
                         +91 99450 12123
                      </a>
                      <a href="mailto:info@gesindiaexh.com" className="flex items-center gap-3 text-slate-600">
                         <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                            <MapPin className="w-4 h-4" />
                         </div>
                         info@gesindiaexh.com
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Visit Us</p>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      12, Ground Floor, 2nd Main,<br/>
                      RMV 2nd Stage, Bangalore,<br/>
                      Karnataka - 560094
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold text-slate-400">Connect with us</p>
                  <div className="flex gap-4">
                    {socialIcons.map((social) => (
                      <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                        <div className="w-5 h-5">{social.svg}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
