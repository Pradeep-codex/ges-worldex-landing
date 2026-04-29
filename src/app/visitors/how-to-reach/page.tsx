import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = { title: "How to Reach Venue" };

export default function HowToReachPage() {
  return (
    <NavRoutePage
      eyebrow="Visitors"
      title="How to reach the venue"
      description="Get practical guidance for reaching the exhibition venue and planning a smoother event-day arrival."
      points={["Venue access", "Arrival planning", "Local travel guidance"]}
    />
  );
}
