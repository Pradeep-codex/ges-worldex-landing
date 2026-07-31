import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";
import sanityClient from "@/lib/sanityClient";
import { homeQuery } from "@/lib/sanityQueries";
import urlFor from "@/lib/sanityImage";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: "/home",
  },
  openGraph: {
    url: `${siteUrl}/home`,
  },
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let content = null;
  try {
    content = await sanityClient.fetch(homeQuery);

    if (content?.heroSection?.slides?.length) {
      content.heroSection.slides = content.heroSection.slides.map((s: any) => ({
        ...s,
        image: s?.image ? urlFor(s.image).url() : s?.image,
      }));
    }

    if (content?.aboutSection?.images?.length) {
      content.aboutSection.images = content.aboutSection.images.map((image: any) => ({
        ...image,
        src: image?.image ? urlFor(image.image).url() : image?.src,
      }));
    }
  } catch (e) {
    // If Sanity is not configured, fall back to undefined content
    // eslint-disable-next-line no-console
    console.warn("Sanity fetch failed:", e);
  }

  return <HomePageContent content={content} />;
}
