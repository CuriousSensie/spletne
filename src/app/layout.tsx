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
  title: "Bespoke · See your new website before you pay",
  description:
    "A small web studio in Ljubljana. Send us your current site and we build the new one first. Love it and it’s yours from €150. If not, you pay nothing.",
};

export const viewport: Viewport = {
  themeColor: "#04101e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
