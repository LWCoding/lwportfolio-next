"use client";

import { ControllerProps, InputState, RhythmController, pressProps, ring, useHorizontalDrag } from "../inputs";
import { Chart, JudgementText, burstOf, useChart } from "../gameplay";
import { play } from "../sound";

const BT_X = [165, 255, 345, 435];
const FX_X = [210, 390];
/** Sideways drag (SVG units) that moves a laser across the whole track. */
const DRAG_PER_SWEEP = 200;
const KNOBS = [
  { id: "vol-l", cx: 96, cap: "#1e9bd7", top: "#29b0ec", dark: "#0c4a6e" },
  { id: "vol-r", cx: 504, cap: "#d9338c", top: "#ec4899", dark: "#831843" },
];

function Knob({ api, input, k }: ControllerProps & { k: (typeof KNOBS)[number] }) {
  // Dragging sideways turns the knob by how far the pointer moved, wherever it was grabbed.
  // Like the real encoder it spins forever with no home position: the value is just a
  // running count of turning, and the screen reads how much it changed
  const handlers = useHorizontalDrag(api, k.id, (dx) => {
    api.nudge(`${k.id}-rot`, (dx / DRAG_PER_SWEEP) * 270);
    api.nudge(k.id, dx / DRAG_PER_SWEEP);
  });
  const rot = input.values[`${k.id}-rot`] ?? 0;
  return (
    <g {...handlers}>
      <circle cx={k.cx} cy={76} r={48} fill="#0b0b0d" stroke="#2f2f35" strokeWidth={2} />
      <g transform={`rotate(${rot} ${k.cx} 76)`}>
        <circle cx={k.cx} cy={76} r={37} fill={k.cap} stroke={k.dark} strokeWidth={2} />
        {ring(28, k.cx, 76, 33.5).map((p, i) => (
          <rect
            key={i}
            x={k.cx - 1.5}
            y={76 - 37}
            width={3}
            height={7}
            fill={k.dark}
            transform={`rotate(${p.deg} ${k.cx} 76)`}
          />
        ))}
        <circle cx={k.cx} cy={76} r={24} fill={k.top} />
        <rect x={k.cx - 2} y={42} width={4} height={16} rx={2} fill="#fff" />
      </g>
    </g>
  );
}

function Controller({ input, api }: ControllerProps) {
  const on = (id: string) => input.held.has(id);
  return (
    <svg viewBox="0 0 600 310" className="h-full w-full">
      <rect x={6} y={6} width={588} height={298} rx={20} fill="#18181b" stroke="#000" strokeWidth={3} />
      <path d="M26 20 H574 a8 8 0 0 1 8 8 V128 H18 V28 a8 8 0 0 1 8 -8 Z" fill="#232328" />
      <line x1={18} y1={128} x2={582} y2={128} stroke="#0a0a0c" strokeWidth={2} />
      <rect x={18} y={282} width={564} height={12} rx={4} fill="#0f0f11" />
      {[
        [30, 34],
        [570, 34],
        [30, 268],
        [570, 268],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={4} fill="#3f3f46" stroke="#0a0a0c" />
      ))}

      {KNOBS.map((k) => (
        <Knob key={k.id} input={input} api={api} k={k} />
      ))}

      <g {...pressProps(api, "start")}>
        <rect x={278} y={58} width={44} height={26} rx={6} fill="#0b0b0d" />
        <rect x={282} y={61} width={36} height={20} rx={4} fill={on("start") ? "#60a5fa" : "#2563eb"} stroke="#1e3a8a" />
      </g>

      {BT_X.map((cx, i) => (
        <g key={cx} {...pressProps(api, `bt-${i}`)}>
          <rect x={cx - 42} y={138} width={84} height={84} rx={10} fill="#0b0b0d" />
          <rect
            x={cx - 37}
            y={143}
            width={74}
            height={74}
            rx={7}
            fill={on(`bt-${i}`) ? "#ffffff" : "#f4f4f5"}
            stroke={on(`bt-${i}`) ? "#38bdf8" : "#a1a1aa"}
            strokeWidth={on(`bt-${i}`) ? 3 : 2}
          />
          <rect x={cx - 28} y={152} width={56} height={56} rx={4} fill="none" stroke="#d4d4d8" strokeWidth={1.5} />
        </g>
      ))}

      {FX_X.map((cx, i) => (
        <g key={cx} {...pressProps(api, `fx-${i}`)}>
          <rect x={cx - 66} y={236} width={132} height={38} rx={8} fill="#0b0b0d" />
          <rect
            x={cx - 61}
            y={240}
            width={122}
            height={30}
            rx={6}
            fill={on(`fx-${i}`) ? "#fb923c" : "#3f3f46"}
            stroke="#52525b"
            strokeWidth={2}
          />
        </g>
      ))}
    </svg>
  );
}

const CHART: Chart = {
  bpm: 120,
  beats: 18,
  // Three phases, one kind of input each: BT buttons, then FX buttons, then the knobs.
  // Everything is on screen from 2.8 beats before it lands (LEAD_MS) to half a beat
  // after, so each phase has scrolled away before the next one appears
  notes: [
    { lane: "bt-1", beat: 0 },
    { lane: "bt-2", beat: 1 },
    { lane: "fx-0", beat: 4.5 },
    { lane: "fx-1", beat: 5.5 },
  ],
  // The hand on a knob can't press anything, so lasers get the stretch to themselves
  lasers: [
    { lane: "vol-l", points: [{ beat: 9, x: 0 }, { beat: 10, x: 0.5 }, { beat: 11, x: 0 }] },
    { lane: "vol-r", points: [{ beat: 12, x: 1 }, { beat: 13, x: 0.5 }, { beat: 14, x: 1 }] },
  ],
  // Crisp blip for BT, a duller thud for FX, and a rising sweep when a laser is followed through
  sound: (lane) => {
    if (lane.startsWith("bt")) play({ freq: 1400, type: "square", dur: 0.05, gain: 0.2 });
    else if (lane.startsWith("fx")) play({ freq: 320, to: 200, type: "sawtooth", dur: 0.1, gain: 0.25 });
    else play({ freq: 600, to: 1800, type: "triangle", dur: 0.18, gain: 0.35 });
  },
};

const LINE = 294;
const LASER_COLORS: Record<string, string> = { "vol-l": "#38bdf8", "vol-r": "#f472b6" };
const laserX = (v: number) => 30 + v * 160;
const BT_LANE_X = [31, 71, 111, 151];
const FX_LANE_X = [30, 110];
const BURST_LANES = [
  ...BT_LANE_X.map((x, i) => ({ lane: `bt-${i}`, x, w: 38 })),
  ...FX_LANE_X.map((x, i) => ({ lane: `fx-${i}`, x, w: 80 })),
];

function Screen({ input }: { input: InputState }) {
  const frame = useChart(CHART, input);
  const on = (id: string) => input.held.has(id);
  const lasers = Object.entries(LASER_COLORS).map(([id, color]) => ({ id, color }));
  const noteY = (progress: number) => LINE - progress * (LINE + 14);
  return (
    <>
      <rect width={220} height={340} fill="#07070d" />
      <rect x={30} width={160} height={340} fill="#10121c" />
      {[70, 110, 150].map((x) => (
        <line key={x} x1={x} y1={0} x2={x} y2={340} stroke="#2a2f45" />
      ))}
      <line x1={30} y1={0} x2={30} y2={340} stroke="#3b82f6" strokeWidth={2} />
      <line x1={190} y1={0} x2={190} y2={340} stroke="#ec4899" strokeWidth={2} />
      {FX_LANE_X.map((x, i) => (
        <rect key={x} x={x} width={80} height={340} fill="#fb923c" opacity={on(`fx-${i}`) ? 0.35 : 0} className="transition-opacity duration-75" />
      ))}
      {BT_LANE_X.map((x, i) => (
        <rect key={x} x={x} width={38} height={340} fill="#fff" opacity={on(`bt-${i}`) ? 0.45 : 0} className="transition-opacity duration-75" />
      ))}
      {/* Lasers bend toward the knob value to hold as they reach the line */}
      {frame.lasers.map((l) => {
        const points = l.points.map((p) => `${laserX(p.x)},${noteY(p.progress)}`).join(" ");
        return (
          <g key={l.key} fill="none" strokeLinejoin="round" strokeLinecap="round">
            <polyline points={points} stroke={LASER_COLORS[l.lane]} strokeWidth={18} opacity={0.35} />
            <polyline points={points} stroke={LASER_COLORS[l.lane]} strokeWidth={5} />
          </g>
        );
      })}
      {/* FX notes are wide orange bars, drawn under the white BT chips */}
      {frame.notes
        .filter((n) => n.lane.startsWith("fx"))
        .map((n) => (
          <rect key={n.key} x={FX_LANE_X[Number(n.lane.slice(3))] + 1} y={noteY(n.progress) - 6} width={78} height={12} rx={2} fill="#f97316" />
        ))}
      {frame.notes
        .filter((n) => n.lane.startsWith("bt"))
        .map((n) => (
          <rect key={n.key} x={BT_LANE_X[Number(n.lane.slice(3))] + 2} y={noteY(n.progress) - 4} width={34} height={8} rx={1} fill="#f4f4f5" />
        ))}
      {BURST_LANES.map((l) => {
        const burst = burstOf(frame, l.lane);
        return burst > 0 && <rect key={l.lane} x={l.x} y={LINE - 18} width={l.w} height={20} fill="#fde68a" opacity={burst} />;
      })}
      <rect x={30} y={LINE - 2} width={160} height={4} fill="#e5e7eb" />
      {lasers.map((l) => {
        // The cursor only exists while its laser is on screen
        const cursor = frame.cursors[l.id];
        const burst = burstOf(frame, l.id);
        if (cursor === undefined) {
          return burst > 0 && <circle key={l.id} cx={laserX(l.id === "vol-l" ? 0 : 1)} cy={LINE} r={12 + (1 - burst) * 14} fill="none" stroke="#fde047" strokeWidth={3} opacity={burst} />;
        }
        const x = laserX(cursor);
        const tracking = frame.lasers.some((f) => f.lane === l.id && f.tracking);
        return (
          <g key={l.id}>
            <rect x={x - 3} width={6} height={LINE} fill={l.color} opacity={on(l.id) ? 0.5 : 0} />
            {/* Cursor glows while it rides the laser */}
            {tracking && <circle cx={x} cy={LINE} r={12} fill={l.color} opacity={0.55} />}
            {burst > 0 && <circle cx={x} cy={LINE} r={12 + (1 - burst) * 14} fill="none" stroke="#fde047" strokeWidth={3} opacity={burst} />}
            <polygon points="0,0 -9,16 9,16" fill={l.color} transform={`translate(${x},${LINE + 4})`} />
          </g>
        );
      })}
      <rect x={96} y={318} width={28} height={10} rx={3} fill={on("start") ? "#60a5fa" : "transparent"} />
      <JudgementText frame={frame} x={110} y={200} />
    </>
  );
}

export const soundVoltex: RhythmController = {
  id: "sound-voltex",
  name: "Sound Voltex",
  year: 2012,
  marquee: "SOUND VOLTEX",
  screen: { width: 220, height: 340 },
  Controller,
  Screen,
};
