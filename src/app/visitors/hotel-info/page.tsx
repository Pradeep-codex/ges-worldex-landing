import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Visitor Hotel Info" };

export default async function VisitorHotelInfoPage() {
  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/hotel-info"])}>
      <HotelInfoPdfSection
        title="Visitor Hotel Guide"
        description="Review the hotel information PDF directly on this page before your visit, then open or download it whenever you need the full document."
      />
    </NavRoutePage>
  );
}
