import type { Metadata } from "next";
import { VisitorRegistrationClient, type RegistrationHeroContent } from "@/components/VisitorRegistrationClient";
import sanityClient from "@/lib/sanityClient";
import { homeQuery } from "@/lib/sanityQueries";
import urlFor from "@/lib/sanityImage";

export const metadata: Metadata = { title: "Visitor Registration" };
export const dynamic = "force-dynamic";

type SanityHeroSlide = Omit<NonNullable<RegistrationHeroContent["slides"]>[number], "image"> & {
  image?: unknown;
};

type SanityHomeContent = {
  heroSection?: {
    slides?: SanityHeroSlide[];
  };
};

export default async function VisitorRegistrationPage() {
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
    // Keep the registration page available if Sanity is temporarily unreachable.
    console.warn("Sanity fetch failed:", error);
  }

  return <VisitorRegistrationClient content={content?.heroSection as RegistrationHeroContent | undefined} />;
}
