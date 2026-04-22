"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  color: string;
}

const StatItem = ({ value, label, suffix = "+", color }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, { stiffness: 40, damping: 25 });
  const displayValue = useTransform(springValue, (v) => new Intl.NumberFormat().format(Math.floor(v)));

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center p-6 bg-white/40 backdrop-blur-md rounded-[32px] border border-white/60 shadow-[0_15px_35px_rgba(0,0,0,0.03)] group hover:scale-105 transition-all duration-500"
    >
      <div className={`w-12 h-1 px-4 rounded-full mb-4 animate-pulse`} style={{ backgroundColor: color }} />
      <div className="flex items-baseline">
        <motion.span className="text-4xl font-black text-[#1a1f2e] tracking-tight">{displayValue}</motion.span>
        <span className="text-2xl font-bold ml-0.5" style={{ color: color }}>{suffix}</span>
      </div>
      <p className="text-[11px] font-bold text-foreground/40 uppercase tracking-widest mt-1">{label}</p>
    </motion.div>
  );
};

export function StatsSection() {
  return (
    <section className="relative py-20 bg-[#fafbfc] overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-indigo-100 rounded-full scale-150" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-indigo-50 rounded-full scale-110" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Content & Stats */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10">
            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black text-[#1a1f2e] leading-tight"
              >
                Our Impact <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Global & Local</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-foreground/50 font-medium max-w-md text-sm leading-relaxed"
              >
                Driving industrial growth and cross-border partnerships through professional exhibition management.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 gap-5 max-w-lg">
              <StatItem value={10000} label="Exhibitors" color="#4F46E5" />
              <StatItem value={500000} label="Visitors" color="#0EA5E9" />
              <StatItem value={400} label="Shows" color="#8B5CF6" />
              <StatItem value={50000} label="Stalls" color="#EC4899" />
            </div>
          </div>

          {/* Right: The Blob Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative w-full aspect-square max-w-[480px]"
            >
              {/* Glass Ring */}
              <div className="absolute inset-0 border-[16px] border-white/30 rounded-[35%_65%_70%_30%_/_30%_30%_70%_70%] animate-[morph_8s_ease-in-out_infinite] shadow-2xl" />
              
              {/* Main Image Blob */}
              <div className="absolute inset-[15px] overflow-hidden bg-white shadow-xl rounded-[35%_65%_70%_30%_/_30%_30%_70%_70%] border border-white/50">
                <img 
                  src="/stat2.png" 
                  alt="Statistics" 
                  className="w-full h-full object-cover transform scale-110"
                />
              </div>

              {/* Decorative nodes */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center p-3"
              >
                <div className="w-full h-full bg-indigo-600 rounded-lg opacity-20" />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes morph {
          0% { border-radius: 35% 65% 70% 30% / 30% 30% 70% 70%; }
          50% { border-radius: 50% 50% 30% 70% / 50% 60% 40% 50%; }
          100% { border-radius: 35% 65% 70% 30% / 30% 30% 70% 70%; }
        }
      `}</style>
    </section>
  );
}
