export type ExhibitionSlide = {
  id: string;
  eyebrow: string;
  headline: string;
  highlight: string;
  description: string;
  title: string;
  subtitle: string;
  edition: string;
  date: string;
  location: string;
  venue: string;
  image: string;
  mapHref: string;
  cityLabel: string;
};

export const exhibitionSlides: ExhibitionSlide[] = [
  {
    id: "ssi-delhi-2026",
    eyebrow: "Silver Trade Showcase",
    headline: "India's Premier B2B Silver",
    highlight: "Trade Exhibition",
    description:
      "India's premier B2B silver trade exhibition, bringing together manufacturers, wholesalers, retailers, exporters, and buyers to explore the latest silver jewellery collections, innovative designs, market trends, and business opportunities.",
    title: "Delhi's 3rd Edition - 2026",
    subtitle:
      "India's premier B2B silver trade exhibition, bringing together manufacturers, wholesalers, retailers, exporters, and buyers to explore the latest silver jewellery collections, innovative designs, market trends, and business opportunities.",
    edition: "3rd Edition",
    date: "25 - 28 September 2026",
    location: "New Delhi",
    venue:
      "Yashobhoomi - India International Convention & Expo Centre (IICC), Hall No. 1, Sector 25, Dwarka, New Delhi",
    image: "/banners/ssi-delhi-2026.jpg",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Yashobhoomi%20India%20International%20Convention%20%26%20Expo%20Centre%20Dwarka%20New%20Delhi",
    cityLabel: "Silver Show of India",
  },
  {
    id: "ssi-bengaluru-2026",
    eyebrow: "Silver Trade Showcase",
    headline: "India's Biggest Silver Specific",
    highlight: "Trade Show",
    description:
      "India's Biggest Silver Specific Trade Show - An Exclusive B2B Exhibition showcasing Silver Jewellery, Articles, Innovations, Trends, and Business Opportunities for manufacturers, wholesalers, retailers, exporters, and industry professionals.",
    title: "Bengaluru Edition - 2026",
    subtitle:
      "India's Biggest Silver Specific Trade Show - An Exclusive B2B Exhibition showcasing Silver Jewellery, Articles, Innovations, Trends, and Business Opportunities for manufacturers, wholesalers, retailers, exporters, and industry professionals.",
    edition: "2026 Edition",
    date: "2026",
    location: "Bengaluru, Karnataka",
    venue: "Bangalore International Exhibition Centre (BIEC)",
    image: "/banners/ssi-bengaluru-2026.jpg",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Bangalore%20International%20Exhibition%20Centre%20BIEC",
    cityLabel: "Silver Show of India",
  },
  {
    id: "ssi-mumbai-2027",
    eyebrow: "Silver Trade Showcase",
    headline: "India's Biggest Silver Specific",
    highlight: "Trade Show",
    description:
      "India's Biggest Silver Specific Trade Show - An Exclusive B2B Exhibition showcasing Silver Jewellery, Articles, Innovations, Trends, and Business Opportunities for manufacturers, wholesalers, retailers, exporters, and industry professionals.",
    title: "Mumbai's 5th Edition - 2027",
    subtitle:
      "India's Biggest Silver Specific Trade Show - An Exclusive B2B Exhibition showcasing Silver Jewellery, Articles, Innovations, Trends, and Business Opportunities for manufacturers, wholesalers, retailers, exporters, and industry professionals.",
    edition: "5th Edition",
    date: "4 - 7 June 2027",
    location: "Mumbai, Maharashtra",
    venue: "Jio World Convention Centre, Bandra Kurla Complex (BKC), Mumbai",
    image: "/banners/ssi-mumbai-2027.jpg",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Jio%20World%20Convention%20Centre%20Bandra%20Kurla%20Complex%20Mumbai",
    cityLabel: "Silver Show of India",
  },
];

export const slideOrder = ["ssi-delhi", "ssi-bengaluru", "ssi-mumbai"];

export const getSlideOrder = (value?: string) => {
  const normalized = value?.toLowerCase() ?? "";
  const index = slideOrder.findIndex((token) => normalized.includes(token));
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
};
