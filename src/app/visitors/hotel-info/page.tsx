import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getVisitorPageSetting } from "@/lib/visitorPageSettings";

export const metadata: Metadata = { title: "Visitor Hotel Info" };
export const dynamic = "force-dynamic";

export default async function VisitorHotelInfoPage() {
  const setting = await getVisitorPageSetting("visitors/hotel-info");

  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/hotel-info"])}>
      <HotelInfoPdfSection
        title={setting?.pdfTitle || "Visitor Hotel Guide"}
        description={setting?.pdfDescription || "Review the hotel information PDF directly on this page before your visit, then open or download it whenever you need the full document."}
        pdfPath={setting?.pdfUrl || "/demo.pdf"}
        pdfLabel={setting?.pdfFilename || "demo.pdf"}
      />
    </NavRoutePage>
  );
}
