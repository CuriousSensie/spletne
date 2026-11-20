import type { Metadata } from "next";
import { Artifacts } from "@/components/props/artifacts";
import { BeforeAfter } from "@/components/props/before-after";
import { Blueprint } from "@/components/props/blueprint";
import { DeviceMorph } from "@/components/props/device-morph";
import { LiveBuild } from "@/components/props/live-build";
import { PhoneFan } from "@/components/props/phone-fan";
import { RebuildLoop } from "@/components/props/rebuild-loop";
import { Receipt } from "@/components/props/receipt";
import { ShaderField } from "@/components/props/shader-field";
import { Spotlight } from "@/components/props/spotlight";

export const metadata: Metadata = {
  title: "Prop lab | Spletne",
  robots: { index: false },
};

interface Prop {
  title: string;
  note: string;
  tone: "dark" | "paper";
  node: React.ReactNode;
}

const PROPS: readonly Prop[] = [
  { title: "Before / after slider", note: "Drag the handle (or use arrow keys). The promise, made literal.", tone: "dark", node: <BeforeAfter /> },
  { title: "Self-rebuilding site", note: "Pure CSS loop. A scan line sweeps down and rebuilds the old site. Zero interaction needed.", tone: "paper", node: <RebuildLoop /> },
  { title: "Fanned phones", note: "Three client sites in 3D. Move your pointer to tilt the stack.", tone: "dark", node: <PhoneFan /> },
  { title: "Blueprint to build", note: "Wireframe draws itself on a grid, then the finished design wipes in.", tone: "paper", node: <Blueprint /> },
  { title: "Studio artifacts", note: "Client message, preview QR, Lighthouse ring counting to 100, type and colour specimen. Pointer parallax.", tone: "paper", node: <Artifacts /> },
  { title: "Shader field", note: "Hand-written WebGL in the brand palette, no library. The field bends toward the pointer.", tone: "dark", node: <ShaderField /> },
  { title: "€0 receipt", note: "Receipt prints, then a NO RISK stamp lands. Click to replay.", tone: "paper", node: <Receipt /> },
  { title: "Device morph", note: "One site, real container-query reflow between desktop, tablet and phone.", tone: "dark", node: <DeviceMorph /> },
  { title: "Live build", note: "URL types in, progress runs, sections spring into place. Plays on scroll.", tone: "dark", node: <LiveBuild /> },
  { title: "Spotlight + magnetic CTA", note: "Hover the card: a warm spotlight and dot grid follow the cursor, the button pulls toward it.", tone: "dark", node: <Spotlight /> },
];

export default function PropsPage() {
  return (
    <main className="min-h-svh bg-[#07172a] text-[#f4f1e9]">
      <header className="mx-auto max-w-[88rem] px-5 pt-20 pb-12 sm:px-8 lg:px-10">
        <p className="text-xs tracking-widest text-white/50 uppercase">Spletne · Prop lab</p>
        <h1 className="mt-3 max-w-[24ch] text-4xl font-medium tracking-[-0.04em] text-balance sm:text-5xl">
          Ten attention-grabbing props. Pick your favourites.
        </h1>
      </header>
      <ol className="grid gap-px bg-white/10">
        {PROPS.map((p, i) => (
          <li key={p.title} className={p.tone === "paper" ? "bg-[var(--midnight-paper)] text-[#07172a]" : "bg-[#07172a] text-[#f4f1e9]"}>
            <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-10">
              <div className="lg:col-span-4">
                <p className="font-mono text-sm opacity-50">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-2xl font-medium tracking-tight">{p.title}</h2>
                <p className="mt-3 max-w-[40ch] text-sm/6 opacity-70">{p.note}</p>
              </div>
              <div className="grid justify-items-center lg:col-span-8">{p.node}</div>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
