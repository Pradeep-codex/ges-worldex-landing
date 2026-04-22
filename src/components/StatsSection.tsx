"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
}

const StatCounter = ({ value, label, suffix = "+", decimals = 0 }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    stiffness: 50,
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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="p-5 rounded-[24px] bg-[#f8faff] shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] flex flex-col items-center justify-center text-center group hover:shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff] transition-all duration-300"
    >
      <div className="flex items-baseline mb-1">
        <motion.span className="text-3xl font-black text-[#1a1f2e] tracking-tighter">
          {displayValue}
        </motion.span>
        <span className="text-2xl font-bold text-indigo-500 ml-0.5">{suffix}</span>
      </div>
      <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.1em]">
        {label}
      </p>
    </motion.div>
  );
};

export function StatsSection() {
  return (
    <section className="relative py-16 overflow-hidden bg-[#f0f4f8]">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-[40%] space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black leading-tight"
              >
                <span className="text-[#1a1f2e]">Our Impact </span>
                <span className="text-indigo-600 font-display italic">in Numbers</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-sm text-foreground/50 font-medium leading-relaxed max-w-sm mx-auto lg:mx-0"
              >
                World-class exhibitions connecting India's business landscape.
              </motion.p>
            </div>

            {/* Statistics Grid - Smaller Neumorphic Design */}
            <div className="grid grid-cols-2 gap-4">
              <StatCounter value={10000} label="Exhibitors" />
              <StatCounter value={500000} label="Visitors" />
              <StatCounter value={400} label="Shows" />
              <StatCounter value={50000} label="Stalls" />
            </div>
          </div>

          {/* Right Side: Image inside Premium Blob */}
          <div className="w-full lg:w-[60%] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full max-w-[500px] flex items-center justify-center"
            >
              {/* Premium Blob Backdrop */}
              <div className="absolute inset-0 bg-indigo-500/10 [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)] animate-[spin_20s_linear_infinite] scale-110 blur-2xl" />
              <div className="absolute inset-0 bg-indigo-200/20 [clip-path:polygon(20%_10%,80%_0%,100%_40%,90%_90%,30%_100%,0%_60%)] animate-[spin_15s_linear_infinite_reverse] scale-105" />
              
              {/* Image Container with Blob Shape */}
              <div className="relative z-10 w-full aspect-[4/3] bg-white/30 backdrop-blur-sm shadow-2xl overflow-hidden [clip-path:polygon(42%_4%,73%_11%,95%_42%,87%_78%,49%_98%,9%_81%,2%_33%,23%_6%)] border-4 border-white/50">
                <img
                  src="/stat1.png"
                  alt="GES Stats"
                  className="w-full h-full object-cover transform scale-110"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


        </div>
      </div>
    </section>
  );
}
