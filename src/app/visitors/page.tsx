import type { Metadata } from "next";
import { AudienceHubPage } from "@/components/AudienceHubPage";
import { getGenericPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = {
  title: "Visitors",
  description: "Visitor information for GES Worldex exhibitions.",
};

export default async function VisitorsPage() {
  const content = await getGenericPageContent("visitors");
  return <AudienceHubPage type="visitors" content={content} />;
}
