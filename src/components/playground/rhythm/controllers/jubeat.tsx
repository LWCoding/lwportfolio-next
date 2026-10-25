"use client";

import { ControllerProps, InputState, RhythmController, pressProps } from "../inputs";
import { Chart, burstOf, useChart } from "../gameplay";
import { play } from "../sound";

const PANEL = 92;
const GAP = 12;
const GRID_X = 42;
const GRID_Y = 70;
const cells = Array.from({ length: 16 }, (_, i) => ({ i, col: i % 4, row: Math.floor(i / 4) }));

function Controller({ input, api }: ControllerProps) {
  return (
    <svg viewBox="0 0 488 510" className="h-full w-full">
      {/* Silver body, black bezel around the panel grid */}
      <rect x={6} y={6} width={476} height={498} rx={22} fill="#e4e7eb" stroke="#000" strokeWidth={3} />
      <rect x={18} y={18} width={452} height={28} rx={8} fill="#d1d5db" />
      {Array.from({ length: 18 }, (_, i) => (
        <circle key={i} cx={160 + i * 10} cy={32} r={2.2} fill="#6b7280" />
      ))}
      <rect x={30} y={58} width={428} height={428} rx={12} fill="#0b0d12" stroke="#4b5563" strokeWidth={2} />

      {cells.map(({ i, col, row }) => {
        const x = GRID_X + col * (PANEL + GAP);
        const y = GRID_Y + row * (PANEL + GAP);
        const on = input.held.has(`p-${i}`);
        return (
          <g key={i} {...pressProps(api, `p-${i}`)}>
            {/* Clear acrylic panel over the screen; it sinks a little when pressed */}
            <rect x={x} y={y} width={PANEL} height={PANEL} rx={6} fill="#141821" stroke="#1f2937" strokeWidth={2} />
            <rect
              x={x + (on ? 5 : 3)}
              y={y + (on ? 5 : 3)}
              width={PANEL - (on ? 10 : 6)}
              height={PANEL - (on ? 10 : 6)}
              rx={4}
              fill={on ? "#2b3446" : "#1e2533"}
              stroke={on ? "#cbd5e1" : "#64748b"}
              strokeWidth={1.5}
            />
            <path d={`M${x + 12} ${y + 22} V${y + 12} H${x + 22}`} fill="none" stroke="#94a3b8" strokeWidth={2} opacity={0.6} />
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
    { lane: "p-5", beat: 0 },
    { lane: "p-10", beat: 2 },
    { lane: "p-3", beat: 4 },
    { lane: "p-12", beat: 6 },
  ],
  // Soft glassy pluck, a little higher toward the top of the grid
  sound: (lane) => play({ freq: 1568 - Math.floor(Number(lane.slice(2)) / 4) * 120, type: "sine", dur: 0.1, gain: 0.45 }),
};

/** Markers only show for the last stretch before their hit, growing to fill the panel. */
const MARKER_MS = 700;

function Screen({ input }: { input: InputState }) {
  const frame = useChart(CHART, input);
  const size = 56;
  const gap = 8;
  const j = frame.judgement;
  return (
    <>
      <rect width={260} height={260} fill="#05060a" />
      {cells.map(({ i, col, row }) => {
        const x = 10 + col * (size + gap);
        const y = 10 + row * (size + gap);
        const lane = `p-${i}`;
        const on = input.held.has(lane);
        const burst = burstOf(frame, lane);
        return (
          <g key={i}>
            <rect x={x} y={y} width={size} height={size} rx={4} fill="#11151f" stroke="#232a3a" strokeWidth={1.5} />
            {frame.notes
              .filter((n) => n.lane === lane && n.dt <= MARKER_MS)
              .map((n) => {
                // Grows in as the hit nears, then fades if it is missed
                const grow = 1 - Math.max(0, n.dt) / MARKER_MS;
                const s = size * (0.3 + 0.7 * grow);
                return (
                  <rect
                    key={n.key}
                    x={x + (size - s) / 2}
                    y={y + (size - s) / 2}
                    width={s}
                    height={s}
                    rx={4}
                    fill="#0ea5e9"
                    fillOpacity={0.25 * grow}
                    stroke="#38bdf8"
                    strokeWidth={3}
                    opacity={n.dt < 0 ? Math.max(0, 1 + n.dt / 200) : 1}
                  />
                );
              })}
            {on && (
              <>
                <rect x={x + 6} y={y + 6} width={size - 12} height={size - 12} rx={3} fill="#facc15" />
                <rect x={x - 2} y={y - 2} width={size + 4} height={size + 4} rx={6} fill="none" stroke="#fef08a" strokeWidth={3} />
              </>
            )}
            {burst > 0 && <rect x={x - 4} y={y - 4} width={size + 8} height={size + 8} rx={8} fill="none" stroke="#fff" strokeWidth={3} opacity={burst} />}
            {/* jubeat judges inside the panel that was hit */}
            {j?.lane === lane && (
              <text
                x={x + size / 2}
                y={y + size / 2 + 4}
                textAnchor="middle"
                fontSize={11}
                fontWeight={900}
                fontFamily="system-ui, sans-serif"
                fill={j.label === "MISS" ? "#9ca3af" : "#fff"}
                stroke="#000"
                strokeWidth={2.5}
                paintOrder="stroke"
                opacity={1 - j.age}
                pointerEvents="none"
              >
                {j.label}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
}

export const jubeat: RhythmController = {
  id: "jubeat",
  name: "jubeat",
  year: 2008,
  marquee: "jubeat",
  screen: { width: 260, height: 260 },
  Controller,
  Screen,
};
