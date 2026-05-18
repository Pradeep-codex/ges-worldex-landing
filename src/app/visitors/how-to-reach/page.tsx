import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getGenericPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = { title: "How to Reach Venue" };

export default async function HowToReachPage() {
  const cms = await getGenericPageContent("visitors/how-to-reach");
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/how-to-reach"], cms)} />;
}
