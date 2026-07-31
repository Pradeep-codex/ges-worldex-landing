import type { DefaultSeoProps } from "next-seo/pages";

export const siteUrl = "https://gesworldex.com";

export const defaultSeo: DefaultSeoProps = {
  titleTemplate: "%s | GES Worldex",
  defaultTitle: "GES Worldex",
  description:
    "GES Worldex builds premium exhibition and trade show experiences that connect businesses across industries.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/home`,
    siteName: "GES Worldex",
    title: "GES Worldex | Exhibition & Trade Show Company",
    description:
      "Premium exhibition and trade show partner focused on high-impact business connections.",
  },
  twitter: {
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "GES Worldex, exhibitions, trade shows, event management, corporate events",
    },
  ],
};
