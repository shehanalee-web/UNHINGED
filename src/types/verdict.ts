import type { CouncilId, DecisionSignals, Domain, Stance } from "@/types/decision";

export type ReasoningRole = "observation" | "principle" | "consequence";

export const ROLE_LABEL: Record<ReasoningRole, string> = {
  observation: "OBSERVATION",
  principle: "PRINCIPLE",
  consequence: "CONSEQUENCE",
};

export const STANCE_LABEL: Record<Stance, string> = {
  yes: "YES",
  no: "NO",
  not_yet: "NOT YET",
  send_it: "SEND IT",
  sleep_on_it: "SLEEP ON IT",
};

export interface Reason {
  role: ReasoningRole;
  title: string;
  body: string;
}

export interface SummaryInput {
  decision: string;
  stance: Stance;
  subject: string;
  domain: Domain;
  intensity: DecisionSignals["intensity"];
  headline: string;
  reasons: [Reason, Reason, Reason];
}

export interface Verdict {
  councilId: CouncilId;
  decision: string;
  stance: Stance;
  headline: string;
  summary: string;
  reasons: [Reason, Reason, Reason];
  closing: string;
  shareText: string;
  caseId: string;
}
