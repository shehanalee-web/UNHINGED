import { adultsCouncil } from "@/councils/adults";
import { chaosCouncil } from "@/councils/chaos";
import { corporateCouncil } from "@/councils/corporate";
import { friendsCouncil } from "@/councils/friends";
import { stoicCouncil } from "@/councils/stoic";
import type { Council } from "@/types/council";
import type { CouncilId } from "@/types/decision";

export const COUNCILS: readonly Council[] = [
  chaosCouncil,
  adultsCouncil,
  corporateCouncil,
  friendsCouncil,
  stoicCouncil,
];

const IDS = new Set<string>(COUNCILS.map((council) => council.id));

export function isCouncilId(value: string | null): value is CouncilId {
  return value !== null && IDS.has(value);
}

export function getCouncil(id: CouncilId): Council {
  const council = COUNCILS.find((item) => item.id === id);
  if (!council) {
    throw new Error(`Unknown council: ${id}`);
  }
  return council;
}
