import type { Metadata } from "next";
import { VisitorRegistrationClient, type RegistrationHeroContent } from "@/components/VisitorRegistrationClient";
import { exhibitionSlides } from "@/lib/exhibitionSlides";
import sanityClient from "@/lib/sanityClient";
import { homeQuery } from "@/lib/sanityQueries";
import urlFor from "@/lib/sanityImage";

export const metadata: Metadata = { title: "International Registration" };
export const dynamic = "force-dynamic";

type SanityHeroSlide = Omit<NonNullable<RegistrationHeroContent["slides"]>[number], "image"> & {
  image?: unknown;
};

type SanityHomeContent = {
  heroSection?: {
    slides?: SanityHeroSlide[];
  };
};

const internationalBuyerLinks = {
  delhi: "https://gesworldex.com/ssi-intdelhi",
  bengaluru: "https://gesworldex.com/ssi-intbangalore",
  mumbai: "https://gesworldex.com/ssi-intmumbai",
};

function getInternationalBuyerLink(slide: Pick<NonNullable<RegistrationHeroContent["slides"]>[number], "title" | "location" | "id">) {
  const value = `${slide.id ?? ""} ${slide.title ?? ""} ${slide.location ?? ""}`.toLowerCase();

  if (value.includes("delhi")) return internationalBuyerLinks.delhi;
  if (value.includes("bengaluru") || value.includes("bangalore")) return internationalBuyerLinks.bengaluru;
  if (value.includes("mumbai")) return internationalBuyerLinks.mumbai;

  return undefined;
}

function withInternationalBuyerLinks(slides?: RegistrationHeroContent["slides"]) {
  const resolvedSlides = slides?.length ? slides : exhibitionSlides;

  return resolvedSlides.map((slide) => ({
    ...slide,
    enableVisitorRegistration: Boolean(getInternationalBuyerLink(slide)) || slide.enableVisitorRegistration,
    visitorRegistrationUrl: getInternationalBuyerLink(slide) || slide.visitorRegistrationUrl,
    visitorRegistrationButtonLabel: slide.visitorRegistrationButtonLabel || "Visit the Show",
  }));
}

export default async function InternationalRegistrationPage() {
  let content: SanityHomeContent | null = null;

  try {
    content = await sanityClient.fetch(homeQuery);

    if (content?.heroSection?.slides?.length) {
      content.heroSection.slides = content.heroSection.slides.map((slide) => ({
        ...slide,
        image: slide?.image ? urlFor(slide.image).url() : slide?.image,
      }));
    }
  } catch (error) {
    console.warn("Sanity fetch failed:", error);
  }

  return (
    <VisitorRegistrationClient
      content={{ slides: withInternationalBuyerLinks(content?.heroSection?.slides as RegistrationHeroContent["slides"] | undefined) }}
      eyebrow="International Registration"
      title="Choose the show you want to visit."
      description="Explore the same upcoming exhibition lineup for international visitors and submit your interest using the same registration cards and popup flow."
    />
  );
}
