import type { Metadata } from "next";
import { ContactPageContent } from "@/components/ContactPageContent";
import { getContactPageContent } from "@/sanity/lib/pages";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact GES Worldex for exhibition, visitor, and partnership inquiries.",
};

export default async function ContactPage() {
  const content = await getContactPageContent();
  return <ContactPageContent content={content} />;
}
