import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN;

if (!projectId) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required");
}

if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is required. Run with `sanity exec --with-user-token`.");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-05-18",
  token,
  useCdn: false,
});

const draft = await client.getDocument("drafts.homePage");

if (!draft) {
  throw new Error("No drafts.homePage document found");
}

const { _createdAt, _rev, _system, _updatedAt, ...document } = draft;

await client
  .transaction()
  .createOrReplace({
    ...document,
    _id: "homePage",
  })
  .delete("drafts.homePage")
  .commit();

console.log("Published drafts.homePage to homePage");
