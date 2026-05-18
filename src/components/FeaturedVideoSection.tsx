"use client";

import { ArrowUpRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { FeaturedVideoSectionContent } from "@/sanity/lib/home";

const videoUrl = "https://www.youtube.com/watch?v=LI9m-6uwETY";
const embedUrl =
  "https://www.youtube-nocookie.com/embed/LI9m-6uwETY?rel=0&modestbranding=1&playsinline=1";

export function FeaturedVideoSection({
  content,
}: {
  content?: FeaturedVideoSectionContent;
}) {
  const resolvedVideoUrl = content?.youtubeUrl || videoUrl;
  const resolvedEmbedUrl = content?.embedUrl || embedUrl;

  return (
    <section className="relative mx-auto w-full max-w-[1700px] px-0 pb-24 pt-6 md:px-8 md:pb-28 md:pt-8 lg:px-12 lg:pb-32 lg:pt-10">
      <div className="relative isolate overflow-hidden px-0 py-0 md:rounded-[42px] md:bg-[linear-gradient(135deg,#fffdf8_0%,#f6edd9_44%,#ead9b7_100%)] md:px-7 md:py-8 md:shadow-[0_40px_90px_rgba(47,35,24,0.14)] lg:px-10 lg:py-10 [html[data-theme='dark']_&]:md:bg-[linear-gradient(135deg,#071018_0%,#0d181f_44%,#162126_100%)] [html[data-theme='dark']_&]:md:shadow-[0_40px_90px_rgba(0,0,0,0.4)]">
        <div className="pointer-events-none absolute inset-0 hidden md:block md:bg-[radial-gradient(circle_at_18%_16%,rgba(255,250,240,0.95)_0%,rgba(255,250,240,0.28)_32%,transparent_60%),radial-gradient(circle_at_82%_18%,rgba(216,183,102,0.36)_0%,rgba(216,183,102,0.16)_32%,transparent_62%),linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_28%,rgba(159,123,40,0.08)_100%)] [html[data-theme='dark']_&]:md:bg-[radial-gradient(circle_at_18%_16%,rgba(216,183,102,0.14)_0%,rgba(216,183,102,0.05)_32%,transparent_60%),radial-gradient(circle_at_82%_18%,rgba(159,123,40,0.14)_0%,rgba(159,123,40,0.05)_32%,transparent_62%),linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_28%,rgba(7,16,24,0.1)_100%)]" />
        <div className="pointer-events-none absolute inset-x-[10%] top-[-12%] hidden h-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.14)_38%,transparent_74%)] blur-3xl [html[data-theme='dark']_&]:bg-[radial-gradient(circle,rgba(196,236,248,0.14)_0%,rgba(196,236,248,0.04)_38%,transparent_74%)] md:block" />
        <div className="pointer-events-none absolute bottom-[-18%] left-[8%] hidden h-52 w-[44%] rounded-full bg-[radial-gradient(circle,rgba(162,190,206,0.24)_0%,rgba(162,190,206,0.08)_42%,transparent_76%)] blur-3xl [html[data-theme='dark']_&]:bg-[radial-gradient(circle,rgba(26,76,98,0.28)_0%,rgba(26,76,98,0.08)_42%,transparent_76%)] md:block" />

        <div className="relative z-10 grid gap-6 px-4 sm:px-5 md:gap-8 md:px-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-4 md:space-y-5"
          >
            <div className="space-y-4">
              <h2 className="welcome-display-font max-w-[12ch] text-[1.9rem] font-black leading-[0.94] tracking-[-0.04em] text-[#2f2318] md:max-w-none md:text-[2.9rem] lg:text-[3.4rem] [html[data-theme='dark']_&]:text-[#f3e7d4]">
                {content?.title || "Watch The Exhibition Energy Come Alive"}
              </h2>
              <p className="max-w-[58ch] text-[0.92rem] leading-relaxed text-[#6b5743] md:text-[1.04rem] [html[data-theme='dark']_&]:text-[#d8c2a8]">
                {content?.description ||
                  "A more cinematic look into the scale, atmosphere, and movement behind the GES Worldex experience, presented in a sharper, more modern showcase frame."}
              </p>
            </div>

            <div>
              <a
                href={resolvedVideoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(159,123,40,0.24)] bg-[linear-gradient(180deg,rgba(255,253,248,0.72)_0%,rgba(255,250,240,0.34)_100%)] px-3.5 py-2 text-[0.72rem] font-black uppercase tracking-[0.16em] text-[#2f2318] shadow-[8px_8px_20px_rgba(47,35,24,0.12),-4px_-4px_10px_rgba(255,255,255,0.42),inset_1px_1px_0_rgba(255,255,255,0.5)] transition-transform duration-300 hover:-translate-y-0.5 md:px-4 md:py-2.5 md:text-[0.8rem] md:tracking-[0.18em] [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] [html[data-theme='dark']_&]:text-[#f3e7d4] [html[data-theme='dark']_&]:shadow-[10px_10px_24px_rgba(0,0,0,0.34),inset_1px_1px_0_rgba(255,255,255,0.08)]"
              >
                <PlayCircle className="h-4 w-4" />
                Open On YouTube
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.06 }}
            className="relative -mx-4 sm:-mx-5 md:mx-0"
          >
            <div className="pointer-events-none absolute inset-[-4%] hidden rounded-[40px] bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.52),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.26),transparent_28%)] blur-xl [html[data-theme='dark']_&]:bg-[radial-gradient(circle_at_30%_18%,rgba(205,242,252,0.12),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(205,242,252,0.06),transparent_28%)] md:block" />

            <div className="relative rounded-none bg-transparent p-0 shadow-none md:rounded-[36px] md:bg-[linear-gradient(135deg,#fffdf8_0%,#f6edd9_44%,#ead9b7_100%)] md:p-4 md:shadow-[18px_18px_36px_rgba(47,35,24,0.16),-6px_-6px_14px_rgba(255,255,255,0.3),inset_1px_1px_0_rgba(255,255,255,0.5)] [html[data-theme='dark']_&]:md:bg-[linear-gradient(135deg,#071018_0%,#0d181f_44%,#162126_100%)] [html[data-theme='dark']_&]:md:shadow-[20px_20px_38px_rgba(0,0,0,0.36),inset_1px_1px_0_rgba(255,255,255,0.08)]">
              <div className="pointer-events-none absolute inset-x-4 top-3 hidden h-14 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0)_100%)] blur-sm [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(216,183,102,0.08)_0%,rgba(216,183,102,0)_100%)] md:block" />
              <div className="relative overflow-hidden rounded-none border-0 shadow-none md:rounded-[30px] md:border md:border-white/24 md:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.42),inset_-4px_-4px_8px_rgba(47,35,24,0.1),0_16px_32px_rgba(47,35,24,0.14)] [html[data-theme='dark']_&]:md:border-white/8 [html[data-theme='dark']_&]:md:shadow-[inset_2px_2px_4px_rgba(216,183,102,0.06),inset_-6px_-6px_10px_rgba(0,0,0,0.22),0_16px_32px_rgba(0,0,0,0.24)]">
                <div className="aspect-video bg-[linear-gradient(135deg,#fffdf8_0%,#f6edd9_44%,#ead9b7_100%)] [html[data-theme='dark']_&]:bg-[linear-gradient(135deg,#071018_0%,#0d181f_44%,#162126_100%)]">
                  <iframe
                    src={resolvedEmbedUrl}
                    title="GES Worldex featured video"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_38%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_34%)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(216,183,102,0.04)_0%,rgba(216,183,102,0)_38%),radial-gradient(circle_at_50%_50%,rgba(216,183,102,0.03),transparent_34%)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
