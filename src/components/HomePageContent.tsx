"use client";

import { useEffect, useMemo, useState } from "react";
import { HeroSectionDemo } from "@/components/HeroSectionDemo";
import { AboutSection } from "@/components/AboutSection";
import { StatsSection } from "@/components/StatsSection";
import { ExhibitionCategoriesSection } from "@/components/ExhibitionCategoriesSection";
import { WhySwitchSection } from "@/components/WhySwitchSection";
import { UpcomingCitiesSection } from "@/components/UpcomingCitiesSection";
import { FeaturedVideoSection } from "@/components/FeaturedVideoSection";
import { ImageGallerySection } from "@/components/ImageGallerySection";
import { defaultSeo, siteUrl } from "@/lib/seo";

type HomePageContentProps = {
  content?: any;
};

function TermsConditionsSection() {
  return (
    <section className="relative z-20 w-full px-4 py-10 md:px-8 md:py-12 lg:px-12 lg:py-14">
      <div className="mb-12 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(159,123,40,0.42),transparent)]" />
      <div className="relative z-10 w-full rounded-[28px] bg-[linear-gradient(180deg,rgba(255,253,248,0.88)_0%,rgba(245,235,215,0.9)_100%)] p-5 shadow-[0_18px_40px_rgba(47,35,24,0.08)] md:p-8 lg:p-10 [html[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(7,16,24,0.88)_0%,rgba(22,31,37,0.9)_100%)] [html[data-theme='dark']_&]:shadow-[0_18px_40px_rgba(0,0,0,0.2)]">
        <div className="mx-auto max-w-[1540px]">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-4">
              <h2 className="welcome-display-font max-w-[18ch] text-[2rem] font-black leading-[0.98] tracking-[-0.05em] text-slate-950 sm:text-[2.35rem] md:text-[2.8rem] [html[data-theme='dark']_&]:text-slate-50">
                Terms & Conditions, Privacy, Cancellation & Refund Policy
              </h2>
              <p className="text-base leading-7 text-slate-600 [html[data-theme='dark']_&]:text-slate-300">
                Welcome to <span className="font-semibold text-slate-900 [html[data-theme='dark']_&]:text-slate-50">gesworldex.com</span>
              </p>
              <p className="text-base leading-7 text-slate-600 [html[data-theme='dark']_&]:text-slate-300">
                These Terms & Conditions govern your use of our website and services. By accessing or using our website,
                you agree to comply with and be bound by these terms.
              </p>
            </div>

            <div className="space-y-6 text-sm leading-7 text-slate-700 [html[data-theme='dark']_&]:text-slate-300">
              <div>
                <h3 className="mb-3 text-base font-black uppercase tracking-[0.14em] text-[#8f6411] [html[data-theme='dark']_&]:text-[#efbf56]">
                  Services Offered
                </h3>
                <ul className="space-y-2 list-disc pl-5 marker:text-[#9f7b28]">
                  <li>Booth bookings for exhibitors</li>
                  <li>Furniture rental services</li>
                  <li>Visitor registration and ticketing</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-base font-black uppercase tracking-[0.14em] text-[#8f6411] [html[data-theme='dark']_&]:text-[#efbf56]">
                  Booking and Payments
                </h3>
                <p>
                  All bookings for exhibitor booths, furniture, and visitor registration require payment through our designated
                  payment gateways.
                </p>
                <p className="mt-2">
                  Payments are to be made as per the specified amounts at the time of booking.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-base font-black uppercase tracking-[0.14em] text-[#8f6411] [html[data-theme='dark']_&]:text-[#efbf56]">
                  Exhibitor and Visitor Responsibilities
                </h3>
                <p>
                  Exhibitors must provide accurate information for their booth and adhere to the exhibition guidelines.
                </p>
                <p className="mt-2">
                  Visitors must register in advance and comply with event rules.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-base font-black uppercase tracking-[0.14em] text-[#8f6411] [html[data-theme='dark']_&]:text-[#efbf56]">
                  Changes to Terms
                </h3>
                <p>
                  We reserve the right to modify these Terms & Conditions at any time. Changes will be effective upon
                  posting on the website.
                </p>
              </div>
            </div>
          </div>
        </div>
      <div className="relative z-10 mt-10 pt-2">
          <div className="h-[28rem] overflow-y-auto rounded-[18px] border border-[rgba(159,123,40,0.16)] bg-white/45 p-5 pr-4 text-[0.94rem] leading-7 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:h-[34rem] md:p-8 md:pr-6 [scrollbar-color:#c49a43_transparent] [html[data-theme='dark']_&]:border-white/10 [html[data-theme='dark']_&]:bg-black/10 [html[data-theme='dark']_&]:text-slate-300">
            <div className="space-y-8">
              <section className="space-y-4">
                <h3 className="text-[1.15rem] font-black uppercase tracking-[0.12em] text-[#8f6411] [html[data-theme='dark']_&]:text-[#efbf56]">1. Terms & Conditions</h3>
                <p>These terms apply to visitors purchasing entry tickets and exhibitors purchasing stalls for Silver Show of India & South Jewellery Show, organised by GES Worldex India Pvt Ltd.</p>
                <h4 className="font-black text-slate-900 [html[data-theme='dark']_&]:text-slate-100">Tickets and entry</h4>
                <p>Entry tickets are valid only for the event, date and session stated at purchase. Please present your ticket or booking confirmation at the entrance.</p>
                <p>Tickets are personal to the purchaser unless the Organiser permits transfer. Do not duplicate, resell or misuse tickets.</p>
                <p>Entry is subject to venue rules, security checks and reasonable instructions from event staff. The Organiser may refuse admission or remove a person for disruptive, unlawful or unsafe conduct, subject to applicable law.</p>
                <p>Children, accompanying persons and re-entry are subject to the event-specific rules shown on the website or ticket.</p>
                <p>A ticket confirms entry only. Purchases of jewellery or other goods at the exhibition are separate transactions between the visitor and the relevant exhibitor.</p>
                <h4 className="font-black text-slate-900 [html[data-theme='dark']_&]:text-slate-100">Stalls and exhibitor participation</h4>
                <p>Stall bookings are subject to availability and written confirmation by the Organiser. A payment or booking request alone does not guarantee a stall until confirmation is issued.</p>
                <p>The exhibitor must provide accurate business, contact and payment information and any documents reasonably requested by the Organiser.</p>
                <p>Stall fees cover only the items and services expressly stated in the booking confirmation. Additional services, utilities, furniture, taxes, insurance or other charges may be payable separately if specified.</p>
                <p>The exhibitor must comply with venue requirements, applicable laws, safety and security rules, and the Organiser&apos;s instructions. The exhibitor is responsible for its staff, displayed goods, permits, insurance and business activities.</p>
                <p>The exhibitor must not transfer, share, sublet or alter the stall without the Organiser&apos;s prior written approval.</p>
                <p>The Organiser may make reasonable changes to stall allocation, floor plan, event timings or venue arrangements. If a material change affects a confirmed booking, the Organiser will notify the exhibitor and explain any available options.</p>
                <p>The exhibitor is responsible for the security and insurance of its jewellery, cash, equipment and other property. The Organiser is not responsible for loss or damage except where liability cannot legally be excluded.</p>
                <h4 className="font-black text-slate-900 [html[data-theme='dark']_&]:text-slate-100">Payments and electronic transactions</h4>
                <p>Prices, applicable taxes and any additional charges will be displayed before payment.</p>
                <p>Payments are processed through the payment gateway identified at checkout. The Organiser does not store full card details.</p>
                <p>A booking is considered paid once payment is successfully confirmed by the payment gateway and the Organiser issues a confirmation.</p>
                <p>If a payment is debited but the booking is not confirmed, contact [support email/phone] with the transaction reference. The Organiser will investigate with the payment provider.</p>
                <p>The purchaser is responsible for providing a valid email address and checking the booking confirmation.</p>
                <h4 className="font-black text-slate-900 [html[data-theme='dark']_&]:text-slate-100">Event changes and liability</h4>
                <p>Event information may change where reasonably necessary. The Organiser will make reasonable efforts to notify affected ticket holders and exhibitors.</p>
                <p>The Organiser is not liable for delays, cancellation or inability to provide the event caused by circumstances beyond its reasonable control, subject to applicable law and the cancellation policy below.</p>
                <p>Nothing in these terms excludes or limits liability that cannot legally be excluded or limited.</p>
              </section>

              <section className="space-y-4">
                <h3 className="text-[1.15rem] font-black uppercase tracking-[0.12em] text-[#8f6411] [html[data-theme='dark']_&]:text-[#efbf56]">2. Privacy Policy</h3>
                <p>The Organiser collects and uses personal information needed to manage ticket purchases, stall bookings and the exhibition.</p>
                <h4 className="font-black text-slate-900 [html[data-theme='dark']_&]:text-slate-100">Information we may collect</h4>
                <p>This may include your name, contact details, billing information, booking or stall details, transaction references, communications with us, and information required for event access or security.</p>
                <h4 className="font-black text-slate-900 [html[data-theme='dark']_&]:text-slate-100">How we use information</h4>
                <p>We may use your information to:</p>
                <ul className="list-disc space-y-1 pl-6 marker:text-[#9f7b28]"><li>process payments and confirm bookings;</li><li>issue tickets, receipts and event updates;</li><li>manage exhibitor and visitor services;</li><li>respond to enquiries and handle complaints or refunds;</li><li>protect the security of the event and prevent fraud;</li><li>meet legal, accounting and regulatory obligations; and</li><li>send promotional messages where permitted or where you have agreed to receive them.</li></ul>
                <p>You can opt out of promotional messages using the method provided in the message or by contacting us. Essential booking and event communications may still be sent.</p>
                <h4 className="font-black text-slate-900 [html[data-theme='dark']_&]:text-slate-100">Sharing and retention</h4>
                <p>We may share relevant information with payment processors, ticketing or technology providers, the venue, professional advisers and authorities where required by law or necessary to provide the event. These parties should handle information in accordance with their applicable obligations.</p>
                <p>Payment card details are handled by the payment gateway. The Organiser does not intentionally store full card numbers or security codes.</p>
                <p>We retain personal information only for as long as reasonably necessary for the purposes above, including legal and accounting requirements.</p>
                <h4 className="font-black text-slate-900 [html[data-theme='dark']_&]:text-slate-100">Your choices and rights</h4>
                <p>Depending on applicable law, you may have rights to access, correct, delete or restrict the use of your personal information. To make a request or raise a privacy concern, contact [privacy contact email].</p>
                <p>The website may use cookies or similar technologies for essential site functions, security and analytics. You can manage cookies through your browser settings; disabling some cookies may affect website functionality.</p>
              </section>

              <section className="space-y-4">
                <h3 className="text-[1.15rem] font-black uppercase tracking-[0.12em] text-[#8f6411] [html[data-theme='dark']_&]:text-[#efbf56]">3. Cancellation & Refund Policy</h3>
                <h4 className="font-black text-slate-900 [html[data-theme='dark']_&]:text-slate-100">Visitor tickets</h4>
                <p>Ticket cancellation and refund requests must be sent to [support email] with the booking reference and purchaser&apos;s contact details.</p>
                <p>[Choose and publish your actual rule: &quot;Tickets are non-refundable and non-transferable&quot; OR state the permitted cancellation period and any applicable fees.]</p>
                <p>If the Organiser cancels the event, ticket holders will be notified and offered [a refund / transfer / credit - specify which applies], subject to applicable law.</p>
                <p>If the event is rescheduled, tickets will be valid for the new date unless the Organiser states otherwise. Any refund option and deadline will be included in the notice.</p>
                <p>Refunds, where approved, will generally be sent to the original payment method. Processing times may depend on the payment provider or bank.</p>
                <h4 className="font-black text-slate-900 [html[data-theme='dark']_&]:text-slate-100">Exhibitor stall bookings</h4>
                <p>Exhibitor cancellation requests must be submitted in writing to [exhibitor contact email] and must include the booking reference.</p>
                <p>[Insert the stall cancellation schedule, for example: refund amount by cancellation date, any non-refundable deposit, and the final deadline.]</p>
                <p>No refund will be provided for failure to attend, late arrival, early departure or breach of event rules, except where required by applicable law or expressly agreed in writing.</p>
                <p>If the Organiser cancels the event, the Organiser will notify exhibitors and provide [a refund / transfer / credit - specify the arrangement], subject to applicable law.</p>
                <p>Any approved refund will generally be made to the original payment method. Payment gateway or bank processing times may apply.</p>
                <h4 className="font-black text-slate-900 [html[data-theme='dark']_&]:text-slate-100">Refund enquiries</h4>
                <p>For cancellation or refund assistance, contact <a className="font-semibold text-[#8f6411] underline decoration-[#d7aa47] underline-offset-2 [html[data-theme='dark']_&]:text-[#efbf56]" href="mailto:info@gesworldex.com">info@gesworldex.com</a>, +91 98440 00544 and include your name, booking reference, payment date and transaction reference. Do not send full card numbers or security codes.</p>
              </section>
            </div>
          </div>
      </div>
      </div>
    </section>
  );
}

export function HomePageContent({ content }: HomePageContentProps) {
  const [isPortraitTabletHeroTight, setIsPortraitTabletHeroTight] = useState(false);

  const orgSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "GES Worldex",
      url: `${siteUrl}/home`,
      description: defaultSeo.description,
    }),
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateHeroViewport = () => {
      const isStrictPortraitTablet =
        window.matchMedia("(orientation: portrait) and (width: 834px) and (height: 1194px)")
          .matches ||
        (Math.abs(window.innerWidth - 834) <= 2 &&
          Math.abs(window.innerHeight - 1194) <= 2 &&
          window.innerHeight > window.innerWidth);

      setIsPortraitTabletHeroTight(isStrictPortraitTablet);
    };

    updateHeroViewport();
    window.addEventListener("resize", updateHeroViewport);

    return () => window.removeEventListener("resize", updateHeroViewport);
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <div
        id="home"
        className="relative min-h-screen overflow-x-hidden lg:-mt-24 [@media(orientation:landscape)_and_(min-width:768px)_and_(max-width:1180px)]:-mt-32"
        aria-label="GES Worldex home"
        style={isPortraitTabletHeroTight ? { marginTop: "-24rem" } : undefined}
      >
        <HeroSectionDemo
          content={content?.heroSection}
          shellMode="home"
          tightPortraitTabletTop={isPortraitTabletHeroTight}
        />
        <AboutSection content={content?.aboutSection} />
        <StatsSection content={content?.statsSection} />
        <ExhibitionCategoriesSection content={content?.exhibitionCategoriesSection} />
        <WhySwitchSection content={content?.whySection} />
        <TermsConditionsSection />
        <UpcomingCitiesSection content={content?.heroSection} />
        <FeaturedVideoSection content={content?.featuredVideoSection} />
        <ImageGallerySection content={content?.gallerySection} />
      </div>
    </>
  );
}
