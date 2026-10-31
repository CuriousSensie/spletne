import type { Metadata } from "next";
import { ConceptAssemble } from "@/components/work/concept-assemble";
import { ConceptDeck } from "@/components/work/concept-deck";
import { ConceptLand } from "@/components/work/concept-land";
import { ConceptRail } from "@/components/work/concept-rail";

export const metadata: Metadata = {
  title: "Work lab | Bespoke",
  robots: { index: false },
};

function Divider({ id, letter, name, note }: { id: string; letter: string; name: string; note: string }) {
  return (
    <div id={id} className="border-y border-foam/10 bg-ink px-5 py-5 text-foam sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[96rem] flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-[11px] tracking-[0.16em] text-mist uppercase">Concept {letter}</span>
        <span className="text-lg font-light tracking-[-0.02em]">{name}</span>
        <span className="text-sm text-foam/55">{note}</span>
      </div>
    </div>
  );
}

export default function WorkLabPage() {
  return (
    <main className="bg-ink">
      <p className="bg-[#f2d7b2] px-5 py-2 text-center font-mono text-[11px] tracking-[0.12em] text-ink uppercase">
        Placeholder projects and results. Replace with real client work before launch.
      </p>
      <Divider id="work-a" letter="A" name="Frames land" note="Windows fly in from off-screen and settle into a collage." />
      <ConceptLand />
      <Divider id="work-b" letter="B" name="Deck" note="The top card is flung away; the next rises from the stack." />
      <ConceptDeck />
      <Divider id="work-c" letter="C" name="Gallery rail" note="Vertical scroll drives a 3D horizontal rail; outline type drifts behind." />
      <ConceptRail />
      <Divider id="work-d" letter="D" name="Assembly" note="Each project's pieces fly in from every edge and assemble, then scatter." />
      <ConceptAssemble />
    </main>
  );
}
