"use client";

import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { exhibitionSlides } from "@/lib/exhibitionSlides";

const cityCards = [
  {
    id: "ssi-delhi-2026",
    city: "Silver Show of India",
    date: "25 - 28 September 2026",
    copy: "Delhi's 3rd Edition - 2026",
    imageSrc: "/banners/ssi-delhi-2026.jpg",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Yashobhoomi%20India%20International%20Convention%20%26%20Expo%20Centre%20Dwarka%20New%20Delhi",
    venue: "Sector 25 Dwarka, Dwarka, New Delhi, Delhi, 110077",
  },
  {
    id: "ssi-bengaluru-2026",
    city: "Silver Show of India",
    date: "2026",
    copy: "Bengaluru Edition - 2026",
    imageSrc: "/banners/ssi-bengaluru-2026.jpg",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Bangalore%20International%20Exhibition%20Centre%20BIEC",
    venue: "Bangalore International Exhibition Centre (BIEC)",
  },
  {
    id: "ssi-mumbai-2027",
    city: "Silver Show of India",
    date: "4 - 7 June 2027",
    copy: "Mumbai's 5th Edition - 2027",
    imageSrc: "/banners/ssi-mumbai-2027.jpg",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Jio%20World%20Convention%20Centre%20Bandra%20Kurla%20Complex%20Mumbai",
    venue: "Bandra Kurla Complex (BKC), Mumbai",
  },
];

type CityCard = {
  id: string;
  city: string;
  date: string;
  copy: string;
  imageSrc: string;
  mapHref: string;
  venue: string;
};

type IncomingCityItem = {
  city?: string;
  date?: string;
  venue?: string;
  copy?: string;
};

function resolveUpcomingCities(content?: any) {
  const fallbackCards = exhibitionSlides.map((slide) => ({
    id: slide.id,
    city: slide.cityLabel,
    date: slide.date,
    copy: slide.title,
    imageSrc: slide.image,
    mapHref: slide.mapHref,
    venue: slide.venue,
  }));

  const cities: CityCard[] = content?.cities?.length
    ? content.cities
        .filter((city: IncomingCityItem) => city.city || city.date || city.venue || city.copy)
        .map((city: IncomingCityItem, index: number) => {
          const fallback = fallbackCards[index % fallbackCards.length];
          const base = (city.city || fallback.city)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          return {
            ...fallback,
            id: `${base || fallback.id}-${index}`,
            city: city.city || fallback.city,
            date: city.date || fallback.date,
            venue: city.venue || fallback.venue,
            copy: city.copy || fallback.copy,
          };
        })
    : fallbackCards;

  return {
    title: content?.title || "Upcoming Exhibitions",
    description:
      content?.description ||
      "Discover our global showcase of innovation, craftsmanship, and industry leadership.",
    cities,
  };
}

function UpcomingEditionCard({
  city,
  copy,
  date,
  imageSrc,
  mapHref,
  venue,
}: CityCard) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
      className="group relative"
    >
      <div className="group/card relative mx-auto max-w-[21.5rem] overflow-hidden rounded-[24px] border border-[rgba(215,178,95,0.2)] bg-[linear-gradient(180deg,rgba(255,252,247,0.98)_0%,rgba(249,242,229,0.98)_100%)] shadow-[0_18px_42px_rgba(180,147,86,0.16)] transition-transform duration-300 group-hover:-translate-y-1 md:max-w-[22.5rem] [html[data-theme='dark']_&]:border-[rgba(216,183,102,0.14)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(12,22,30,0.98)_0%,rgba(16,28,36,0.98)_100%)] [html[data-theme='dark']_&]:shadow-[0_20px_48px_rgba(0,0,0,0.28)]">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[22%] top-[8%] z-10 h-[112%] w-[18%] rotate-[18deg] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,244,214,0.14)_42%,rgba(245,200,93,0.28)_50%,rgba(255,244,214,0.14)_58%,rgba(255,255,255,0)_100%)] opacity-60 blur-lg [html[data-theme='dark']_&]:bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,228,156,0.06)_42%,rgba(241,199,92,0.18)_50%,rgba(255,228,156,0.06)_58%,rgba(255,255,255,0)_100%)] [html[data-theme='dark']_&]:opacity-70"
          animate={{ x: ["0%", "360%"] }}
          transition={{ duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", repeatDelay: 2.2 }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-[18%] top-[14%] z-10 h-1.5 w-1.5 rounded-full bg-[#f1c75c] shadow-[0_0_8px_rgba(241,199,92,0.7),0_0_14px_rgba(241,199,92,0.32)] [html[data-theme='dark']_&]:bg-[#efbf56]"
          animate={{ opacity: [0.12, 0.72, 0.18], scale: [0.92, 1.08, 0.96] }}
          transition={{ duration: 3.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="relative aspect-[16/10] overflow-hidden rounded-b-[24px]">
          <Image
            src={imageSrc}
            alt={`${city} upcoming exhibition`}
            fill
            sizes="(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(19,24,32,0.1)_38%,rgba(19,24,32,0.38)_100%)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(4,10,14,0.08)_0%,rgba(4,10,14,0.22)_38%,rgba(4,10,14,0.5)_100%)]" />
        </div>

        <div className="px-4 pb-4 pt-4">
          <div className="relative overflow-hidden rounded-[18px] border border-[rgba(220,176,83,0.42)] bg-[linear-gradient(135deg,rgba(255,249,239,1)_0%,rgba(247,232,196,0.98)_55%,rgba(255,244,222,1)_100%)] px-4 py-3 text-center shadow-[0_14px_32px_rgba(201,157,73,0.18)] [html[data-theme='dark']_&]:border-[rgba(216,183,102,0.24)] [html[data-theme='dark']_&]:bg-[linear-gradient(135deg,rgba(39,55,64,0.98)_0%,rgba(57,43,24,0.9)_52%,rgba(24,37,45,0.98)_100%)] [html[data-theme='dark']_&]:shadow-[0_14px_30px_rgba(0,0,0,0.24)]">
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),rgba(241,199,92,0.55),transparent)] [html[data-theme='dark']_&]:bg-[linear-gradient(90deg,transparent,rgba(255,241,196,0.28),rgba(241,199,92,0.4),transparent)]" />
            <div className="pointer-events-none absolute right-3 top-2 h-10 w-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55),rgba(255,255,255,0)_72%)] [html[data-theme='dark']_&]:bg-[radial-gradient(circle,rgba(241,199,92,0.14),rgba(255,255,255,0)_72%)]" />
            <div className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[#a97410] [html[data-theme='dark']_&]:text-[#efbf56]">
              Event Dates
            </div>
            <div className="mt-1.5 inline-flex items-center gap-2 text-[1rem] font-black leading-tight text-[#7f5710] [html[data-theme='dark']_&]:text-[#ffd77a]">
              <CalendarDays className="h-4.5 w-4.5 shrink-0" />
              <span>{date}</span>
            </div>
          </div>

          <div className="mt-4 text-left">
            <h3 className="welcome-display-font text-[1.58rem] font-black leading-[1.04] tracking-[-0.04em] text-[#15233a] md:text-[1.78rem] [html[data-theme='dark']_&]:text-[#f6ead4]">
              {city}
            </h3>
            <div className="mt-1.5 text-[0.88rem] font-semibold leading-6 text-[#6d5b43] [html[data-theme='dark']_&]:text-[#cfbea5]">
              {copy}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(212,165,69,0.36))]" />
            <div className="h-2 w-2 rotate-45 rounded-[2px] bg-[#d7aa47]" />
            <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(212,165,69,0.36),transparent)]" />
          </div>

          <a
            href={mapHref}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex items-start gap-3 text-[#8f6411] transition-colors hover:text-[#b07d19] [html[data-theme='dark']_&]:text-[#efbf56] [html[data-theme='dark']_&]:hover:text-[#f6d37b]"
            aria-label={`Open ${venue} in Google Maps`}
          >
            <MapPin className="mt-1 h-4.5 w-4.5 shrink-0" />
            <div className="text-[0.86rem] leading-6 text-[#3c3328] [html[data-theme='dark']_&]:text-[#efe2cf]">
              {venue}
            </div>
          </a>

          <div className="mt-5">
            <a
              href={mapHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-0 flex-1 items-center justify-center rounded-full border border-[rgba(215,178,95,0.4)] bg-[linear-gradient(180deg,rgba(255,250,240,0.96)_0%,rgba(248,238,221,0.96)_100%)] px-4 py-2.5 text-[0.84rem] font-black text-[#b07d19] transition-colors hover:border-[#d7aa47] hover:text-[#8d6210] [html[data-theme='dark']_&]:border-[rgba(216,183,102,0.3)] [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(22,38,48,0.96)_0%,rgba(15,27,35,0.98)_100%)] [html[data-theme='dark']_&]:text-[#f4c95b] [html[data-theme='dark']_&]:hover:border-[#efbf56] [html[data-theme='dark']_&]:hover:bg-[linear-gradient(180deg,rgba(31,50,61,0.98)_0%,rgba(18,33,41,0.98)_100%)] [html[data-theme='dark']_&]:hover:text-[#ffe29a]"
            >
              View Venue Details
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function UpcomingCitiesSection({
  content,
}: {
  content?: any;
}) {
  const resolvedContent = resolveUpcomingCities(content);

  return (
    <section className="relative mx-auto w-full max-w-[1700px] px-4 pb-20 pt-6 md:px-8 md:pb-24 md:pt-10 lg:px-12 lg:pb-28 lg:pt-12">
      <div className="relative px-0 py-0 md:px-2 md:py-2">
        <div className="pointer-events-none absolute inset-x-[-12%] top-[-32%] hidden h-[34rem] rounded-full border border-[rgba(215,178,95,0.32)] md:block [html[data-theme='dark']_&]:border-[rgba(216,183,102,0.18)]" />
        <div className="pointer-events-none absolute inset-x-[8%] top-[-22%] hidden h-[28rem] rounded-full border border-[rgba(215,178,95,0.18)] md:block [html[data-theme='dark']_&]:border-[rgba(216,183,102,0.1)]" />
        <div className="pointer-events-none absolute left-[10%] top-[8rem] hidden h-5 w-5 rounded-full bg-[linear-gradient(180deg,#f1c75c_0%,#d59c22_100%)] shadow-[0_0_0_8px_rgba(241,199,92,0.14)] md:block" />
        <div className="pointer-events-none absolute right-[12%] top-[6rem] hidden h-6 w-6 rounded-full border border-[rgba(241,199,92,0.7)] bg-[rgba(255,255,255,0.6)] md:block [html[data-theme='dark']_&]:bg-[rgba(255,255,255,0.06)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(241,199,92,0.14),transparent_34%),radial-gradient(circle_at_bottom,rgba(241,199,92,0.08),transparent_28%)] [html[data-theme='dark']_&]:bg-[radial-gradient(circle_at_top,rgba(216,183,102,0.12),transparent_34%),radial-gradient(circle_at_bottom,rgba(216,183,102,0.07),transparent_28%)]" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-[58rem] text-center"
          >
            <div className="flex items-center justify-center gap-3 text-[#c48a17] [html[data-theme='dark']_&]:text-[#efbf56]">
              <div className="hidden h-px w-20 bg-[linear-gradient(90deg,transparent,#d7aa47)] md:block" />
              <div className="h-2 w-2 rotate-45 rounded-[2px] bg-[#d7aa47]" />
              <div className="text-[0.78rem] font-black uppercase tracking-[0.2em]">
                Our Journey Continues
              </div>
              <div className="h-2 w-2 rotate-45 rounded-[2px] bg-[#d7aa47]" />
              <div className="hidden h-px w-20 bg-[linear-gradient(90deg,#d7aa47,transparent)] md:block" />
            </div>

            <h2 className="mt-5 text-[2.15rem] font-black leading-[0.94] tracking-[-0.05em] text-[#13233b] sm:text-[2.6rem] md:text-[3.45rem] [html[data-theme='dark']_&]:text-[#f6ead4]">
              {resolvedContent.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[44rem] text-[0.98rem] leading-8 text-[#665949] md:text-[1.12rem] [html[data-theme='dark']_&]:text-[#d5c3ab]">
              {resolvedContent.description}
            </p>
          </motion.div>

          <div className="mx-auto mt-10 grid max-w-[78rem] gap-7 md:mt-12 md:grid-cols-2 md:gap-8 xl:grid-cols-3 xl:gap-10">
            {resolvedContent.cities.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              >
                <UpcomingEditionCard {...card} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 hidden items-center justify-center gap-3 md:flex">
            <div className="h-px w-20 bg-[linear-gradient(90deg,transparent,#d7aa47)]" />
            <div className="flex items-center gap-3">
              <div className="h-3.5 w-3.5 rounded-full border border-[rgba(215,178,95,0.42)] bg-white shadow-[0_0_0_5px_rgba(241,199,92,0.12)] [html[data-theme='dark']_&]:bg-[#0f1d25]" />
              <div className="h-6 w-6 rounded-full border border-[rgba(215,178,95,0.62)] bg-[linear-gradient(180deg,#f1c75c_0%,#d59c22_100%)] shadow-[0_0_0_7px_rgba(241,199,92,0.12)]" />
              <div className="h-3.5 w-3.5 rounded-full border border-[rgba(215,178,95,0.42)] bg-white shadow-[0_0_0_5px_rgba(241,199,92,0.12)] [html[data-theme='dark']_&]:bg-[#0f1d25]" />
            </div>
            <div className="h-px w-20 bg-[linear-gradient(90deg,#d7aa47,transparent)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
