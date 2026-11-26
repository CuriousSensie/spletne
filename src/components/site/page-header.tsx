import Link from "next/link";
import { home } from "@/content/home";
import { Wordmark } from "./wordmark";

/** Slim top bar for the inner and legal pages: wordmark plus a way back to the home page. */
export function PageHeader({ id, className = "" }: { id?: string; className?: string }) {
  return (
    <header id={id} tabIndex={id ? -1 : undefined} className={`mx-auto flex w-full max-w-[96rem] items-center justify-between px-5 pt-5 outline-none sm:px-8 sm:pt-7 lg:px-12 ${className}`}>
      <Wordmark />
      <Link
        href="/"
        className="rounded-full border border-foam/25 px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase backdrop-blur-sm transition-colors hover:border-foam/60 hover:bg-foam/10"
      >
        {home.more.back}
      </Link>
    </header>
  );
}
