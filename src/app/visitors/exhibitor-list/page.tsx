import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getGenericPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = { title: "Exhibitor List" };

export default async function ExhibitorListPage() {
  const cms = await getGenericPageContent("visitors/exhibitor-list");
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/exhibitor-list"], cms)} />;
}
