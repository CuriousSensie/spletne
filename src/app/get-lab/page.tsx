import type { Metadata } from "next";
import { ConceptIndex } from "@/components/get/concept-index";
import { ConceptKit } from "@/components/get/concept-kit";
import { ConceptLayers } from "@/components/get/concept-layers";
import { ConceptLetter } from "@/components/get/concept-letter";

export const metadata: Metadata = {
  title: "What-you-get lab | Bespoke",
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

export default function GetLabPage() {
  return (
    <main className="overflow-x-clip bg-ink">
      <Divider id="get-a" letter="A" name="The letter" note="The guarantee as a signed letter, written as you scroll. Ends with a €0.00 stamp." />
      <ConceptLetter />
      <Divider id="get-b" letter="B" name="Exploded view" note="The finished site tilts and separates into the layers you own." />
      <ConceptLayers />
      <Divider id="get-c" letter="C" name="Index" note="Six large lines; hover one and a live proof follows the cursor." />
      <ConceptIndex />
      <Divider id="get-d" letter="D" name="Handover kit" note="Everything you get as objects on a desk, tidied into a flat-lay." />
      <ConceptKit />
    </main>
  );
}
