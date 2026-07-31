import type { Metadata } from "next";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getInternationalVisitorPageSetting } from "@/lib/internationalVisitorPageSettings";

export const metadata: Metadata = { title: "International How to Reach Venue" };
export const dynamic = "force-dynamic";

export default async function InternationalHowToReachPage() {
  const setting = await getInternationalVisitorPageSetting("visitors/international-how-to-reach");

  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/international-how-to-reach"])}>
      {setting?.pdfUrl ? (
        <HotelInfoPdfSection
          title={setting.pdfTitle || "International How to Reach Venue PDF"}
          description={setting.pdfDescription || "View or download the latest international visitor venue access PDF."}
          pdfPath={setting.pdfUrl}
          pdfLabel={setting.pdfFilename || "international-how-to-reach-venue.pdf"}
        />
      ) : null}
    </NavRoutePage>
  );
}
