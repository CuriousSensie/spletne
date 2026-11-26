import Link from "next/link";
import { home } from "@/content/home";
import { CONTACT_EMAIL } from "./contact";
import { Wordmark } from "./wordmark";

/** Dark footer shared by the home page, the inner page and the legal pages. */
export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[96rem] px-5 pb-8 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-6 border-t border-foam/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Wordmark />
        <nav aria-label="Noga strani" className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.14em] text-foam/55 uppercase">
          {home.footer.links.map((l) =>
            l.href.startsWith("/#") ? (
              // Plain anchor: on the home page Lenis animates it; elsewhere it navigates home first.
              <a key={l.href} href={l.href} className="transition-colors hover:text-foam">
                {l.label}
              </a>
            ) : (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-foam">
                {l.label}
              </Link>
            ),
          )}
        </nav>
      </div>
      <div className="mt-6 flex flex-col gap-3 font-mono text-[11px] tracking-[0.12em] text-foam/40 sm:flex-row sm:items-center sm:justify-between">
        <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-foam">
          {CONTACT_EMAIL}
        </a>
        <nav aria-label="Pravna obvestila" className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:pr-14">
          {home.footer.legal.map((l, i) => (
            <span key={l.href} className="flex items-center gap-3">
              {i > 0 ? <span aria-hidden="true" className="h-3 w-px bg-foam/25" /> : null}
              <Link href={l.href} className="transition-colors hover:text-foam">
                {l.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
