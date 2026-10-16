export function Quote() {
  return (
    <section className="relative overflow-hidden bg-[#07172a] py-32 md:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 -inset-y-40 bg-[radial-gradient(circle_at_25%_30%,rgba(216,181,164,0.4),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(99,72,90,0.7),transparent_55%),linear-gradient(160deg,#162936,#1f1e28)]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[#1f1e28]/40" aria-hidden="true" />
      <div className="brief-section-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="brief-grain" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start gap-6 lg:col-span-3">
            <a
              href="#faq"
              className="group inline-flex w-fit items-center gap-2 text-base font-medium text-[#f4f1e9]/82 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] outline-none hover:text-[#f4f1e9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4f1e9] motion-reduce:transition-none sm:whitespace-nowrap"
            >
              <span className="underline decoration-[#f4f1e9]/42 decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--duration-fast)] group-hover:decoration-[#f4f1e9]/80 motion-reduce:transition-none">
                Read why we built Bespoke
              </span>
              <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <blockquote className="w-full lg:col-span-6 lg:col-start-7">
            <p className="relative w-full text-xl font-medium tracking-tight text-balance text-[#f4f1e9] before:absolute before:-translate-x-full before:content-['\201C'] after:content-['\201D'] sm:text-[1.625rem]/8">
              A website should earn your trust before it ever asks for your money. So we show you the work first, and
              let you decide.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
