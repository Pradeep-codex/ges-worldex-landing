import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "Visitor Registration" };

export default async function VisitorRegistrationPage() {
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/registration"])} />;
}
