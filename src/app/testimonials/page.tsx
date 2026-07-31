import type { Metadata } from "next";
import { TestimonialsPageContent } from "@/components/TestimonialsPageContent";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Client and participant feedback for GES Worldex.",
};

export default function TestimonialsPage() {
  return <TestimonialsPageContent />;
}
