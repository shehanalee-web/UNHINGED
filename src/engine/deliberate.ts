import { getCouncil } from "@/councils/registry";
import { capitalize, fill } from "@/engine/fill";
import { caseIdFromHash, hashString } from "@/engine/hash";
import { mulberry32, pick, pickWeighted, type Rng } from "@/engine/rng";
import { DOMAIN_LABEL, readSignals } from "@/engine/signals";
import type { Council, ReasoningTemplate } from "@/types/council";
import type { DecisionInput, Domain, Stance } from "@/types/decision";
import { ROLE_LABEL, STANCE_LABEL, type Reason, type Verdict } from "@/types/verdict";

const STANCES: readonly Stance[] = ["yes", "no", "not_yet", "send_it", "sleep_on_it"];

function stanceWeights(council: Council, domain: Domain): Record<Stance, number> {
  const lean = council.domainLeans[domain] ?? {};
  return Object.fromEntries(
    STANCES.map((stance) => [stance, council.weights[stance] + (lean[stance] ?? 0)]),
  ) as Record<Stance, number>;
}

function templateScore(template: ReasoningTemplate, domain: Domain, stance: Stance): number | null {
  const domainOk = template.domains.length === 0 || template.domains.includes(domain);
  const stanceOk = template.stances.length === 0 || template.stances.includes(stance);
  if (!domainOk || !stanceOk) {
    return null;
  }
  let score = 0;
  if (template.domains.includes(domain)) {
    score += 2;
  }
  if (template.stances.includes(stance)) {
    score += 2;
  }
  return score;
}

function pickTemplate(
  council: Council,
  role: ReasoningTemplate["role"],
  domain: Domain,
  stance: Stance,
  rng: Rng,
): ReasoningTemplate {
  let best = -1;
  const matched: ReasoningTemplate[] = [];
  for (const template of council.reasons) {
    if (template.role !== role) {
      continue;
    }
    const score = templateScore(template, domain, stance);
    if (score === null) {
      continue;
    }
    if (score > best) {
      best = score;
      matched.length = 0;
      matched.push(template);
    } else if (score === best) {
      matched.push(template);
    }
  }
  if (matched.length === 0) {
    throw new Error(`${council.id} has no ${role} line`);
  }
  return pick(rng, matched);
}

export function deliberate(input: DecisionInput): Verdict {
  const council = getCouncil(input.councilId);
  const signals = readSignals(input.text);
  const seed = hashString(`${council.id}|${signals.normalized}`);
  const rng = mulberry32(seed);
  const stance = pickWeighted(rng, stanceWeights(council, signals.domain));
  const slots = {
    subject: signals.subject,
    Subject: capitalize(signals.subject),
    decision: signals.original,
    domain: DOMAIN_LABEL[signals.domain],
    councilName: council.name,
  };
  const headline = fill(pick(rng, council.headlines[stance]), slots);
  const roles = ["observation", "principle", "consequence"] as const;
  const reasons = roles.map((role) => {
    const template = pickTemplate(council, role, signals.domain, stance, rng);
    const reason: Reason = {
      role,
      title: fill(template.title, slots),
      body: fill(template.text, slots),
    };
    return reason;
  }) as [Reason, Reason, Reason];
  const closing = fill(pick(rng, council.closings), slots);
  const summary = council.summarize({
    decision: signals.original,
    stance,
    subject: signals.subject,
    domain: signals.domain,
    intensity: signals.intensity,
    headline,
    reasons,
  });
  const caseId = caseIdFromHash(seed);
  const shareText = [
    `UNHINGED / ${caseId}`,
    council.name.toUpperCase(),
    STANCE_LABEL[stance],
    `RE: ${signals.original}`,
    "",
    headline,
    "",
    summary,
    "",
    ...reasons.flatMap((reason, index) => [
      `${index + 1}. ${ROLE_LABEL[reason.role]}`,
      reason.title,
      reason.body,
      "",
    ]),
    closing,
  ].join("\n");

  return {
    councilId: council.id,
    decision: signals.original,
    stance,
    headline,
    summary,
    reasons,
    closing,
    shareText,
    caseId,
  };
}
