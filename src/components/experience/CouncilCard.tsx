import type { Council } from "@/types/council";

export function CouncilCard({
  council,
  selected,
  onSelect,
}: {
  council: Council;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={`flex min-h-11 cursor-pointer items-baseline gap-3 border-b border-l-[3px] px-2 py-2 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
        selected ? "border-b-ink border-l-accent bg-ink text-paper" : "border-b-ink border-l-transparent bg-sheet text-ink"
      }`}
    >
      <input
        type="radio"
        name="council"
        value={council.id}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      <span className="font-pixel text-2xl leading-none">{council.index}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-ui text-base font-bold">{council.name}</span>
        <span className={`block font-mono text-[11px] uppercase tracking-wide ${selected ? "text-paper" : "text-ink-soft"}`}>
          {council.epithet}
        </span>
      </span>
      <span className="font-mono text-[11px] uppercase" aria-hidden="true">
        {selected ? "[■]" : "[ ]"}
      </span>
    </label>
  );
}
