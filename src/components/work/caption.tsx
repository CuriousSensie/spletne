import type { Project } from "./projects";

/** Project caption that cross-fades when `index` changes (keyed remount + CSS rise-in). */
export function Caption({ project, index, total, dark = true }: { project: Project; index: number; total: number; dark?: boolean }) {
  return (
    <div key={index} className="rise-in grid gap-2">
      <p className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] uppercase ${dark ? "text-mist" : "text-ink/55"}`}>
        <span className="tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className={`h-px w-8 ${dark ? "bg-foam/25" : "bg-ink/25"}`} />
        <span>{project.tag}</span>
      </p>
      <p className="text-[clamp(1.8rem,5vw,3.75rem)] leading-[0.98] font-light tracking-[-0.045em]">{project.name}</p>
      <p className={`text-[15px] ${dark ? "text-foam/70" : "text-ink/65"}`}>{project.result}</p>
    </div>
  );
}
