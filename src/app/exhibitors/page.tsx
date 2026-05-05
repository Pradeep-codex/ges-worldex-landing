import type { Metadata } from "next";
import { AudienceHubPage } from "@/components/AudienceHubPage";

export const metadata: Metadata = {
  title: "Exhibitors",
  description: "Exhibitor services and support from GES Worldex.",
};

export default function ExhibitorsPage() {
  return <AudienceHubPage type="exhibitors" />;
}
