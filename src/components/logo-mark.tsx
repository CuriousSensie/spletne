interface LogoMarkProps {
  className?: string;
}

/** Original Spletne monogram: a rounded square with a plus. */
export function LogoMark({ className = "size-4" }: LogoMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <rect height="18" rx="5" width="18" x="3" y="3" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}
