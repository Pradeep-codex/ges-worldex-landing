import type { Metadata } from "next";
import { VisitorRegistrationClient, type RegistrationHeroContent } from "@/components/VisitorRegistrationClient";
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
      content={content?.heroSection as RegistrationHeroContent | undefined}
      eyebrow="International Registration"
      title="Choose the show you want to visit."
      description="Explore the same upcoming exhibition lineup for international visitors and submit your interest using the same registration cards and popup flow."
    />
  );
}
