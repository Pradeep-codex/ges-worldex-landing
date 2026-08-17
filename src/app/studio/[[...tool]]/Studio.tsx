"use client";

import { NextStudio } from "next-sanity/studio";

import { studioConfig } from "@/sanity/studio/config";

export default function Studio() {
  return <NextStudio config={studioConfig} />;
}
