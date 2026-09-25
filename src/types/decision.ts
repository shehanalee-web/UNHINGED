export type CouncilId = "chaos" | "adults" | "corporate" | "friends" | "stoic";

export type Domain =
  | "career"
  | "romance"
  | "money"
  | "appearance"
  | "appetite"
  | "general";

export type Stance = "yes" | "no" | "not_yet" | "send_it" | "sleep_on_it";

export const AFFIRM_STANCES = ["yes", "send_it"] as const satisfies readonly Stance[];
export const DENY_STANCES = ["no"] as const satisfies readonly Stance[];
export const DELAY_STANCES = ["not_yet", "sleep_on_it"] as const satisfies readonly Stance[];

export interface DecisionInput {
  text: string;
  councilId: CouncilId;
}

export interface DecisionSignals {
  original: string;
  normalized: string;
  domain: Domain;
  subject: string;
  intensity: "low" | "medium" | "high";
}
