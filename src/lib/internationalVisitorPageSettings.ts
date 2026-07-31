import sanityClient from "@/lib/sanityClient";

export type InternationalVisitorPageKey =
  | "visitors/international-floor-plan"
  | "visitors/international-exhibitor-list"
  | "visitors/international-hotel-info"
  | "visitors/international-how-to-reach";

export type InternationalVisitorPageSetting = {
  pageKey?: InternationalVisitorPageKey;
  pdfUrl?: string;
  pdfFilename?: string;
  pdfTitle?: string;
  pdfDescription?: string;
};

const internationalVisitorPageSettingQuery = `*[_type == "internationalVisitorPageSetting" && pageKey == $pageKey][0]{
  pageKey,
  "pdfUrl": pdf.asset->url,
  "pdfFilename": pdf.asset->originalFilename,
  pdfTitle,
  pdfDescription
}`;

export async function getInternationalVisitorPageSetting(pageKey: InternationalVisitorPageKey) {
  try {
    return await sanityClient
      .withConfig({ useCdn: false })
      .fetch<InternationalVisitorPageSetting | null>(internationalVisitorPageSettingQuery, { pageKey });
  } catch (error) {
    console.warn(`Sanity international visitor page setting fetch failed for ${pageKey}:`, error);
    return null;
  }
}
