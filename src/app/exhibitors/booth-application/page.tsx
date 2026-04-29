import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = { title: "Booth Application" };

export default function BoothApplicationPage() {
  return (
    <NavRoutePage
      eyebrow="Exhibitors"
      title="Booth application"
      description="Submit interest for exhibition space and start planning the right booth presence for your brand, products, and team."
      points={["Booth size guidance", "Participation requirements", "Next-step coordination"]}
    />
  );
}
