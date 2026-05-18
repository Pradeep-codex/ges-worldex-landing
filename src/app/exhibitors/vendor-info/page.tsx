import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getGenericPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = { title: "Vendor Info" };

export default async function VendorInfoPage() {
  const cms = await getGenericPageContent("exhibitors/vendor-info");
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/vendor-info"], cms)} />;
}
