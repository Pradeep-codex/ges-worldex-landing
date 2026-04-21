import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { defaultSeo, siteUrl } from "@/lib/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultSeo.defaultTitle ?? "GES Worldex",
    template: defaultSeo.titleTemplate ?? "%s | GES Worldex",
  },
  description: defaultSeo.description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: defaultSeo.openGraph?.title,
    description: defaultSeo.openGraph?.description,
    url: defaultSeo.openGraph?.url,
    siteName: defaultSeo.openGraph?.siteName,
    images: defaultSeo.openGraph?.images?.map((img) => ({
      url: img.url,
      width: img.width,
      height: img.height,
      alt: img.alt,
    })),
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeo.openGraph?.title,
    description: defaultSeo.openGraph?.description,
    images: defaultSeo.openGraph?.images?.[0]?.url
      ? [defaultSeo.openGraph.images[0].url]
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
