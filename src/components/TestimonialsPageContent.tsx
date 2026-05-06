"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import { ArrowRight, BadgeCheck, Building2, Quote } from "lucide-react";

type Testimonial = {
  company: string;
  logo: string;
  person: string;
  designation: string;
  text: string;
};

type TestimonialSection = {
  id: string;
  show: "SJS" | "SSI";
  type: "Exhibitor" | "Visitor";
  title: string;
  subtitle: string;
  tone: "white" | "ivory";
  testimonials: Testimonial[];
};

const testimonialSections: TestimonialSection[] = [
  {
    id: "sjs-exhibitors",
    show: "SJS",
    type: "Exhibitor",
    title: "SJS Exhibitors",
    subtitle:
      "Jewellery brands and manufacturers value SJS for its focused buying audience, polished execution, and strong trade atmosphere.",
    tone: "white",
    testimonials: [
      {
        company: "Aurum Jewels",
        logo: "AJ",
        person: "Rohan Mehta",
        designation: "Director",
        text: "SJS gave our team a refined platform to meet serious retailers and distributors. The visitor quality, planning support, and on-ground coordination were exactly what a jewellery exhibition should feel like.",
      },
      {
        company: "Navya Ornaments",
        logo: "NO",
        person: "Priya Nair",
        designation: "Business Head",
        text: "The show environment was premium, organized, and highly relevant for our category. We were able to showcase new collections with confidence and connect with buyers who understood our product line.",
      },
      {
        company: "Kriti Gold Works",
        logo: "KG",
        person: "Arvind Shah",
        designation: "Managing Partner",
        text: "GES Worldex brought clarity to every stage, from booth planning to visitor movement. SJS helped us create meaningful conversations instead of just footfall.",
      },
    ],
  },
  {
    id: "sjs-visitors",
    show: "SJS",
    type: "Visitor",
    title: "SJS Visitors",
    subtitle:
      "Retailers, buyers, and trade visitors experience SJS as a curated destination for jewellery discovery and supplier relationships.",
    tone: "ivory",
    testimonials: [
      {
        company: "Royal Retail Jewellers",
        logo: "RR",
        person: "Sneha Kapoor",
        designation: "Procurement Lead",
        text: "The floor was easy to navigate and the exhibitor mix was strong. We discovered fresh collections, compared suppliers quickly, and returned with clear purchase conversations.",
      },
      {
        company: "Southline Jewellery Mart",
        logo: "SJ",
        person: "Karthik Rao",
        designation: "Owner",
        text: "SJS saves time for serious buyers. The exhibition brings the right brands together, and the overall experience feels organized, premium, and business focused.",
      },
      {
        company: "Ritika Gems",
        logo: "RG",
        person: "Maya Iyer",
        designation: "Category Buyer",
        text: "We came looking for new design directions and dependable suppliers. The show helped us shortlist both, with a professional setting that made meetings productive.",
      },
    ],
  },
  {
    id: "ssi-exhibitors",
    show: "SSI",
    type: "Exhibitor",
    title: "SSI Exhibitors",
    subtitle:
      "Silver and allied jewellery businesses use SSI to build visibility, launch collections, and meet a high-intent buying network.",
    tone: "white",
    testimonials: [
      {
        company: "Sterling House",
        logo: "SH",
        person: "Vikram Jain",
        designation: "Founder",
        text: "SSI has become a serious growth platform for silver jewellery brands. The scale, buyer turnout, and operational discipline made our participation worthwhile across editions.",
      },
      {
        company: "Silver Craft Studio",
        logo: "SC",
        person: "Ananya Menon",
        designation: "Creative Director",
        text: "The exhibition gave our collections the right stage. Buyers were engaged, the booth experience was smooth, and the overall presentation matched the premium nature of our brand.",
      },
      {
        company: "Moksha Silver",
        logo: "MS",
        person: "Dev Patel",
        designation: "Sales Director",
        text: "GES Worldex understands the business rhythm of an exhibition. SSI helped us expand retailer conversations while keeping the event experience clean and professionally managed.",
      },
    ],
  },
  {
    id: "ssi-visitors",
    show: "SSI",
    type: "Visitor",
    title: "SSI Visitors",
    subtitle:
      "SSI visitors discover silver jewellery, accessories, and manufacturing partners through a focused, well-organized exhibition journey.",
    tone: "ivory",
    testimonials: [
      {
        company: "Urban Silver Boutique",
        logo: "US",
        person: "Neeraj Kulkarni",
        designation: "Retail Partner",
        text: "SSI made product discovery efficient. We met suppliers across design, pricing, and production capacity, all within a layout that was easy to understand.",
      },
      {
        company: "Heritage Jewels",
        logo: "HJ",
        person: "Farah Ansari",
        designation: "Merchandising Manager",
        text: "The show had a strong balance of established names and emerging collections. It felt premium without losing the practical focus buyers need.",
      },
      {
        company: "Shree Traders",
        logo: "ST",
        person: "Manish Agarwal",
        designation: "Owner",
        text: "We returned with new vendor connections and a sharper view of market trends. SSI is now part of our planning calendar because the trade value is clear.",
      },
    ],
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const revealTransition: Transition = { duration: 0.55, ease: "easeOut" };
const cardTransition: Transition = { duration: 0.45, ease: "easeOut" };

export function TestimonialsPageContent() {
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.18 },
        variants: sectionVariants,
        transition: revealTransition,
      };

  return (
    <main className="-mt-20 overflow-x-clip lg:-mt-24">
      <section className="pb-0 pt-0">
        <motion.div
          {...motionProps}
          className="relative min-h-[480px] overflow-hidden sm:min-h-[560px] lg:min-h-[640px]"
          style={{
            clipPath: "polygon(0 0,100% 0,100% 82%,82% 88%,61% 93%,38% 90%,18% 95%,0 89%)",
          }}
        >
          <Image
            src="/testimonials-light.png"
            alt="Testimonials banner showcasing premium exhibition moments"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center [html[data-theme='dark']_&]:hidden"
          />
          <Image
            src="/testimonial-dark.png"
            alt="Testimonials banner showcasing premium exhibition moments"
            fill
            priority
            sizes="100vw"
            className="hidden object-cover object-center [html[data-theme='dark']_&]:block"
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(249,241,221,0.94)_0%,rgba(249,241,221,0.84)_30%,rgba(249,241,221,0.54)_56%,rgba(249,241,221,0.18)_78%,rgba(249,241,221,0.02)_100%)] [html[data-theme='dark']_&]:hidden" />
          <div className="absolute inset-0 hidden [html[data-theme='dark']_&]:block [html[data-theme='dark']_&]:bg-[linear-gradient(90deg,rgba(6,7,9,0.92)_0%,rgba(6,7,9,0.82)_28%,rgba(6,7,9,0.5)_56%,rgba(6,7,9,0.18)_78%,rgba(6,7,9,0.04)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_26%,rgba(216,183,102,0.12),transparent_26%),radial-gradient(circle_at_74%_18%,rgba(255,255,255,0.22),transparent_20%)] [html[data-theme='dark']_&]:bg-[radial-gradient(circle_at_20%_26%,rgba(216,183,102,0.18),transparent_26%),radial-gradient(circle_at_74%_18%,rgba(255,255,255,0.08),transparent_20%)]" />

          <div className="relative z-10 flex min-h-[480px] w-full items-end px-4 pb-24 pt-24 sm:min-h-[560px] sm:px-5 sm:pb-28 sm:pt-28 md:px-8 md:pb-32 md:pt-32 lg:min-h-[640px] lg:px-12 lg:pb-36">
            <div className="max-w-[42rem] space-y-5 md:space-y-6">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.32em] text-[#2F2417] sm:text-[0.76rem] [html[data-theme='dark']_&]:text-white/68">
                Visitor & exhibitor reflections
              </p>

              <h1 className="welcome-display-font max-w-[12ch] text-[clamp(2.8rem,10vw,6.15rem)] font-black leading-[0.9] tracking-[-0.04em] text-[#2F2417] [html[data-theme='dark']_&]:text-white">
                Trusted voices from our exhibition floors.
              </h1>

              <p className="max-w-2xl text-[0.98rem] leading-relaxed text-[#2F2417] sm:text-base md:text-lg md:leading-8 [html[data-theme='dark']_&]:text-white/78">
                Experiences from exhibitors and visitors across GES Worldex platforms, shaped around meaningful business discovery, premium presentation, and dependable event execution.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {testimonialSections.map((section) => (
        <TestimonialBand key={section.id} section={section} reduceMotion={Boolean(reduceMotion)} />
      ))}

      <section className="mx-auto w-full max-w-[1700px] px-4 py-10 sm:px-5 md:px-8 md:py-16 lg:px-12 lg:py-20">
        <motion.div
          {...motionProps}
          className="grid gap-6 rounded-[22px] border p-5 shadow-[0_24px_80px_rgba(47,35,24,0.08)] sm:rounded-[26px] sm:p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:rounded-[28px] lg:p-10"
          style={{
            backgroundColor: "var(--about-card-bg)",
            borderColor: "var(--about-card-border)",
          }}
        >
          <div className="max-w-3xl space-y-3">
            <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-xs font-black uppercase tracking-[0.22em] text-transparent">
              Share Your Experience
            </p>
            <h2 className="text-2xl font-black leading-tight sm:text-3xl md:text-4xl" style={{ color: "var(--about-text-primary)" }}>
              Build confidence before the next edition.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--about-text-secondary)" }}>
              Connect with GES Worldex India Pvt. Ltd. to explore participation, visitor planning, and exhibition opportunities across upcoming platforms.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#2f2318] px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[#9f7b28] active:scale-95 sm:w-fit"
          >
            Contact Team
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

function TestimonialBand({
  section,
  reduceMotion,
}: {
  section: TestimonialSection;
  reduceMotion: boolean;
}) {
  const bandBackground =
    section.tone === "ivory"
      ? "linear-gradient(180deg, rgba(159,123,40,0.06), rgba(255,253,248,0.5))"
      : "transparent";

  return (
    <section id={section.id} className="py-10 md:py-16 lg:py-20" style={{ background: bandBackground }}>
      <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-5 md:px-8 lg:px-12">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.18 }}
          variants={sectionVariants}
          transition={revealTransition}
          className="mb-7 grid gap-5 md:mb-9 lg:grid-cols-[0.78fr_1fr] lg:items-end"
        >
          <div className="space-y-3">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.16em] sm:text-[0.68rem] sm:tracking-[0.18em]"
              style={{
                backgroundColor: "rgba(159, 123, 40, 0.1)",
                color: "#9f7b28",
              }}
            >
              <BadgeCheck className="h-3.5 w-3.5" />
              {section.show} {section.type}
            </div>
            <h2 className="welcome-display-font text-3xl font-black leading-tight sm:text-4xl md:text-5xl" style={{ color: "var(--about-text-primary)" }}>
              {section.title}
            </h2>
          </div>

          <p className="max-w-3xl text-[0.95rem] leading-relaxed sm:text-base md:text-lg" style={{ color: "var(--about-text-secondary)" }}>
            {section.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {section.testimonials.map((testimonial, index) => (
            <motion.article
              key={`${section.id}-${testimonial.company}`}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              transition={{ ...cardTransition, delay: reduceMotion ? 0 : index * 0.08 }}
              className="group flex min-h-0 flex-col rounded-[20px] border p-4 shadow-[0_18px_60px_rgba(47,35,24,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(47,35,24,0.12)] sm:p-5 md:min-h-[340px] md:rounded-[24px] md:p-6 xl:min-h-[360px]"
              style={{
                backgroundColor: "var(--about-card-bg)",
                borderColor: "var(--about-card-border)",
              }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#9f7b28,#d8b766)] text-sm font-black text-white shadow-[0_14px_34px_rgba(159,123,40,0.22)] sm:h-12 sm:w-12 sm:rounded-[16px]">
                    {testimonial.logo}
                  </div>
                  <div className="min-w-0">
                    <h3 className="break-words text-base font-black leading-tight sm:text-lg" style={{ color: "var(--about-text-primary)" }}>
                      {testimonial.company}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs font-bold" style={{ color: "var(--about-text-muted)" }}>
                      <Building2 className="h-3.5 w-3.5 text-[#9f7b28]" />
                      Trade participant
                    </div>
                  </div>
                </div>

                <span
                  className="w-fit shrink-0 rounded-full px-3 py-1.5 text-[0.6rem] font-black uppercase tracking-[0.12em] sm:text-[0.62rem] sm:tracking-[0.14em]"
                  style={{
                    backgroundColor: "rgba(159, 123, 40, 0.1)",
                    color: "#9f7b28",
                  }}
                >
                  {section.show} / {section.type}
                </span>
              </div>

              <div className="my-6 flex flex-1 flex-col justify-center md:my-7">
                <Quote className="mb-4 h-7 w-7 text-[#d8b766] sm:h-8 sm:w-8" />
                <p className="text-[0.95rem] font-semibold leading-relaxed sm:text-base" style={{ color: "var(--about-text-primary)" }}>
                  {testimonial.text}
                </p>
              </div>

              <div className="border-t pt-4" style={{ borderColor: "var(--about-card-border)" }}>
                <div className="text-base font-black" style={{ color: "var(--about-text-primary)" }}>
                  {testimonial.person}
                </div>
                <div className="mt-1 text-sm font-semibold" style={{ color: "var(--about-text-secondary)" }}>
                  {testimonial.designation}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
