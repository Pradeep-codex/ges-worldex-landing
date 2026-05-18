import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getGenericPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = { title: "Sponsorship Info" };

export default async function SponsorshipPage() {
  const cms = await getGenericPageContent("exhibitors/sponsorship");
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/sponsorship"], cms)} />;
}
