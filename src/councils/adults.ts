import { AFFIRM_STANCES, DELAY_STANCES, DENY_STANCES, type Stance } from "@/types/decision";
import type { Council } from "@/types/council";
import type { SummaryInput } from "@/types/verdict";

const ALL: Stance[] = ["yes", "no", "not_yet", "send_it", "sleep_on_it"];

function summarize(draft: SummaryInput): string {
  const loud = draft.intensity === "high" ? " Typing louder does not make the plan safer." : "";
  switch (draft.stance) {
    case "send_it":
      return `The Responsible Adults will allow you to ${draft.subject}, and they would like that sentence read back to you slowly.${loud}`;
    case "yes":
      return `Yes, if the next step already exists. The adults will not invent one for you after you ${draft.subject}.${loud}`;
    case "no":
      return `No. The Responsible Adults looked at the urge to ${draft.subject} and found a bill attached.${loud}`;
    case "not_yet":
      return `Not yet. Whether to ${draft.subject} can survive a calmer day, and it should.${loud}`;
    case "sleep_on_it":
      return `Sleep on it. The Responsible Adults invented that phrase for exactly this kind of evening.${loud}`;
  }
}

export const adultsCouncil: Council = {
  id: "adults",
  index: "02",
  stamp: "ADULTS",
  name: "The Responsible Adults",
  epithet: "Bring a jacket",
  blurb:
    "Practical, slightly tired, and unmoved by a feeling that arrived five minutes ago. They will let you do it once it looks boring enough to be real.",
  weights: { yes: 1, no: 3, not_yet: 4, send_it: 1, sleep_on_it: 4 },
  domainLeans: {
    career: { not_yet: 3, sleep_on_it: 1, no: 1 },
    romance: { sleep_on_it: 3, no: 1 },
    money: { no: 2, not_yet: 2 },
    appearance: { not_yet: 1, yes: 1 },
    appetite: { yes: 2 },
  },
  headlines: {
    yes: ["Yes. Only if the next step exists.", "Fine. {Subject}, then write it down."],
    no: ["No. Do not {subject}.", "Absolutely not on this evidence."],
    not_yet: ["Not yet. Make it boring first.", "Wait. You can {subject} after a real plan."],
    send_it: ["Go on, then. {Subject}, and own the mess.", "Fine. Do it. Bring a jacket."],
    sleep_on_it: ["Sleep on it. Adults invented that.", "Morning will still let you {subject}."],
  },
  reasons: [
    { role: "observation", domains: [], stances: ALL, title: "The feeling", text: "You are asking whether to {subject} while the feeling is still doing the talking." },
    { role: "observation", domains: ["career"], stances: ALL, title: "The paycheck", text: "A job is a relationship with rent. The exit needs a next line, not a mood." },
    { role: "observation", domains: ["romance"], stances: ALL, title: "The hour", text: "Messages sent to settle your nerves rarely settle theirs." },
    { role: "observation", domains: ["money"], stances: ALL, title: "The receipt", text: "The object will still exist after the wanting cools. So will the receipt." },
    { role: "observation", domains: ["appearance"], stances: ALL, title: "The grow-back", text: "Most looks are reversible. The rush to fix yourself tonight is not a plan." },
    { role: "observation", domains: ["appetite"], stances: ALL, title: "The scale", text: "This is small. The adults refuse to hold court over a craving." },
    { role: "principle", domains: [], stances: ALL, title: "The plan", text: "A feeling is not a plan. A plan can survive being said out loud." },
    { role: "principle", domains: ["career"], stances: ALL, title: "The next job", text: "Leaving is allowed. Leaving with nowhere to stand is just weather." },
    { role: "principle", domains: ["romance"], stances: ALL, title: "The morning", text: "If it cannot wait until morning, it is probably about you, not them." },
    { role: "principle", domains: ["money"], stances: ALL, title: "The cost", text: "Wanting a thing is not the same skill as affording the life around it." },
    { role: "principle", domains: ["appearance"], stances: ALL, title: "The ordinary", text: "A change is fine when you would still want it on a dull Wednesday." },
    { role: "principle", domains: ["appetite"], stances: ALL, title: "The proportion", text: "Not every yes needs a speech. Not every no needs a punishment." },
    { role: "consequence", domains: [], stances: AFFIRM_STANCES, title: "The condition", text: "So: {subject}. Then do the boring part you have been skipping." },
    { role: "consequence", domains: [], stances: DENY_STANCES, title: "The bill", text: "So: do not {subject}. Put the impulse down and keep your hands visible." },
    { role: "consequence", domains: [], stances: DELAY_STANCES, title: "The delay", text: "So: do not {subject} today. Write the next step. Read it tomorrow before you move." },
  ],
  closings: ["WRITE IT DOWN. THEN WAIT A DAY.", "BRING A JACKET.", "THIS IS NOT A PERSONALITY."],
  summarize,
};
