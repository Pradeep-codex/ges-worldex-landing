import type { Metadata } from "next";
import { HeroSectionDemo } from "@/components/HeroSectionDemo";

export const metadata: Metadata = {
  title: "Hero Demo",
  description: "Standalone hero section design trial for GES Worldex.",
};

export default function DemoHeroPage() {
  return <HeroSectionDemo shellMode="demo" />;
}
