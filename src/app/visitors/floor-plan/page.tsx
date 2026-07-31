import type { Metadata } from "next";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getVisitorPageSetting } from "@/lib/visitorPageSettings";

export const metadata: Metadata = { title: "Visitor Floor Plan" };
export const dynamic = "force-dynamic";

export default async function VisitorFloorPlanPage() {
  const setting = await getVisitorPageSetting("visitors/floor-plan");

  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/floor-plan"])}>
      {setting?.pdfUrl ? (
        <HotelInfoPdfSection
          title={setting.pdfTitle || "Visitor Floor Plan PDF"}
          description={setting.pdfDescription || "View or download the latest visitor floor plan PDF."}
          pdfPath={setting.pdfUrl}
          pdfLabel={setting.pdfFilename || "visitor-floor-plan.pdf"}
        />
      ) : null}
    </NavRoutePage>
  );
}
