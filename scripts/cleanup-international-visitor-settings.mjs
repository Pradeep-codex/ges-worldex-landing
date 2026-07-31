const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "7r7n8x37";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_TOKEN;
const apiVersion = process.env.SANITY_API_VERSION || "2026-07-22";

if (!token) {
  throw new Error("SANITY_TOKEN missing");
}

const query = '*[_type == "internationalVisitorPageSetting"]{_id,pageKey}';
const queryUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

const queryResponse = await fetch(queryUrl, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const queryBody = await queryResponse.json();

if (!queryResponse.ok) {
  throw new Error(JSON.stringify(queryBody));
}

const docs = Array.isArray(queryBody.result) ? queryBody.result : [];
console.log("International visitor docs:", JSON.stringify(docs, null, 2));

const legacyDocs = docs.filter((doc) => doc.pageKey === "visitors/international-registration");

if (!legacyDocs.length) {
  console.log("No legacy international registration documents found.");
  process.exit(0);
}

const mutations = legacyDocs.map((doc) => ({ delete: { id: doc._id } }));
const mutateUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`;

const mutateResponse = await fetch(mutateUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ mutations }),
});

const mutateBody = await mutateResponse.text();

if (!mutateResponse.ok) {
  throw new Error(mutateBody || "Failed to delete legacy international visitor setting documents.");
}

console.log(mutateBody);
