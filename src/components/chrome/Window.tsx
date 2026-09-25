import type { ReactNode } from "react";

export function Window({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`border border-ink bg-sheet ${className}`}>
      <header className="flex items-center justify-between gap-3 border-b border-ink bg-ink px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-paper">
        <span>{title}</span>
        <span aria-hidden="true" className="flex gap-1">
          <i className="block size-2 border border-paper" />
          <i className="block size-2 border border-paper" />
          <i className="block size-2 border border-paper bg-paper" />
        </span>
      </header>
      <div className="p-3 sm:p-4">{children}</div>
    </section>
  );
}
