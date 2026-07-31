import type { Metadata } from "next";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getInternationalVisitorPageSetting } from "@/lib/internationalVisitorPageSettings";

export const metadata: Metadata = { title: "International Exhibitor List" };
export const dynamic = "force-dynamic";

export default async function InternationalExhibitorListPage() {
  const setting = await getInternationalVisitorPageSetting("visitors/international-exhibitor-list");

  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/international-exhibitor-list"])}>
      {setting?.pdfUrl ? (
        <HotelInfoPdfSection
          title={setting.pdfTitle || "International Exhibitor List PDF"}
          description={setting.pdfDescription || "View or download the latest international exhibitor list PDF."}
          pdfPath={setting.pdfUrl}
          pdfLabel={setting.pdfFilename || "international-exhibitor-list.pdf"}
        />
      ) : null}
    </NavRoutePage>
  );
}
