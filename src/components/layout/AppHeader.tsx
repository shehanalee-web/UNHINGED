import { PixelStar } from "@/components/chrome/marks";
import { TAGLINE } from "@/lib/chrome";

export function AppHeader() {
  return (
    <div className="border-b border-ink px-3 py-2">
      <p className="flex items-center gap-2 font-pixel text-[2rem] leading-none tracking-wide">
        <PixelStar />
        UNHINGED
      </p>
      <p className="mt-1 ml-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
        {TAGLINE}
      </p>
    </div>
  );
}
