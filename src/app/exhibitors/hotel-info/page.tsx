import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getGenericPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = { title: "Exhibitor Hotel Info" };

export default async function ExhibitorHotelInfoPage() {
  const cms = await getGenericPageContent("exhibitors/hotel-info");
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/hotel-info"], cms)} />;
}
