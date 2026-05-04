export type EditionStats = Partial<Record<string, number>>;

export type ExhibitionEdition = {
  name: string;
  date: string;
  city: string;
  stats: EditionStats;
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

export const portfolioExhibitions = [
  {
    id: "silver-show-of-india",
    title: "Silver Show of India",
    label: "B2B silver jewellery and articles exhibition",
    image: "/exhibition/expo1.jpg",
    detailImage: "/exhibition/silver.png",
    galleryImages: ["/exhibition/expo1.jpg", "/exhibition/silver.png", "/exhibition/jewellery.png"],
    theme: { accent: "#d6a514", accentSoft: "#fff7d6", ink: "#17120a" },
    overview:
      "A focused B2B exhibition for silver jewellery, silver articles, gifting collections, manufacturers, wholesalers, and retailers looking for a dedicated precious-metal trade platform.",
    focus: ["Silver jewellery", "Silver articles", "Wholesale buying", "Retail sourcing"],
    editions: [
      { name: "Bengaluru 1st Edition", date: "17th to 19th June 2022", city: "Bengaluru", stats: { exhibitors: 92, stalls: 280, visitors: 9422, hostedBuyers: 160 } },
      { name: "Bengaluru 2nd Edition", date: "16th to 18th December 2022", city: "Bengaluru", stats: { exhibitors: 126, stalls: 344, visitors: 10600, hostedBuyers: 210 } },
      { name: "Bengaluru 3rd Edition", date: "15th to 17th December 2023", city: "Bengaluru", stats: { exhibitors: 202, stalls: 556, visitors: 12323, hostedBuyers: 549 } },
      { name: "Bengaluru 4th Edition", date: "12th to 15th December 2024", city: "Bengaluru", stats: { exhibitors: 252, stalls: 743, visitors: 13492, hostedBuyers: 831 } },
      { name: "Bengaluru 5th Edition", date: "26th to 29th December 2025", city: "Bengaluru", stats: { exhibitors: 314, stalls: 858, visitors: 15628, hostedBuyers: 1267 } },
      { name: "Mumbai 1st Edition", date: "8th to 11th June 2023", city: "Mumbai", stats: { exhibitors: 233, stalls: 476, visitors: 17400, hostedBuyers: 740 } },
      { name: "Mumbai 2nd Edition", date: "7th to 10th June 2024", city: "Mumbai", stats: { exhibitors: 328, stalls: 740, visitors: 22177, hostedBuyers: 1123 } },
      { name: "Mumbai 3rd Edition", date: "6th to 9th June 2025", city: "Mumbai", stats: { exhibitors: 392, stalls: 854, visitors: 26531, hostedBuyers: 1345 } },
      { name: "Delhi 1st Edition", date: "12th to 15th September 2024", city: "Delhi", stats: { exhibitors: 158, stalls: 356, visitors: 10204, hostedBuyers: 593 } },
      { name: "Delhi 2nd Edition", date: "6th to 9th September 2025", city: "Delhi", stats: { exhibitors: 193, stalls: 529, visitors: 12343, hostedBuyers: 719 } },
    ],
  },
  {
    id: "south-jewellery-show",
    title: "South Jewellery Show",
    label: "B2B jewellery exhibition",
    image: "/exhibition/expo2.jpg",
    detailImage: "/exhibition/jewellery.png",
    galleryImages: ["/exhibition/expo2.jpg", "/exhibition/jewellery.png", "/exhibition/silver.png"],
    theme: { accent: "#e2ab12", accentSoft: "#fff6d7", ink: "#14100a" },
    overview:
      "A southern-market jewellery trade show connecting manufacturers, distributors, retailers, designers, and serious buyers through a business-first exhibition format.",
    focus: ["Jewellery manufacturers", "Trade buyers", "Distributor networks", "Regional retail"],
    editions: [
      { name: "1st Edition", date: "8th to 10th January 2021", city: "South India", stats: { exhibitors: 102, stalls: 252, visitors: 6082, hostedBuyers: 164 } },
      { name: "2nd Edition", date: "27th to 29th August 2021", city: "South India", stats: { exhibitors: 205, stalls: 410, visitors: 7534, hostedBuyers: 220 } },
      { name: "3rd Edition", date: "4th to 6th March 2022", city: "South India", stats: { exhibitors: 151, stalls: 321, visitors: 6139, hostedBuyers: 185 } },
      { name: "4th Edition", date: "16th to 18th September 2022", city: "South India", stats: { exhibitors: 180, stalls: 348, visitors: 6458, hostedBuyers: 208 } },
      { name: "South Jewellery Show 5th Edition", date: "1st to 3rd September 2023", city: "South India", stats: { exhibitors: 196, stalls: 386, visitors: 7631, hostedBuyers: 263 } },
      { name: "6th Edition", date: "30th September to 2nd October 2024", city: "South India", stats: { exhibitors: 128, stalls: 241, visitors: 5867, hostedBuyers: 286 } },
      { name: "7th Edition", date: "28th to 30th June 2025", city: "South India", stats: { exhibitors: 163, stalls: 316, visitors: 6880, hostedBuyers: 342 } },
    ],
  },
  {
    id: "jewellery-show-of-india",
    title: "Jewellery Show of India",
    label: "Retail jewellery exhibition",
    image: "/exhibition/expo3.jpg",
    detailImage: "/exhibition/jewellery.png",
    galleryImages: ["/exhibition/expo3.jpg", "/exhibition/jewellery.png", "/exhibition/silver.png"],
    theme: { accent: "#d99716", accentSoft: "#fff1cf", ink: "#160f08" },
    overview:
      "A retail-led jewellery exhibition built for premium customer engagement, brand discovery, designer collections, and curated jewellery buying experiences.",
    focus: ["Retail jewellery", "Designer collections", "Customer engagement", "Brand showcases"],
    editions: [
      { name: "1st Edition", date: "15th to 17th April 2022", city: "Retail Exhibition", stats: { reputedJewellers: 50, jewelleryDesigns: 50000, visitors: 1500 } },
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
