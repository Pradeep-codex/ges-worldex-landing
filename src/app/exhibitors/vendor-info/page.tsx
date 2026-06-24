import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Vendor Info" };

export default async function VendorInfoPage() {
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/vendor-info"])} />;
}
