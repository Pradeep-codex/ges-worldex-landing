"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type MasonryItem = {
  src: string;
  alt: string;
  heightClass: string;
};

const masonryItems: MasonryItem[] = [
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[360px] md:h-[440px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[470px] md:h-[600px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[410px] md:h-[520px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[520px] md:h-[660px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[390px] md:h-[500px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[500px] md:h-[640px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[370px] md:h-[460px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[450px] md:h-[580px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[340px] md:h-[430px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[540px] md:h-[700px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[430px] md:h-[540px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[510px] md:h-[650px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[380px] md:h-[490px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[460px] md:h-[590px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[350px] md:h-[450px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[495px] md:h-[620px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[375px] md:h-[470px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[440px] md:h-[560px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery category image", heightClass: "h-[400px] md:h-[510px]" },
  { src: "/exhibition/jewellery.png", alt: "Jewellery showcase image", heightClass: "h-[530px] md:h-[680px]" },
];

export function MasonryGallerySection() {
  return (
    <section className="relative mx-auto w-full max-w-[1700px] px-4 pb-24 pt-8 md:px-8 md:pb-28 md:pt-10 lg:px-12 lg:pb-32 lg:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mb-6 flex items-end justify-between gap-4 md:mb-8"
      >
        <div>
          <p className="text-[0.78rem] font-black uppercase tracking-[0.24em] text-[#13708a] [html[data-theme='dark']_&]:text-cyan-200">
            Gallery Flow
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#0c2c3d] md:text-[2.2rem] [html[data-theme='dark']_&]:text-white">
            Exhibition Moments In Motion
          </h2>
        </div>
      </motion.div>

      <div className="mx-auto max-w-[1320px] px-2 md:px-4">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {masonryItems.map((item, index) => (
          <motion.article
            key={`${item.src}-${index}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.02 }}
            className="mb-4 break-inside-avoid"
          >
            <div
              className={`group relative w-full overflow-hidden rounded-[18px] border border-white/45 bg-white/55 shadow-[0_22px_50px_rgba(14,53,76,0.12)] ring-1 ring-[#87d7eb]/20 backdrop-blur-[6px] [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-white/6 ${item.heightClass}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082536]/58 via-transparent to-white/10" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <div className="inline-flex max-w-full items-center rounded-full border border-white/30 bg-white/14 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/92 backdrop-blur-md">
                  GES Worldex
                </div>
                <p className="mt-3 max-w-[18rem] text-sm font-semibold leading-snug text-white md:text-[0.96rem]">
                  {item.alt}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
        </div>
      </div>
    </section>
  );
}
