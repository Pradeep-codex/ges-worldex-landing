import type { Metadata } from "next";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getInternationalVisitorPageSetting } from "@/lib/internationalVisitorPageSettings";

export const metadata: Metadata = { title: "International Visitor Hotel Info" };
export const dynamic = "force-dynamic";

export default async function InternationalVisitorHotelInfoPage() {
  const setting = await getInternationalVisitorPageSetting("visitors/international-hotel-info");

  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/international-hotel-info"])}>
      <HotelInfoPdfSection
        title={setting?.pdfTitle || "International Visitor Hotel Guide"}
        description={setting?.pdfDescription || "Review the hotel information PDF for international visitors directly on this page before your trip."}
        pdfPath={setting?.pdfUrl || "/demo.pdf"}
        pdfLabel={setting?.pdfFilename || "demo.pdf"}
      />
    </NavRoutePage>
  );
}
