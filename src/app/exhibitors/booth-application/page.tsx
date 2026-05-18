import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getGenericPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = { title: "Booth Application" };

export default async function BoothApplicationPage() {
  const cms = await getGenericPageContent("exhibitors/booth-application");
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/booth-application"], cms)} />;
}
