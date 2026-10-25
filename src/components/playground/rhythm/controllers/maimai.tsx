"use client";

import { ControllerProps, InputState, RhythmController, pressProps, ring } from "../inputs";
import { Chart, JudgementText, burstOf, useChart } from "../gameplay";
import { play } from "../sound";

const C = 260;
/** Eight buttons around the screen, offset so none sits dead at the top. */
const BUTTONS = ring(8, C, C, 206, 22.5);

function Controller({ input, api }: ControllerProps) {
  return (
    <svg viewBox="0 0 520 520" className="h-full w-full">
      {/* The "washing machine" face: white body, round bezel, dark glass */}
      <rect x={6} y={6} width={508} height={508} rx={56} fill="#f4f6f9" stroke="#000" strokeWidth={3} />
      <circle cx={C} cy={C} r={236} fill="#e2e6ec" stroke="#9aa3b0" strokeWidth={2} />
      <circle cx={C} cy={C} r={180} fill="#cfd5de" />
      <circle cx={C} cy={C} r={170} fill="#0e1424" stroke="#1e293b" strokeWidth={4} />
      <path d={`M${C - 110} ${C - 110} A156 156 0 0 1 ${C + 40} ${C - 152}`} fill="none" stroke="#334155" strokeWidth={6} strokeLinecap="round" />
      {[
        [40, 40],
        [480, 40],
        [40, 480],
        [480, 480],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={5} fill="#cbd2db" stroke="#6b7280" />
      ))}

      {BUTTONS.map((p, i) => {
        const on = input.held.has(`b-${i}`);
        return (
          <g key={i} transform={`rotate(${p.deg} ${p.x} ${p.y})`} {...pressProps(api, `b-${i}`)}>
            <rect x={p.x - 30} y={p.y - 20} width={60} height={40} rx={14} fill="#9aa3b0" />
            <rect
              x={p.x - 26}
              y={p.y - 16}
              width={52}
              height={32}
              rx={11}
              fill={on ? "#fde68a" : "#fafafa"}
              stroke={on ? "#f59e0b" : "#cbd5e1"}
              strokeWidth={2}
            />
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
    { lane: "b-0", beat: 0 },
    { lane: "b-4", beat: 2 },
    { lane: "b-2", beat: 4 },
    { lane: "b-6", beat: 6 },
  ],
  // Bell tap: a sine with a quieter fifth on top
  sound: () => play({ freq: 1319, dur: 0.16, gain: 0.4 }, { freq: 1976, dur: 0.1, gain: 0.15 }),
};

const SC = 140;
const SR = 118;
const SCREEN_BUTTONS = ring(8, SC, SC, SR, 22.5);

function Screen({ input }: { input: InputState }) {
  const frame = useChart(CHART, input);
  const any = BUTTONS.some((_, i) => input.held.has(`b-${i}`));
  return (
    <>
      <rect width={280} height={280} fill="#000" />
      <circle cx={SC} cy={SC} r={134} fill="#1a1440" />
      <circle cx={SC} cy={SC} r={SR} fill="none" stroke={any ? "#f9a8d4" : "#3b3170"} strokeWidth={any ? 5 : 3} className="transition-all duration-75" />
      {/* Tap notes slide out from the centre toward their button */}
      {frame.notes.map((n) => {
        const p = SCREEN_BUTTONS[Number(n.lane.slice(2))];
        const f = 1 - n.progress;
        return (
          <circle
            key={n.key}
            cx={SC + (p.x - SC) * f}
            cy={SC + (p.y - SC) * f}
            r={6 + 5 * Math.min(1, f)}
            fill="none"
            stroke="#f9a8d4"
            strokeWidth={4}
          />
        );
      })}
      {SCREEN_BUTTONS.map((p, i) => {
        const on = input.held.has(`b-${i}`);
        const burst = burstOf(frame, `b-${i}`);
        return (
          <g key={i}>
            {on && <circle cx={p.x} cy={p.y} r={20} fill="none" stroke="#f472b6" strokeWidth={3} opacity={0.6} />}
            <circle cx={p.x} cy={p.y} r={11} fill={on ? "#f472b6" : "#1a1440"} stroke={on ? "#fff" : "#6d63a8"} strokeWidth={3} />
            {burst > 0 && <circle cx={p.x} cy={p.y} r={16 + (1 - burst) * 14} fill="none" stroke="#fde047" strokeWidth={3} opacity={burst} />}
          </g>
        );
      })}
      <JudgementText frame={frame} x={SC} y={SC + 4} size={20} />
    </>
  );
}

export const maimai: RhythmController = {
  id: "maimai",
  name: "maimai",
  year: 2012,
  marquee: "maimai",
  screen: { width: 280, height: 280 },
  Controller,
  Screen,
};
