"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
}

const StatCounter = ({ value, label, suffix = "+", decimals = 0 }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    stiffness: 60,
    damping: 30,
  });

  const displayValue = useTransform(springValue, (latest) => {
    return new Intl.NumberFormat().format(Number(latest.toFixed(decimals)));
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative group p-8 rounded-[32px] bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500"
    >
      <div className="flex flex-col items-start">
        <div className="flex items-baseline">
          <motion.span className="text-4xl md:text-5xl font-black text-[#111521] tracking-tighter">
            {displayValue}
          </motion.span>
          <span className="text-3xl md:text-4xl font-bold text-indigo-600 ml-0.5">{suffix}</span>
        </div>
        <p className="mt-2 text-sm font-bold text-foreground/45 uppercase tracking-[0.15em]">
          {label}
        </p>
      </div>
      
      {/* Decorative background element on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/[0.03] to-transparent opacity-0 group-hover:opacity-100 rounded-[32px] transition-opacity duration-500" />
    </motion.div>
  );
};

export function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-[#f8faff]">
      {/* Background Orbs for depth */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/5 border border-indigo-600/10"
              >
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase">Growth & Influence</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl xl:text-6xl font-black text-[#111521] tracking-tight leading-[1.1]"
              >
                Our Impact in <br />
                <span className="text-indigo-600 underline decoration-indigo-600/20 underline-offset-8">Numbers</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-foreground/60 font-medium leading-relaxed max-w-lg"
              >
                Connecting businesses, exhibitors, and visitors across India through world-class exhibitions and networking opportunities.
              </motion.p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
              <StatCounter value={10000} label="Exhibitors" />
              <StatCounter value={500000} label="Visitors" />
              <StatCounter value={400} label="Shows Organized" />
              <StatCounter value={50000} label="Stalls Fabricated" />
            </div>
          </div>

          {/* Right Side: 3D Illustration */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative w-full max-w-[600px] flex items-center justify-center"
            >
              <img
                src="/stat1.png"
                alt="GES Impact Stat"
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
