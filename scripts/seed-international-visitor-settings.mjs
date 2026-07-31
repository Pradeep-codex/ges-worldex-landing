const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "7r7n8x37";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_TOKEN;
const apiVersion = process.env.SANITY_API_VERSION || "2026-07-22";

if (!token) {
  throw new Error("SANITY_TOKEN missing");
}

const docs = [
  {
    _id: "internationalVisitorPageSetting-floor-plan",
    _type: "internationalVisitorPageSetting",
    pageKey: "visitors/international-floor-plan",
  },
  {
    _id: "internationalVisitorPageSetting-exhibitor-list",
    _type: "internationalVisitorPageSetting",
    pageKey: "visitors/international-exhibitor-list",
  },
  {
    _id: "internationalVisitorPageSetting-hotel-info",
    _type: "internationalVisitorPageSetting",
    pageKey: "visitors/international-hotel-info",
  },
  {
    _id: "internationalVisitorPageSetting-how-to-reach",
    _type: "internationalVisitorPageSetting",
    pageKey: "visitors/international-how-to-reach",
  },
];

const mutations = docs.map((createOrReplace) => ({ createOrReplace }));
const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`;

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ mutations }),
});

const body = await response.text();

if (!response.ok) {
  throw new Error(body || "Failed to seed international visitor setting documents.");
}

console.log(body);
