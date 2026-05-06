"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";

const bannerImages = [
  { desktop: "/banners/b1.jpeg", mobile: "/banners/mtb1.jpeg" },
  { desktop: "/banners/b2.jpeg", mobile: "/banners/mtb2.jpeg" },
  { desktop: "/banners/b3.jpeg", mobile: "/banners/mtb3.jpeg" },
];

const bannerData = [
  {
    title: "Global Exhibition on Services 2024",
    subtitle: "Connecting the world through premium trade partnerships and global services.",
    date: "24th - 26th Oct, 2024",
    time: "10:00 AM - 06:30 PM",
    location: "BIEC, Bangalore, India",
    tag: "Flagship Event"
  },
  {
    title: "World Expo India Summit",
    subtitle: "The definitive destination for international business and innovative collaborations.",
    date: "12th - 14th Nov, 2024",
    time: "09:30 AM - 07:00 PM",
    location: "Pragati Maidan, New Delhi",
    tag: "International"
  },
  {
    title: "Eco-Tech Innovation Forum",
    subtitle: "Defining the future of sustainable technology and green industrial solutions.",
    date: "05th - 07th Dec, 2024",
    time: "10:00 AM - 06:00 PM",
    location: "HITEX, Hyderabad, India",
    tag: "Tech Summit"
  }
];

export function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + bannerImages.length) % bannerImages.length);
  }, []);

  const nextSlide = useCallback(() => paginate(1), [paginate]);
  const prevSlide = useCallback(() => paginate(-1), [paginate]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, nextSlide]);

  return (
    <section className="relative w-full max-w-[1700px] mx-auto px-4 md:px-8 lg:px-12">
      <div 
        className="relative w-full rounded-[24px] md:rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-background"
        onMouseEnter={() => !isPortrait && setIsPaused(true)}
        onMouseLeave={() => !isPortrait && setIsPaused(false)}
      >
        {/* Invisible Spacer Image to maintain dynamic height based on content */}
        <img 
          src={isPortrait ? bannerImages[current].mobile : bannerImages[current].desktop}
          className="w-full h-auto opacity-0 pointer-events-none block"
          alt="spacer"
        />

          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 150, damping: 25 },
                opacity: { duration: 0.5 }
              }}
              className="absolute inset-0"
            >
              {/* Real Sliding Image */}
              <img 
                src={isPortrait ? bannerImages[current].mobile : bannerImages[current].desktop}
                className={`w-full h-full block ${isPortrait ? 'object-contain' : 'object-cover'}`}
                alt={bannerData[current].title}
              />

              {/* Solid to Transparent Gradient Overlay - DESKTOP ONLY */}
              {!isPortrait && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isPaused ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-10"
                >
                  {/* Premium dark overlay (no pure black) */}
                  <div className="absolute inset-0 banner-image-overlay opacity-100" />

                  {/* Content Container */}
                  <div className="relative h-full container mx-auto px-6 lg:px-12 flex flex-col justify-center z-20">
                    <div className="max-w-4xl space-y-8">
                      
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.2em]"
                      >
                        {bannerData[current].tag}
                      </motion.div>

                      <div className="space-y-4">
                        <motion.h1
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter"
                        >
                          {bannerData[current].title.split(" ").map((word, i) => (
                            <span key={i} className={i === 2 ? "text-slate-400" : ""}>{word} </span>
                          ))}
                        </motion.h1>
                        
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.8 }}
                          className="text-lg md:text-xl text-slate-300 max-w-2xl font-medium leading-relaxed"
                        >
                          {bannerData[current].subtitle}
                        </motion.p>
                      </div>

                      {/* Event Meta Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex flex-wrap items-center gap-y-4 gap-x-8 text-white/90"
                      >
                        <div className="flex items-center gap-3 group">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Date</span>
                            <span className="text-[15px] font-bold">{bannerData[current].date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 group">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Timing</span>
                            <span className="text-[15px] font-bold">{bannerData[current].time}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 group">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Venue</span>
                            <span className="text-[15px] font-bold">{bannerData[current].location}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="pt-4"
                      >
                        <button className="group flex items-center gap-3 rounded-full bg-[#2f2318] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-[#9f7b28] active:scale-95 [html[data-theme='dark']_&]:bg-[#d8b766] [html[data-theme='dark']_&]:text-[#071018] [html[data-theme='dark']_&]:hover:bg-[#f0d188]">
                          Register for access
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

      {/* Arrow Controls - Hidden on Mobile/Tablet */}
      <button
        onClick={prevSlide}
        className="hidden lg:flex absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"
      >
        <ChevronRight className="w-6 h-6 rotate-180" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden lg:flex absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      </div>

      {/* External Neumorphic Navigation Dots - Closer on Mobile */}
      <div className="mt-6 md:mt-10 flex justify-center gap-6">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`w-5 h-5 md:w-7 md:h-7 rounded-full transition-all duration-300 relative flex items-center justify-center bg-[rgba(255,253,248,0.72)] border border-[rgba(159,123,40,0.22)] backdrop-blur-xl [html[data-theme='dark']_&]:bg-[#071018]/70 [html[data-theme='dark']_&]:border-white/10 ${
              current === index 
              ? "shadow-[0_14px_40px_rgba(159,123,40,0.22)]" 
              : "shadow-[0_12px_34px_rgba(47,35,24,0.10)]"
            }`}
          >
            <div 
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-500 ${
                current === index ? "bg-[color:var(--dot-active)] shadow-[0_0_16px_var(--dot-shadow)]" : "bg-[color:var(--dot-inactive)]"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
