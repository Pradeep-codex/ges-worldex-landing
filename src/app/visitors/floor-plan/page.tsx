import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = { title: "Visitor Floor Plan" };

export default function VisitorFloorPlanPage() {
  return (
    <NavRoutePage
      eyebrow="Visitors"
      title="Floor plan"
      description="Navigate exhibition zones, product categories, and key visitor touchpoints with better clarity."
      points={["Category zones", "Visitor pathways", "Key venue areas"]}
    />
  );
}
