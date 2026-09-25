"use client";

import { useSyncExternalStore } from "react";
import { BevelButton } from "@/components/chrome/BevelButton";
import { absoluteShareUrl } from "@/lib/share";
import type { CouncilId } from "@/types/decision";
import type { Verdict } from "@/types/verdict";

function subscribeToShare() {
  return () => {};
}

function shareAvailable() {
  return typeof navigator.share === "function";
}

function shareUnavailable() {
  return false;
}

export function ShareActions({
  verdict,
  councilId,
  decision,
  onCopied,
  onNew,
}: {
  verdict: Verdict;
  councilId: CouncilId;
  decision: string;
  onCopied: (ok: boolean) => void;
  onNew: () => void;
}) {
  const canShare = useSyncExternalStore(subscribeToShare, shareAvailable, shareUnavailable);

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      onCopied(true);
    } catch {
      onCopied(false);
    }
  }

  async function share() {
    try {
      await navigator.share({
        title: "UNHINGED",
        text: verdict.shareText,
        url: absoluteShareUrl(councilId, decision),
      });
    } catch {
      // The user dismissed the sheet. Leave the verdict where it is.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 px-1 pt-3">
      <BevelButton type="button" onClick={() => copy(absoluteShareUrl(councilId, decision))}>
        [ Copy link ]
      </BevelButton>
      <BevelButton type="button" onClick={() => copy(verdict.shareText)}>
        [ Copy text ]
      </BevelButton>
      {canShare ? (
        <BevelButton type="button" onClick={share}>
          [ Share ]
        </BevelButton>
      ) : null}
      <button
        type="button"
        onClick={onNew}
        className="min-h-11 font-mono text-xs uppercase underline decoration-1 underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        ← New decision
      </button>
    </div>
  );
}
