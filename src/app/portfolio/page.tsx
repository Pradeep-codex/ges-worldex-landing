import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "GES Worldex exhibition portfolio and event work.",
};

export default function PortfolioPage() {
  return (
    <NavRoutePage
      eyebrow="Portfolio"
      title="Exhibition work built for visibility and discovery."
      description="Explore the GES Worldex portfolio across international exhibitions, category showcases, and business networking platforms."
      points={["Exhibition showcases", "Brand experiences", "Business networking platforms"]}
    />
  );
}
