import type { Metadata } from "next";
import { Suspense } from "react";
import {
  CONTOURS,
  EMBER,
  HALFTONE,
  LAVA,
  MESH,
  SILK,
  STREAKS,
} from "@/components/shaders/library";
import type { PaletteKey } from "@/components/shaders/palettes";
import { ShaderStage } from "@/components/shaders/shader-stage";

export const metadata: Metadata = {
  title: "Shader lab | Bespoke",
  robots: { index: false },
};

const SHADERS: readonly {
  name: string;
  note: string;
  frag: string;
  palette: PaletteKey;
  scale?: number;
}[] = [
  {
    name: "Silk",
    note: "Flowing cloth folds with a moving sheen. The pointer lenses the fabric. Hero candidate.",
    frag: SILK,
    palette: "midnight",
  },
  {
    name: "Ember smoke",
    note: "Prop 06, upgraded: double domain warp, faster drift, a heat bloom under the pointer. Hero candidate.",
    frag: EMBER,
    palette: "midnight",
    scale: 0.6,
  },
  {
    name: "Lava",
    note: "Slow metaballs merging and splitting. One blob follows the pointer.",
    frag: LAVA,
    palette: "dusk",
  },
  {
    name: "Mesh gradient",
    note: "Four drifting colour points with heavy grain. The pointer steers the accent. Quiet, good for long sections.",
    frag: MESH,
    palette: "dusk",
  },
  {
    name: "Streaks",
    note: "Long-exposure light through blinds, echoing the original Stitch hero. The pointer is a light leak.",
    frag: STREAKS,
    palette: "midnight",
    scale: 0.6,
  },
  {
    name: "Halftone",
    note: "Editorial dot field over moving noise. Dots swell around the pointer.",
    frag: HALFTONE,
    palette: "ocean",
    scale: 1,
  },
  {
    name: "Contours",
    note: "Topographic lines for light sections. The pointer raises a hill.",
    frag: CONTOURS,
    palette: "paper",
    scale: 1,
  },
];

export default function ShadersPage({ searchParams }: PageProps<"/shaders">) {
  return (
    <main className="bg-[#07172a] text-[#f4f1e9]">
      <Suspense fallback={null}>
        <ShaderList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

/** `?only=N` renders a single shader full-screen (handy for previews and screenshots). */
async function ShaderList({ searchParams }: Pick<PageProps<"/shaders">, "searchParams">) {
  const only = Number((await searchParams).only);
  const solo = Number.isInteger(only) && only >= 1 && only <= SHADERS.length;
  return (
    <>
      {!solo && (
        <header className="mx-auto max-w-[88rem] px-5 pt-20 pb-12 sm:px-8 lg:px-10">
          <p className="text-xs tracking-widest text-white/50 uppercase">Bespoke · Shader lab</p>
          <h1 className="mt-3 max-w-[26ch] text-4xl font-medium tracking-[-0.04em] text-balance sm:text-5xl">
            Seven living backgrounds. Every one takes any palette.
          </h1>
        </header>
      )}
      {SHADERS.map((s, i) =>
        solo && i + 1 !== only ? null : (
          <ShaderStage
            key={s.name}
            index={i + 1}
            name={s.name}
            note={s.note}
            frag={s.frag}
            defaultPalette={s.palette}
            scale={s.scale}
          />
        ),
      )}
    </>
  );
}
