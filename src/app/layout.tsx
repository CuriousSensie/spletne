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
  title: "Spletne · Conversion focused landing pages tailored to your business and audience.",
  description:
    "Spletne is a web studio here to help you rebuild and revamp your websites with a focus on conversion, high quality copy, tailored to your business and target audience. Send us your current site and we redesign and rebuild the new one. If you love it, it’s yours. If not, you pay nothing.",
  alternates: { canonical: "/" },
  openGraph: { siteName: "Spletne", url: "https://www.spletne.com", type: "website" },
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
