import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = { title: "Sponsorship Info" };

export default function SponsorshipPage() {
  return (
    <NavRoutePage
      eyebrow="Exhibitors"
      title="Sponsorship info"
      description="Explore sponsorship formats that increase brand visibility before, during, and after the exhibition."
      points={["Brand visibility packages", "On-site placement", "Audience engagement opportunities"]}
    />
  );
}
