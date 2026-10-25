"use client";

import { ControllerProps, InputState, RhythmController, pressProps, ring, useRotary } from "../inputs";
import { Chart, JudgementText, burstOf, useChart } from "../gameplay";
import { PENTATONIC, play } from "../sound";

const TT = { cx: 158, cy: 160 };
/** Keys 1–7: odd keys are white on the lower row, even keys black on the upper row. */
const KEYS = Array.from({ length: 7 }, (_, i) => {
  const white = i % 2 === 0;
  return { white, x: 318 + i * 40, y: white ? 168 : 66 };
});

function Controller({ input, api }: ControllerProps) {
  const rot = input.values.tt ?? 0;
  const turntable = useRotary(api, "scratch", TT.cx, TT.cy, (d) => api.nudge("tt", d));
  const on = (id: string) => input.held.has(id);

  return (
    <svg viewBox="0 0 640 300" className="h-full w-full">
      <rect x={6} y={6} width={628} height={288} rx={16} fill="#141416" stroke="#000" strokeWidth={3} />
      <rect x={18} y={18} width={604} height={264} rx={10} fill="#1c1c1f" stroke="#2c2c31" strokeWidth={2} />

      {/* Turntable: housing, platter with rubber grooves, and a marker so the spin shows */}
      <g {...turntable}>
        <circle cx={TT.cx} cy={TT.cy} r={124} fill="#0a0a0b" />
        <circle cx={TT.cx} cy={TT.cy} r={116} fill="#3a3a40" stroke="#55555c" strokeWidth={2} />
        <g transform={`rotate(${rot} ${TT.cx} ${TT.cy})`}>
          <circle cx={TT.cx} cy={TT.cy} r={106} fill={on("scratch") ? "#1a1a1d" : "#111113"} stroke="#000" strokeWidth={2} />
          {[94, 80, 66, 52].map((r) => (
            <circle key={r} cx={TT.cx} cy={TT.cy} r={r} fill="none" stroke="#232327" strokeWidth={2} />
          ))}
          {ring(36, TT.cx, TT.cy, 101).map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={1.6} fill="#2e2e33" />
          ))}
          <circle cx={TT.cx} cy={TT.cy} r={34} fill="#d4d4d8" stroke="#71717a" strokeWidth={2} />
          <circle cx={TT.cx} cy={TT.cy} r={22} fill="#dc2626" />
          <rect x={TT.cx - 3} y={TT.cy - 104} width={6} height={22} rx={3} fill="#f4f4f5" />
          <circle cx={TT.cx} cy={TT.cy} r={5} fill="#a1a1aa" stroke="#52525b" />
        </g>
      </g>

      {/* START / EFFECT / VEFX */}
      {[
        { id: "start", x: 470, label: "START" },
        { id: "effect", x: 524, label: "EFFECT" },
        { id: "vefx", x: 578, label: "VEFX" },
      ].map((b) => (
        <g key={b.id} {...pressProps(api, b.id)}>
          <rect x={b.x - 20} y={30} width={40} height={16} rx={3} fill="#0a0a0b" />
          <rect x={b.x - 17} y={32} width={34} height={12} rx={2} fill={on(b.id) ? "#fca5a5" : "#b91c1c"} />
          <text x={b.x} y={56} textAnchor="middle" fontSize={7} fontWeight={700} fill="#71717a" fontFamily="system-ui, sans-serif">
            {b.label}
          </text>
        </g>
      ))}

      {KEYS.map((k, i) => {
        const pressed = on(`k-${i}`);
        return (
          <g key={i} {...pressProps(api, `k-${i}`)}>
            <rect x={k.x - 4} y={k.y - 4} width={56} height={108} rx={5} fill="#060607" />
            <rect
              x={k.x}
              y={k.y + (pressed ? 2 : 0)}
              width={48}
              height={100}
              rx={3}
              fill={k.white ? (pressed ? "#d9e6f5" : "#f4f4f5") : pressed ? "#3b4b66" : "#26262b"}
              stroke={pressed ? "#60a5fa" : k.white ? "#a1a1aa" : "#4b4b52"}
              strokeWidth={2}
            />
            <rect x={k.x + 6} y={k.y + 8 + (pressed ? 2 : 0)} width={36} height={4} rx={2} fill={k.white ? "#e4e4e7" : "#35353b"} />
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
    { lane: "k-0", beat: 0 },
    { lane: "k-3", beat: 2 },
    { lane: "scratch", beat: 4 },
    { lane: "k-5", beat: 6 },
  ],
  // Keys ring like a piano key; the turntable is a quick scratch of swept noise
  sound: (lane) =>
    lane === "scratch"
      ? play({ filter: "bandpass", freq: 2500, to: 500, q: 2, dur: 0.12, gain: 0.7 })
      : play({ freq: PENTATONIC[Number(lane.slice(2))], type: "triangle", dur: 0.14, gain: 0.45 }),
};

const LINE = 300;
const LANES = ["scratch", ...KEYS.map((_, i) => `k-${i}`)];

function Screen({ input }: { input: InputState }) {
  const frame = useChart(CHART, input);
  const on = (id: string) => input.held.has(id);
  const rot = input.values.tt ?? 0;
  const laneX = (i: number) => 74 + i * 25;
  const noteY = (progress: number) => LINE - progress * (LINE + 10);
  return (
    <>
      <rect width={260} height={340} fill="#050508" />
      <rect x={20} width={54} height={340} fill="#1a0b0d" />
      <rect x={20} width={54} height={340} fill="#ef4444" opacity={on("scratch") ? 0.4 : 0} className="transition-opacity duration-75" />
      {KEYS.map((k, i) => (
        <g key={i}>
          <rect x={laneX(i)} width={25} height={340} fill={k.white ? "#0d0d12" : "#090b14"} stroke="#1f2130" />
          <rect
            x={laneX(i)}
            width={25}
            height={300}
            fill={k.white ? "#ffffff" : "#60a5fa"}
            opacity={on(`k-${i}`) ? 0.4 : 0}
            className="transition-opacity duration-75"
          />
          {/* Key-state lamps under the judgement line */}
          <rect x={laneX(i) + 3} y={312} width={19} height={10} rx={2} fill={on(`k-${i}`) ? (k.white ? "#fff" : "#60a5fa") : k.white ? "#2a2a33" : "#1c2238"} />
        </g>
      ))}
      {/* Falling notes: white and blue for the keys, red bars for the turntable */}
      {frame.notes.map((n) => {
        const y = noteY(n.progress) - 4;
        if (n.lane === "scratch") return <rect key={n.key} x={22} y={y} width={50} height={8} rx={1} fill="#ef4444" />;
        const i = Number(n.lane.slice(2));
        return <rect key={n.key} x={laneX(i) + 1} y={y} width={23} height={8} rx={1} fill={KEYS[i].white ? "#f4f4f5" : "#60a5fa"} />;
      })}
      {LANES.map((lane, i) => {
        const burst = burstOf(frame, lane);
        if (burst === 0) return null;
        return <rect key={lane} x={i === 0 ? 20 : laneX(i - 1)} y={LINE - 18} width={i === 0 ? 54 : 25} height={20} fill="#fde68a" opacity={burst} />;
      })}
      <rect x={20} y={LINE - 2} width={229} height={4} fill="#ef4444" />
      {/* Mini turntable under the scratch lane */}
      <g transform={`rotate(${rot} 47 320)`}>
        <circle cx={47} cy={320} r={14} fill="#18181b" stroke="#52525b" strokeWidth={2} />
        <rect x={45.5} y={307} width={3} height={7} fill="#f4f4f5" />
      </g>
      <JudgementText frame={frame} x={162} y={200} />
    </>
  );
}

export const beatmaniaIIDX: RhythmController = {
  id: "beatmania-iidx",
  name: "beatmania IIDX",
  year: 1999,
  marquee: "beatmania IIDX",
  screen: { width: 260, height: 340 },
  Controller,
  Screen,
};
