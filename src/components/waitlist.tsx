"use client";

import { useState } from "react";

type Status = "idle" | "submitted";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    // TODO: wire to a real endpoint (no backend exists yet).
    setStatus("submitted");
  };

  return (
    <section id="waitlist" className="relative overflow-hidden bg-[#07172a] pt-16 pb-8 text-[#f4f1e9] md:pt-20 md:pb-10">
      <div className="pointer-events-none absolute inset-[-2rem] scale-105 opacity-90 blur-[6px]" aria-hidden="true">
        <div className="ambient-drift absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(205,189,168,0.45),transparent_40%),radial-gradient(ellipse_at_75%_70%,rgba(239,116,71,0.2),transparent_45%),linear-gradient(135deg,#18202a,#07172a_54%,#12151b)]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_50%,rgba(3,11,21,0.28),transparent_34%),radial-gradient(ellipse_at_82%_50%,rgba(3,11,21,0.22),transparent_30%),linear-gradient(180deg,rgba(3,11,21,0.04)_0%,rgba(3,11,21,0.1)_100%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex w-full max-w-[88rem] flex-col gap-16 px-5 sm:px-8 md:gap-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6">
            <h2 className="max-w-[30ch] text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Ready to see your website?
            </h2>
          </div>
          <div className="min-w-0 lg:col-span-5 lg:col-start-8">
            <div className="min-h-12">
              {status === "submitted" ? (
                <p role="status" className="w-full max-w-lg rounded-full bg-black/18 px-5 py-3 text-base ring-1 ring-white/16 backdrop-blur-sm sm:text-sm lg:ml-auto">
                  Thanks. We’ll be in touch shortly.
                </p>
              ) : (
                <form onSubmit={onSubmit} noValidate className="w-full max-w-lg lg:ml-auto">
                  <div className="relative flex min-h-12 items-center rounded-full bg-black/18 ring-1 ring-white/16 backdrop-blur-sm focus-within:ring-white/40">
                    <label htmlFor="waitlist-email" className="sr-only">
                      Your email
                    </label>
                    <input
                      id="waitlist-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={error !== null}
                      aria-describedby={error ? "waitlist-error" : undefined}
                      className="min-w-0 flex-1 bg-transparent px-4 pr-36 text-base text-[#f4f1e9] outline-none placeholder:text-white/42 sm:text-sm"
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-1 right-1 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-linear-to-br from-[var(--midnight-ivory)] to-[var(--midnight-ivory-warm)] py-2 pr-3 pl-3.5 text-base font-medium text-[#07172a] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-[#07172a]/6 sm:text-[0.8125rem]"
                    >
                      <span className="sm:hidden">Join</span>
                      <span className="max-sm:hidden">Show me my website</span>
                      <svg aria-hidden="true" className="size-3" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  {error && (
                    <p id="waitlist-error" role="alert" className="px-4 pt-2 text-sm text-[#f2a58f]">
                      {error}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        <footer className="flex flex-col gap-5 border-t border-white/12 pt-7 text-base text-white/48 sm:flex-row sm:items-center sm:justify-between sm:text-[0.8125rem]">
          <p>© 2026 Spletne · Ljubljana, SI</p>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6">
            <a href="#" className="font-normal transition-colors duration-[var(--duration-fast)] hover:text-white/78 motion-reduce:transition-none">
              Privacy Policy
            </a>
            <a href="#" className="font-normal transition-colors duration-[var(--duration-fast)] hover:text-white/78 motion-reduce:transition-none">
              Terms of Service
            </a>
          </nav>
        </footer>
      </div>
    </section>
  );
}
