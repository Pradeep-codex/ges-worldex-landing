import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { defaultSeo, siteUrl } from "@/lib/seo";
import { Header } from "@/components/Header";
import { FloatingBlobs } from "@/components/FloatingBlobs";
import { Footer } from "@/components/Footer";
import { AppLoaderGate } from "@/components/AppLoaderGate";

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
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){
  try {
    var key = 'ges-theme';
    var stored = localStorage.getItem(key);
    var theme = (stored === 'light' || stored === 'dark') ? stored : 'light';
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background">
        <AppLoaderGate />
        <FloatingBlobs />
        <Header />
        <main className="flex-1 mt-20 lg:mt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
