export function deliberationLines(councilName: string): readonly string[] {
  return [
    `ROUTING >> ${councilName.toUpperCase()}`,
    "READING INPUT",
    "MEMBERS DISAGREE",
    "STAMPING VERDICT",
  ];
}
