import type { Domain, Stance } from "@/types/decision";
import type { CouncilId } from "@/types/decision";
import type { ReasoningRole, SummaryInput } from "@/types/verdict";

export interface ReasoningTemplate {
  role: ReasoningRole;
  domains: readonly Domain[];
  stances: readonly Stance[];
  title: string;
  text: string;
}

export interface Council {
  id: CouncilId;
  index: string;
  stamp: string;
  name: string;
  epithet: string;
  blurb: string;
  weights: Record<Stance, number>;
  domainLeans: Partial<Record<Domain, Partial<Record<Stance, number>>>>;
  headlines: Record<Stance, readonly string[]>;
  reasons: readonly ReasoningTemplate[];
  closings: readonly string[];
  summarize: (draft: SummaryInput) => string;
}
