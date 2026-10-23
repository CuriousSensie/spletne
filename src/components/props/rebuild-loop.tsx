import { BrowserFrame, NewSite, OldSite } from "./mini-sites";

/** Pure-CSS loop: a scan line sweeps down and rebuilds the old site into the new one. */
export function RebuildLoop() {
  return (
    <BrowserFrame url="northlinedental.si" className="aspect-[16/10] w-full max-w-3xl">
      <div className="absolute inset-0">
        <OldSite />
        <div className="rebuild-new absolute inset-0">
          <NewSite />
        </div>
        <div className="rebuild-scan pointer-events-none absolute inset-x-0 h-24 -translate-y-full">
          <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--midnight-ivory-warm)] shadow-[0_0_24px_4px_rgb(242_215_178/0.7)]" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-[rgb(242_215_178/0.18)]" />
        </div>
      </div>
    </BrowserFrame>
  );
}
