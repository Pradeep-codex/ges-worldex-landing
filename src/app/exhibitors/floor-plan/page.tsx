import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = { title: "Exhibitor Floor Plan" };

export default function ExhibitorFloorPlanPage() {
  return (
    <NavRoutePage
      eyebrow="Exhibitors"
      title="Floor plan"
      description="Review exhibition layout planning and discover how booth placement, visitor flow, and category zones support better business conversations."
      points={["Venue zoning", "Booth placement support", "Visitor flow planning"]}
    />
  );
}
