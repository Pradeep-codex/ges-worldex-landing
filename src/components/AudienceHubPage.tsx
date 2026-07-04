import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bed,
  Building2,
  ClipboardList,
  Handshake,
  LayoutTemplate,
  MapPinned,
  Store,
  TicketCheck,
  UsersRound,
  Wrench,
} from "lucide-react";

const hubContent = {
  exhibitors: {
    eyebrow: "Exhibitors",
    title: "Build a stronger exhibition presence.",
    description:
      "Access the planning essentials, support pathways, and visibility opportunities needed to prepare your brand for a focused, high-value exhibition experience.",
    primaryCta: { label: "Apply For Booth", href: "https://portal.gesworldex.com/ep/ssiexb.php" },
    secondaryCta: { label: "Explore Sponsorship", href: "/exhibitors/sponsorship" },
    heroPoints: ["Booth planning", "Venue readiness", "Brand visibility"],
    options: [
      {
        title: "Booth Application",
        href: "https://portal.gesworldex.com/ep/ssiexb.php",
        icon: ClipboardList,
        description:
          "Submit participation interest, share booth requirements, and begin coordination for the right exhibition presence.",
        details: ["Space requirement", "Brand profile", "Participation follow-up"],
      },
      {
        title: "Floor Plan",
        href: "/exhibitors/floor-plan",
        icon: LayoutTemplate,
        description:
          "Review layout guidance, category zoning, booth visibility, and visitor-flow planning before confirming placement.",
        details: ["Booth zones", "Visitor movement", "Placement clarity"],
      },
      {
        title: "Exhibitor Portal",
        href: "https://portal.gesworldex.com/ep/index.php",
        icon: BadgeCheck,
        description:
          "A central access point for exhibitor coordination, documentation, reminders, and event-readiness updates.",
        details: ["Document access", "Event updates", "Coordination hub"],
      },
      {
        title: "Hotel Info",
        href: "/exhibitors/hotel-info",
        icon: Bed,
        description:
          "Plan exhibitor-team stay logistics with practical accommodation guidance near the event ecosystem.",
        details: ["Team stay", "Travel comfort", "Venue access"],
      },
      {
        title: "Vendor Info",
        href: "/exhibitors/vendor-info",
        icon: Wrench,
        description:
          "Coordinate approved vendor support for booth build, services, logistics, and on-site operational needs.",
        details: ["Booth services", "Build support", "On-site readiness"],
      },
      {
        title: "Sponsorship Info",
        href: "/exhibitors/sponsorship",
        icon: Handshake,
        description:
          "Explore sponsorship formats that increase brand visibility before, during, and after the exhibition.",
        details: ["Brand recall", "Premium visibility", "Audience engagement"],
      },
    ],
  },
  visitors: {
    eyebrow: "Visitors",
    title: "Plan a productive exhibition visit.",
    description:
      "Find the registration, navigation, exhibitor, stay, and travel information you need to discover products and connect with the right businesses.",
    primaryCta: { label: "Register Interest", href: "https://portal.gesworldex.com/ssidelhi" },
    secondaryCta: { label: "View Exhibitors", href: "/visitors/exhibitor-list" },
    heroPoints: ["Easy entry", "Clear navigation", "Better discovery"],
    options: [
      {
        title: "Visitor Registration",
        href: "https://portal.gesworldex.com/ssidelhi",
        icon: TicketCheck,
        description:
          "Register your interest, prepare visitor access details, and make your event-day entry smoother.",
        details: ["Visitor pass", "Access planning", "Profile details"],
      },
      {
        title: "Floor Plan",
        href: "/visitors/floor-plan",
        icon: MapPinned,
        description:
          "Understand exhibition zones, movement paths, and key visitor touchpoints before arriving at the venue.",
        details: ["Zone clarity", "Navigation", "Product discovery"],
      },
      {
        title: "Exhibitor List",
        href: "/visitors/exhibitor-list",
        icon: Store,
        description:
          "Explore participating brands and exhibitors so you can shortlist the right meetings and product categories.",
        details: ["Brand shortlist", "Category scan", "Meeting focus"],
      },
      {
        title: "Hotel Info",
        href: "/visitors/hotel-info",
        icon: Building2,
        description:
          "Plan your stay around the exhibition with accommodation guidance that keeps venue access convenient.",
        details: ["Stay planning", "Travel comfort", "Nearby access"],
      },
      {
        title: "How to reach Venue?",
        href: "/visitors/how-to-reach",
        icon: UsersRound,
        description:
          "Get practical arrival guidance for smoother travel, entry planning, and on-ground movement.",
        details: ["Route planning", "Arrival timing", "Venue access"],
      },
    ],
  },
} as const;

type AudienceHubPageProps = {
  type: keyof typeof hubContent;
  content?: any;
};

export function AudienceHubPage({ type, content: cmsContent }: AudienceHubPageProps) {
  const fallbackContent = hubContent[type];
  const content = {
    ...fallbackContent,
    eyebrow: cmsContent?.eyebrow || fallbackContent.eyebrow,
    title: cmsContent?.title || fallbackContent.title,
    description: cmsContent?.description || fallbackContent.description,
    heroPoints: cmsContent?.cards?.length
      ? cmsContent.cards
          .slice(0, 3)
          .map((card: any) => card.eyebrow || card.title)
          .filter((point: any): point is string => Boolean(point))
      : fallbackContent.heroPoints,
    options: cmsContent?.cards?.length
      ? cmsContent.cards
          .filter((card: any) => card.title)
          .map((card: any, index: number) => {
            const fallbackOption = fallbackContent.options[index % fallbackContent.options.length];

            return {
              title: card.title as string,
              href: card.link?.href || fallbackOption.href,
              icon: fallbackOption.icon,
              description: card.description || fallbackOption.description,
              details: card.eyebrow ? [card.eyebrow] : fallbackOption.details,
            };
          })
      : fallbackContent.options,
  };

  return (
    <main className="mx-auto w-full max-w-[1700px] px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-24">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div
          className="flex min-h-[460px] flex-col justify-between rounded-[28px] border p-6 shadow-[0_24px_80px_rgba(47,35,24,0.08)] md:p-8 lg:p-10"
          style={{
            backgroundColor: "var(--about-card-bg)",
            borderColor: "var(--about-card-border)",
          }}
        >
          <div className="space-y-6">
            <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-sm font-black uppercase tracking-[0.2em] text-transparent">
              {content.eyebrow}
            </p>
            <h1
              className="welcome-display-font max-w-[11ch] text-[3rem] font-black leading-[0.92] tracking-tight md:text-[4.6rem]"
              style={{ color: "var(--about-text-primary)" }}
            >
              {content.title}
            </h1>
            <p
              className="max-w-2xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--about-text-secondary)" }}
            >
              {content.description}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={content.primaryCta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-[#2f2318] px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[#9f7b28] active:scale-95"
            >
              {content.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={content.secondaryCta.href}
              className="inline-flex items-center rounded-full border px-6 py-3.5 text-xs font-black uppercase tracking-widest transition-all hover:border-[#9f7b28] active:scale-95"
              style={{
                borderColor: "var(--about-card-border)",
                color: "var(--about-text-primary)",
              }}
            >
              {content.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          {content.heroPoints.map((point: any, index: number) => (
            <div
              key={point}
              className="flex min-h-[140px] flex-col justify-between rounded-[24px] border p-5 shadow-[0_18px_60px_rgba(47,35,24,0.06)]"
              style={{
                backgroundColor: "var(--about-card-bg)",
                borderColor: "var(--about-card-border)",
              }}
            >
              <div className="text-[0.68rem] font-black uppercase tracking-[0.2em]" style={{ color: "#9f7b28" }}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="text-2xl font-black leading-tight" style={{ color: "var(--about-text-primary)" }}>
                {point}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 md:mt-14 lg:mt-16">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.options.map((option: any) => {
            const Icon = option.icon;

            return (
              <Link
                key={option.href}
                href={option.href}
                className="group block h-full rounded-[24px] border p-5 shadow-[0_18px_60px_rgba(47,35,24,0.06)] transition-transform duration-300 hover:-translate-y-1 md:p-6"
                style={{
                  backgroundColor: "var(--about-card-bg)",
                  borderColor: "var(--about-card-border)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(159,123,40,0.12)] text-[#9f7b28]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="mt-2 h-5 w-5 text-[#9f7b28] transition-transform group-hover:translate-x-1" />
                </div>

                <div className="mt-6 space-y-3">
                  <h2 className="text-2xl font-black leading-tight" style={{ color: "var(--about-text-primary)" }}>
                    {option.title}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--about-text-secondary)" }}>
                    {option.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {option.details.map((detail: any) => (
                    <span
                      key={detail}
                      className="rounded-full px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.12em]"
                      style={{
                        backgroundColor: "rgba(159, 123, 40, 0.1)",
                        color: "var(--about-text-secondary)",
                      }}
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section
        className="mt-10 rounded-[26px] border p-6 md:mt-14 md:p-8 lg:mt-16"
        style={{
          backgroundColor: "var(--about-card-bg)",
          borderColor: "var(--about-card-border)",
        }}
      >
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="space-y-3">
            <p className="bg-[linear-gradient(90deg,#9f7b28,#d8b766,#8d6a1e)] bg-clip-text text-xs font-black uppercase tracking-[0.22em] text-transparent">
              Related Support
            </p>
            <h2 className="text-3xl font-black leading-tight md:text-4xl" style={{ color: "var(--about-text-primary)" }}>
              Start with the section that matches your immediate need.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-relaxed" style={{ color: "var(--about-text-secondary)" }}>
            Each option is structured to help you move from interest to action with less confusion, whether you are preparing a booth, planning a visit, coordinating stay, or reviewing venue movement.
          </p>
        </div>
      </section>
    </main>
  );
}
