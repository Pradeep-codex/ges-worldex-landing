"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function AboutHero() {
  return (
    <section className="bg-[#f8f6f2] px-4 py-20 text-[#17130d] md:px-8 md:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div className="space-y-5">
            <p className="inline-flex bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-sm font-black uppercase tracking-[0.24em] text-transparent">
              About GES Worldex
            </p>
            <h1 className="max-w-[660px] text-5xl font-black leading-[0.98] tracking-tight text-[#17130d] md:text-6xl lg:text-[64px]">
              Curating exhibition experiences that move markets forward.
            </h1>
            <p className="max-w-[560px] text-base leading-8 text-[#5f574c] md:text-lg">
              GES Worldex creates international exhibition platforms where brands, service providers, buyers, and emerging markets meet with purpose. We design business environments built for visibility, discovery, and meaningful opportunity.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-[#17130d] px-8 py-4 text-sm font-black uppercase tracking-widest text-[#f8f6f2] shadow-[0_18px_44px_rgba(23,19,13,0.18)] transition-all hover:bg-[#9f7b28] active:scale-95"
          >
            Connect With Us
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-[34px] bg-[linear-gradient(135deg,rgba(216,183,102,0.45),rgba(255,255,255,0),rgba(159,123,40,0.28))] blur-xl" />
          <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] bg-[#ece5d8] shadow-[0_32px_90px_rgba(23,19,13,0.22)]">
            <Image
              src="/about-images/abt2.JPG"
              alt="GES Worldex exhibition audience"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,rgba(248,246,242,0.58),rgba(248,246,242,0))]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(159,123,40,0.08),rgba(23,19,13,0.1))]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
