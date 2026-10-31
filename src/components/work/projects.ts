import type { ThemeKey } from "@/components/props/mini-sites";

export interface Project {
  theme: ThemeKey;
  name: string;
  url: string;
  tag: string;
  /** PLACEHOLDER: replace with real, verifiable client results before launch. */
  result: string;
  color: string;
  swatches: readonly string[];
  /** The case panel wears the client's identity, contrasting with their site's own background. */
  panel: { bg: string; fg: string; accent: string };
  /** PLACEHOLDER: one line on what changed. */
  brief: string;
  /** PLACEHOLDER: replace with a real, verifiable number. */
  metric: { label: string; value: string };
}

export const PROJECTS: readonly Project[] = [
  { theme: "dental", name: "Northline Dental", url: "northlinedental.si", tag: "Healthcare · Redesign", result: "+38% online bookings", color: "#0f2f4a", swatches: ["#07172a", "#f4efe6", "#b8c9d8", "#d8b5a4"], panel: { bg: "#07172a", fg: "#f4efe6", accent: "#d8b5a4" }, brief: "Patients used to phone to book. Now they tap.", metric: { label: "Online bookings", value: "+38%" } },
  { theme: "bistro", name: "Osteria Lipa", url: "osterialipa.si", tag: "Restaurant · New site", result: "Reservations in two taps", color: "#3a2a35", swatches: ["#1f1e28", "#ef7447", "#63485a", "#f4f1e9"], panel: { bg: "#f4f1e9", fg: "#1f1e28", accent: "#ef7447" }, brief: "The menu was a PDF. Now the site fills tables.", metric: { label: "Steps to reserve", value: "2" } },
  { theme: "salon", name: "Atelier Mira", url: "ateliermira.si", tag: "Salon · Rebrand + site", result: "Thursdays fully booked", color: "#5e3d42", swatches: ["#2b2124", "#efe7e1", "#d8b5a4", "#8a5a5f"], panel: { bg: "#2b2124", fg: "#efe7e1", accent: "#d8b5a4" }, brief: "A new name, a new look, and a full Thursday.", metric: { label: "Thursday slots", value: "Full" } },
  { theme: "studio", name: "Kovač Arhitekti", url: "kovac-arhitekti.si", tag: "Architecture · Portfolio", result: "3× longer visits", color: "#1f3d35", swatches: ["#16241f", "#eef0ec", "#9fb3a6", "#2f5d50"], panel: { bg: "#dfe5df", fg: "#16241f", accent: "#2f5d50" }, brief: "Less text, bigger photos. The buildings do the talking.", metric: { label: "Time on site", value: "3×" } },
];
