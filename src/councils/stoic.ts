import { AFFIRM_STANCES, DELAY_STANCES, DENY_STANCES, type Stance } from "@/types/decision";
import type { Council } from "@/types/council";
import type { SummaryInput } from "@/types/verdict";

const ALL: Stance[] = ["yes", "no", "not_yet", "send_it", "sleep_on_it"];

function summarize(draft: SummaryInput): string {
  const loud = draft.intensity === "high" ? " Volume is not a form of control." : "";
  switch (draft.stance) {
    case "send_it":
      return `The Stoic Senate finds that to ${draft.subject} is inside your hands. Do that part. Leave the outcome alone.${loud}`;
    case "yes":
      return `Yes. The rest is weather. Whether to ${draft.subject} is yours; what follows is not a vote.${loud}`;
    case "no":
      return `No. To ${draft.subject} asks the world to rearrange itself. The Stoic Senate does not petition the world.${loud}`;
    case "not_yet":
      return `Not yet. You are asking too early. The part that is yours will still be yours after you stop shaking the question.${loud}`;
    case "sleep_on_it":
      return `Sleep. Morning is also a decision. The Stoic Senate will not be hurried into your evening.${loud}`;
  }
}

export const stoicCouncil: Council = {
  id: "stoic",
  index: "05",
  stamp: "STOIC",
  name: "The Stoic Senate",
  epithet: "What is up to you",
  blurb:
    "Calm, slightly severe, and uninterested in outcomes you do not control. They will tell you what is yours to do and then stop talking.",
  weights: { yes: 2, no: 2, not_yet: 3, send_it: 1, sleep_on_it: 4 },
  domainLeans: {
    career: { sleep_on_it: 2, not_yet: 2 },
    romance: { not_yet: 2, no: 1 },
    money: { sleep_on_it: 2, no: 1 },
    appearance: { yes: 1, not_yet: 1 },
    appetite: { yes: 1 },
  },
  headlines: {
    yes: ["Yes. The rest is weather.", "It is yours. {Subject}."],
    no: ["No. This asks the world to change.", "Do not {subject}. That part is not yours."],
    not_yet: ["Not yet. You are asking too early.", "Wait. Then {subject} without the tremor."],
    send_it: ["Do the part that is yours.", "{Subject}. Then stop narrating it."],
    sleep_on_it: ["Sleep. Morning is also a decision.", "Sleep before you {subject}."],
  },
  reasons: [
    { role: "observation", domains: [], stances: ALL, title: "The reach", text: "You are asking whether to {subject}, and half of that question is about events you do not steer." },
    { role: "observation", domains: ["career"], stances: ALL, title: "The post", text: "The job is indifferent to your mood. Your conduct inside it is not." },
    { role: "observation", domains: ["romance"], stances: ALL, title: "The other", text: "Another person is not a lever. The message is yours. The reply is not." },
    { role: "observation", domains: ["money"], stances: ALL, title: "The object", text: "The thing will not make you orderly. Spending is the part you can actually govern." },
    { role: "observation", domains: ["appearance"], stances: ALL, title: "The surface", text: "A look is a choice of presentation, not a verdict on your character." },
    { role: "observation", domains: ["appetite"], stances: ALL, title: "The body", text: "Hunger is a fact. Turning it into a moral trial is optional, and unhelpful." },
    { role: "principle", domains: [], stances: ALL, title: "The line", text: "What is up to you may be done. What is not up to you may be left alone." },
    { role: "principle", domains: ["career"], stances: ALL, title: "The work", text: "You control the work in front of you, and whether you remain. You do not control the institution's opinion." },
    { role: "principle", domains: ["romance"], stances: ALL, title: "The reply", text: "You may speak plainly. You may not command the answer." },
    { role: "principle", domains: ["money"], stances: ALL, title: "The means", text: "If the purchase breaks what you owe, it is not a preference. It is a breach." },
    { role: "principle", domains: ["appearance"], stances: ALL, title: "The choice", text: "Change the surface if you wish. Do not ask it to quiet your mind." },
    { role: "principle", domains: ["appetite"], stances: ALL, title: "The measure", text: "Take what the body asks when it asks reasonably. Do not build a philosophy around a cup." },
    { role: "consequence", domains: [], stances: AFFIRM_STANCES, title: "The act", text: "So: {subject}. Do it cleanly, without a speech to the future." },
    { role: "consequence", domains: [], stances: DENY_STANCES, title: "The refusal", text: "So: do not {subject}. You would be grasping at something that is not yours to move." },
    { role: "consequence", domains: [], stances: DELAY_STANCES, title: "The night", text: "So: do not {subject} tonight. Sleep. In the morning, keep only the part that is still yours." },
  ],
  closings: ["WHAT IS YOURS TO DO, DO.", "THE REST IS INDIFFERENT.", "END OF SESSION."],
  summarize,
};
