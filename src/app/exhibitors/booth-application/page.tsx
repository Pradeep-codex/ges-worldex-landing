import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Booth Application" };

export default async function BoothApplicationPage() {
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["exhibitors/booth-application"])} />;
}
