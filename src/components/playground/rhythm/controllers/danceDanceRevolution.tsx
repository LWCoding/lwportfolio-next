"use client";

import { ControllerProps, InputState, RhythmController, pressProps } from "../inputs";
import { Chart, JudgementText, burstOf, useChart } from "../gameplay";
import { play } from "../sound";

/** Up-pointing arrow centred on the origin; rotated for the other directions. */
const ARROW = "0,-40 38,-2 15,-2 15,38 -15,38 -15,-2 -38,-2";

const DIRS = [
  { id: "left", rot: -90, col: 0, row: 1 },
  { id: "down", rot: 180, col: 1, row: 2 },
  { id: "up", rot: 0, col: 1, row: 0 },
  { id: "right", rot: 90, col: 2, row: 1 },
];

const CELL = 132;
const GAP = 8;
const ORIGIN = 44;
const cellX = (c: number) => ORIGIN + c * (CELL + GAP);
const cellY = (r: number) => 94 + r * (CELL + GAP);

/** Raised diamond-plate texture on the steel corner and centre squares. */
function SteelPlate({ x, y }: { x: number; y: number }) {
  const marks = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      const mx = x + 14 + c * 21 + (r % 2) * 10;
      const my = y + 14 + r * 21;
      if (mx > x + CELL - 10) continue;
      marks.push(
        <rect
          key={`${r}-${c}`}
          x={mx - 6}
          y={my - 1.5}
          width={12}
          height={3}
          rx={1.5}
          fill="#8d95a1"
          transform={`rotate(${(r + c) % 2 ? 45 : -45} ${mx} ${my})`}
        />,
      );
    }
  }
  return (
    <g>
      <rect x={x} y={y} width={CELL} height={CELL} rx={4} fill="#b4bbc5" stroke="#6b7280" strokeWidth={2} />
      {marks}
    </g>
  );
}

function Controller({ input, api }: ControllerProps) {
  const size = ORIGIN * 2 + CELL * 3 + GAP * 2;
  return (
    <svg viewBox={`0 0 ${size} ${size + 44}`} className="h-full w-full">
      {/* Safety bar behind the player */}
      <path
        d={`M${ORIGIN + 10} 76 V34 a22 22 0 0 1 22 -22 H${size - ORIGIN - 32} a22 22 0 0 1 22 22 V76`}
        fill="none"
        stroke="#4b5563"
        strokeWidth={12}
        strokeLinecap="round"
      />
      <path
        d={`M${ORIGIN + 10} 76 V34 a22 22 0 0 1 22 -22 H${size - ORIGIN - 32} a22 22 0 0 1 22 22 V76`}
        fill="none"
        stroke="#9ca3af"
        strokeWidth={5}
        strokeLinecap="round"
      />

      {/* Stage frame */}
      <rect x={20} y={60} width={size - 40} height={size - 20} rx={14} fill="#3f4652" stroke="#000" strokeWidth={3} />
      <rect x={32} y={72} width={size - 64} height={size - 44} rx={8} fill="#1f242c" />

      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2].map((c) => {
          const dir = DIRS.find((d) => d.col === c && d.row === r);
          if (!dir) return <SteelPlate key={`${c}-${r}`} x={cellX(c)} y={cellY(r)} />;
          const on = input.held.has(dir.id);
          const cx = cellX(c) + CELL / 2;
          const cy = cellY(r) + CELL / 2;
          return (
            <g key={dir.id} {...pressProps(api, dir.id)}>
              {/* Frosted acrylic panel over the printed arrow; it dips when stepped on */}
              <rect x={cellX(c)} y={cellY(r)} width={CELL} height={CELL} rx={4} fill="#6b7280" />
              <rect
                x={cellX(c) + 4}
                y={cellY(r) + 4}
                width={CELL - 8}
                height={CELL - 8}
                rx={3}
                fill={on ? "#c7d2e0" : "#dde3ea"}
                stroke="#9aa5b4"
                strokeWidth={2}
              />
              <polygon
                points={ARROW}
                transform={`translate(${cx} ${cy}) rotate(${dir.rot})`}
                fill={on ? "#2563eb" : "#e8eef7"}
                stroke="#1d4ed8"
                strokeWidth={5}
                strokeLinejoin="round"
              />
            </g>
          );
        }),
      )}

      {/* Bolts around the frame */}
      {[0.08, 0.5, 0.92].flatMap((f) => [
        <circle key={`t${f}`} cx={20 + (size - 40) * f} cy={66} r={3} fill="#9ca3af" />,
        <circle key={`b${f}`} cx={20 + (size - 40) * f} cy={size + 34} r={3} fill="#9ca3af" />,
      ])}
    </svg>
  );
}

const CHART: Chart = {
  bpm: 120,
  beats: 8,
  notes: [
    { lane: "left", beat: 0 },
    { lane: "up", beat: 2 },
    { lane: "right", beat: 4 },
    { lane: "down", beat: 6 },
  ],
  // Short clap-like tick for every step
  sound: () => play({ freq: 1800, to: 900, type: "triangle", dur: 0.05, gain: 0.4 }, { filter: "highpass", freq: 3000, dur: 0.04, gain: 0.3 }),
};

const RECEPTOR_Y = 56;
const laneX = (i: number) => 60 + i * 60;

function Screen({ input }: { input: InputState }) {
  const frame = useChart(CHART, input);
  return (
    <>
      <rect width={300} height={240} fill="#140b2e" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={0} y1={100 + i * 26} x2={300} y2={100 + i * 26} stroke="#22164a" strokeWidth={2} />
      ))}
      {/* Arrows scroll up from the bottom into the receptors */}
      {frame.notes.map((n) => {
        const i = DIRS.findIndex((d) => d.id === n.lane);
        const y = RECEPTOR_Y + n.progress * (240 - RECEPTOR_Y + 30);
        return (
          <g key={n.key} transform={`translate(${laneX(i)} ${y}) rotate(${DIRS[i].rot}) scale(0.55)`}>
            <polygon points={ARROW} fill="#f43f5e" stroke="#fff" strokeWidth={6} strokeLinejoin="round" />
          </g>
        );
      })}
      {DIRS.map((d, i) => {
        const on = input.held.has(d.id);
        const burst = burstOf(frame, d.id);
        return (
          <g key={d.id} transform={`translate(${laneX(i)} ${RECEPTOR_Y}) rotate(${d.rot}) scale(0.62)`}>
            {on && <polygon points={ARROW} fill="none" stroke="#67e8f9" strokeWidth={16} strokeLinejoin="round" opacity={0.5} />}
            <polygon
              points={ARROW}
              fill={on ? "#ffffff" : "#2a2350"}
              stroke={on ? "#ffffff" : "#8b86a8"}
              strokeWidth={6}
              strokeLinejoin="round"
            />
            {burst > 0 && (
              <polygon
                points={ARROW}
                fill="none"
                stroke="#fde047"
                strokeWidth={8}
                strokeLinejoin="round"
                opacity={burst}
                transform={`scale(${1.1 + (1 - burst) * 0.5})`}
              />
            )}
          </g>
        );
      })}
      <JudgementText frame={frame} x={150} y={150} size={20} />
    </>
  );
}

export const danceDanceRevolution: RhythmController = {
  id: "dance-dance-revolution",
  name: "Dance Dance Revolution",
  year: 1998,
  marquee: "DANCE DANCE REVOLUTION",
  screen: { width: 300, height: 240 },
  Controller,
  Screen,
};
