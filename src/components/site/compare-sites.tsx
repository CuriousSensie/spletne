import Image from "next/image";

/**
 * Before/after pages for the compare slider: the same restaurant, as a believable 2013 WordPress site
 * and as the site we'd build today. Sized in container-query units so they scale to any frame.
 * English placeholder copy; the collaborator will localise it.
 */

const NAME = "Osteria Lipa";

/* ------------------------------------------------------------------ */
/* Before                                                              */
/* ------------------------------------------------------------------ */

export function OldRestaurant() {
  return (
    <div className="@container size-full overflow-hidden bg-[#e7e1d3]" style={{ fontFamily: "Verdana, Geneva, sans-serif", color: "#444" }}>
      <div className="mx-auto flex h-full w-[94%] flex-col bg-white shadow-[0_0_1.2cqw_rgb(0_0_0/0.25)]">
        {/* Header */}
        <div className="flex items-end justify-between px-[2.2cqw] pt-[1.8cqw] pb-[1.2cqw]">
          <div>
            <p className="text-[3.6cqw] leading-none text-[#8b1a1a] italic" style={{ fontFamily: "Georgia, serif" }}>
              {NAME}
            </p>
            <p className="mt-[0.5cqw] text-[1.15cqw] text-[#888]">Italian Restaurant &amp; Pizzeria · since 1998</p>
          </div>
          <div className="text-right text-[1.2cqw] leading-snug">
            <p className="font-bold text-[#8b1a1a]">Call us: 01 234 56 78</p>
            <p className="text-[#888]">Reservations welcome!</p>
          </div>
        </div>
        {/* Glossy nav */}
        <div className="flex border-y border-[#5a0d0d] bg-[linear-gradient(#b23a3a,#7a1414_55%,#6b1010)] text-[1.15cqw] font-bold text-white" style={{ fontFamily: "Arial, sans-serif" }}>
          {["HOME", "ABOUT US", "MENU", "GALLERY", "EVENTS", "CONTACT"].map((n, i) => (
            <span key={n} className={`border-r border-[#5a0d0d] px-[1.8cqw] py-[0.9cqw] ${i === 0 ? "bg-[#5a0d0d]" : ""}`}>
              {n}
            </span>
          ))}
        </div>
        {/* Slider */}
        <div className="relative mx-[1.6cqw] mt-[1.4cqw] h-[34%] overflow-hidden border-[0.35cqw] border-[#ddd]">
          <Image src="/compare/old-slider.jpg" alt="" fill sizes="40vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-black/60 px-[1.6cqw] py-[1cqw] text-white">
            <p className="text-[1.9cqw] font-bold" style={{ fontFamily: "Georgia, serif" }}>
              Welcome to {NAME}!
            </p>
            <p className="text-[1.1cqw]">Try our NEW summer menu – now with homemade pizza!</p>
          </div>
          <span className="absolute top-1/2 left-[1cqw] -translate-y-1/2 bg-black/50 px-[0.8cqw] text-[2cqw] text-white">‹</span>
          <span className="absolute top-1/2 right-[1cqw] -translate-y-1/2 bg-black/50 px-[0.8cqw] text-[2cqw] text-white">›</span>
          <span className="absolute right-[1.4cqw] bottom-[1.4cqw] flex gap-[0.5cqw]">
            {[0, 1, 2, 3].map((d) => (
              <span key={d} className={`size-[0.8cqw] rounded-full ${d === 0 ? "bg-white" : "bg-white/45"}`} />
            ))}
          </span>
        </div>
        {/* Three columns */}
        <div className="grid min-h-0 flex-1 grid-cols-[1.25fr_1fr_1fr] gap-[1.6cqw] px-[1.6cqw] pt-[1.4cqw] text-[1.05cqw] leading-[1.45]">
          <div>
            <p className="mb-[0.6cqw] border-b border-dotted border-[#bbb] pb-[0.4cqw] text-[1.5cqw] text-[#8b1a1a]" style={{ fontFamily: "Georgia, serif" }}>
              Welcome
            </p>
            <p>
              Welcome to the official website of {NAME}! We are a family restaurant located in the center of Ljubljana. Our restaurant offers a wide
              selection of Italian dishes, pizzas, pastas, salads and desserts. We use only the freshest ingredients. Please feel free to visit us or
              contact us for more information. <span className="text-[#0645ad] underline">Read more »</span>
            </p>
          </div>
          <div>
            <p className="mb-[0.6cqw] border-b border-dotted border-[#bbb] pb-[0.4cqw] text-[1.5cqw] text-[#8b1a1a]" style={{ fontFamily: "Georgia, serif" }}>
              Latest News
            </p>
            {[
              ["12.03.2014", "Easter menu is here!"],
              ["02.12.2013", "Christmas party bookings"],
              ["15.06.2013", "Summer terrace now open"],
            ].map(([d, t]) => (
              <p key={d} className="mb-[0.5cqw]">
                <span className="text-[#999]">{d}</span> – <span className="text-[#0645ad] underline">{t}</span>
              </p>
            ))}
            <div className="mt-[0.8cqw] border border-[#3b5998] text-[0.95cqw]">
              <p className="bg-[#3b5998] px-[0.6cqw] py-[0.3cqw] font-bold text-white" style={{ fontFamily: "Arial, sans-serif" }}>
                Find us on Facebook
              </p>
              <p className="px-[0.6cqw] py-[0.4cqw]">
                <span className="bg-[#eceff5] px-[0.5cqw] text-[#3b5998]">👍 Like</span> 213 people like this.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-[0.6cqw] border-b border-dotted border-[#bbb] pb-[0.4cqw] text-[1.5cqw] text-[#8b1a1a]" style={{ fontFamily: "Georgia, serif" }}>
              Opening Hours
            </p>
            <table className="w-full">
              <tbody>
                {[
                  ["Mon – Fri", "11:00 – 22:00"],
                  ["Saturday", "12:00 – 23:00"],
                  ["Sunday", "12:00 – 21:00"],
                ].map(([d, h]) => (
                  <tr key={d}>
                    <td className="py-[0.2cqw]">{d}</td>
                    <td className="py-[0.2cqw] text-right">{h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-[0.8cqw] text-[#888] italic">Closed on public holidays.</p>
          </div>
        </div>
        <div className="mt-auto bg-[#333] px-[1.6cqw] py-[0.8cqw] text-[0.95cqw] text-[#aaa]">
          © 2013 {NAME} · All rights reserved · Powered by WordPress
        </div>
      </div>
    </div>
  );
}

/** The dated desktop site on a phone: zoomed out, tiny, with blank space below. */
export function OldRestaurantOnPhone() {
  return (
    <div className="flex size-full flex-col bg-[#e7e1d3] pt-10">
      <div className="aspect-[16/11] w-full">
        <OldRestaurant />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* After                                                               */
/* ------------------------------------------------------------------ */

const MENU = [
  ["Tagliatelle al ragù", "16"],
  ["Burrata, peach, basil", "12"],
  ["Tiramisù della casa", "7"],
] as const;

const TIMES = ["19:00", "19:30", "21:00"] as const;

function Reserve({ className = "" }: { className?: string }) {
  return <span className={`inline-flex items-center rounded-full bg-[#e2b07a] font-medium text-[#1b1410] ${className}`}>Reserve a table</span>;
}

export function NewRestaurant() {
  return (
    <div className="@container relative size-full overflow-hidden bg-[#14100d] text-[#f3ece2]">
      {/* Hero */}
      <div className="relative h-[66%]">
        <Image src="/compare/plate.webp" alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover object-[50%_60%]" priority={false} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(20_16_13/0.88),rgb(20_16_13/0.35)_55%,rgb(20_16_13/0.1)),linear-gradient(0deg,rgb(20_16_13/0.9),transparent_45%)]" />
        <nav className="absolute inset-x-0 top-0 flex items-center justify-between px-[3.5cqw] py-[2.4cqw]">
          <span className="font-serif text-[2.8cqw] italic">Lipa</span>
          <span className="flex items-center gap-[2.6cqw] text-[1.35cqw] text-[#f3ece2]/75">
            <span>Menu</span>
            <span>Our story</span>
            <span>Visit</span>
            <Reserve className="px-[1.8cqw] py-[0.8cqw] text-[1.35cqw]" />
          </span>
        </nav>
        <div className="absolute bottom-[3cqw] left-[3.5cqw] max-w-[52%]">
          <p className="text-[1.15cqw] tracking-[0.2em] text-[#e2b07a] uppercase">Osteria · Ljubljana old town</p>
          <p className="mt-[1cqw] font-serif text-[6.2cqw] leading-[0.95] tracking-[-0.02em]">
            Fresh pasta,
            <br />
            <em>made this morning.</em>
          </p>
          <div className="mt-[2cqw] flex items-center gap-[1.4cqw] text-[1.45cqw]">
            <Reserve className="px-[2.4cqw] py-[1.1cqw]" />
            <span className="rounded-full px-[2.2cqw] py-[1.05cqw] ring-1 ring-[#f3ece2]/40">See the menu</span>
          </div>
        </div>
        {/* Tonight card */}
        <div className="absolute right-[3.5cqw] bottom-[3cqw] w-[26%] rounded-[1.4cqw] bg-[#14100d]/55 p-[1.6cqw] ring-1 ring-white/15 backdrop-blur-md">
          <p className="text-[1.1cqw] tracking-[0.16em] text-[#e2b07a] uppercase">Tonight</p>
          <p className="mt-[0.4cqw] text-[1.6cqw]">4 tables left</p>
          <div className="mt-[1cqw] flex gap-[0.7cqw] text-[1.25cqw]">
            {TIMES.map((t, i) => (
              <span key={t} className={`rounded-full px-[1.1cqw] py-[0.5cqw] ${i === 0 ? "bg-[#f3ece2] text-[#14100d]" : "ring-1 ring-white/25"}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Below the fold */}
      <div className="grid h-[34%] grid-cols-[1.15fr_1fr_0.9fr] gap-[2.4cqw] px-[3.5cqw] py-[2.6cqw]">
        <div>
          <p className="text-[1.1cqw] tracking-[0.18em] text-[#f3ece2]/50 uppercase">From the menu</p>
          <div className="mt-[1cqw] grid gap-[0.7cqw]">
            {MENU.map(([d, p]) => (
              <p key={d} className="flex items-baseline gap-[0.8cqw] text-[1.55cqw]">
                <span>{d}</span>
                <span className="mb-[0.3cqw] h-px flex-1 border-b border-dotted border-[#f3ece2]/25" />
                <span className="text-[#e2b07a] tabular-nums">€{p}</span>
              </p>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[1.2cqw]">
          <Image src="/compare/dining.webp" alt="" fill sizes="25vw" className="object-cover" />
        </div>
        <div>
          <p className="text-[1.1cqw] tracking-[0.18em] text-[#f3ece2]/50 uppercase">Open</p>
          <p className="mt-[1cqw] text-[1.55cqw] leading-snug">
            Tue – Sun
            <br />
            12:00 – 23:00
          </p>
          <p className="mt-[1cqw] text-[1.3cqw] text-[#f3ece2]/60">Mestni trg 12, Ljubljana</p>
        </div>
      </div>
    </div>
  );
}

export function NewRestaurantMobile() {
  return (
    <div className="@container relative flex size-full flex-col overflow-hidden bg-[#14100d] text-[#f3ece2]">
      <div className="relative h-[58%] shrink-0">
        <Image src="/compare/plate.webp" alt="" fill sizes="300px" className="object-cover object-[45%_60%]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#14100d,rgb(20_16_13/0.25)_55%,rgb(20_16_13/0.55))]" />
        <nav className="absolute inset-x-0 top-0 flex items-center justify-between px-[6cqw] pt-[14cqw]">
          <span className="font-serif text-[7cqw] italic">Lipa</span>
          <span className="flex flex-col gap-[1.2cqw]">
            <span className="h-[0.6cqw] w-[6cqw] bg-[#f3ece2]" />
            <span className="h-[0.6cqw] w-[6cqw] bg-[#f3ece2]" />
          </span>
        </nav>
        <div className="absolute inset-x-[6cqw] bottom-[4cqw]">
          <p className="text-[3cqw] tracking-[0.18em] text-[#e2b07a] uppercase">Ljubljana old town</p>
          <p className="mt-[2cqw] font-serif text-[10.5cqw] leading-[0.95]">
            Fresh pasta,
            <br />
            <em>made this morning.</em>
          </p>
        </div>
      </div>
      <div className="grid gap-[4cqw] px-[6cqw] pt-[3cqw]">
        <div>
          <p className="text-[3cqw] tracking-[0.16em] text-[#e2b07a] uppercase">Tonight · 4 tables left</p>
          <div className="mt-[2cqw] flex gap-[2cqw] text-[3.6cqw]">
            {TIMES.map((t, i) => (
              <span key={t} className={`rounded-full px-[3.2cqw] py-[1.4cqw] ${i === 0 ? "bg-[#f3ece2] text-[#14100d]" : "ring-1 ring-white/25"}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-[1.6cqw]">
          {MENU.slice(0, 2).map(([d, p]) => (
            <p key={d} className="flex items-baseline gap-[2cqw] text-[4cqw]">
              <span>{d}</span>
              <span className="mb-[0.8cqw] h-px flex-1 border-b border-dotted border-[#f3ece2]/25" />
              <span className="text-[#e2b07a]">€{p}</span>
            </p>
          ))}
        </div>
      </div>
      {/* Sticky booking bar */}
      <div className="absolute inset-x-[4cqw] bottom-[4cqw]">
        <Reserve className="w-full justify-center py-[3.6cqw] text-[4.2cqw]" />
      </div>
    </div>
  );
}
