import type { Ref } from "react";
import { PixelStar } from "@/components/chrome/marks";
import { Stamp } from "@/components/chrome/Stamp";
import { Window } from "@/components/chrome/Window";
import { ShareActions } from "@/components/experience/ShareActions";
import type { Council } from "@/types/council";
import { ROLE_LABEL, STANCE_LABEL, type Verdict } from "@/types/verdict";

export function VerdictView({
  verdict,
  council,
  onCopied,
  onNew,
  headingRef,
}: {
  verdict: Verdict;
  council: Council;
  onCopied: (ok: boolean) => void;
  onNew: () => void;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  return (
    <div className="px-3 py-4 sm:px-5">
      <Window title={`CASE FILE / ${verdict.caseId}`}>
        <article aria-live="polite" className="border border-ink bg-paper">
          <div className="flex items-start justify-between gap-4 border-b border-ink px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
                <PixelStar />
                {verdict.caseId}
              </p>
              <p className="mt-2 max-w-xl font-ui text-base leading-snug break-words">Re: {verdict.decision}</p>
            </div>
            <Stamp>{STANCE_LABEL[verdict.stance]}</Stamp>
          </div>
          <div className="px-4 py-6 sm:px-8 sm:py-8">
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="max-w-[16ch] pb-1 font-poster text-[clamp(2.5rem,6.2vw,4.6rem)] leading-[0.92] break-words uppercase outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {verdict.headline}
            </h1>
            <p className="mt-6 max-w-xl font-ui text-base leading-relaxed">{verdict.summary}</p>
          </div>
          <ol>
            {verdict.reasons.map((reason, index) => (
              <li key={reason.role} className="border-t border-ink px-4 py-4 sm:px-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em]">
                  {String(index + 1).padStart(2, "0")} {ROLE_LABEL[reason.role]}
                </p>
                <h2 className="mt-1 font-ui text-base font-bold">{reason.title}</h2>
                <p className="mt-1 max-w-xl font-ui text-sm leading-relaxed">{reason.body}</p>
              </li>
            ))}
          </ol>
          <div className="border-t border-ink px-4 py-4 sm:px-8">
            <p className="font-mono text-[12px] uppercase tracking-wide">{verdict.closing}</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              {council.index} / {council.name} / ref 1999–2026
            </p>
          </div>
        </article>
        <ShareActions
          verdict={verdict}
          councilId={council.id}
          decision={verdict.decision}
          onCopied={onCopied}
          onNew={onNew}
        />
      </Window>
    </div>
  );
}
