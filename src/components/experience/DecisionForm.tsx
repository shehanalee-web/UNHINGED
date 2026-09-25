import type { Ref } from "react";
import { BevelButton } from "@/components/chrome/BevelButton";
import { Window } from "@/components/chrome/Window";
import { MAX_DECISION_LENGTH } from "@/engine/signals";
import { STATUS } from "@/lib/chrome";

export function DecisionForm({
  value,
  status,
  onChange,
  onSubmit,
  headingRef,
}: {
  value: string;
  status: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  const count = String(value.length).padStart(3, "0");
  return (
    <div className="relative px-3 pt-3 pb-8 sm:px-5">
      <p aria-hidden="true" className="font-mono text-[10px] uppercase tracking-[0.18em]">
        Fig. 01
      </p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="max-w-[12ch] pb-1 font-poster text-[clamp(3.25rem,11vw,6.2rem)] leading-[0.92] uppercase outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Ask the
        <br />
        Council.
      </h1>
      <div className="mt-5 lg:mt-4 lg:grid lg:grid-cols-[4.5rem_1fr] lg:items-end lg:gap-3">
      <p aria-hidden="true" className="mb-2 hidden font-mono text-[10px] leading-relaxed uppercase tracking-[0.16em] lg:block">
        Intake
        <br />
        No login
      </p>
      <Window title="INTAKE / 01" className="relative z-10">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <label htmlFor="decision" className="font-mono text-[11px] uppercase tracking-[0.14em]">
            Field 01 / Decision
            <span className="blink" aria-hidden="true">
              _
            </span>
          </label>
          <textarea
            id="decision"
            name="decision"
            value={value}
            maxLength={MAX_DECISION_LENGTH}
            rows={6}
            placeholder="Should I quit my job?"
            aria-invalid={status === STATUS.short || status === STATUS.long}
            aria-describedby="decision-count system-status"
            onChange={(event) => onChange(event.target.value)}
            className="mt-2 min-h-36 w-full resize-y border border-ink bg-paper px-3 py-2 font-ui text-base leading-relaxed text-ink outline-none placeholder:text-ink-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <p id="decision-count" className="font-mono text-[11px] uppercase tracking-wider">
              {count} / {MAX_DECISION_LENGTH}
            </p>
            <BevelButton type="submit">[ Submit to the council ]</BevelButton>
          </div>
          <p aria-hidden="true" className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            Form 1.0 / No account
          </p>
        </form>
      </Window>
      </div>
    </div>
  );
}
