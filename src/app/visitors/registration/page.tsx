import type { Metadata } from "next";
import { NavRoutePage } from "@/components/NavRoutePage";

export const metadata: Metadata = { title: "Visitor Registration" };

export default function VisitorRegistrationPage() {
  return (
    <NavRoutePage
      eyebrow="Visitors"
      title="Visitor registration"
      description="Register your interest and prepare for access to GES Worldex exhibition experiences."
      points={["Visitor pass guidance", "Business profile support", "Event access preparation"]}
    />
  );
}
