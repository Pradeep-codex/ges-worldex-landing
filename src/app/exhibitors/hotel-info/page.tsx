import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Exhibitor Hotel Info" };

export default async function ExhibitorHotelInfoPage() {
  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/hotel-info"])}>
      <HotelInfoPdfSection
        title="Exhibitor Hotel Guide"
        description="Keep the stay guide handy for team planning, accommodation review, and quick access to the full hotel information PDF."
      />
    </NavRoutePage>
  );
}
