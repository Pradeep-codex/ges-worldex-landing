import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";
import { getGenericPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = { title: "Visitor Registration" };

export default async function VisitorRegistrationPage() {
  const cms = await getGenericPageContent("visitors/registration");
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/registration"], cms)} />;
}
