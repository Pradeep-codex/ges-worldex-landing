import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact GES Worldex for exhibition, visitor, and partnership inquiries.",
};

export default function ContactPage() {
  return (
    <NavRoutePage
      eyebrow="Contact"
      title="Let’s talk about your next exhibition move."
      description="Reach the GES Worldex team for exhibitor participation, visitor guidance, partnerships, sponsorships, and event support."
      points={["Exhibitor inquiries", "Visitor support", "Partnership conversations"]}
      ctaLabel="Email GES Worldex"
      ctaHref="mailto:info@gesindiaexh.com"
    />
  );
}
