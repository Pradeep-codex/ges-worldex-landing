import type { Metadata } from "next";
import { AudienceHubPage } from "@/components/AudienceHubPage";

export const metadata: Metadata = {
  title: "Visitors",
  description: "Visitor information for GES Worldex exhibitions.",
};

export default async function VisitorsPage() {
  return <AudienceHubPage type="visitors" />;
}
