import sanityClient from "@/lib/sanityClient";
import urlFor from "@/lib/sanityImage";
import {
  portfolioExhibitions,
  type EditionStats,
  type PortfolioExhibition,
} from "@/lib/portfolio";

type SanityImageSource = unknown;

type PortfolioShowEditionSetting = {
  name?: string;
  date?: string;
  city?: string;
  description?: string;
  image?: SanityImageSource;
  galleryImages?: SanityImageSource[];
  visitors?: number;
  exhibitors?: number;
  reputedJewellers?: number;
  stalls?: number;
  hostedBuyers?: number;
  jewelleryDesigns?: number;
};

type PortfolioShowSettingItem = {
  title?: string;
  label?: string;
  overview?: string;
  focus?: string[];
  theme?: {
    accent?: string;
    accentSoft?: string;
    ink?: string;
  };
  coverImage?: SanityImageSource;
  detailImage?: SanityImageSource;
  galleryImages?: SanityImageSource[];
  editions?: PortfolioShowEditionSetting[];
};

type PortfolioShowSettingDocument = {
  shows?: PortfolioShowSettingItem[];
};

const portfolioShowSettingsQuery = `*[_type == "portfolioShowSetting" && settingsKey == "portfolio-shows"][0]{
  shows[]{
    title,
    label,
    overview,
    focus,
    theme,
    coverImage,
    detailImage,
    galleryImages,
    editions[]{
      name,
      date,
      city,
      description,
      image,
      galleryImages,
      visitors,
      exhibitors,
      reputedJewellers,
      stalls,
      hostedBuyers,
      jewelleryDesigns
    }
  }
}`;

function toSlug(value?: string) {
  return (value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function imageToUrl(image?: SanityImageSource) {
  try {
    return image ? urlFor(image).url() : undefined;
  } catch {
    return undefined;
  }
}

function galleryToUrls(images?: SanityImageSource[]) {
  return (images || []).map((image) => imageToUrl(image)).filter(Boolean) as string[];
}

function toEditionStats(edition?: PortfolioShowEditionSetting): EditionStats {
  return {
    ...(typeof edition?.visitors === "number" ? { visitors: edition.visitors } : {}),
    ...(typeof edition?.exhibitors === "number" ? { exhibitors: edition.exhibitors } : {}),
    ...(typeof edition?.reputedJewellers === "number"
      ? { reputedJewellers: edition.reputedJewellers }
      : {}),
    ...(typeof edition?.stalls === "number" ? { stalls: edition.stalls } : {}),
    ...(typeof edition?.hostedBuyers === "number"
      ? { hostedBuyers: edition.hostedBuyers }
      : {}),
    ...(typeof edition?.jewelleryDesigns === "number"
      ? { jewelleryDesigns: edition.jewelleryDesigns }
      : {}),
  };
}

export async function getPortfolioShows(): Promise<PortfolioExhibition[]> {
  try {
    const settings = await sanityClient
      .withConfig({ useCdn: false })
      .fetch<PortfolioShowSettingDocument | null>(portfolioShowSettingsQuery);

    if (!settings?.shows?.length) {
      return portfolioExhibitions;
    }

    const fallbackBySlug = new Map(
      portfolioExhibitions.map((show) => [toSlug(show.title), show]),
    );

    return settings.shows.map((show, index) => {
      const title = show.title || `Show ${index + 1}`;
      const fallback = fallbackBySlug.get(toSlug(title));
      const image =
        imageToUrl(show.coverImage) ||
        fallback?.image ||
        imageToUrl(show.detailImage) ||
        "/demo-banner.png";
      const detailImage =
        imageToUrl(show.detailImage) ||
        imageToUrl(show.coverImage) ||
        fallback?.detailImage ||
        image;
      const galleryImages =
        galleryToUrls(show.galleryImages).length
          ? galleryToUrls(show.galleryImages)
          : fallback?.galleryImages?.length
            ? fallback.galleryImages
            : [detailImage];

      return {
        id: fallback?.id || toSlug(title) || `portfolio-show-${index + 1}`,
        title,
        label: show.label || fallback?.label || "Exhibition Platform",
        image,
        detailImage,
        galleryImages,
        theme: {
          accent: show.theme?.accent || fallback?.theme.accent || "#b1843f",
          accentSoft:
            show.theme?.accentSoft || fallback?.theme.accentSoft || "#f5ead7",
          ink: show.theme?.ink || fallback?.theme.ink || "#241b14",
        },
        overview:
          show.overview ||
          fallback?.overview ||
          `${title} is part of the GES Worldex exhibition portfolio.`,
        focus:
          show.focus?.filter(Boolean)?.length
            ? show.focus.filter(Boolean)
            : fallback?.focus || [],
        editions:
          show.editions?.length
            ? show.editions.map((edition, editionIndex) => {
                const editionImage = imageToUrl(edition.image);
                const editionGalleryImages = galleryToUrls(edition.galleryImages);

                return {
                  name: edition.name || `Edition ${editionIndex + 1}`,
                  date: edition.date || "Dates to be announced",
                  city: edition.city || "Location to be announced",
                  description: edition.description || undefined,
                  stats: toEditionStats(edition),
                  image: editionImage,
                  galleryImages: editionGalleryImages,
                };
              })
            : fallback?.editions || [],
      };
    });
  } catch (error) {
    console.warn("Sanity portfolio show settings fetch failed:", error);
    return portfolioExhibitions;
  }
}
