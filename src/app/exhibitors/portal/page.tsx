import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = { title: "Exhibitor Portal" };

export default function ExhibitorPortalPage() {
  return (
    <NavRoutePage
      eyebrow="Exhibitors"
      title="Exhibitor portal"
      description="Access the central hub for exhibitor coordination, documentation, service requests, and event preparation."
      points={["Document support", "Service coordination", "Event readiness updates"]}
    />
  );
}
