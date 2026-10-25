"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { CONTROLLERS } from "./controllers";
import { RhythmController, useRhythmInput } from "./inputs";

/** How long a controller swap slides for, in ms. The display spends the first half turning off, the second turning on. */
const SWAP_MS = 260;

/**
 * Cabinet, controller and caption rows. Shared by the stage and every exhibit
 * layered on it, so the rows line up exactly whichever controller is shown.
 */
const STAGE_GRID = "grid grid-rows-[minmax(0,4fr)_minmax(0,5fr)_auto] gap-5";
const CABINET = "mx-auto flex aspect-[4/3] h-full max-w-full flex-col items-center gap-2.5 rounded-t-[22px] rounded-b-lg border-2 px-4 pb-4 pt-3";

/** Fraction of the power-up spent as a widening line before the picture opens out. */
const CRT_LINE = 0.35;

/**
 * Display style for a CRT at power p (0 = off, 1 = on): a dot stretches into a
 * line, then the line opens into the picture. Run backwards to switch off.
 */
function crt(p: number): CSSProperties {
  const sx = Math.min(1, p / CRT_LINE);
  const sy = p <= CRT_LINE ? 0.012 : 0.012 + 0.988 * ((p - CRT_LINE) / (1 - CRT_LINE));
  return { opacity: p > 0 ? 1 : 0, transform: `scale(${sx}, ${sy})` };
}

interface ExhibitProps {
  controller: RhythmController;
  /** Horizontal offset of the controller, as a fraction of its width. */
  offset: number;
  /** How far the display is switched on, 0 to 1. */
  power: number;
  /** Opacity of the caption. */
  opacity: number;
  disabled: boolean;
}

function Exhibit({ controller, offset, power, opacity, disabled }: ExhibitProps) {
  const { input, api } = useRhythmInput(controller.initialValues);
  const { Controller, Screen, screen } = controller;

  return (
    <div className={`absolute inset-0 ${STAGE_GRID} ${disabled ? "pointer-events-none" : ""}`} inert={disabled}>
      {/* Transparent twin of the stage's cabinet, so the display sits inside its bezel */}
      <div className={`${CABINET} border-transparent`}>
        <p className="text-xs font-extrabold tracking-[0.2em] text-white" style={{ opacity: power }}>
          {controller.marquee}
        </p>
        <svg viewBox={`0 0 ${screen.width} ${screen.height}`} className="block min-h-0 w-full flex-1" style={crt(power)} aria-hidden>
          <Screen input={input} />
          {/* Phosphor glow: the picture washes out to a white-hot line as power drops */}
          <rect width={screen.width} height={screen.height} fill="#f0f9ff" opacity={1 - power} />
        </svg>
      </div>

      <div className="overflow-hidden">
        <div
          className="h-full w-full touch-none select-none [-webkit-touch-callout:none]"
          style={{ transform: `translateX(${offset * 100}%)` }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Controller input={input} api={api} />
        </div>
      </div>

      <p className="text-center text-xs tracking-wide text-black/50" style={{ opacity }}>
        {controller.year} · {controller.name}
      </p>
    </div>
  );
}

function Chevron({ dir, onClick, disabled }: { dir: "prev" | "next"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous controller" : "Next controller"}
      className="shrink-0 cursor-pointer rounded-full p-2 text-black/25 transition-colors hover:text-black/70 disabled:cursor-default disabled:hover:text-black/25"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}

export default function RhythmMuseum() {
  const [index, setIndex] = useState(0);
  /** The controller being swapped to; inputs stay disabled until it lands. */
  const [swap, setSwap] = useState<{ to: number; dir: 1 | -1 } | null>(null);
  const [t, setT] = useState(0);

  const step = (dir: 1 | -1) => {
    if (swap) return;
    setSwap({ to: (index + dir + CONTROLLERS.length) % CONTROLLERS.length, dir });
  };

  useEffect(() => {
    if (!swap) return;
    let start: number | null = null;
    let frame = requestAnimationFrame(function tick(now) {
      start ??= now;
      const p = Math.min(1, (now - start) / SWAP_MS);
      if (p < 1) {
        setT(p);
        frame = requestAnimationFrame(tick);
      } else {
        setIndex(swap.to);
        setSwap(null);
        setT(0);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [swap]);

  // Outgoing slides away as the incoming one slides in from the side it was asked for,
  // while the display switches off and back on with the new game
  const layers = swap
    ? [
        { i: index, offset: -swap.dir * t, power: Math.max(0, 1 - 2 * t), opacity: 1 - t },
        { i: swap.to, offset: swap.dir * (1 - t), power: Math.max(0, 2 * t - 1), opacity: t },
      ]
    : [{ i: index, offset: 0, power: 1, opacity: 1 }];

  return (
    <div className="mx-auto flex h-[calc(100dvh-56px)] min-h-[560px] w-full max-w-[1280px] flex-col px-4 pb-6 pt-6 md:pt-8">
      <Link
        href="/playground"
        className="mb-4 block w-fit shrink-0 text-sm font-bold text-blue-600 underline hover:text-blue-700"
      >
        ← Playground
      </Link>

      <div className="flex min-h-0 flex-1 items-center justify-center gap-1 sm:gap-4">
        <Chevron dir="prev" onClick={() => step(-1)} disabled={!!swap} />
        <div className={`relative h-full max-h-[760px] min-w-0 max-w-[640px] flex-1 ${STAGE_GRID}`}>
          {/* The cabinet stays put; only its display changes */}
          <div className={`${CABINET} border-black bg-[#1f1f1f]`}>
            <div className="h-4 shrink-0" />
            <div className="min-h-0 w-full flex-1 rounded-md bg-black" />
          </div>
          {/* Keyed so each controller starts with fresh inputs */}
          {layers.map((l) => (
            <Exhibit key={CONTROLLERS[l.i].id} controller={CONTROLLERS[l.i]} offset={l.offset} power={l.power} opacity={l.opacity} disabled={!!swap} />
          ))}
        </div>
        <Chevron dir="next" onClick={() => step(1)} disabled={!!swap} />
      </div>
    </div>
  );
}
