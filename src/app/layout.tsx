import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { InquiryProvider } from "@/components/site/inquiry-context";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.spletne.com"),
  title: "Spletne · Nova spletna stran za vaše podjetje. Najprej jo izdelamo, nato se odločite.",
  description:
    "Spletne je spletni studio iz Ljubljane. Pošljite nam povezavo do svoje strani in izdelali bomo novo, prilagojeno vašemu podjetju in strankam. Če vam je všeč, je vaša. Če ne, vam vrnemo polog.",
  alternates: { canonical: "/" },
  openGraph: { siteName: "Spletne", locale: "sl_SI", url: "https://www.spletne.com", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#04101e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Fonts used above the fold (latin-ext carries č, š, ž); the rest load on demand via unicode-range.
  preload("/fonts/inter-tight-latin-wght-normal.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/inter-tight-latin-ext-wght-normal.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/instrument-serif-latin-400-italic.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/instrument-serif-latin-ext-400-italic.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="sl" className="antialiased">
      <body className="font-sans">
        <InquiryProvider>{children}</InquiryProvider>
      </body>
    </html>
  );
}
