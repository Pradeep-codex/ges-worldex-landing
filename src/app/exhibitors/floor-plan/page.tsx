import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Exhibitor Floor Plan" };

export default async function ExhibitorFloorPlanPage() {
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/floor-plan"])} />;
}
