"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArtifactFrame } from "@/components/chrome/ArtifactFrame";
import { PixelCross } from "@/components/chrome/marks";
import { CouncilPicker } from "@/components/experience/CouncilPicker";
import { DecisionForm } from "@/components/experience/DecisionForm";
import { Deliberation } from "@/components/experience/Deliberation";
import { VerdictView } from "@/components/experience/VerdictView";
import { getCouncil } from "@/councils/registry";
import { deliberate } from "@/engine/deliberate";
import { validateDecision } from "@/engine/signals";
import { STATUS } from "@/lib/chrome";
import { clearDraft, readDraft, writeDraft } from "@/lib/draft";
import { clearShareUrl, parseShareSearch, rememberShareUrl } from "@/lib/share";
import type { Council } from "@/types/council";
import type { CouncilId } from "@/types/decision";
import type { Verdict } from "@/types/verdict";

type Phase = "ask" | "council" | "deliberating" | "verdict";

interface Session {
  phase: Phase;
  decision: string;
  councilId: CouncilId | null;
  verdict: Verdict | null;
  status: string;
}

function emptyAsk(decision = ""): Session {
  return {
    phase: "ask",
    decision,
    councilId: null,
    verdict: null,
    status: STATUS.awaiting,
  };
}

function sessionFromSearch(search: string): Session {
  const parsed = parseShareSearch(search);
  if (!parsed) {
    return emptyAsk();
  }
  clearDraft();
  return {
    phase: "verdict",
    decision: parsed.text,
    councilId: parsed.councilId,
    verdict: deliberate(parsed),
    status: STATUS.stamped,
  };
}

function sessionFromBoot(search: string): Session {
  const parsed = parseShareSearch(search);
  if (parsed) {
    return sessionFromSearch(search);
  }
  const draft = readDraft();
  if (!draft) {
    return emptyAsk();
  }
  if (draft.phase === "council" && !validateDecision(draft.decision)) {
    return {
      phase: "council",
      decision: draft.decision,
      councilId: null,
      verdict: null,
      status: STATUS.select,
    };
  }
  return emptyAsk(draft.decision);
}

export function DecisionExperience() {
  const searchParams = useSearchParams();
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session>(sessionFromSearch(""));
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bootstrapped = useRef(false);

  useEffect(() => {
    if (bootstrapped.current) {
      return;
    }
    bootstrapped.current = true;
    setSession(sessionFromBoot(searchParams.toString()));
    setReady(true);
  }, [searchParams]);

  useEffect(() => {
    if (!ready || (session.phase !== "ask" && session.phase !== "council")) {
      return;
    }
    writeDraft(session.decision, session.phase);
  }, [ready, session.phase, session.decision]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    if (session.phase === "ask") {
      document.getElementById("decision")?.focus();
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [ready, session.phase]);

  const finishDeliberation = useCallback(() => {
    setSession((current) => ({ ...current, phase: "verdict", status: STATUS.stamped }));
  }, []);

  function submitDecision() {
    const issue = validateDecision(session.decision);
    if (issue === "short") {
      setSession((current) => ({ ...current, status: STATUS.short }));
      document.getElementById("decision")?.focus();
      return;
    }
    if (issue === "long") {
      setSession((current) => ({ ...current, status: STATUS.long }));
      document.getElementById("decision")?.focus();
      return;
    }
    setSession((current) => ({ ...current, phase: "council", status: STATUS.select }));
  }

  function convene() {
    if (!session.councilId) {
      setSession((current) => ({ ...current, status: STATUS.select }));
      return;
    }
    const verdict = deliberate({ text: session.decision, councilId: session.councilId });
    clearDraft();
    rememberShareUrl(session.councilId, verdict.decision);
    setSession((current) => ({
      ...current,
      decision: verdict.decision,
      verdict,
      phase: "deliberating",
      status: STATUS.processing,
    }));
  }

  const council: Council | null = session.councilId ? getCouncil(session.councilId) : null;
  const rail = railFor(session.phase, council);

  if (!ready) {
    return (
      <ArtifactFrame status={STATUS.booting}>
        <p className="px-4 py-10 font-mono text-sm uppercase">
          Loading system
          <span className="blink">_</span>
        </p>
      </ArtifactFrame>
    );
  }

  return (
    <ArtifactFrame status={session.status} rail={rail}>
      {session.phase === "ask" ? (
        <DecisionForm
          value={session.decision}
          status={session.status}
          headingRef={headingRef}
          onChange={(decision) => setSession((current) => ({ ...current, decision, status: STATUS.awaiting }))}
          onSubmit={submitDecision}
        />
      ) : null}
      {session.phase === "council" ? (
        <CouncilPicker
          decision={session.decision}
          selected={session.councilId}
          headingRef={headingRef}
          onSelect={(councilId) => setSession((current) => ({ ...current, councilId }))}
          onConvene={convene}
          onRevise={() => setSession((current) => ({ ...current, phase: "ask", status: STATUS.awaiting }))}
        />
      ) : null}
      {session.phase === "deliberating" && council ? (
        <Deliberation councilName={council.name} headingRef={headingRef} onComplete={finishDeliberation} />
      ) : null}
      {session.phase === "verdict" && session.verdict && council ? (
        <VerdictView
          verdict={session.verdict}
          council={council}
          headingRef={headingRef}
          onCopied={(ok) => setSession((current) => ({ ...current, status: ok ? STATUS.copied : STATUS.copyFailed }))}
          onNew={() => {
            clearDraft();
            clearShareUrl();
            setSession({
              phase: "ask",
              decision: "",
              councilId: null,
              verdict: null,
              status: STATUS.awaiting,
            });
          }}
        />
      ) : null}
    </ArtifactFrame>
  );
}

function railFor(phase: Phase, council: Council | null) {
  if (phase === "verdict") {
    return undefined;
  }
  if (phase === "council") {
    if (!council) {
      return (
        <div className="font-mono text-[11px] uppercase leading-relaxed tracking-wide">
          <p>Readme</p>
          <p className="mt-3">No panel selected</p>
        </div>
      );
    }
    return (
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em]">Readme / {council.index}</p>
        <h2 className="mt-3 font-ui text-lg font-bold">{council.name}</h2>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-accent">{council.stamp}</p>
        <p className="mt-3 font-ui text-sm leading-relaxed">{council.blurb}</p>
      </div>
    );
  }
  if (phase === "deliberating") {
    return (
      <div className="font-mono text-[11px] uppercase leading-relaxed tracking-wide">
        <p>Proc. 02</p>
        <p className="mt-3">Local clock</p>
        <p>No network</p>
      </div>
    );
  }
  return (
    <div className="font-mono text-[11px] uppercase leading-relaxed tracking-wide">
      <p className="flex items-center gap-2">
        <PixelCross />
        Specimen
      </p>
      <p className="mt-3">Engine .... local</p>
      <p>Net ....... none</p>
      <p>Fee ....... 000</p>
      <p>Seed ...... browser</p>
      <p className="mt-6 text-ink-soft">
        X:004
        <br />
        Y:128
      </p>
    </div>
  );
}
