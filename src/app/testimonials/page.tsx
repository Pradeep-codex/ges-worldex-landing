import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Client and participant feedback for GES Worldex.",
};

export default function TestimonialsPage() {
  return (
    <NavRoutePage
      eyebrow="Testimonials"
      title="Trusted by exhibition teams and business leaders."
      description="Read how exhibitors, visitors, and partners experience GES Worldex platforms across markets and industries."
      points={["Exhibitor experiences", "Visitor outcomes", "Partner feedback"]}
    />
  );
}
