import type { GenericPageContent } from "@/sanity/lib/pages";

export const navPageFallbacks = {
  "exhibitors/booth-application": {
    eyebrow: "Exhibitors",
    title: "Booth application",
    description:
      "Submit interest for exhibition space and start planning the right booth presence for your brand, products, and team.",
    points: ["Booth size guidance", "Participation requirements", "Next-step coordination"],
  },
  "exhibitors/floor-plan": {
    eyebrow: "Exhibitors",
    title: "Floor plan",
    description:
      "Review exhibition layout planning and discover how booth placement, visitor flow, and category zones support better business conversations.",
    points: ["Venue zoning", "Booth placement support", "Visitor flow planning"],
  },
  "exhibitors/hotel-info": {
    eyebrow: "Exhibitors",
    title: "Hotel info",
    description:
      "Find stay-related guidance for exhibitor teams attending GES Worldex exhibition programs.",
    points: ["Recommended stay areas", "Team travel planning", "Venue access guidance"],
  },
  "exhibitors/portal": {
    eyebrow: "Exhibitors",
    title: "Exhibitor portal",
    description:
      "Access the central hub for exhibitor coordination, documentation, service requests, and event preparation.",
    points: ["Document support", "Service coordination", "Event readiness updates"],
  },
  "exhibitors/sponsorship": {
    eyebrow: "Exhibitors",
    title: "Sponsorship info",
    description:
      "Explore sponsorship formats that increase brand visibility before, during, and after the exhibition.",
    points: ["Brand visibility packages", "On-site placement", "Audience engagement opportunities"],
  },
  "exhibitors/vendor-info": {
    eyebrow: "Exhibitors",
    title: "Vendor info",
    description:
      "Coordinate with approved vendor services for build, logistics, on-site support, and exhibition readiness.",
    points: ["Build support", "Logistics coordination", "On-site service planning"],
  },
  "visitors/registration": {
    eyebrow: "Visitors",
    title: "Visitor registration",
    description:
      "Register your interest and prepare for access to GES Worldex exhibition experiences.",
    points: ["Visitor pass guidance", "Business profile support", "Event access preparation"],
  },
  "visitors/floor-plan": {
    eyebrow: "Visitors",
    title: "Floor plan",
    description:
      "Navigate exhibition zones, product categories, and key visitor touchpoints with better clarity.",
    points: ["Category zones", "Visitor pathways", "Key venue areas"],
  },
  "visitors/exhibitor-list": {
    eyebrow: "Visitors",
    title: "Exhibitor list",
    description:
      "Discover participating exhibitors, featured brands, and the product categories represented across GES Worldex platforms.",
    points: ["Participating companies", "Featured brands", "Product discovery"],
  },
  "visitors/hotel-info": {
    eyebrow: "Visitors",
    title: "Hotel info",
    description:
      "Plan your stay near the exhibition venue with guidance for easier travel and event access.",
    points: ["Nearby stay guidance", "Travel planning", "Venue commute support"],
  },
  "visitors/how-to-reach": {
    eyebrow: "Visitors",
    title: "How to reach the venue",
    description:
      "Get practical guidance for reaching the exhibition venue and planning a smoother event-day arrival.",
    points: ["Venue access", "Arrival planning", "Local travel guidance"],
  },
} satisfies Record<string, {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
}>;

export function mergeNavPageContent(
  fallback: (typeof navPageFallbacks)[keyof typeof navPageFallbacks],
  cms?: GenericPageContent | null,
) {
  return {
    eyebrow: cms?.eyebrow || fallback.eyebrow,
    title: cms?.title || fallback.title,
    description: cms?.description || fallback.description,
    points: cms?.cards?.length
      ? cms.cards.map((card) => card.title).filter((point): point is string => Boolean(point))
      : fallback.points,
  };
}
