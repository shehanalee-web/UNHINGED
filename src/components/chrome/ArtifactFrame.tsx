import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BEST_VIEWED, COPYRIGHT, DECORATIVE_LINKS, VISITOR_COUNT } from "@/lib/chrome";

export function StatusStrip({ status }: { status: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-ink px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em]">
      <span aria-hidden="true">{BEST_VIEWED}</span>
      <span aria-hidden="true" className="inline-flex items-center gap-1">
        <i className="block size-1.5 bg-acid" />
        <i className="blink inline-block h-3 w-2 bg-ink" />
      </span>
      <span id="system-status" role="status" aria-live="polite">
        {status}
      </span>
      <span aria-hidden="true" className="sm:ml-auto">
        VISITORS: {VISITOR_COUNT}
        <span className="text-hot">*</span>
      </span>
    </div>
  );
}

export function ArtifactFrame({
  status,
  children,
  rail,
}: {
  status: string;
  children: ReactNode;
  rail?: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-paper px-3 py-3 text-ink sm:px-4 lg:px-6 lg:py-6">
      <div className="mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-[1024px] flex-col border border-ink bg-paper lg:min-h-[calc(100dvh-3rem)]">
        <StatusStrip status={status} />
        <AppHeader />
        <div className={rail ? "lg:grid lg:flex-1 lg:grid-cols-12" : "flex-1"}>
          <div className={rail ? "lg:col-span-8" : undefined}>{children}</div>
          {rail ? (
            <aside className="relative hidden min-[720px]:block border-t border-ink lg:col-span-4 lg:border-t-0 lg:border-l">
              <div aria-hidden="true" className="halftone-patch absolute top-3 right-3 hidden lg:block" />
              <div className="relative p-4">{rail}</div>
            </aside>
          ) : null}
        </div>
        <footer className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-ink px-3 py-2 font-mono text-[11px] uppercase">
  <span>{COPYRIGHT}</span>

  <a
    href="https://ko-fi.com/askthecouncil"
    target="_blank"
    rel="noreferrer"
    className="underline decoration-dotted underline-offset-4"
  >
    [ FEED THE COUNCIL ]
  </a>
  </footer>
</div>
</div>
);
}