import type { Metadata, Viewport } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const alexandria = Alexandria({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-alexandria",
});

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex",
});

const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"], display: "swap", variable: "--font-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Sana Pharmacy" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  robots: { index: true, follow: true },
  authors: [{ name: SITE.author.name, url: SITE.author.url }],
};

export const viewport: Viewport = {
  themeColor: "#0e7c66",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${alexandria.variable} ${plex.variable} ${grotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
