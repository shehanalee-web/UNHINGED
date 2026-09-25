"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import { Window } from "@/components/chrome/Window";
import { deliberationLines } from "@/engine/script";

const TICK_MS = 520;
const HOLD_MS = 480;
const REDUCED_MS = 400;

export function Deliberation({
  councilName,
  onComplete,
  headingRef,
}: {
  councilName: string;
  onComplete: () => void;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  const lines = deliberationLines(councilName);
  const [reduce] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [step, setStep] = useState(reduce ? lines.length - 1 : 0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (reduce) {
      const timer = window.setTimeout(() => onCompleteRef.current(), REDUCED_MS);
      return () => window.clearTimeout(timer);
    }
    if (step >= lines.length - 1) {
      const timer = window.setTimeout(() => onCompleteRef.current(), HOLD_MS);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setStep((current) => current + 1), TICK_MS);
    return () => window.clearTimeout(timer);
  }, [lines.length, reduce, step]);

  const shown = reduce ? [lines[lines.length - 1]] : lines.slice(0, step + 1);
  const filled = reduce ? 16 : Math.round(((step + 1) / lines.length) * 16);
  const meter = `${"█".repeat(filled)}${"░".repeat(16 - filled)}`;

  return (
    <div className="px-3 py-4 sm:px-5">
      <Window title="DELIBERATING">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-pixel text-3xl leading-none outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Deliberating
        </h1>
        <div className="relative mt-3 border border-ink bg-paper">
          <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0" />
          <div className="relative min-h-44 p-3 font-mono text-[13px] leading-6 uppercase">
            <p>Proc / local</p>
            {shown.map((line) => (
              <p key={line}>&gt; {line}</p>
            ))}
            <p aria-hidden="true">
              [{meter}]
              <span className="blink">_</span>
            </p>
          </div>
        </div>
      </Window>
    </div>
  );
}
