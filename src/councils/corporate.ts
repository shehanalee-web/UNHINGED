import { AFFIRM_STANCES, DELAY_STANCES, DENY_STANCES, type Stance } from "@/types/decision";
import type { Council } from "@/types/council";
import type { SummaryInput } from "@/types/verdict";

const ALL: Stance[] = ["yes", "no", "not_yet", "send_it", "sleep_on_it"];

function summarize(draft: SummaryInput): string {
  const loud = draft.intensity === "high" ? " Urgency has been logged and will not be prioritized." : "";
  switch (draft.stance) {
    case "send_it":
      return `The Corporate Board will call it a pilot if you ${draft.subject}. Please pretend this was on the roadmap.${loud}`;
    case "yes":
      return `Approved, with conditions. You may ${draft.subject} once there is a paper trail and a person to blame.${loud}`;
    case "no":
      return `Declined in committee. The Corporate Board will not resource the urge to ${draft.subject}.${loud}`;
    case "not_yet":
      return `Not yet. The board has moved whether to ${draft.subject} into the parking lot until the stakeholders calm down.${loud}`;
    case "sleep_on_it":
      return `Sleep on it. That is the roadmap. The Corporate Board adjourns before anyone does something observable.${loud}`;
  }
}

export const corporateCouncil: Council = {
  id: "corporate",
  index: "03",
  stamp: "BOARD",
  name: "The Corporate Board",
  epithet: "Pending review",
  blurb:
    "They speak in pilots, risk registers, and parking lots. A clean yes is rare. A clean no is just a yes that missed the quarter.",
  weights: { yes: 1, no: 2, not_yet: 3, send_it: 1, sleep_on_it: 5 },
  domainLeans: {
    career: { sleep_on_it: 3, not_yet: 2 },
    romance: { no: 2, sleep_on_it: 2 },
    money: { not_yet: 2, sleep_on_it: 2 },
    appearance: { not_yet: 2 },
    appetite: { yes: 1, sleep_on_it: 1 },
  },
  headlines: {
    yes: ["Approved. {Subject}, with a paper trail.", "Motion carries. Barely."],
    no: ["Declined in committee.", "Do not {subject}. The register is tired."],
    not_yet: ["Not yet. Align the stakeholders.", "Park it. You may {subject} next cycle."],
    send_it: ["Ship it. Call it a pilot.", "{Subject}. We will circle back never."],
    sleep_on_it: ["Sleep on it. That is the roadmap.", "Table the motion until morning."],
  },
  reasons: [
    { role: "observation", domains: [], stances: ALL, title: "The intake", text: "The request to {subject} arrived without an owner, a metric, or an exit." },
    { role: "observation", domains: ["career"], stances: ALL, title: "The org chart", text: "Quitting is a reorg you would be performing on yourself without a backfill." },
    { role: "observation", domains: ["romance"], stances: ALL, title: "The channel", text: "This is a personal message trying to use the board as a send button." },
    { role: "observation", domains: ["money"], stances: ALL, title: "The spend", text: "The purchase has a cost center. The justification is still a vibe." },
    { role: "observation", domains: ["appearance"], stances: ALL, title: "The brand", text: "You are proposing a visual change with no rollback slide." },
    { role: "observation", domains: ["appetite"], stances: ALL, title: "The perk", text: "This is a discretionary snack. It does not require a steering committee, and yet." },
    { role: "principle", domains: [], stances: ALL, title: "The register", text: "Unowned risk does not ship. Neither does a feeling with no minutes." },
    { role: "principle", domains: ["career"], stances: ALL, title: "The transition", text: "Exits are fine when the transition plan is longer than the complaint." },
    { role: "principle", domains: ["romance"], stances: ALL, title: "Out of scope", text: "Desire is out of scope. The board will not staff it." },
    { role: "principle", domains: ["money"], stances: ALL, title: "The freeze", text: "If you cannot name the tradeoff, the spend stays frozen." },
    { role: "principle", domains: ["appearance"], stances: ALL, title: "The pilot", text: "Image changes get a pilot, not a launch, unless the mirror has signed off twice." },
    { role: "principle", domains: ["appetite"], stances: ALL, title: "The threshold", text: "Below a certain cost, the board is embarrassed to be in the room." },
    { role: "consequence", domains: [], stances: AFFIRM_STANCES, title: "The pilot", text: "So: {subject}. Label it a pilot. If it fails, the minutes will say learnings." },
    { role: "consequence", domains: [], stances: DENY_STANCES, title: "The decline", text: "So: do not {subject}. Close the ticket. Do not reopen it as a new idea." },
    { role: "consequence", domains: [], stances: DELAY_STANCES, title: "The parking lot", text: "So: do not {subject} this cycle. Revisit when the urgency has aged out of the subject line." },
  ],
  closings: ["ACTION ITEM: OWN THE OUTCOME.", "MINUTES RECORDED LOCALLY.", "NO BUDGET WAS HARMED."],
  summarize,
};
