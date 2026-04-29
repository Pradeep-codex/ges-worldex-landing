import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = { title: "Vendor Info" };

export default function VendorInfoPage() {
  return (
    <NavRoutePage
      eyebrow="Exhibitors"
      title="Vendor info"
      description="Coordinate with approved vendor services for build, logistics, on-site support, and exhibition readiness."
      points={["Build support", "Logistics coordination", "On-site service planning"]}
    />
  );
}
