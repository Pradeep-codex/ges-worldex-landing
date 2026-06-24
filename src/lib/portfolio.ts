export type EditionStats = Partial<Record<string, number>>;

export type ExhibitionEdition = {
  name: string;
  date: string;
  city: string;
  stats: EditionStats;
  image?: string;
  galleryImages?: string[];
};

export type PortfolioExhibition = {
  id: string;
  title: string;
  label: string;
  image: string;
  detailImage: string;
  galleryImages: string[];
  theme: {
    accent: string;
    accentSoft: string;
    ink: string;
  };
  overview: string;
  focus: string[];
  editions: ExhibitionEdition[];
};

const portfolioPath = (folder: string, filename: string) =>
  `/portfolio/${folder}/${encodeURIComponent(filename)}`;

const portfolioImages = (folder: string, filenames: string[]) =>
  filenames.map((filename) => portfolioPath(folder, filename));

const sjs1Images = portfolioImages("sjs/sjs1", [
  "WhatsApp Image 2026-06-24 at 13.36.19.jpeg",
  "WhatsApp Image 2026-06-24 at 13.36.27.jpeg",
  "WhatsApp Image 2026-06-24 at 13.36.32.jpeg",
  "WhatsApp Image 2026-06-24 at 13.36.39.jpeg",
  "WhatsApp Image 2026-06-24 at 13.36.45.jpeg",
  "WhatsApp Image 2026-06-24 at 13.36.50.jpeg",
]);
const sjs2Images = portfolioImages("sjs/sjs2", [
  "WhatsApp Image 2026-06-24 at 13.37.04.jpeg",
  "WhatsApp Image 2026-06-24 at 13.37.09.jpeg",
  "WhatsApp Image 2026-06-24 at 13.37.12.jpeg",
  "WhatsApp Image 2026-06-24 at 13.37.18.jpeg",
  "WhatsApp Image 2026-06-24 at 13.37.23.jpeg",
  "WhatsApp Image 2026-06-24 at 13.37.30.jpeg",
]);
const sjs3Images = portfolioImages("sjs/sjs3", [
  "WhatsApp Image 2026-06-24 at 13.37.44.jpeg",
  "WhatsApp Image 2026-06-24 at 13.37.50.jpeg",
  "WhatsApp Image 2026-06-24 at 13.37.57.jpeg",
  "WhatsApp Image 2026-06-24 at 13.38.05.jpeg",
  "WhatsApp Image 2026-06-24 at 13.38.11.jpeg",
]);
const sjs4Images = portfolioImages("sjs/sjs4", [
  "WhatsApp Image 2026-06-24 at 13.38.38.jpeg",
  "WhatsApp Image 2026-06-24 at 13.38.42.jpeg",
  "WhatsApp Image 2026-06-24 at 13.38.48.jpeg",
  "WhatsApp Image 2026-06-24 at 13.38.54.jpeg",
  "WhatsApp Image 2026-06-24 at 13.39.00.jpeg",
  "WhatsApp Image 2026-06-24 at 13.39.35.jpeg",
  "WhatsApp Image 2026-06-24 at 13.39.41.jpeg",
  "WhatsApp Image 2026-06-24 at 13.39.46.jpeg",
]);
const sjs5Images = portfolioImages("sjs/sjs5", [
  "WhatsApp Image 2026-06-24 at 13.40.14.jpeg",
  "WhatsApp Image 2026-06-24 at 13.40.18.jpeg",
  "WhatsApp Image 2026-06-24 at 13.40.23.jpeg",
  "WhatsApp Image 2026-06-24 at 13.40.29.jpeg",
  "WhatsApp Image 2026-06-24 at 13.40.38.jpeg",
  "WhatsApp Image 2026-06-24 at 13.40.43.jpeg",
  "WhatsApp Image 2026-06-24 at 13.40.50.jpeg",
  "WhatsApp Image 2026-06-24 at 13.40.56.jpeg",
  "WhatsApp Image 2026-06-24 at 13.41.02.jpeg",
  "WhatsApp Image 2026-06-24 at 13.41.13.jpeg",
  "WhatsApp Image 2026-06-24 at 13.41.17.jpeg",
  "WhatsApp Image 2026-06-24 at 13.41.24.jpeg",
]);
const sjs6Images = portfolioImages("sjs/sjs6", [
  "WhatsApp Image 2026-06-24 at 13.41.51.jpeg",
  "WhatsApp Image 2026-06-24 at 13.41.56.jpeg",
  "WhatsApp Image 2026-06-24 at 13.42.04.jpeg",
  "WhatsApp Image 2026-06-24 at 13.42.12.jpeg",
  "WhatsApp Image 2026-06-24 at 13.42.17.jpeg",
  "WhatsApp Image 2026-06-24 at 13.42.23.jpeg",
  "WhatsApp Image 2026-06-24 at 13.42.28.jpeg",
  "WhatsApp Image 2026-06-24 at 13.42.33.jpeg",
  "WhatsApp Image 2026-06-24 at 13.42.43.jpeg",
  "WhatsApp Image 2026-06-24 at 13.42.49.jpeg",
  "WhatsApp Image 2026-06-24 at 13.42.53.jpeg",
  "WhatsApp Image 2026-06-24 at 13.43.00.jpeg",
]);
const sjs7Images = portfolioImages("sjs/sjs7", [
  "WhatsApp Image 2026-06-24 at 13.43.25.jpeg",
  "WhatsApp Image 2026-06-24 at 13.43.30.jpeg",
  "WhatsApp Image 2026-06-24 at 13.43.35.jpeg",
  "WhatsApp Image 2026-06-24 at 13.48.35.jpeg",
  "WhatsApp Image 2026-06-24 at 13.48.40.jpeg",
  "WhatsApp Image 2026-06-24 at 13.48.44.jpeg",
  "WhatsApp Image 2026-06-24 at 13.48.49.jpeg",
  "WhatsApp Image 2026-06-24 at 13.48.55.jpeg",
  "WhatsApp Image 2026-06-24 at 13.49.02.jpeg",
]);

const jsiImages = portfolioImages("jsi", [
  "WhatsApp Image 2026-06-24 at 13.51.49.jpeg",
  "WhatsApp Image 2026-06-24 at 13.51.57.jpeg",
  "WhatsApp Image 2026-06-24 at 13.52.03.jpeg",
  "WhatsApp Image 2026-06-24 at 13.52.07.jpeg",
  "WhatsApp Image 2026-06-24 at 13.52.12.jpeg",
  "WhatsApp Image 2026-06-24 at 13.52.17.jpeg",
  "WhatsApp Image 2026-06-24 at 13.52.22.jpeg",
  "WhatsApp Image 2026-06-24 at 13.52.28.jpeg",
  "WhatsApp Image 2026-06-24 at 13.52.45.jpeg",
  "WhatsApp Image 2026-06-24 at 13.52.49.jpeg",
  "WhatsApp Image 2026-06-24 at 13.53.10.jpeg",
]);

const ssiB1Images = portfolioImages("ssi/b1", [
  "WhatsApp Image 2026-06-24 at 12.56.00.jpeg",
  "WhatsApp Image 2026-06-24 at 12.56.09.jpeg",
  "WhatsApp Image 2026-06-24 at 12.56.18.jpeg",
  "WhatsApp Image 2026-06-24 at 12.56.26.jpeg",
  "WhatsApp Image 2026-06-24 at 12.56.49.jpeg",
  "WhatsApp Image 2026-06-24 at 12.56.59.jpeg",
  "WhatsApp Image 2026-06-24 at 12.57.17.jpeg",
  "WhatsApp Image 2026-06-24 at 12.57.32.jpeg",
  "WhatsApp Image 2026-06-24 at 12.57.41.jpeg",
  "WhatsApp Image 2026-06-24 at 12.57.51.jpeg",
]);
const ssiB2Images = portfolioImages("ssi/b2", [
  "WhatsApp Image 2026-06-24 at 13.06.37.jpeg",
  "WhatsApp Image 2026-06-24 at 13.06.47.jpeg",
  "WhatsApp Image 2026-06-24 at 13.06.55.jpeg",
  "WhatsApp Image 2026-06-24 at 13.07.03.jpeg",
  "WhatsApp Image 2026-06-24 at 13.07.12.jpeg",
  "WhatsApp Image 2026-06-24 at 13.07.19.jpeg",
  "WhatsApp Image 2026-06-24 at 13.07.27.jpeg",
]);
const ssiB3Images = portfolioImages("ssi/b3", [
  "WhatsApp Image 2026-06-24 at 13.08.14.jpeg",
  "WhatsApp Image 2026-06-24 at 13.08.27.jpeg",
  "WhatsApp Image 2026-06-24 at 13.08.35.jpeg",
  "WhatsApp Image 2026-06-24 at 13.08.40.jpeg",
  "WhatsApp Image 2026-06-24 at 13.08.49.jpeg",
  "WhatsApp Image 2026-06-24 at 13.08.56.jpeg",
  "WhatsApp Image 2026-06-24 at 13.09.04.jpeg",
  "WhatsApp Image 2026-06-24 at 13.09.10.jpeg",
  "WhatsApp Image 2026-06-24 at 13.09.15.jpeg",
  "WhatsApp Image 2026-06-24 at 13.09.22.jpeg",
  "WhatsApp Image 2026-06-24 at 13.09.29.jpeg",
  "WhatsApp Image 2026-06-24 at 13.09.43.jpeg",
]);
const ssiB4Images = portfolioImages("ssi/b4", [
  "WhatsApp Image 2026-06-24 at 13.10.33.jpeg",
  "WhatsApp Image 2026-06-24 at 13.10.42.jpeg",
  "WhatsApp Image 2026-06-24 at 13.10.49.jpeg",
  "WhatsApp Image 2026-06-24 at 13.10.55.jpeg",
  "WhatsApp Image 2026-06-24 at 13.11.03.jpeg",
  "WhatsApp Image 2026-06-24 at 13.11.26.jpeg",
  "WhatsApp Image 2026-06-24 at 13.11.31.jpeg",
  "WhatsApp Image 2026-06-24 at 13.11.38.jpeg",
  "WhatsApp Image 2026-06-24 at 13.11.46.jpeg",
]);
const ssiB5Images = portfolioImages("ssi/b5", [
  "WhatsApp Image 2026-06-24 at 13.12.03.jpeg",
  "WhatsApp Image 2026-06-24 at 13.12.08.jpeg",
  "WhatsApp Image 2026-06-24 at 13.12.13.jpeg",
  "WhatsApp Image 2026-06-24 at 13.12.20.jpeg",
  "WhatsApp Image 2026-06-24 at 13.12.25.jpeg",
  "WhatsApp Image 2026-06-24 at 13.12.33.jpeg",
  "WhatsApp Image 2026-06-24 at 13.12.38.jpeg",
  "WhatsApp Image 2026-06-24 at 13.12.44.jpeg",
  "WhatsApp Image 2026-06-24 at 13.12.49.jpeg",
  "WhatsApp Image 2026-06-24 at 13.12.58.jpeg",
  "WhatsApp Image 2026-06-24 at 13.13.04.jpeg",
  "WhatsApp Image 2026-06-24 at 13.13.10.jpeg",
  "WhatsApp Image 2026-06-24 at 13.13.16.jpeg",
  "WhatsApp Image 2026-06-24 at 13.13.22.jpeg",
  "WhatsApp Image 2026-06-24 at 13.13.29.jpeg",
  "WhatsApp Image 2026-06-24 at 13.13.35.jpeg",
]);
const ssiM1Images = portfolioImages("ssi/m1", [
  "WhatsApp Image 2026-06-24 at 13.13.45.jpeg",
  "WhatsApp Image 2026-06-24 at 13.13.52.jpeg",
  "WhatsApp Image 2026-06-24 at 13.14.01.jpeg",
  "WhatsApp Image 2026-06-24 at 13.14.09.jpeg",
  "WhatsApp Image 2026-06-24 at 13.14.15.jpeg",
  "WhatsApp Image 2026-06-24 at 13.14.20.jpeg",
  "WhatsApp Image 2026-06-24 at 13.14.25.jpeg",
  "WhatsApp Image 2026-06-24 at 13.14.31.jpeg",
  "WhatsApp Image 2026-06-24 at 13.14.37.jpeg",
  "WhatsApp Image 2026-06-24 at 13.14.43.jpeg",
  "WhatsApp Image 2026-06-24 at 13.14.52.jpeg",
  "WhatsApp Image 2026-06-24 at 13.14.58.jpeg",
  "WhatsApp Image 2026-06-24 at 13.15.04.jpeg",
  "WhatsApp Image 2026-06-24 at 13.15.09.jpeg",
  "WhatsApp Image 2026-06-24 at 13.15.17.jpeg",
  "WhatsApp Image 2026-06-24 at 13.15.23.jpeg",
  "WhatsApp Image 2026-06-24 at 13.15.32.jpeg",
]);
const ssiM2Images = portfolioImages("ssi/m2", [
  "WhatsApp Image 2026-06-24 at 13.15.56.jpeg",
  "WhatsApp Image 2026-06-24 at 13.16.02.jpeg",
  "WhatsApp Image 2026-06-24 at 13.16.08.jpeg",
  "WhatsApp Image 2026-06-24 at 13.16.17.jpeg",
  "WhatsApp Image 2026-06-24 at 13.16.22.jpeg",
  "WhatsApp Image 2026-06-24 at 13.16.28.jpeg",
  "WhatsApp Image 2026-06-24 at 13.16.33.jpeg",
  "WhatsApp Image 2026-06-24 at 13.16.47.jpeg",
  "WhatsApp Image 2026-06-24 at 13.16.52.jpeg",
  "WhatsApp Image 2026-06-24 at 13.16.59.jpeg",
  "WhatsApp Image 2026-06-24 at 13.17.05.jpeg",
  "WhatsApp Image 2026-06-24 at 13.17.12.jpeg",
  "WhatsApp Image 2026-06-24 at 13.17.18.jpeg",
  "WhatsApp Image 2026-06-24 at 13.17.26.jpeg",
  "WhatsApp Image 2026-06-24 at 13.17.31.jpeg",
]);
const ssiM3Images = portfolioImages("ssi/m3", [
  "WhatsApp Image 2026-06-24 at 13.17.50.jpeg",
  "WhatsApp Image 2026-06-24 at 13.17.56.jpeg",
  "WhatsApp Image 2026-06-24 at 13.18.00.jpeg",
  "WhatsApp Image 2026-06-24 at 13.18.05.jpeg",
  "WhatsApp Image 2026-06-24 at 13.18.11.jpeg",
  "WhatsApp Image 2026-06-24 at 13.18.16.jpeg",
  "WhatsApp Image 2026-06-24 at 13.18.21.jpeg",
  "WhatsApp Image 2026-06-24 at 13.18.26.jpeg",
  "WhatsApp Image 2026-06-24 at 13.18.31.jpeg",
  "WhatsApp Image 2026-06-24 at 13.18.40.jpeg",
  "WhatsApp Image 2026-06-24 at 13.18.44.jpeg",
  "WhatsApp Image 2026-06-24 at 13.18.49.jpeg",
  "WhatsApp Image 2026-06-24 at 13.18.56.jpeg",
]);
const ssiD1Images = portfolioImages("ssi/d1", [
  "WhatsApp Image 2026-06-24 at 13.21.56.jpeg",
  "WhatsApp Image 2026-06-24 at 13.22.01.jpeg",
  "WhatsApp Image 2026-06-24 at 13.22.06.jpeg",
  "WhatsApp Image 2026-06-24 at 13.22.13.jpeg",
  "WhatsApp Image 2026-06-24 at 13.22.18.jpeg",
  "WhatsApp Image 2026-06-24 at 13.22.39.jpeg",
  "WhatsApp Image 2026-06-24 at 13.23.32.jpeg",
  "WhatsApp Image 2026-06-24 at 13.23.52.jpeg",
  "WhatsApp Image 2026-06-24 at 13.23.58.jpeg",
  "WhatsApp Image 2026-06-24 at 13.24.02.jpeg",
  "WhatsApp Image 2026-06-24 at 13.24.09.jpeg",
  "WhatsApp Image 2026-06-24 at 13.24.18.jpeg",
  "WhatsApp Image 2026-06-24 at 13.24.24.jpeg",
  "WhatsApp Image 2026-06-24 at 13.24.29.jpeg",
  "WhatsApp Image 2026-06-24 at 13.24.34.jpeg",
  "WhatsApp Image 2026-06-24 at 13.24.42.jpeg",
]);
const ssiD2Images = portfolioImages("ssi/d2", [
  "WhatsApp Image 2026-06-24 at 13.26.50.jpeg",
  "WhatsApp Image 2026-06-24 at 13.26.56.jpeg",
  "WhatsApp Image 2026-06-24 at 13.27.03.jpeg",
  "WhatsApp Image 2026-06-24 at 13.27.08.jpeg",
  "WhatsApp Image 2026-06-24 at 13.27.23.jpeg",
  "WhatsApp Image 2026-06-24 at 13.27.27.jpeg",
  "WhatsApp Image 2026-06-24 at 13.27.38.jpeg",
  "WhatsApp Image 2026-06-24 at 13.27.43.jpeg",
  "WhatsApp Image 2026-06-24 at 13.28.30.jpeg",
  "WhatsApp Image 2026-06-24 at 13.29.18.jpeg",
  "WhatsApp Image 2026-06-24 at 13.29.24.jpeg",
  "WhatsApp Image 2026-06-24 at 13.29.30.jpeg",
  "WhatsApp Image 2026-06-24 at 13.29.37.jpeg",
  "WhatsApp Image 2026-06-24 at 13.29.43.jpeg",
]);

export const portfolioExhibitions = [
  {
    id: "silver-show-of-india",
    title: "Silver Show of India",
    label: "B2B silver jewellery and articles exhibition",
    image: ssiB1Images[0],
    detailImage: ssiM1Images[0],
    galleryImages: [ssiB1Images[0], ssiM1Images[0], ssiD1Images[0]],
    theme: { accent: "#d6a514", accentSoft: "#fff7d6", ink: "#17120a" },
    overview:
      "A focused B2B exhibition for silver jewellery, silver articles, gifting collections, manufacturers, wholesalers, and retailers looking for a dedicated precious-metal trade platform.",
    focus: ["Silver jewellery", "Silver articles", "Wholesale buying", "Retail sourcing"],
    editions: [
      { name: "Bengaluru 1st Edition", date: "17th to 19th June 2022", city: "Bengaluru", stats: { exhibitors: 92, stalls: 280, visitors: 9422, hostedBuyers: 160 }, image: ssiB1Images[0], galleryImages: ssiB1Images },
      { name: "Bengaluru 2nd Edition", date: "16th to 18th December 2022", city: "Bengaluru", stats: { exhibitors: 126, stalls: 344, visitors: 10600, hostedBuyers: 210 }, image: ssiB2Images[0], galleryImages: ssiB2Images },
      { name: "Bengaluru 3rd Edition", date: "15th to 17th December 2023", city: "Bengaluru", stats: { exhibitors: 202, stalls: 556, visitors: 12323, hostedBuyers: 549 }, image: ssiB3Images[0], galleryImages: ssiB3Images },
      { name: "Bengaluru 4th Edition", date: "12th to 15th December 2024", city: "Bengaluru", stats: { exhibitors: 252, stalls: 743, visitors: 13492, hostedBuyers: 831 }, image: ssiB4Images[0], galleryImages: ssiB4Images },
      { name: "Bengaluru 5th Edition", date: "26th to 29th December 2025", city: "Bengaluru", stats: { exhibitors: 314, stalls: 858, visitors: 15628, hostedBuyers: 1267 }, image: ssiB5Images[0], galleryImages: ssiB5Images },
      { name: "Mumbai 1st Edition", date: "8th to 11th June 2023", city: "Mumbai", stats: { exhibitors: 233, stalls: 476, visitors: 17400, hostedBuyers: 740 }, image: ssiM1Images[0], galleryImages: ssiM1Images },
      { name: "Mumbai 2nd Edition", date: "7th to 10th June 2024", city: "Mumbai", stats: { exhibitors: 328, stalls: 740, visitors: 22177, hostedBuyers: 1123 }, image: ssiM2Images[0], galleryImages: ssiM2Images },
      { name: "Mumbai 3rd Edition", date: "6th to 9th June 2025", city: "Mumbai", stats: { exhibitors: 392, stalls: 854, visitors: 26531, hostedBuyers: 1345 }, image: ssiM3Images[0], galleryImages: ssiM3Images },
      { name: "Delhi 1st Edition", date: "12th to 15th September 2024", city: "Delhi", stats: { exhibitors: 158, stalls: 356, visitors: 10204, hostedBuyers: 593 }, image: ssiD1Images[0], galleryImages: ssiD1Images },
      { name: "Delhi 2nd Edition", date: "6th to 9th September 2025", city: "Delhi", stats: { exhibitors: 193, stalls: 529, visitors: 12343, hostedBuyers: 719 }, image: ssiD2Images[0], galleryImages: ssiD2Images },
    ],
  },
  {
    id: "south-jewellery-show",
    title: "South Jewellery Show",
    label: "B2B jewellery exhibition",
    image: sjs1Images[0],
    detailImage: sjs7Images[0],
    galleryImages: [sjs1Images[0], sjs4Images[0], sjs7Images[0]],
    theme: { accent: "#e2ab12", accentSoft: "#fff6d7", ink: "#14100a" },
    overview:
      "A southern-market jewellery trade show connecting manufacturers, distributors, retailers, designers, and serious buyers through a business-first exhibition format.",
    focus: ["Jewellery manufacturers", "Trade buyers", "Distributor networks", "Regional retail"],
    editions: [
      { name: "1st Edition", date: "8th to 10th January 2021", city: "South India", stats: { exhibitors: 102, stalls: 252, visitors: 6082, hostedBuyers: 164 }, image: sjs1Images[0], galleryImages: sjs1Images },
      { name: "2nd Edition", date: "27th to 29th August 2021", city: "South India", stats: { exhibitors: 205, stalls: 410, visitors: 7534, hostedBuyers: 220 }, image: sjs2Images[0], galleryImages: sjs2Images },
      { name: "3rd Edition", date: "4th to 6th March 2022", city: "South India", stats: { exhibitors: 151, stalls: 321, visitors: 6139, hostedBuyers: 185 }, image: sjs3Images[0], galleryImages: sjs3Images },
      { name: "4th Edition", date: "16th to 18th September 2022", city: "South India", stats: { exhibitors: 180, stalls: 348, visitors: 6458, hostedBuyers: 208 }, image: sjs4Images[0], galleryImages: sjs4Images },
      { name: "South Jewellery Show 5th Edition", date: "1st to 3rd September 2023", city: "South India", stats: { exhibitors: 196, stalls: 386, visitors: 7631, hostedBuyers: 263 }, image: sjs5Images[0], galleryImages: sjs5Images },
      { name: "6th Edition", date: "30th September to 2nd October 2024", city: "South India", stats: { exhibitors: 128, stalls: 241, visitors: 5867, hostedBuyers: 286 }, image: sjs6Images[0], galleryImages: sjs6Images },
      { name: "7th Edition", date: "28th to 30th June 2025", city: "South India", stats: { exhibitors: 163, stalls: 316, visitors: 6880, hostedBuyers: 342 }, image: sjs7Images[0], galleryImages: sjs7Images },
    ],
  },
  {
    id: "jewellery-show-of-india",
    title: "Jewellery Show of India",
    label: "Retail jewellery exhibition",
    image: jsiImages[0],
    detailImage: jsiImages[1],
    galleryImages: jsiImages.slice(0, 3),
    theme: { accent: "#d99716", accentSoft: "#fff1cf", ink: "#160f08" },
    overview:
      "A retail-led jewellery exhibition built for premium customer engagement, brand discovery, designer collections, and curated jewellery buying experiences.",
    focus: ["Retail jewellery", "Designer collections", "Customer engagement", "Brand showcases"],
    editions: [
      { name: "1st Edition", date: "15th to 17th April 2022", city: "Retail Exhibition", stats: { reputedJewellers: 50, jewelleryDesigns: 50000, visitors: 1500 }, image: jsiImages[0], galleryImages: jsiImages },
    ],
  },
  {
    id: "build-con",
    title: "Build-Con",
    label: "Construction, architecture, and interiors exhibition",
    image: "/exhibition/expo4.jpg",
    detailImage: "/exhibition/construction.png",
    galleryImages: ["/exhibition/expo4.jpg", "/exhibition/construction.png", "/exhibition/interior-furniture.png"],
    theme: { accent: "#b42326", accentSoft: "#ffe8e8", ink: "#160c0d" },
    overview:
      "An exhibition platform for construction, architecture, and interior industry stakeholders, bringing together building materials, design solutions, consultants, and project-focused buyers.",
    focus: ["Construction", "Architecture", "Interior solutions", "Building materials"],
    editions: [],
  },
  {
    id: "auto-expo",
    title: "Auto Expo",
    label: "Automobile products and accessories exhibition",
    image: "/exhibition/expo5.jpg",
    detailImage: "/exhibition/auto.png",
    galleryImages: ["/exhibition/expo5.jpg", "/exhibition/auto.png", "/exhibition/construction.png"],
    theme: { accent: "#1d8ad8", accentSoft: "#e5f4ff", ink: "#07111c" },
    overview:
      "A trade and consumer-facing exhibition for automobile products, accessories, components, service providers, and mobility businesses looking to reach active buyers.",
    focus: ["Auto accessories", "Automobile products", "Components", "Service solutions"],
    editions: [],
  },
  {
    id: "interior-furniture-exhibition",
    title: "The Interior & Furniture Exhibition",
    label: "Interior and furniture showcase",
    image: "/exhibition/expo6.jpg",
    detailImage: "/exhibition/interior-furniture.png",
    galleryImages: ["/exhibition/expo6.jpg", "/exhibition/interior-furniture.png", "/exhibition/lifestyle.png"],
    theme: { accent: "#b52632", accentSoft: "#ffe7ea", ink: "#170b0d" },
    overview:
      "A dedicated exhibition for furniture brands, interior products, decor solutions, design studios, and suppliers serving residential, commercial, and lifestyle spaces.",
    focus: ["Furniture", "Interior products", "Decor solutions", "Design studios"],
    editions: [],
  },
] satisfies PortfolioExhibition[];

const metricLabels: Record<string, string> = {
  exhibitors: "Exhibitor",
  stalls: "Stall",
  visitors: "Visitors",
  hostedBuyers: "Hosted Buyers",
  reputedJewellers: "Reputed Jewellers",
  jewelleryDesigns: "Jewellery Designs",
};

export function getPortfolioExhibition(id: string) {
  return portfolioExhibitions.find((exhibition) => exhibition.id === id);
}

export function getEditionMetrics(edition: { stats?: EditionStats }) {
  return Object.entries(edition.stats ?? {})
    .filter((entry): entry is [string, number] => typeof entry[1] === "number")
    .map(([key, value]) => ({
      label: metricLabels[key] ?? key,
      value,
    }));
}
