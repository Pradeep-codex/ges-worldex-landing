import type { Metadata } from "next";
import { HotelInfoPdfSection } from "@/components/HotelInfoPdfSection";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getVisitorPageSetting } from "@/lib/visitorPageSettings";

export const metadata: Metadata = { title: "How to Reach Venue" };
export const dynamic = "force-dynamic";

export default async function HowToReachPage() {
  const setting = await getVisitorPageSetting("visitors/how-to-reach");

  return (
    <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/how-to-reach"])}>
      {setting?.pdfUrl ? (
        <HotelInfoPdfSection
          title={setting.pdfTitle || "How to Reach Venue PDF"}
          description={setting.pdfDescription || "View or download the latest venue access PDF."}
          pdfPath={setting.pdfUrl}
          pdfLabel={setting.pdfFilename || "how-to-reach-venue.pdf"}
        />
      ) : null}
    </NavRoutePage>
  );
}
