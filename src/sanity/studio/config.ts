import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { schemaTypes } from "./schema";

export const studioConfig = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "7r7n8x37",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  title: "GES Studio",
  apiVersion: process.env.SANITY_API_VERSION || "2026-07-22",
  basePath: "/studio",
  plugins: [deskTool()],
  schema: { types: schemaTypes },
});
