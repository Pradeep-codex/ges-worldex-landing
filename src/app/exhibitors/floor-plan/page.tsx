import type { Metadata } from "next";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { NavRoutePage } from "@/components/NavRoutePage";
import { getExhibitorPageSetting } from "@/lib/exhibitorPageSettings";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Exhibitor Floor Plan" };
export const dynamic = "force-dynamic";

export default async function ExhibitorFloorPlanPage() {
  const setting = await getExhibitorPageSetting("exhibitors/floor-plan");

  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/floor-plan"])}>
      {setting?.pdfUrl ? (
        <HotelInfoPdfSection
          title={setting.pdfTitle || "Exhibitor Floor Plan PDF"}
          description={setting.pdfDescription || "View or download the latest exhibitor floor plan PDF."}
          pdfPath={setting.pdfUrl}
          pdfLabel={setting.pdfFilename || "floor-plan.pdf"}
        />
      ) : null}
    </NavRoutePage>
  );
}
