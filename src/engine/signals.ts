import type { DecisionSignals, Domain } from "@/types/decision";

export const MAX_DECISION_LENGTH = 280;

const MIN_WORDS = 3;
const MIN_CHARS = 8;

export type DecisionIssue = "short" | "long";

export const DOMAIN_LABEL: Record<Domain, string> = {
  career: "work",
  romance: "this person",
  money: "the purchase",
  appearance: "the look",
  appetite: "the craving",
  general: "the question",
};

const KEYWORDS: Record<Exclude<Domain, "general">, readonly string[]> = {
  career: ["job", "quit", "boss", "career", "resign", "office", "promotion", "coworker", "salary"],
  romance: ["text", "ex", "crush", "date", "boyfriend", "girlfriend", "breakup", "kiss", "love"],
  money: ["buy", "afford", "spend", "purchase", "price", "money", "cart", "expensive", "rent"],
  appearance: ["bangs", "hair", "outfit", "tattoo", "piercing", "haircut", "beard", "makeup"],
  appetite: ["coffee", "pizza", "snack", "dinner", "lunch", "breakfast", "eat", "hungry", "burger", "drink"],
};

const URGENCY = ["now", "asap", "immediately", "tonight", "right now"];

const DOMAIN_ORDER: readonly Exclude<Domain, "general">[] = [
  "romance",
  "career",
  "money",
  "appearance",
  "appetite",
];

export function collapseWhitespace(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

export function validateDecision(text: string): DecisionIssue | null {
  const collapsed = collapseWhitespace(text);
  if (collapsed.length > MAX_DECISION_LENGTH) {
    return "long";
  }
  const words = collapsed.split(" ").filter(Boolean);
  if (collapsed.length < MIN_CHARS || words.length < MIN_WORDS) {
    return "short";
  }
  return null;
}

function scoreDomain(normalized: string, domain: Exclude<Domain, "general">): number {
  return KEYWORDS[domain].reduce((score, keyword) => {
    const pattern = new RegExp(`\\b${keyword}\\b`, "i");
    return pattern.test(normalized) ? score + 1 : score;
  }, 0);
}

export function detectDomain(normalized: string): Domain {
  let best: Domain = "general";
  let bestScore = 0;
  for (const domain of DOMAIN_ORDER) {
    const score = scoreDomain(normalized, domain);
    if (score > bestScore) {
      best = domain;
      bestScore = score;
    }
  }
  return best;
}

export function extractSubject(normalized: string): string {
  let subject = normalized.replace(/[?!.,]+$/g, "").trim();
  subject = subject.replace(/^(should|could|can|do|did|will|would)(?:n't| not)?\s+(i|we)\s+/, "");
  subject = subject.replace(/\bmy\b/g, "your");
  subject = subject.replace(/\bmine\b/g, "yours");
  subject = subject.replace(/\bmyself\b/g, "yourself");
  subject = subject.replace(/\bi\b/g, "you");
  subject = collapseWhitespace(subject);
  if (subject.length < 2) {
    return "go through with it";
  }
  if (subject.length > 72) {
    return `${subject.slice(0, 69).trim()}…`;
  }
  return subject;
}

export function detectIntensity(original: string, normalized: string): DecisionSignals["intensity"] {
  let score = 0;
  if (original.includes("!")) {
    score += 1;
  }
  const letters = original.replace(/[^A-Za-z]/g, "");
  const capitals = original.replace(/[^A-Z]/g, "").length;
  if (letters.length > 12 && capitals / letters.length > 0.6) {
    score += 1;
  }
  if (URGENCY.some((word) => normalized.includes(word))) {
    score += 1;
  }
  if (score >= 2) {
    return "high";
  }
  if (score === 1) {
    return "medium";
  }
  return "low";
}

export function readSignals(decision: string): DecisionSignals {
  const original = collapseWhitespace(decision);
  const normalized = original.toLowerCase();
  return {
    original,
    normalized,
    domain: detectDomain(normalized),
    subject: extractSubject(normalized),
    intensity: detectIntensity(original, normalized),
  };
}
