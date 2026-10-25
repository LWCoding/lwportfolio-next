"use client";

import { ControllerProps, InputState, RhythmController, pressProps } from "../inputs";
import { Chart, JudgementText, burstOf, useChart } from "../gameplay";
import { PENTATONIC, play } from "../sound";

/** Left to right, mirrored around the red centre button. Pressed tones are the lit lamp colour. */
const BUTTONS = [
  { color: "#f4f4f5", lit: "#ffffff", rim: "#a1a1aa" },
  { color: "#facc15", lit: "#fef08a", rim: "#a16207" },
  { color: "#22c55e", lit: "#86efac", rim: "#15803d" },
  { color: "#3b82f6", lit: "#93c5fd", rim: "#1d4ed8" },
  { color: "#ef4444", lit: "#fca5a5", rim: "#b91c1c" },
  { color: "#3b82f6", lit: "#93c5fd", rim: "#1d4ed8" },
  { color: "#22c55e", lit: "#86efac", rim: "#15803d" },
  { color: "#facc15", lit: "#fef08a", rim: "#a16207" },
  { color: "#f4f4f5", lit: "#ffffff", rim: "#a1a1aa" },
];

// Odd buttons sit on the upper row, so the nine form a zigzag
const pos = (i: number) => ({ x: 64 + i * 59, y: i % 2 === 0 ? 196 : 124 });

function Controller({ input, api }: ControllerProps) {
  return (
    <svg viewBox="0 0 600 290" className="h-full w-full">
      {/* Panel and its raised front edge */}
      <rect x={6} y={6} width={588} height={278} rx={18} fill="#dfe4ec" stroke="#000" strokeWidth={3} />
      <rect x={18} y={18} width={564} height={232} rx={12} fill="#eef1f6" stroke="#b6bfcc" strokeWidth={2} />
      <rect x={18} y={258} width={564} height={16} rx={5} fill="#c3cad6" />
      {/* Colour stripe printed across the panel */}
      <rect x={18} y={36} width={564} height={10} fill="#f9a8d4" />
      <rect x={18} y={46} width={564} height={4} fill="#fde047" />
      {[
        [32, 30],
        [568, 30],
        [32, 238],
        [568, 238],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={4} fill="#9aa4b2" stroke="#4b5563" />
      ))}

      {BUTTONS.map((b, i) => {
        const { x, y } = pos(i);
        const on = input.held.has(`b-${i}`);
        return (
          <g key={i} {...pressProps(api, `b-${i}`)}>
            {/* Clear housing ring, then the domed cap; it sinks slightly when pressed */}
            <circle cx={x} cy={y} r={36} fill="#ffffff" stroke="#6b7280" strokeWidth={2} />
            <circle cx={x} cy={y} r={31} fill="#d1d5db" />
            <circle
              cx={x}
              cy={y + (on ? 1.5 : 0)}
              r={on ? 26.5 : 28}
              fill={on ? b.lit : b.color}
              stroke={b.rim}
              strokeWidth={2}
            />
            <ellipse cx={x - 8} cy={y - 10} rx={9} ry={5} fill="#ffffff" opacity={0.45} />
          </g>
        );
      })}
    </svg>
  );
}

const CHART: Chart = {
  bpm: 120,
  beats: 8,
  notes: [
    { lane: "b-4", beat: 0 },
    { lane: "b-2", beat: 2 },
    { lane: "b-6", beat: 4 },
    { lane: "b-3", beat: 6 },
  ],
  // Bouncy square-wave blip, pitched up the scale from left to right
  sound: (lane) => play({ freq: PENTATONIC[Number(lane.slice(2))], type: "square", dur: 0.09, gain: 0.25 }),
};

function Screen({ input }: { input: InputState }) {
  const frame = useChart(CHART, input);
  const laneW = 28;
  const left = 24;
  const line = 292;
  return (
    <>
      <rect width={300} height={340} fill="#1b1037" />
      <rect x={left} width={laneW * 9} height={340} fill="#0f0a24" />
      {BUTTONS.map((b, i) => {
        const x = left + i * laneW;
        const cx = x + laneW / 2;
        const on = input.held.has(`b-${i}`);
        const burst = burstOf(frame, `b-${i}`);
        return (
          <g key={i}>
            <rect x={x} width={laneW} height={340} fill={b.color} opacity={on ? 0.35 : 0.06} className="transition-opacity duration-75" />
            <line x1={x} y1={0} x2={x} y2={340} stroke="#2e2457" />
            {/* Judgement marker, filled while the button is down */}
            <circle cx={cx} cy={line} r={11} fill={on ? b.color : "none"} stroke={on ? "#fff" : b.color} strokeWidth={2.5} />
            {on && <circle cx={cx} cy={line} r={17} fill="none" stroke={b.color} strokeWidth={2} opacity={0.7} />}
            {burst > 0 && <circle cx={cx} cy={line} r={14 + (1 - burst) * 14} fill="none" stroke="#fff" strokeWidth={3} opacity={burst} />}
          </g>
        );
      })}
      <rect x={left} y={line - 2} width={laneW * 9} height={4} fill="#ffffff" opacity={0.18} />
      {/* Falling "pop-kun" notes in their button's colour */}
      {frame.notes.map((n) => {
        const i = Number(n.lane.slice(2));
        return (
          <ellipse
            key={n.key}
            cx={left + i * laneW + laneW / 2}
            cy={line - n.progress * (line + 20)}
            rx={12}
            ry={7}
            fill={BUTTONS[i].color}
            stroke="#fff"
            strokeWidth={2}
          />
        );
      })}
      <JudgementText frame={frame} x={150} y={200} />
    </>
  );
}

export const popnMusic: RhythmController = {
  id: "popn-music",
  name: "pop'n music",
  year: 1998,
  marquee: "POP'N MUSIC",
  screen: { width: 300, height: 340 },
  Controller,
  Screen,
};
