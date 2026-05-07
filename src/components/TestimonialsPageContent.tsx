"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";

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

const testimonialImagePool = [
  "/exhibition/expo1.jpg",
  "/exhibition/expo2.jpg",
  "/exhibition/expo3.jpg",
  "/exhibition/expo4.jpg",
  "/exhibition/expo5.jpg",
  "/exhibition/expo6.jpg",
  "/about-images/abt1.JPG",
  "/about-images/abt2.JPG",
  "/about-images/abt3.JPG",
  "/about-images/abt4.JPG",
];

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
        company: "Laxmi Chains",
        logo: "LC",
        person: "Mr. Bharath Mehta",
        designation: "Managing Director",
        text: `The first ever South Jewellery Show in January 2021 indicated how much the state needs its own B2B platform for the Jewellery trade. Though we were not a part of it, we heard from different sources that it was a great success. We started believing that SJS is the exhibition for Bengaluru and hence participated in the second edition. Our belief became true as it turned out to be another huge success. We will be a part of all the future editions of SJS.`,
      },
      {
        company: "Mukti Gold Diamonds",
        logo: "MG",
        person: "Mr. Mahendra Jain",
        designation: "Managing Director",
        text: `Bengaluru is perfectly located in the heart of South India, and this is one of the main reasons for us to participate in the first edition. It turned out to be good for us. Subsequently we were a part of the second edition also, and the organizers pulled off another successful show. We intend to be a part of all SJS in future.`,
      },
      {
        company: "Dharmesh Jewellers Pvt Ltd",
        logo: "DJ",
        person: "Mr. Ankit J Sanghvi",
        designation: "Managing Director",
        text: `The January 2021 show made us realise just how much has changed in the Jewellery trade in recent years. Just like their customers, even the jewellers from small towns are aware of global trends, so they are constantly looking for new innovations and adaptations of classic designs. We took part again in the August 2021 show, and what an exhibition it was. Hats off to the organizers for helping us get new clients from tier 3 and 4 towns.`,
      },
      {
        company: "Mangaldeep Chains & Bangles",
        logo: "MB",
        person: "Mr. Kushal Sakaria Jain",
        designation: "Exhibitor",
        text: `Bengaluru is the new centre where a lot of manufacturers are creating new designs exclusively for South Indian consumers, so we did participate in both the editions. Trust me, both the shows gave us more than what we wanted. We are committed to SJS in all their future endeavours.`,
      },
      {
        company: "Laxmi Diamonds",
        logo: "LD",
        person: "Mr. Chetan Kumar Mehta",
        designation: "Managing Director",
        text: `The jewellery market is getting transformed as a result of the lockdown experience. We have already been getting many inquiries from potential clients in smaller towns based on our online marketing. This never happened before. We are confident that a physical show like South Jewellery Show will help us meet an even larger number of such potential business partners.`,
      },
      {
        company: "Mehta Gold Pvt Ltd",
        logo: "MG",
        person: "Mr. Sandeep Mehta",
        designation: "Director",
        text: `Gold prices have moderated, jobs are slowly coming back and consumer demand is on the upswing. So everyone in the industry is looking forward to the South Jewellery Show to provide a further boost to the business. It is well timed to enable us to be prepared for the all important marriage season that is coming soon.`,
      },
      {
        company: "SK Jewels",
        logo: "SK",
        person: "Mr. Suresh Kumar Ganna",
        designation: "Managing Partner",
        text: `It was really exciting to be a part of the South Jewellery Show as a participant and even more as a support to the organizers. I personally realized that we invested time, money, and trust in the right set of organizers. Kudos to Sreekanth and team. We came out victorious again in the second edition, which was more challenging than the first. All the best and keep doing the best in future also.`,
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
        company: "Neelkanth Jewellers",
        logo: "NJ",
        person: "Mr. Ram",
        designation: "Managing Director",
        text: `We have been in the business for quite some time now, and we have well established contacts for all the traditional types of jewellery. But we are constantly on the lookout for manufacturers of newer styles that appeal to the younger, more cosmopolitan consumer. We will be at the South Jewellery Show to meet potential suppliers of these products.`,
      },
      {
        company: "Bhima Jewellery",
        logo: "BJ",
        person: "Dr. B. Govindan",
        designation: "Chairman",
        text: `SJS showcases the best jewellery manufactured in the country. It also provides opportunity for networking, knowledge sharing, and exchange of information which benefits the industry as a whole.`,
      },
      {
        company: "Kamakhya Jewels Pvt Ltd",
        logo: "KJ",
        person: "Mr. Manoj Kumar Jha",
        designation: "Managing Director",
        text: `A high end jewellery show was much required in Bengaluru. SJS has filled that vacuum by showing consistency in all its editions. One should definitely visit this special show, where you can find a special bouquet of South Indian jewellery.`,
      },
      {
        company: "Vaibhav Jewelers",
        logo: "VJ",
        person: "Mr. Suresh Addanki",
        designation: "Managing Director",
        text: `The South Jewellery Show is a unique B2B jewellery exhibition held on a grand scale which gives immense opportunities for jewellers in South India to plan their inventory with latest designs and fine workmanship. Every year there is something different and we are hoping to be a part of all editions of SJS.`,
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
        company: "Navkar Sterling Silver",
        logo: "NS",
        person: "Mr. Abay Ranka",
        designation: "Proprietor",
        text: `We are very excited about bringing the entire Silver Industry under one roof. The show comes as a boon to the Silver Industry as it grows to new heights.`,
      },
      {
        company: "Anmol Jewellers",
        logo: "AJ",
        person: "Mr. Kishore Roonwal",
        designation: "Proprietor",
        text: `We are very happy that we participated in SSI. We have come in contact with many new customers from across India.`,
      },
      {
        company: "Purple Jewels Pvt. Ltd.",
        logo: "PJ",
        person: "Mr. Nitesh Uttam Chand Jain",
        designation: "Managing Director",
        text: `SSI Bangalore was a very well organised show. We had lots of serious buyers visiting us, and owners of stores who do not visit us in other shows also came to our stall because they were not distracted by gold and diamonds.`,
      },
      {
        company: "Moments 925 Silver India",
        logo: "M9",
        person: "Mr. Rakesh Kumar",
        designation: "Managing Partner",
        text: `There is a growing interest in silver jewellery and articles. We were looking for the right platform to develop our network of clients in new parts of the country, and then came SSI. We realized in no time that there is no better way to reach these regions than by regularly participating in SSI.`,
      },
      {
        company: "Sangeeta Boochra",
        logo: "SB",
        person: "Mr. Abineet",
        designation: "Managing Partner",
        text: `We are preparing to unveil many new collections at the Silver Show of India. It is our experience that many smaller jewellers are somewhat cautious when placing advance orders and often need to replenish stocks. SSI proved to be an ideal platform for connecting suppliers and retailers when it was most needed.`,
      },
      {
        company: "Rajat Emporium",
        logo: "RE",
        person: "Mr. Yogesh Kotari",
        designation: "Managing Partner",
        text: `Earlier, only the bigger names among retailers stocked silver jewellery, but now times have changed. Because of the high demand for silver products, new retailers have emerged to fill the void. The Silver Show of India helped us make contact with new jewellers who want to enter silver jewellery retail or expand their silver section.`,
      },
      {
        company: "Suman Silver",
        logo: "SS",
        person: "Mr. Rajesh",
        designation: "Managing Partner",
        text: `I have always wondered why there were no major trade shows on silver, and I am overjoyed that the Silver Show of India has been launched. There are many newer manufacturers in the Silver Industry, and SSI provided us the perfect platform to showcase our designs to the world.`,
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
        company: "Malabar Gold & Diamonds",
        logo: "MD",
        person: "Malabar Gold & Diamonds",
        designation: "SSI Visitor",
        text: `The first two editions of SSI were great. It was good to be back in a B2B show such as SSI.`,
      },
      {
        company: "Abaran Timeless Jewellery Pvt. Ltd.",
        logo: "AT",
        person: "Mr. Pratap Kamat",
        designation: "Visitor",
        text: `SSI was a great opportunity to meet new suppliers of silver jewellery and articles. The show was a big surprise.`,
      },
      {
        company: "Joyalukkas India Ltd",
        logo: "JI",
        person: "Joyalukkas India Ltd",
        designation: "SSI Visitor",
        text: `SSI presented us with a good opportunity to speak directly with our existing suppliers and new vendors. We cannot wait for the next edition to be held in Mumbai.`,
      },
      {
        company: "GRT Jewellers (India) Private Limited",
        logo: "GRT",
        person: "Mr. Anand",
        designation: "SSI Visitor",
        text: `Our staff found SSI an invaluable platform where they can boost their knowledge and expertise on silver jewellery and articles.`,
      },
    ],
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const revealTransition: Transition = { duration: 0.55, ease: "easeOut" };
const MARQUEE_SPEED = 42;
const MARQUEE_SMOOTHING = 0.1;

function getTestimonialImage(sectionId: string, index: number) {
  const seed = Array.from(sectionId).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return testimonialImagePool[(seed + index * 3) % testimonialImagePool.length];
}

function getCompactTestimonialText(text: string) {
  if (text.length <= 118) {
    return text;
  }

  return `${text.slice(0, 115).trimEnd()}...`;
}

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
  const [isHovered, setIsHovered] = useState(false);
  const [repeatCount, setRepeatCount] = useState(2);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const singleSetRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const currentSpeedRef = useRef(reduceMotion ? 0 : MARQUEE_SPEED);
  const marqueeCopies = reduceMotion ? [0] : Array.from({ length: repeatCount }, (_, index) => index);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const measure = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0;
      const singleSetWidth = singleSetRef.current?.offsetWidth ?? 0;

      if (containerWidth <= 0 || singleSetWidth <= 0) {
        return;
      }

      const copiesNeeded = Math.max(2, Math.ceil(containerWidth / singleSetWidth) + 1);
      setRepeatCount(copiesNeeded);
      offsetRef.current %= singleSetWidth;
    };

    measure();

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (singleSetRef.current) {
      resizeObserver.observe(singleSetRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [reduceMotion, section.testimonials.length]);

  useEffect(() => {
    if (reduceMotion) {
      if (trackRef.current) {
        trackRef.current.style.transform = "translate3d(0, 0, 0)";
      }
      return;
    }

    const track = trackRef.current;

    if (!track) {
      return;
    }

    const animate = (time: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = time;
      }

      const deltaSeconds = (time - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = time;

      const singleSetWidth = singleSetRef.current?.offsetWidth ?? 0;

      if (singleSetWidth <= 0) {
        frameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      const targetSpeed = isHovered ? 0 : MARQUEE_SPEED;
      const smoothingFactor = 1 - Math.pow(1 - MARQUEE_SMOOTHING, deltaSeconds * 60);

      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * smoothingFactor;
      offsetRef.current = (offsetRef.current + currentSpeedRef.current * deltaSeconds) % singleSetWidth;
      track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = null;
      lastFrameTimeRef.current = null;
    };
  }, [isHovered, reduceMotion]);

  return (
    <section id={section.id} className="pt-10 pb-4 md:pt-16 md:pb-6 lg:pt-20 lg:pb-8">
      <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-5 md:px-8 lg:px-12">
        <div className="mb-7 space-y-4 md:mb-9 md:space-y-5">
          <div className="space-y-3">
            <h2 className="welcome-display-font text-3xl font-black leading-tight sm:text-4xl md:text-5xl" style={{ color: "var(--about-text-primary)" }}>
              {section.title}
            </h2>
          </div>

          <p className="max-w-3xl text-[0.95rem] leading-relaxed sm:text-base md:text-lg" style={{ color: "var(--about-text-secondary)" }}>
            {section.subtitle}
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsHovered(true)}
          onBlurCapture={() => setIsHovered(false)}
        >
          <div
            className={reduceMotion ? "overflow-x-auto pb-3 pt-14" : "overflow-hidden pt-14"}
            style={{
              maskImage: "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
            }}
          >
            <div
              ref={trackRef}
              className="flex w-max flex-nowrap will-change-transform"
            >
              {marqueeCopies.map((copyIndex) => (
                <div
                  key={`${section.id}-copy-${copyIndex}`}
                  ref={copyIndex === 0 ? singleSetRef : undefined}
                  className="flex flex-nowrap gap-4 pr-4 md:gap-5 md:pr-5"
                  aria-hidden={copyIndex > 0}
                >
                  {section.testimonials.map((testimonial, index) => (
                    <article
                      key={`${section.id}-${testimonial.company}-${copyIndex}-${index}`}
                      className="group relative mt-10 flex min-h-[300px] w-[min(76vw,16.5rem)] shrink-0 flex-col rounded-[22px] border border-[#ebe4d8] bg-[#fffdfa] px-4 pb-4 pt-18 transition-all duration-300 hover:-translate-y-1 sm:min-h-[295px] sm:w-[17rem] sm:px-5 sm:pb-5 sm:pt-16 [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-[#101922]"
                    >
                      <div className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 -translate-y-[42%] rounded-full bg-[#fffdfa] sm:h-36 sm:w-36 sm:-translate-y-[50%] [html[data-theme='dark']_&]:bg-[#101922]" />

                      <div className="absolute left-1/2 top-0 flex h-24 w-24 -translate-x-1/2 -translate-y-[46%] items-center justify-center rounded-full bg-[#fffdfa] sm:h-32 sm:w-32 sm:-translate-y-[54%] [html[data-theme='dark']_&]:bg-[#101922]">
                        <div className="relative h-[5.4rem] w-[5.4rem] overflow-hidden rounded-full border-[5px] border-[#fffdfa] sm:h-[7.2rem] sm:w-[7.2rem] sm:border-[6px] [html[data-theme='dark']_&]:border-[#101922]">
                          <Image
                            src={getTestimonialImage(section.id, index)}
                            alt={`${testimonial.company} exhibition showcase`}
                            fill
                            sizes="(max-width: 640px) 86px, 116px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>

                      <div className="mt-3 flex flex-1 flex-col text-left">
                        <p className="text-[0.8rem] leading-[1.58] text-[#6b5743] sm:text-[0.82rem] [html[data-theme='dark']_&]:text-[#d8c2a8]">
                          {getCompactTestimonialText(testimonial.text)}
                        </p>
                      </div>

                      <div className="mt-auto pt-4 text-left">
                        <div className="text-[0.9rem] font-black text-[#3a2a1b] [html[data-theme='dark']_&]:text-[#f3e7d4]">
                          {testimonial.person}
                        </div>
                        <div className="mt-0.5 text-[0.72rem] leading-[1.45] font-semibold text-[#7a6855] [html[data-theme='dark']_&]:text-[#cdb79d]">
                          {testimonial.company}
                          {testimonial.designation ? ` - ${testimonial.designation}` : ""}
                        </div>
                      </div>

                      <div className="mt-3 flex justify-end">
                        <Quote className="h-8 w-8 fill-[#2f2318] text-[#2f2318] [html[data-theme='dark']_&]:fill-[#d8b766] [html[data-theme='dark']_&]:text-[#d8b766]" />
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <div className="h-px w-full bg-[linear-gradient(90deg,transparent_0%,rgba(159,123,40,0.16)_16%,rgba(159,123,40,0.42)_50%,rgba(159,123,40,0.16)_84%,transparent_100%)] [html[data-theme='dark']_&]:bg-[linear-gradient(90deg,transparent_0%,rgba(216,183,102,0.1)_16%,rgba(216,183,102,0.3)_50%,rgba(216,183,102,0.1)_84%,transparent_100%)]" />
          <div className="mx-auto h-4 w-[42%] min-w-[10rem] rounded-full bg-[radial-gradient(circle,rgba(159,123,40,0.14)_0%,transparent_72%)] blur-md [html[data-theme='dark']_&]:bg-[radial-gradient(circle,rgba(216,183,102,0.12)_0%,transparent_72%)]" />
        </div>
      </div>
    </section>
  );
}
