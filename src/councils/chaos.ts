import {
  AFFIRM_STANCES,
  DELAY_STANCES,
  DENY_STANCES,
  type Stance,
} from "@/types/decision";
import type { Council } from "@/types/council";
import type { SummaryInput } from "@/types/verdict";

const ALL: Stance[] = ["yes", "no", "not_yet", "send_it", "sleep_on_it"];

function heat(draft: SummaryInput, line: string): string {
  return draft.intensity === "high" ? line : "";
}

function summarize(draft: SummaryInput): string {
  const loud = heat(draft, " The exclamation marks were noted and encouraged.");
  switch (draft.stance) {
    case "send_it":
      return `The Chaos Council treats this as a green light with extra steps. You want to ${draft.subject}, and they are bored of the rehearsal.${loud}`;
    case "yes":
      return `Yes, with the safety off. The Chaos Council heard enough to stop the debate about whether to ${draft.subject}.${loud}`;
    case "no":
      return `Even chaos has a curb. The council will not cosign the urge to ${draft.subject}.${loud}`;
    case "not_yet":
      return `The Chaos Council wants the mess, just not this exact minute. Let it ripen, then ${draft.subject}.${loud}`;
    case "sleep_on_it":
      return `Sleep. The Chaos Council will still be unreasonable in the morning, only louder.${loud}`;
  }
}

export const chaosCouncil: Council = {
  id: "chaos",
  index: "01",
  stamp: "CHAOS",
  name: "The Chaos Council",
  epithet: "Impulse, in writing",
  blurb:
    "They treat hesitation as the only real mistake. If the story gets better by doing it, they will stamp the doing.",
  weights: { yes: 3, no: 1, not_yet: 1, send_it: 5, sleep_on_it: 1 },
  domainLeans: {
    career: { send_it: 2, yes: 1 },
    romance: { send_it: 2 },
    money: { yes: 2, send_it: 1 },
    appearance: { send_it: 2 },
    appetite: { yes: 2 },
  },
  headlines: {
    yes: ["Yes. Go on and {subject}.", "Approved by the worst people."],
    no: ["No. Do not {subject}.", "Even we will not bless this."],
    not_yet: ["Not yet. Wait, then {subject}.", "Hold. The dramatic version needs one more day."],
    send_it: ["{Subject}. Regret is souvenir-sized.", "Do it before you get wise."],
    sleep_on_it: ["Sleep. Then decide to {subject}.", "Sleep on it. We vote yes at dawn."],
  },
  reasons: [
    { role: "observation", domains: [], stances: ALL, title: "The loop", text: "You are asking whether to {subject}, and the asking has become the hobby." },
    { role: "observation", domains: ["career"], stances: ALL, title: "The exit", text: "This is about leaving, not about whether the work is fine." },
    { role: "observation", domains: ["romance"], stances: ALL, title: "The draft", text: "The message already exists. You are only negotiating the send." },
    { role: "observation", domains: ["money"], stances: ALL, title: "The object", text: "The price is visible. The wanting is the part you keep relitigating." },
    { role: "observation", domains: ["appearance"], stances: ALL, title: "The mirror", text: "You are asking a haircut, or a look, to solve a mood." },
    { role: "observation", domains: ["appetite"], stances: ALL, title: "The small yes", text: "This is a minor pleasure dressed up as a referendum." },
    { role: "principle", domains: [], stances: ALL, title: "The villain", text: "Hesitation is the only vote the council bothers to overturn." },
    { role: "principle", domains: ["career"], stances: ALL, title: "The duller choice", text: "Staying is also a decision. They consider it the duller one." },
    { role: "principle", domains: ["romance"], stances: ALL, title: "The unsent", text: "Unsent is not the same thing as innocent." },
    { role: "principle", domains: ["money"], stances: ALL, title: "The wanting", text: "Being sensible has not made you want it less." },
    { role: "principle", domains: ["appearance"], stances: ALL, title: "The waiting", text: "Waiting for a face to feel ready is how people miss the haircut." },
    { role: "principle", domains: ["appetite"], stances: ALL, title: "The thirst", text: "Thirst is not a strategic problem." },
    { role: "consequence", domains: [], stances: AFFIRM_STANCES, title: "The stamp", text: "So: {subject}. Do it with your eyes open and your apology pre-written." },
    { role: "consequence", domains: [], stances: DENY_STANCES, title: "The curb", text: "So: do not {subject}. Even this room has a limit, and you found it." },
    { role: "consequence", domains: [], stances: DELAY_STANCES, title: "The ripen", text: "So: do not {subject} today. Reopen the file when the feeling is less impressed with itself." },
  ],
  closings: ["REGRET IS A SOUVENIR.", "THE COUNCIL HAS LEFT THE CHAT.", "DO NOT ASK AGAIN UNLESS YOU WILL DO IT."],
  summarize,
};
