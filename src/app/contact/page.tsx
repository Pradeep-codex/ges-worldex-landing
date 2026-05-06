import type { Metadata } from "next";
import { ContactPageContent } from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact GES Worldex for exhibition, visitor, and partnership inquiries.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}

