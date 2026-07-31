require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7r7n8x37';

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2026-07-22',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

async function run() {
  try {
    const res = await client.fetch(`*[_type in ["home","upcomingShow"]]{_id,_type,title,date,location,heroSection,upcomingShows}`);
    console.log(JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Sanity query failed:', err.message || err);
    process.exit(1);
  }
}

run();
