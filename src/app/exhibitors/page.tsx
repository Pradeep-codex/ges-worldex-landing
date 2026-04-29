import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = {
  title: "Exhibitors",
  description: "Exhibitor services and support from GES Worldex.",
};

export default function ExhibitorsPage() {
  return (
    <NavRoutePage
      eyebrow="Exhibitors"
      title="Build a stronger exhibition presence."
      description="Explore booth planning, venue details, vendor support, and sponsorship opportunities designed to help exhibitors show up with clarity and confidence."
      points={["Plan your booth and services", "Access event and venue support", "Discover sponsorship options"]}
    />
  );
}
