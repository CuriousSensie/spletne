/**
 * The "Nižje" cue: a growing line plus label that jumps to the next section.
 * Colours come from `className` (text colour), so it works on dark and light sections.
 * A plain anchor, so Lenis animates the scroll and it still works without JS.
 */
export function ScrollCue({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <a href={href} className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase ${className}`} aria-label="Pomaknite se navzdol">
      <span className="relative block h-9 w-px overflow-hidden bg-current/15">
        <span className="scroll-cue absolute inset-0 bg-current" />
      </span>
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
