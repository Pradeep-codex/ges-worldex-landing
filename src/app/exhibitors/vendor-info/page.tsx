import type { Metadata } from "next";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { NavRoutePage } from "@/components/NavRoutePage";
import { getExhibitorPageSetting } from "@/lib/exhibitorPageSettings";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Vendor Info" };
export const dynamic = "force-dynamic";

export default async function VendorInfoPage() {
  const setting = await getExhibitorPageSetting("exhibitors/vendor-info");

  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/vendor-info"])}>
      {setting?.pdfUrl ? (
        <HotelInfoPdfSection
          title={setting.pdfTitle || "Vendor Info PDF"}
          description={setting.pdfDescription || "View or download the latest vendor information PDF."}
          pdfPath={setting.pdfUrl}
          pdfLabel={setting.pdfFilename || "vendor-info.pdf"}
        />
      ) : null}
    </NavRoutePage>
  );
}
