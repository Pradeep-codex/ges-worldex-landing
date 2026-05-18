import type { Metadata } from "next";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { portfolioExhibitions } from "@/lib/portfolio";
import { getPortfolioItems } from "@/sanity/lib/pages";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore GES Worldex exhibition platforms including Silver Show of India, South Jewellery Show, Jewellery Show of India, Build-Con, Auto Expo, and The Interior & Furniture Exhibition.",
};

export default async function PortfolioPage() {
  const cmsItems = await getPortfolioItems();
  const exhibitions = cmsItems?.length
    ? cmsItems.map((item, index) => {
        const fallback = portfolioExhibitions[index % portfolioExhibitions.length];

        return {
          ...fallback,
          id: item.id || fallback.id,
          title: item.title || fallback.title,
          label: item.label || fallback.label,
          image: item.image || fallback.image,
          detailImage: item.detailImage || fallback.detailImage,
          galleryImages: item.galleryImages?.filter(Boolean) || fallback.galleryImages,
          overview: item.overview || fallback.overview,
          focus: item.focus?.length ? item.focus : fallback.focus,
          editions: item.editions?.length
            ? item.editions.map((edition) => ({
                name: edition.name || "Edition",
                date: edition.date || "Date to be announced",
                city: edition.city || "City to be announced",
                stats:
                  edition.stats?.reduce<Record<string, number>>((acc, stat) => {
                    const key = stat.label
                      ?.toLowerCase()
                      .replace(/[^a-z0-9]+(.)/g, (_, char: string) => char.toUpperCase())
                      .replace(/[^a-z0-9]/g, "");

                    if (key && typeof stat.value === "number") {
                      acc[key] = stat.value;
                    }

                    return acc;
                  }, {}) ?? {},
              }))
            : fallback.editions,
        };
      })
    : portfolioExhibitions;

  return (
    <main className="relative min-h-screen overflow-x-hidden" aria-label="GES Worldex portfolio">
      <PortfolioShowcase exhibitions={exhibitions} />
    </main>
  );
}
