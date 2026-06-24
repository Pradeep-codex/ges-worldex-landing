import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Exhibitor Portal" };

export default async function ExhibitorPortalPage() {
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/portal"])} />;
}
