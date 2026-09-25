import { isCouncilId } from "@/councils/registry";
import { collapseWhitespace, validateDecision } from "@/engine/signals";
import type { CouncilId, DecisionInput } from "@/types/decision";

export function buildSharePath(councilId: CouncilId, decision: string): string {
  const params = new URLSearchParams({
    c: councilId,
    q: collapseWhitespace(decision),
  });
  return `/?${params.toString()}`;
}

export function absoluteShareUrl(councilId: CouncilId, decision: string): string {
  return `${window.location.origin}${buildSharePath(councilId, decision)}`;
}

export function rememberShareUrl(councilId: CouncilId, decision: string): void {
  window.history.replaceState(null, "", buildSharePath(councilId, decision));
}

export function clearShareUrl(): void {
  window.history.replaceState(null, "", "/");
}

export function parseShareSearch(search: string): DecisionInput | null {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const councilId = params.get("c");
  const decision = params.get("q");
  if (!councilId || !decision || !isCouncilId(councilId)) {
    return null;
  }
  if (validateDecision(decision)) {
    return null;
  }
  return { councilId, text: collapseWhitespace(decision) };
}
