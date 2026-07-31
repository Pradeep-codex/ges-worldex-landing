import type { Metadata } from "next";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getVisitorPageSetting } from "@/lib/visitorPageSettings";

export const metadata: Metadata = { title: "Exhibitor List" };
export const dynamic = "force-dynamic";

export default async function ExhibitorListPage() {
  const setting = await getVisitorPageSetting("visitors/exhibitor-list");

  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/exhibitor-list"])}>
      {setting?.pdfUrl ? (
        <HotelInfoPdfSection
          title={setting.pdfTitle || "Exhibitor List PDF"}
          description={setting.pdfDescription || "View or download the latest exhibitor list PDF."}
          pdfPath={setting.pdfUrl}
          pdfLabel={setting.pdfFilename || "exhibitor-list.pdf"}
        />
      ) : null}
    </NavRoutePage>
  );
}
