"use client";

import { useState } from "react";
import type { SiteImage } from "@/content/site";
import { Photo } from "@/components/ui/Photo";

/** Drag (or use arrow keys on) the handle to compare two photos of the same smile. */
export function BeforeAfter({ before, after, width, height }: { before: SiteImage; after: SiteImage; width: number; height: number }) {
  const [split, setSplit] = useState(50);

  return (
    <div className="group relative h-full w-full select-none">
      <Photo image={after} width={width} height={height} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
        <Photo image={before} width={width} height={height} />
      </div>

      <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] text-white">
        Before
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] text-white">
        After
      </span>

      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${split}%` }}>
        <span className="absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[11px] text-ink shadow-md">
          ‹ ›
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={split}
        onChange={(e) => setSplit(Number(e.target.value))}
        aria-label="Compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
