import type { Metadata } from "next";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { getPortfolioShows } from "@/lib/portfolioShowSettings";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore GES Worldex exhibition platforms including Silver Show of India, South Jewellery Show, Jewellery Show of India, Build-Con, Auto Expo, and The Interior & Furniture Exhibition.",
};

export default async function PortfolioPage() {
  const exhibitions = await getPortfolioShows();

  return (
    <main className="relative min-h-screen overflow-x-hidden" aria-label="GES Worldex portfolio">
      <PortfolioShowcase exhibitions={exhibitions} />
    </main>
  );
}
