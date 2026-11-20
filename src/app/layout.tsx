import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

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
  return (
    <html lang="sl" className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
