import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: "/home",
  },
  openGraph: {
    url: `${siteUrl}/home`,
  },
};

export default async function HomePage() {
  return <HomePageContent />;
}
