import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = { title: "Visitor Hotel Info" };

export default function VisitorHotelInfoPage() {
  return (
    <NavRoutePage
      eyebrow="Visitors"
      title="Hotel info"
      description="Plan your stay near the exhibition venue with guidance for easier travel and event access."
      points={["Nearby stay guidance", "Travel planning", "Venue commute support"]}
    />
  );
}
