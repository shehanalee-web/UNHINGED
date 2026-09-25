import { AFFIRM_STANCES, DELAY_STANCES, DENY_STANCES, type Stance } from "@/types/decision";
import type { Council } from "@/types/council";
import type { SummaryInput } from "@/types/verdict";

const ALL: Stance[] = ["yes", "no", "not_yet", "send_it", "sleep_on_it"];

function summarize(draft: SummaryInput): string {
  const loud = draft.intensity === "high" ? " We can hear you from here." : "";
  switch (draft.stance) {
    case "send_it":
      return `The Feral Best Friends are already outside. If you ${draft.subject}, they will honk. If you do not, they will honk anyway.${loud}`;
    case "yes":
      return `Yes. The group chat took a vote without you and it was not close. You should ${draft.subject}.${loud}`;
    case "no":
      return `No, and they mean it lovingly. The friends will not clap while you ${draft.subject}.${loud}`;
    case "not_yet":
      return `Not yet. Eat first. The Feral Best Friends still think you should ${draft.subject}, just not on an empty stomach.${loud}`;
    case "sleep_on_it":
      return `Sleep. They will still be in the car in the morning, playing the same song, ready for you to ${draft.subject}.${loud}`;
  }
}

export const friendsCouncil: Council = {
  id: "friends",
  index: "04",
  stamp: "FERAL",
  name: "The Feral Best Friends",
  epithet: "Already in the car",
  blurb:
    "Loyal, loud, and willing to lie for you in public. They give bad encouragement with complete sincerity and will split the fries either way.",
  weights: { yes: 4, no: 1, not_yet: 1, send_it: 4, sleep_on_it: 1 },
  domainLeans: {
    career: { yes: 1, send_it: 1 },
    romance: { send_it: 2 },
    money: { yes: 1 },
    appearance: { send_it: 2 },
    appetite: { yes: 2 },
  },
  headlines: {
    yes: ["Yes. We took a vote in the car.", "Yes. Go {subject}. We will honk."],
    no: ["No. And we mean it lovingly.", "Do not {subject}. We will still bring snacks."],
    not_yet: ["Not yet. Eat first.", "Wait. Then {subject} with us watching."],
    send_it: ["Do it. We are already outside.", "{Subject}. We will lie for you."],
    sleep_on_it: ["Sleep. We will still be here.", "Sleep before you {subject}. One night."],
  },
  reasons: [
    { role: "observation", domains: [], stances: ALL, title: "The stall", text: "You want to {subject}, and you called a council so someone else would start the car." },
    { role: "observation", domains: ["career"], stances: ALL, title: "The boss", text: "We already dislike the job on your behalf. That part of the meeting is over." },
    { role: "observation", domains: ["romance"], stances: ALL, title: "The draft", text: "You have composed this message in four apps. We have seen this episode." },
    { role: "observation", domains: ["money"], stances: ALL, title: "The tab", text: "You are asking for permission to want something. We are not your bank." },
    { role: "observation", domains: ["appearance"], stances: ALL, title: "The bangs", text: "You have been trying this on in your head for days. The mirror is tired." },
    { role: "observation", domains: ["appetite"], stances: ALL, title: "The order", text: "This is a treat, not a crisis. We support the treat." },
    { role: "principle", domains: [], stances: ALL, title: "The loyalty", text: "We did not come here to be wise. We came here to be on your side out loud." },
    { role: "principle", domains: ["career"], stances: ALL, title: "The exit story", text: "A bad job does not get to be the main character just because it pays you." },
    { role: "principle", domains: ["romance"], stances: ALL, title: "The send", text: "Haunting your own drafts is not loyalty. It is loitering." },
    { role: "principle", domains: ["money"], stances: ALL, title: "The fries", text: "We will not pretend a purchase is a moral event. We will ask if you can eat after." },
    { role: "principle", domains: ["appearance"], stances: ALL, title: "The haircut", text: "A haircut is reversible. The group chat is not, and the group chat says try it." },
    { role: "principle", domains: ["appetite"], stances: ALL, title: "The coffee", text: "Another coffee has never ruined a life worth telling." },
    { role: "consequence", domains: [], stances: AFFIRM_STANCES, title: "The honk", text: "So: {subject}. We will be unreasonable in your favor and split whatever comes next." },
    { role: "consequence", domains: [], stances: DENY_STANCES, title: "The snack", text: "So: do not {subject}. We love you enough to be the no, and we brought snacks to soften it." },
    { role: "consequence", domains: [], stances: DELAY_STANCES, title: "The pause", text: "So: do not {subject} this minute. Eat, then decide while we are still in the parking lot." },
  ],
  closings: ["HONK IF YOU DID IT.", "WE ARE OUTSIDE.", "LOVE, THE GROUP CHAT."],
  summarize,
};
