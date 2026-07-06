import type { Metadata } from "next";
import { VisitorRegistrationClient } from "@/components/VisitorRegistrationClient";

export const metadata: Metadata = { title: "Visitor Registration" };

export default function VisitorRegistrationPage() {
  return <VisitorRegistrationClient />;
}
