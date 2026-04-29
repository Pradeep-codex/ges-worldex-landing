import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = { title: "Exhibitor Hotel Info" };

export default function ExhibitorHotelInfoPage() {
  return (
    <NavRoutePage
      eyebrow="Exhibitors"
      title="Hotel info"
      description="Find stay-related guidance for exhibitor teams attending GES Worldex exhibition programs."
      points={["Recommended stay areas", "Team travel planning", "Venue access guidance"]}
    />
  );
}
