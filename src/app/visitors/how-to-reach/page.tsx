import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";
import { navPageFallbacks, mergeNavPageContent } from "@/lib/navPages";

export const metadata: Metadata = { title: "How to Reach Venue" };

export default async function HowToReachPage() {
  return <NavRoutePage {...mergeNavPageContent(navPageFallbacks["visitors/how-to-reach"])} />;
}
