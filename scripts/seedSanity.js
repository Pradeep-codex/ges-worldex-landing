require('dotenv').config({ path: '.env.local' });
const sanityClient = require('@sanity/client');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7r7n8x37';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN;

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_TOKEN in env');
  process.exit(1);
}

const sanityPkg = sanityClient;
const createClient = sanityPkg.default || sanityPkg;
const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.SANITY_API_VERSION || '2026-07-22',
  token,
  useCdn: false,
});

async function seed() {
  try {
    // Create two upcoming shows
    const show1 = await client.createOrReplace({
      _id: 'upcomingShow-1',
      _type: 'upcomingShow',
      title: 'GES Expo - Mumbai 2026',
      date: new Date().toISOString(),
      description: 'Join us for the Mumbai edition with latest exhibitors and innovations.',
      location: 'Mumbai Exhibition Center',
    });

    const show2 = await client.createOrReplace({
      _id: 'upcomingShow-2',
      _type: 'upcomingShow',
      title: 'GES Expo - Delhi 2026',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      description: 'Delhi edition featuring new product launches and conferences.',
      location: 'Delhi Convention Hall',
    });

    // Create home document referencing the upcoming shows
    const homeDoc = {
      _id: 'home',
      _type: 'home',
      heroSection: {
        slides: [
          {
            title: 'GES Worldex - Mumbai',
            subtitle: 'Experience innovation',
            description: 'Discover exhibitors from across the globe.',
            date: '25 - 28 September 2026',
            location: 'New Delhi',
            venue: 'Yashobhoomi - India International Convention & Expo Centre (IICC), Hall No. 1, Sector 25, Dwarka, New Delhi',
          },
          {
            title: 'GES Worldex - Delhi',
            subtitle: 'Connecting businesses',
            description: 'Network with industry leaders.',
            date: '4 - 7 June 2027',
            location: 'Mumbai',
            venue: 'Bandra Kurla Complex (BKC), Mumbai',
          },
        ],
      },
      upcomingShows: [
        { _type: 'reference', _ref: show1._id },
        { _type: 'reference', _ref: show2._id },
      ],
    };

    await client.createOrReplace(homeDoc);

    console.log('Sanity seeding complete — created sample upcoming shows and home document.');
  } catch (err) {
    console.error('Sanity seed failed', err.message || err);
    process.exit(1);
  }
}

seed();
