import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getGenericPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = { title: "Exhibitor Portal" };

export default async function ExhibitorPortalPage() {
  const cms = await getGenericPageContent("exhibitors/portal");
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/portal"], cms)} />;
}
