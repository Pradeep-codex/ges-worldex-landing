import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = { title: "Exhibitor List" };

export default function ExhibitorListPage() {
  return (
    <NavRoutePage
      eyebrow="Visitors"
      title="Exhibitor list"
      description="Discover participating exhibitors, featured brands, and the product categories represented across GES Worldex platforms."
      points={["Participating companies", "Featured brands", "Product discovery"]}
    />
  );
}
