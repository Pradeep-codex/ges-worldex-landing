import sanityClient from "@/lib/sanityClient";

export type ExhibitorPageKey =
  | "exhibitors/booth-application"
  | "exhibitors/floor-plan"
  | "exhibitors/portal"
  | "exhibitors/hotel-info"
  | "exhibitors/vendor-info"
  | "exhibitors/sponsorship";

export type ExhibitorPageStaticContent = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  points?: string[];
};

export type ExhibitorPageSetting = {
  pageKey?: ExhibitorPageKey;
  pageMode?: "static" | "url";
  externalUrl?: string;
  staticContent?: ExhibitorPageStaticContent;
  pdfUrl?: string;
  pdfFilename?: string;
  pdfTitle?: string;
  pdfDescription?: string;
};

const exhibitorPageSettingQuery = `*[_type == "exhibitorPageSetting" && pageKey == $pageKey][0]{
  pageKey,
  pageMode,
  externalUrl,
  staticContent,
  "pdfUrl": pdf.asset->url,
  "pdfFilename": pdf.asset->originalFilename,
  pdfTitle,
  pdfDescription
}`;

export async function getExhibitorPageSetting(pageKey: ExhibitorPageKey) {
  try {
    return await sanityClient
      .withConfig({ useCdn: false })
      .fetch<ExhibitorPageSetting | null>(exhibitorPageSettingQuery, { pageKey });
  } catch (error) {
    console.warn(`Sanity exhibitor page setting fetch failed for ${pageKey}:`, error);
    return null;
  }
}
