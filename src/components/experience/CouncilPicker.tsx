import type { Ref } from "react";
import { BevelButton } from "@/components/chrome/BevelButton";
import { Window } from "@/components/chrome/Window";
import { CouncilCard } from "@/components/experience/CouncilCard";
import { COUNCILS } from "@/councils/registry";
import type { CouncilId } from "@/types/decision";

export function CouncilPicker({
  decision,
  selected,
  onSelect,
  onConvene,
  onRevise,
  headingRef,
}: {
  decision: string;
  selected: CouncilId | null;
  onSelect: (id: CouncilId) => void;
  onConvene: () => void;
  onRevise: () => void;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  return (
    <div className="px-3 py-4 sm:px-5">
      <Window title="SELECT PANEL">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-pixel text-3xl leading-none outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Choose the panel
        </h1>
        <p className="mt-3 font-mono text-[12px] leading-relaxed break-words uppercase">Re: {decision}</p>
        <fieldset className="mt-4">
          <legend className="sr-only">Choose a council</legend>
          <div className="border-t border-ink">
            {COUNCILS.map((council) => (
              <CouncilCard
                key={council.id}
                council={council}
                selected={selected === council.id}
                onSelect={() => onSelect(council.id)}
              />
            ))}
          </div>
        </fieldset>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <BevelButton type="button" onClick={onConvene}>
            [ Convene ]
          </BevelButton>
          <button
            type="button"
            onClick={onRevise}
            className="min-h-11 font-mono text-xs uppercase underline decoration-1 underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            ← Revise question
          </button>
        </div>
      </Window>
    </div>
  );
}
