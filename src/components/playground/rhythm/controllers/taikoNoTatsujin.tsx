"use client";

import { ControllerProps, InputState, RhythmController, pressProps, ring } from "../inputs";
import { Chart, JudgementText, burstOf, useChart } from "../gameplay";
import { play } from "../sound";

const CX = 280;
const CY = 186;
/** Outer edge of the rim (ka), and the drum skin (don). */
const RIM = 156;
const SKIN = 122;

const halfRing = (side: "l" | "r", R: number, r: number, cx = CX, cy = CY) => {
  const s = side === "l" ? 0 : 1;
  return `M${cx} ${cy - R} A${R} ${R} 0 0 ${s} ${cx} ${cy + R} L${cx} ${cy + r} A${r} ${r} 0 0 ${1 - s} ${cx} ${cy - r} Z`;
};
const halfDisc = (side: "l" | "r", r: number, cx = CX, cy = CY) =>
  `M${cx} ${cy - r} A${r} ${r} 0 0 ${side === "l" ? 0 : 1} ${cx} ${cy + r} Z`;

function Bachi({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-7} y={-80} width={14} height={160} rx={7} fill="#d8b47a" stroke="#8a6a3a" strokeWidth={2} />
      <rect x={-7} y={46} width={14} height={34} rx={6} fill="#b91c1c" />
    </g>
  );
}

function Controller({ input, api }: ControllerProps) {
  const on = (id: string) => input.held.has(id);
  return (
    <svg viewBox="0 0 560 420" className="h-full w-full">
      {/* Stand */}
      <path d="M130 300 L90 412 H470 L430 300 Z" fill="#18181b" stroke="#000" strokeWidth={3} />
      <rect x={90} y={398} width={380} height={14} fill="#b91c1c" />
      <rect x={196} y={318} width={168} height={8} rx={4} fill="#3f3f46" />

      {/* Lacquered barrel shell, showing at the sides of the rim */}
      <rect x={CX - 170} y={CY - 150} width={340} height={300} rx={150} fill="#7a2614" stroke="#000" strokeWidth={3} />
      <rect x={CX - 170} y={CY - 18} width={340} height={8} fill="#5b1b0e" />

      {(["l", "r"] as const).map((s) => (
        <path
          key={`ka-${s}`}
          d={halfRing(s, RIM, SKIN)}
          fill={on(`ka-${s}`) ? "#a5542f" : "#8b3a1c"}
          stroke="#3b1208"
          strokeWidth={2}
          {...pressProps(api, `ka-${s}`)}
        />
      ))}
      <circle cx={CX} cy={CY} r={RIM} fill="none" stroke="#000" strokeWidth={3} pointerEvents="none" />

      {(["l", "r"] as const).map((s) => (
        <path key={`don-${s}`} d={halfDisc(s, SKIN)} fill={on(`don-${s}`) ? "#e8d3a8" : "#f3e4c2"} {...pressProps(api, `don-${s}`)} />
      ))}
      <g pointerEvents="none">
        <circle cx={CX} cy={CY} r={SKIN} fill="none" stroke="#c9b48a" strokeWidth={3} />
        <circle cx={CX} cy={CY} r={SKIN - 26} fill="none" stroke="#e6d4ad" strokeWidth={2} />
        {/* Tacks holding the skin */}
        {ring(30, CX, CY, SKIN + 7).map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#d4b26a" stroke="#6b4e1f" strokeWidth={1} />
        ))}
      </g>

      <g pointerEvents="none">
        <Bachi x={92} y={324} rot={-28} />
        <Bachi x={468} y={324} rot={28} />
      </g>
    </svg>
  );
}

const CHART: Chart = {
  bpm: 120,
  beats: 8,
  notes: [
    { lane: "don", beat: 0 },
    { lane: "don", beat: 2 },
    { lane: "ka", beat: 4 },
    { lane: "don", beat: 6 },
  ],
  // Don is a deep drum thump; ka is the sharp crack of the wooden rim
  sound: (lane) =>
    lane === "don"
      ? play({ freq: 160, to: 55, dur: 0.2, gain: 0.9 }, { filter: "lowpass", freq: 600, dur: 0.06, gain: 0.4 })
      : play({ freq: 1900, to: 1400, type: "triangle", dur: 0.04, gain: 0.35 }, { filter: "bandpass", freq: 3500, q: 3, dur: 0.05, gain: 0.8 }),
};

/** Both halves of the skin are don, both halves of the rim are ka. */
const laneOf = (id: string) => (id.startsWith("don") ? "don" : "ka");

const TARGET_X = 130;

function Screen({ input }: { input: InputState }) {
  const frame = useChart(CHART, input, laneOf);
  const on = (id: string) => input.held.has(id);
  const don = on("don-l") || on("don-r");
  const ka = on("ka-l") || on("ka-r");
  const burst = Math.max(burstOf(frame, "don"), burstOf(frame, "ka"));
  return (
    <>
      <rect width={360} height={160} fill="#f97316" />
      <rect y={44} width={360} height={74} fill="#2b2b2b" />
      <rect y={44} width={360} height={4} fill="#111" />
      <rect y={114} width={360} height={4} fill="#111" />

      {/* Judgement circle; the note that lands is red for don, blue for ka */}
      <circle cx={TARGET_X} cy={81} r={27} fill="none" stroke="#6b6b6b" strokeWidth={3} />
      <circle cx={TARGET_X} cy={81} r={19} fill="none" stroke="#5a5a5a" strokeWidth={2} />
      {(don || ka) && (
        <>
          <circle cx={TARGET_X} cy={81} r={34} fill="none" stroke={don ? "#fde047" : "#bae6fd"} strokeWidth={3} opacity={0.8} />
          <circle cx={TARGET_X} cy={81} r={22} fill={don ? "#ef4444" : "#38bdf8"} stroke="#fff" strokeWidth={4} />
          {don && ka && <circle cx={TARGET_X} cy={81} r={10} fill="#38bdf8" stroke="#fff" strokeWidth={2} />}
        </>
      )}
      {burst > 0 && <circle cx={TARGET_X} cy={81} r={30 + (1 - burst) * 18} fill="none" stroke="#fde047" strokeWidth={4} opacity={burst} />}

      {/* Notes scroll in from the right; drawn before the drum panel so misses slide under it */}
      {frame.notes.map((n) => {
        const x = TARGET_X + n.progress * 250;
        return (
          <g key={n.key}>
            <circle cx={x} cy={81} r={19} fill="#111" />
            <circle cx={x} cy={81} r={16} fill={n.lane === "don" ? "#ef4444" : "#38bdf8"} stroke="#fff" strokeWidth={3} />
          </g>
        );
      })}

      {/* Mini drum showing which zone was hit */}
      <rect width={84} height={160} fill="#c2410c" />
      {(["l", "r"] as const).map((s) => (
        <g key={s}>
          <path d={halfRing(s, 30, 21, 42, 81)} fill={on(`ka-${s}`) ? "#38bdf8" : "#7a2614"} />
          <path d={halfDisc(s, 21, 42, 81)} fill={on(`don-${s}`) ? "#ef4444" : "#f3e4c2"} />
        </g>
      ))}
      <circle cx={42} cy={81} r={30} fill="none" stroke="#111" strokeWidth={2} />

      <JudgementText frame={frame} x={TARGET_X} y={34} size={16} />
    </>
  );
}

export const taikoNoTatsujin: RhythmController = {
  id: "taiko-no-tatsujin",
  name: "Taiko no Tatsujin",
  year: 2001,
  marquee: "TAIKO NO TATSUJIN",
  screen: { width: 360, height: 160 },
  Controller,
  Screen,
};
