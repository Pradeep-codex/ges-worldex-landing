import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Sponsorship Info" };

export default async function SponsorshipPage() {
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/sponsorship"])} />;
}
