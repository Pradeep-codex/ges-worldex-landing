import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { getExhibitorPageSetting } from "@/lib/exhibitorPageSettings";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Exhibitor Hotel Info" };
export const dynamic = "force-dynamic";

export default async function ExhibitorHotelInfoPage() {
  const setting = await getExhibitorPageSetting("exhibitors/hotel-info");

  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/hotel-info"])}>
      {setting?.pdfUrl ? (
        <HotelInfoPdfSection
          title={setting.pdfTitle || "Exhibitor Hotel Guide"}
          description={setting.pdfDescription || "Keep the stay guide handy for team planning, accommodation review, and quick access to the full hotel information PDF."}
          pdfPath={setting.pdfUrl}
          pdfLabel={setting.pdfFilename || "exhibitor-hotel-guide.pdf"}
        />
      ) : null}
    </NavRoutePage>
  );
}
