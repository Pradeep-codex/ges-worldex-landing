import type { Metadata } from "next";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getInternationalVisitorPageSetting } from "@/lib/internationalVisitorPageSettings";

export const metadata: Metadata = { title: "International Visitor Floor Plan" };
export const dynamic = "force-dynamic";

export default async function InternationalVisitorFloorPlanPage() {
  const setting = await getInternationalVisitorPageSetting("visitors/international-floor-plan");

  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/international-floor-plan"])}>
      {setting?.pdfUrl ? (
        <HotelInfoPdfSection
          title={setting.pdfTitle || "International Visitor Floor Plan PDF"}
          description={setting.pdfDescription || "View or download the latest international visitor floor plan PDF."}
          pdfPath={setting.pdfUrl}
          pdfLabel={setting.pdfFilename || "international-visitor-floor-plan.pdf"}
        />
      ) : null}
    </NavRoutePage>
  );
}
