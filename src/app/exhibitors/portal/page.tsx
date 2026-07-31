import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { NavRoutePage } from "@/components/NavRoutePage";
import { getExhibitorPageSetting } from "@/lib/exhibitorPageSettings";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Exhibitor Portal" };
export const dynamic = "force-dynamic";

export default async function ExhibitorPortalPage() {
  const setting = await getExhibitorPageSetting("exhibitors/portal");

  if (setting?.externalUrl) {
    redirect(setting.externalUrl);
  }

  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/portal"])} />;
}
