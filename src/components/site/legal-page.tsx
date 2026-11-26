import type { Metadata } from "next";
import Link from "next/link";
import { home } from "@/content/home";
import type { LegalBlock, LegalDoc } from "@/content/legal";
import { PageHeader } from "./page-header";
import { SiteFooter } from "./site-footer";

/** Page metadata for a legal document. */
export function legalMetadata(doc: LegalDoc): Metadata {
  return { title: `${doc.title} · Spletne`, description: doc.description, alternates: { canonical: `/${doc.slug}` } };
}

const TOKEN = /(\[[^\]]*\]|https?:\/\/[^\s)]*[^\s).,;]|[\w.+-]+@[\w-]+\.[\w.-]*\w)/g;

/**
 * Renders inline text. `[bracketed]` parts are placeholders or editor's notes: highlighted so they can't be
 * missed. URLs and e-mail addresses become links.
 */
function Inline({ text }: { text: string }) {
  return text.split(TOKEN).map((part, i) => {
    if (i % 2 === 0) return part;
    if (part.startsWith("[")) {
      return (
        <mark key={i} className="rounded bg-[#f2d7b2]/15 px-1 text-[#f2d7b2]">
          {part}
        </mark>
      );
    }
    const href = part.startsWith("http") ? part : `mailto:${part}`;
    return (
      <a key={i} href={href} className="text-foam underline decoration-foam/30 underline-offset-4 transition-colors hover:decoration-foam">
        {part}
      </a>
    );
  });
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <Inline text={block.text} />
        </p>
      );
    case "clause":
      return (
        <p className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-2">
          <span className="font-mono text-[12px] tracking-[0.08em] text-foam/40 tabular-nums">{block.n}.</span>
          <span>
            {block.lead ? <strong className="font-medium text-foam">{block.lead} </strong> : null}
            <Inline text={block.text} />
          </span>
        </p>
      );
    case "list":
      return (
        <ul className="grid list-disc gap-2 pl-5 marker:text-foam/35">
          {block.items.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-hidden rounded-2xl ring-1 ring-foam/12">
          <table className="w-full border-collapse text-left text-[15px] max-md:block">
            <thead className="max-md:sr-only">
              <tr className="bg-foam/[0.06] font-mono text-[11px] tracking-[0.14em] text-mist uppercase">
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="max-md:block">
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-t border-foam/12 align-top max-md:block max-md:space-y-2 max-md:p-4">
                  {row.map((cell, i) => (
                    <td key={i} className="px-4 py-4 max-md:block max-md:p-0">
                      {/* On small screens each cell carries its column name. */}
                      <span className="mb-0.5 block font-mono text-[10px] tracking-[0.14em] text-mist/70 uppercase md:hidden">{block.head[i]}</span>
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/** Shared layout for the terms, privacy and cookie pages. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main className="isolate min-h-svh overflow-x-clip bg-ink text-foam">
      <PageHeader />
      <article className="mx-auto w-full max-w-[52rem] px-5 py-16 sm:px-8 sm:py-24">
        <header className="grid gap-4 border-b border-foam/12 pb-10">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">Spletne.com</p>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] font-light tracking-[-0.045em] text-balance">{doc.title}</h1>
          <p className="font-mono text-[11px] tracking-[0.14em] text-foam/50 uppercase">Veljavno od: {doc.updated}</p>
        </header>

        <div className="grid gap-12 pt-10">
          {doc.sections.map((s, i) => (
            <section key={s.title ?? i} aria-labelledby={s.title ? `s-${s.n ?? i}` : undefined} className="grid gap-4 text-[16px] leading-relaxed text-foam/75">
              {s.title ? (
                <h2 id={`s-${s.n ?? i}`} className="text-[clamp(1.25rem,2.4vw,1.6rem)] leading-tight font-light tracking-[-0.025em] text-foam">
                  {s.n ? <span className="mr-3 font-mono text-[12px] tracking-[0.1em] text-foam/40 tabular-nums">{s.n}.</span> : null}
                  {s.title}
                </h2>
              ) : null}
              {s.blocks.map((b, j) => (
                <Block key={j} block={b} />
              ))}
            </section>
          ))}
        </div>

        {/* The other legal documents, so the three pages read as one set. */}
        <nav aria-label="Druga pravna obvestila" className="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-foam/12 pt-6 font-mono text-[11px] tracking-[0.14em] text-foam/55 uppercase">
          {home.footer.legal
            .filter((l) => l.href !== `/${doc.slug}`)
            .map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-foam">
                {l.label}
              </Link>
            ))}
        </nav>
      </article>
      <SiteFooter />
    </main>
  );
}
