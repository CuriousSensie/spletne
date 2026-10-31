import { memo } from "react";
import { BrowserFrame, MobileSite, NewSite, type ThemeKey } from "@/components/props/mini-sites";

/** Memoised so per-frame scroll work on parent wrappers never re-renders the site markup. */
export const DesktopShot = memo(function DesktopShot({ theme, url, className = "" }: { theme: ThemeKey; url: string; className?: string }) {
  return (
    <BrowserFrame url={url} className={`size-full ${className}`}>
      <NewSite theme={theme} />
    </BrowserFrame>
  );
});

export const PhoneShot = memo(function PhoneShot({ theme, className = "" }: { theme: ThemeKey; className?: string }) {
  return (
    <div className={`relative aspect-[9/19] rounded-[1.6rem] bg-[#0b0f14] p-[5px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55),inset_0_0_0_1px_rgb(255_255_255/0.12)] ${className}`}>
      <div className="relative size-full overflow-hidden rounded-[1.3rem]">
        <MobileSite theme={theme} />
      </div>
      <span className="absolute top-[10px] left-1/2 h-3 w-12 -translate-x-1/2 rounded-full bg-black" />
    </div>
  );
});
