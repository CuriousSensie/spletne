import { home } from "@/content/home";
import { EmTitle } from "./em-title";
import { InquiryTrigger } from "./inquiry-context";
import { H2 } from "./styles";

const t = home.more.cta;

/** Closing call to action of the inner page. */
export function MoreCta() {
  return (
    <section aria-labelledby="more-cta-title" className="relative bg-ink text-foam">
      <div className="mx-auto grid max-w-[96rem] gap-8 border-t border-foam/12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:items-end lg:gap-x-12 lg:px-12 lg:py-32">
        <div className="grid content-start gap-5 lg:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">{t.label}</p>
          <h2 id="more-cta-title" className={`max-w-[20ch] ${H2}`}>
            <EmTitle title={t.title} />
          </h2>
        </div>
        <div className="grid content-end gap-6 lg:col-span-5">
          <p className="max-w-[40ch] text-[16px] leading-snug text-foam/70 sm:text-[17px]">{t.body}</p>
          <InquiryTrigger className="group inline-flex h-14 items-center justify-between gap-3 self-start justify-self-start rounded-full bg-foam pr-2 pl-6 text-[15px] font-medium text-ink transition-transform active:scale-[0.98]">
            {t.button}
            <span className="grid size-10 place-items-center rounded-full bg-ink text-foam transition-transform duration-300 group-hover:translate-x-0.5">
              <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </InquiryTrigger>
        </div>
      </div>
    </section>
  );
}
