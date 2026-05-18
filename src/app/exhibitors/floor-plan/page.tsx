import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getGenericPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = { title: "Exhibitor Floor Plan" };

export default async function ExhibitorFloorPlanPage() {
  const cms = await getGenericPageContent("exhibitors/floor-plan");
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/floor-plan"], cms)} />;
}
