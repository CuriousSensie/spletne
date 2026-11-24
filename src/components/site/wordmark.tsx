import Link from "next/link";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Spletne.com, domov"
      className={`font-serif text-[1.65rem] leading-none tracking-[-0.01em] italic outline-none focus-visible:outline-1 focus-visible:outline-offset-4 ${className}`}
    >
      Spletne.com
    </Link>
  );
}
