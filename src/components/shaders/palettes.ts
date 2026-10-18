/** Four-stop palettes: [base, mid, light, accent]. Shaders sample them via pal(t). */
export type Palette = readonly [string, string, string, string];

export const PALETTES = {
  midnight: ["#07172a", "#63485a", "#d8b5a4", "#ef7447"],
  dusk: ["#0f253a", "#3d3550", "#b8a3b0", "#f2d7b2"],
  ocean: ["#04101e", "#0f2f4a", "#4f7f9f", "#b8c9d8"],
  paper: ["#f4efe6", "#e4d9c8", "#b9a99a", "#07172a"],
  launch: ["#04101e", "#0f2f4a", "#b8c9d8", "#f2d7b2"],
  /** White ground, hero-blue lines (contours on light cards). */
  lines: ["#ffffff", "#f3f7fa", "#d6e3ec", "#1f4f75"],
} as const satisfies Record<string, Palette>;

export type PaletteKey = keyof typeof PALETTES;

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
