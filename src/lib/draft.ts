const DRAFT_KEY = "unhinged-draft";

export type DraftPhase = "ask" | "council";

export interface Draft {
  decision: string;
  phase: DraftPhase;
}

export function readDraft(): Draft | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<Draft>;
    if (typeof parsed.decision !== "string" || (parsed.phase !== "ask" && parsed.phase !== "council")) {
      return null;
    }
    return { decision: parsed.decision, phase: parsed.phase };
  } catch {
    return null;
  }
}

export function writeDraft(decision: string, phase: DraftPhase): void {
  try {
    if (!decision.trim()) {
      sessionStorage.removeItem(DRAFT_KEY);
      return;
    }
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ decision, phase }));
  } catch {
    // Storage can be blocked. The in-memory session still works for this visit.
  }
}

export function clearDraft(): void {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // Nothing to clear if storage is blocked.
  }
}
