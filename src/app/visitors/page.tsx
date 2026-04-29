import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = {
  title: "Visitors",
  description: "Visitor information for GES Worldex exhibitions.",
};

export default function VisitorsPage() {
  return (
    <NavRoutePage
      eyebrow="Visitors"
      title="Plan a productive exhibition visit."
      description="Find registration, floor plan, exhibitor, venue, and travel information built to help visitors discover products and connect with the right businesses."
      points={["Register for upcoming shows", "Explore exhibitors and products", "Plan your venue visit"]}
    />
  );
}
