import type { Metadata } from "next";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { portfolioExhibitions } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore GES Worldex exhibition platforms including Silver Show of India, South Jewellery Show, Jewellery Show of India, Build-Con, Auto Expo, and The Interior & Furniture Exhibition.",
};

export default async function PortfolioPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" aria-label="GES Worldex portfolio">
      <PortfolioShowcase exhibitions={portfolioExhibitions} />
    </main>
  );
}
