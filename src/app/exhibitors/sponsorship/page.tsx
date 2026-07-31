import type { Metadata } from "next";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { NavRoutePage } from "@/components/NavRoutePage";
import { getExhibitorPageSetting } from "@/lib/exhibitorPageSettings";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Sponsorship Info" };
export const dynamic = "force-dynamic";

export default async function SponsorshipPage() {
  const setting = await getExhibitorPageSetting("exhibitors/sponsorship");

  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/sponsorship"])}>
      {setting?.pdfUrl ? (
        <HotelInfoPdfSection
          title={setting.pdfTitle || "Sponsorship Info PDF"}
          description={setting.pdfDescription || "View or download the latest sponsorship information PDF."}
          pdfPath={setting.pdfUrl}
          pdfLabel={setting.pdfFilename || "sponsorship-info.pdf"}
        />
      ) : null}
    </NavRoutePage>
  );
}
