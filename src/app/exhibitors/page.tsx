import type { Metadata } from "next";
import { AudienceHubPage } from "@/components/AudienceHubPage";
import { getGenericPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = {
  title: "Exhibitors",
  description: "Exhibitor services and support from GES Worldex.",
};

export default async function ExhibitorsPage() {
  const content = await getGenericPageContent("exhibitors");
  return <AudienceHubPage type="exhibitors" content={content} />;
}
