import sanityClient from "@/lib/sanityClient";

export type VisitorPageKey =
  | "visitors/floor-plan"
  | "visitors/exhibitor-list"
  | "visitors/hotel-info"
  | "visitors/how-to-reach";

export type VisitorPageSetting = {
  pageKey?: VisitorPageKey;
  pdfUrl?: string;
  pdfFilename?: string;
  pdfTitle?: string;
  pdfDescription?: string;
};

const visitorPageSettingQuery = `*[_type == "visitorPageSetting" && pageKey == $pageKey][0]{
  pageKey,
  "pdfUrl": pdf.asset->url,
  "pdfFilename": pdf.asset->originalFilename,
  pdfTitle,
  pdfDescription
}`;

export async function getVisitorPageSetting(pageKey: VisitorPageKey) {
  try {
    return await sanityClient
      .withConfig({ useCdn: false })
      .fetch<VisitorPageSetting | null>(visitorPageSettingQuery, { pageKey });
  } catch (error) {
    console.warn(`Sanity visitor page setting fetch failed for ${pageKey}:`, error);
    return null;
  }
}
