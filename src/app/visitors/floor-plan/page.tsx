import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getGenericPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = { title: "Visitor Floor Plan" };

export default async function VisitorFloorPlanPage() {
  const cms = await getGenericPageContent("visitors/floor-plan");
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/floor-plan"], cms)} />;
}
