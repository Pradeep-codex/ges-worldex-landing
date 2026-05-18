import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getGenericPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = { title: "Visitor Hotel Info" };

export default async function VisitorHotelInfoPage() {
  const cms = await getGenericPageContent("visitors/hotel-info");
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/hotel-info"], cms)} />;
}
