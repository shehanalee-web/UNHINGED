import { Suspense } from "react";
import { ArtifactFrame } from "@/components/chrome/ArtifactFrame";
import { DecisionExperience } from "@/components/experience/DecisionExperience";
import { STATUS } from "@/lib/chrome";

export default function Home() {
  return (
    <Suspense
      fallback={
        <ArtifactFrame status={STATUS.booting}>
          <p className="px-4 py-10 font-mono text-sm uppercase">
            Loading system
            <span className="blink">_</span>
          </p>
        </ArtifactFrame>
      }
    >
      <DecisionExperience />
    </Suspense>
  );
}
