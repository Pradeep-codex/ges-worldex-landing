import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Visitor Floor Plan" };

export default async function VisitorFloorPlanPage() {
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/floor-plan"])} />;
}
