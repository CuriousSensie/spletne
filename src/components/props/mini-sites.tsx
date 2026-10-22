/**
 * Fake client websites used inside props. Sized in container-query units (cqw)
 * so they scale to whatever frame they're dropped into.
 */

export interface SiteTheme {
  name: string;
  headline: string;
  sub: string;
  cta: string;
  slot: string;
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  accentFg: string;
  hero: string;
  services: readonly [string, string, string];
  price: string;
}

export const THEMES = {
  dental: {
    name: "Northline Dental",
    headline: "Gentle care, booked in seconds.",
    sub: "Family dentistry in the heart of Ljubljana.",
    cta: "Book a visit",
    slot: "Next slot · Today 14:30",
    bg: "#f4efe6",
    fg: "#07172a",
    muted: "rgb(7 23 42 / 0.55)",
    accent: "#07172a",
    accentFg: "#f4f1e9",
    hero: "radial-gradient(circle at 30% 30%, #d8b5a4, transparent 55%), linear-gradient(135deg, #b8c9d8, #63485a)",
    services: ["Check-ups", "Whitening", "Emergency"],
    price: "From €40",
  },
  bistro: {
    name: "Osteria Lipa",
    headline: "Seasonal plates, tables tonight.",
    sub: "Wood-fired kitchen. Open Tue to Sun.",
    cta: "Reserve",
    slot: "4 tables left · 19:00",
    bg: "#1f1e28",
    fg: "#f4f1e9",
    muted: "rgb(244 241 233 / 0.55)",
    accent: "#ef7447",
    accentFg: "#1f1e28",
    hero: "radial-gradient(circle at 70% 30%, #ef7447, transparent 50%), linear-gradient(160deg, #63485a, #1f1e28)",
    services: ["Menu", "Private dining", "Gift cards"],
    price: "Tue–Sun",
  },
  salon: {
    name: "Atelier Mira",
    headline: "Colour, cut, and calm.",
    sub: "Hair studio by appointment.",
    cta: "See openings",
    slot: "Thu · 3 openings",
    bg: "#efe7e1",
    fg: "#2b2124",
    muted: "rgb(43 33 36 / 0.55)",
    accent: "#8a5a5f",
    accentFg: "#fff",
    hero: "radial-gradient(circle at 40% 60%, #f2d7b2, transparent 55%), linear-gradient(135deg, #d8b5a4, #8a5a5f)",
    services: ["Cut & style", "Colour", "Treatments"],
    price: "From €35",
  },
  studio: {
    name: "Kovač Arhitekti",
    headline: "Quiet buildings, made to last.",
    sub: "Architecture and interiors, Ljubljana.",
    cta: "Start a project",
    slot: "New: Villa Bohinj",
    bg: "#eef0ec",
    fg: "#16241f",
    muted: "rgb(22 36 31 / 0.55)",
    accent: "#2f5d50",
    accentFg: "#eef0ec",
    hero: "radial-gradient(circle at 70% 25%, #dfe6dc, transparent 50%), linear-gradient(160deg, #9fb3a6, #2f5d50)",
    services: ["Projects", "Process", "Studio"],
    price: "Since 2009",
  },
  law: {
    name: "Novak Legal",
    headline: "Clear advice when it matters.",
    sub: "Business and property law.",
    cta: "Book a call",
    slot: "Free 15-minute call",
    bg: "#f3f1ee",
    fg: "#1a1a24",
    muted: "rgb(26 26 36 / 0.55)",
    accent: "#3b3a6b",
    accentFg: "#fff",
    hero: "radial-gradient(circle at 30% 70%, #c9c6e0, transparent 55%), linear-gradient(135deg, #8f8cb8, #3b3a6b)",
    services: ["Business", "Property", "Family"],
    price: "Fixed fees",
  },
} satisfies Record<string, SiteTheme>;

export type ThemeKey = keyof typeof THEMES;

export function NewSite({ theme = "dental" }: { theme?: ThemeKey }) {
  const t = THEMES[theme];
  return (
    <div className="@container size-full overflow-hidden" style={{ background: t.bg, color: t.fg }}>
      <div className="flex h-full flex-col gap-[3cqw] p-[4cqw]">
        <nav className="flex items-center justify-between">
          <span className="text-[3.2cqw] font-semibold tracking-tight">{t.name}</span>
          <span className="flex items-center gap-[3cqw] text-[2.2cqw]" style={{ color: t.muted }}>
            <span>Services</span>
            <span>Team</span>
            <span
              className="rounded-full px-[2.4cqw] py-[1cqw] font-medium"
              style={{ background: t.accent, color: t.accentFg }}
            >
              {t.cta}
            </span>
          </span>
        </nav>
        <div className="grid min-h-0 flex-1 grid-cols-[1.25fr_1fr] items-center gap-[3cqw]">
          <div className="grid gap-[1.8cqw]">
            <p className="text-[5cqw] leading-[1.02] font-medium tracking-[-0.04em]">{t.headline}</p>
            <p className="text-[2.4cqw]" style={{ color: t.muted }}>
              {t.sub}
            </p>
            <div className="mt-[1cqw] flex gap-[1.6cqw] text-[2.2cqw] font-medium">
              <span className="rounded-full px-[3cqw] py-[1.4cqw]" style={{ background: t.accent, color: t.accentFg }}>
                {t.cta}
              </span>
              <span className="rounded-full border px-[3cqw] py-[1.4cqw]" style={{ borderColor: t.muted }}>
                Call us
              </span>
            </div>
          </div>
          <div className="relative h-full overflow-hidden rounded-[2cqw]" style={{ background: t.hero }}>
            <div className="hero-noise absolute inset-0" />
            <div
              className="absolute bottom-[2.4cqw] left-[2.4cqw] rounded-[1.4cqw] px-[2.2cqw] py-[1.4cqw] text-[2cqw] font-medium shadow-lg backdrop-blur"
              style={{ background: "rgb(255 255 255 / 0.82)", color: "#07172a" }}
            >
              {t.slot}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[2cqw]">
          {t.services.map((s) => (
            <div key={s} className="rounded-[1.6cqw] p-[2cqw]" style={{ background: "rgb(127 127 127 / 0.1)" }}>
              <p className="text-[2.2cqw] font-medium">{s}</p>
              <p className="mt-[0.6cqw] text-[1.8cqw]" style={{ color: t.muted }}>
                {t.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OldSite() {
  return (
    <div
      className="@container size-full overflow-hidden"
      style={{
        fontFamily: '"Times New Roman", Times, serif',
        background: "repeating-linear-gradient(45deg, #d4d0c8 0 2px, #c9c5bd 2px 4px)",
        color: "#000",
      }}
    >
      <div className="flex h-full flex-col gap-[2cqw] p-[2.5cqw]">
        <div className="border-[0.5cqw] border-[#000080] bg-[#000080] px-[2cqw] py-[1.4cqw] text-center">
          <p className="text-[4.6cqw] font-bold text-[#ffff00] italic">Welcome to Northline Dental!!!</p>
        </div>
        <div className="overflow-hidden bg-[#ffffcc] py-[0.6cqw] text-[2.2cqw] whitespace-nowrap text-[#cc0000]">
          <span className="old-marquee inline-block">
            *** NEW!!! We now accept online booking requests via email *** Call 01 555 0199 ***
          </span>
        </div>
        <p className="text-center text-[2.4cqw] text-[#0000ee] underline">
          Home | About Us | Services | Prices | Contact | Guestbook
        </p>
        <div className="grid flex-1 grid-cols-[1fr_1.4fr] gap-[2cqw]">
          <div className="grid place-items-center border-[0.4cqw] border-dashed border-[#808080] bg-[#e8e8e8] text-[2cqw] text-[#808080]">
            [ image.jpg ]
          </div>
          <div className="text-[2.3cqw] leading-[1.35]">
            <p className="font-bold">Our Practice</p>
            <p>
              We are a dental practice. We offer many services for the whole family. Please see the Services page
              for more information or call us during opening hours (see Contact page).
            </p>
            <p className="mt-[1cqw] text-[#ff0000] font-bold">Site under construction!</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-[1.8cqw]">
          <span className="border-[0.4cqw] border-t-white border-r-[#404040] border-b-[#404040] border-l-white bg-[#d4d0c8] px-[2cqw] py-[0.6cqw]">
            Click Here
          </span>
          <span>
            Visitors: <span className="bg-black px-[0.8cqw] font-mono text-[#00ff00]">000417</span>
          </span>
          <span className="italic">Best viewed in 800×600</span>
        </div>
      </div>
    </div>
  );
}

export function BrowserFrame({ url, children, className = "" }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-xl bg-[#101c29] shadow-[0_30px_80px_-20px_rgb(7_23_42/0.55)] ring-1 ring-white/10 ${className}`}>
      <div className="flex h-8 shrink-0 items-center gap-3 px-3">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </span>
        <span className="mx-auto max-w-[60%] flex-1 truncate rounded-md bg-white/[0.07] px-3 py-0.5 text-center text-[11px] text-white/55">
          {url}
        </span>
        <span className="w-10" />
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

/** Stacked phone layout of a client site. Fixed px sizes: intended for ~200px wide screens. */
export function MobileSite({ theme = "dental" }: { theme?: ThemeKey }) {
  const t = THEMES[theme];
  return (
    <div className="flex size-full flex-col gap-3 overflow-hidden px-3 pt-9 pb-3" style={{ background: t.bg, color: t.fg }}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-tight">{t.name}</span>
        <span className="grid gap-[3px]">
          <span className="h-px w-3.5 bg-current" />
          <span className="h-px w-3.5 bg-current" />
        </span>
      </div>
      <p className="text-[19px] leading-[1.02] font-medium tracking-[-0.04em] text-balance">{t.headline}</p>
      <p className="text-[9px]" style={{ color: t.muted }}>
        {t.sub}
      </p>
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl" style={{ background: t.hero }}>
        <div className="hero-noise absolute inset-0" />
        <span className="absolute bottom-2 left-2 rounded-md bg-white/85 px-1.5 py-1 text-[8px] font-medium text-[#07172a]">{t.slot}</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {["Services", "Prices"].map((s) => (
          <span key={s} className="rounded-lg px-2 py-1.5 text-[9px] font-medium" style={{ background: "rgb(127 127 127 / 0.14)" }}>
            {s}
          </span>
        ))}
      </div>
      <span className="rounded-full py-2 text-center text-[10px] font-medium" style={{ background: t.accent, color: t.accentFg }}>
        {t.cta}
      </span>
    </div>
  );
}
