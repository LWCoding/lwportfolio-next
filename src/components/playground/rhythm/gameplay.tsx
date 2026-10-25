"use client";

import { useEffect, useRef, useState } from "react";
import type { InputState } from "./inputs";

/** One note on a looping chart: which lane, and which beat of the loop it lands on. */
export interface Note {
  lane: string;
  beat: number;
}

/** A knob-driven laser: the cursor position (0 to 1) to hold at each beat, joined by straight runs. */
export interface Laser {
  lane: string;
  points: { beat: number; x: number }[];
}

export interface Chart {
  bpm: number;
  /** Length of the loop in beats. */
  beats: number;
  notes: Note[];
  lasers?: Laser[];
  /** Hit sound for a lane, played when a note or laser in it is hit. */
  sound?: (lane: string) => void;
}

/** How long a note is on screen before it reaches the judgement line, in ms. */
export const LEAD_MS = 1400;
/** How long a note keeps drawing after its hit time, so misses visibly slide past. */
const TAIL_MS = 260;
const GOOD_MS = 160;
const GREAT_MS = 60;
const JUDGEMENT_MS = 450;
const BURST_MS = 220;
/** How recently the knob must have turned the laser's way for it to count, in ms. */
const TURN_GRACE_MS = 150;
/** Laser slope (track widths per ms) below which a laser counts as straight. */
const STRAIGHT_SLOPE = 1e-5;

export type JudgementLabel = "GREAT" | "GOOD" | "MISS";

export interface LiveNote {
  key: string;
  lane: string;
  /** ms until the note lands; negative once it has passed. */
  dt: number;
  /** dt as a fraction of LEAD_MS: 1 when it appears, 0 on the judgement line. */
  progress: number;
}

export interface LiveLaser {
  key: string;
  lane: string;
  /** Each bend of the laser, placed by progress (as on LiveNote) and cursor position. */
  points: { progress: number; x: number }[];
  /** Whether the knob is turning the way the laser goes where it crosses the line right now. */
  tracking: boolean;
}

export interface Judgement {
  label: JudgementLabel;
  lane: string;
  /** 0 when it happened, 1 when it has faded out. */
  age: number;
}

export interface Frame {
  notes: LiveNote[];
  lasers: LiveLaser[];
  judgement: Judgement | null;
  combo: number;
  /** Lanes that were hit just now, with how far their burst has faded (0 to 1). */
  bursts: { lane: string; age: number }[];
  /**
   * Laser cursor position (0 to 1) per laser lane, or absent when no laser is on
   * screen. It waits at an incoming laser's start, then rides the knob while the laser passes.
   */
  cursors: Record<string, number>;
}

const EMPTY: Frame = { notes: [], lasers: [], judgement: null, combo: 0, bursts: [], cursors: {} };
const sameLane = (id: string) => id;

/**
 * Plays a chart on a loop against the player's input. Pressing a lane near a
 * note's hit time scores it; notes that slide past unhit are misses.
 *
 * Laser knobs are read like the real encoders: only which way they are turning
 * counts, never where they point. While a laser crosses the line its cursor
 * sticks to it as long as the knob turns the way the laser is heading (or the
 * laser is straight); turning the wrong way or stopping on a slope lets the
 * cursor slip off, drifting with the knob. The laser is judged when it ends by
 * how much of its run the knob was turning correctly.
 * laneOf maps an input id to its chart lane (or null when the input has no notes).
 */
export function useChart(chart: Chart, input: InputState, laneOf: (id: string) => string | null = sameLane) {
  const [frame, setFrame] = useState<Frame>(EMPTY);
  const now = useRef(0);
  const judged = useRef(new Map<string, number>());
  const last = useRef<{ label: JudgementLabel; lane: string; at: number } | null>(null);
  const combo = useRef(0);
  const bursts = useRef<{ lane: string; at: number }[]>([]);
  const prevHeld = useRef(input.held);
  const values = useRef(input.values);
  const tracked = useRef(new Map<string, number>());
  /** Cursor position for each laser currently crossing the line. */
  const riding = useRef(new Map<string, number>());
  /** Whether each laser crossing the line is being followed right now. */
  const following = useRef(new Map<string, boolean>());

  useEffect(() => {
    values.current = input.values;
  }, [input.values]);

  const beatMs = 60000 / chart.bpm;
  const loopMs = chart.beats * beatMs;

  // Every note instance whose hit time falls in [from, to], across loops
  const instancesRef = useRef((from: number, to: number) => {
    const out: { key: string; lane: string; at: number }[] = [];
    for (let loop = Math.max(0, Math.floor((from - LEAD_MS) / loopMs)); LEAD_MS + loop * loopMs <= to; loop++) {
      chart.notes.forEach((n, i) => {
        const at = LEAD_MS + loop * loopMs + n.beat * beatMs;
        if (at >= from && at <= to) out.push({ key: `${loop}-${i}`, lane: n.lane, at });
      });
    }
    return out;
  });

  useEffect(() => {
    const instances = instancesRef.current;
    // Every laser instance overlapping [from, to], with its bends in ms
    const laserInstances = (from: number, to: number) => {
      const out: { key: string; lane: string; points: { at: number; x: number }[] }[] = [];
      for (let loop = Math.max(0, Math.floor((from - LEAD_MS) / loopMs) - 1); LEAD_MS + loop * loopMs <= to; loop++) {
        (chart.lasers ?? []).forEach((l, i) => {
          const points = l.points.map((p) => ({ at: LEAD_MS + loop * loopMs + p.beat * beatMs, x: p.x }));
          if (points[0].at <= to && points[points.length - 1].at >= from) out.push({ key: `L${loop}-${i}`, lane: l.lane, points });
        });
      }
      return out;
    };
    const laserTarget = (points: { at: number; x: number }[], t: number) => {
      const k = points.findIndex((p) => p.at >= t);
      if (k <= 0) return points[Math.max(0, k)].x;
      const a = points[k - 1];
      const b = points[k];
      return a.x + ((b.x - a.x) * (t - a.at)) / (b.at - a.at);
    };
    const laneIds = [...new Set((chart.lasers ?? []).map((l) => l.lane))];

    let start: number | null = null;
    let prev = 0;
    let prevValues = values.current;
    /** Direction (+1 right, -1 left) and time of each knob's latest turn. */
    const lastTurn: Record<string, { dir: number; at: number }> = {};
    let raf = requestAnimationFrame(function tick(ts) {
      start ??= ts;
      const t = ts - start;
      const step = t - prev;
      prev = t;
      now.current = t;
      // How far each knob turned since last frame
      const turned = (lane: string) => (values.current[lane] ?? 0) - (prevValues[lane] ?? 0);
      for (const lane of laneIds) {
        const d = turned(lane);
        if (d !== 0) lastTurn[lane] = { dir: Math.sign(d), at: t };
      }

      for (const l of laserInstances(t - 2 * loopMs, t)) {
        if (judged.current.has(l.key)) continue;
        const first = l.points[0].at;
        const end = l.points[l.points.length - 1].at;
        if (t <= end) {
          if (t >= first) {
            const target = laserTarget(l.points, t);
            const slope = (laserTarget(l.points, Math.min(end, t + 16)) - target) / 16;
            const turn = lastTurn[l.lane];
            const ok =
              Math.abs(slope) < STRAIGHT_SLOPE || (turn !== undefined && t - turn.at <= TURN_GRACE_MS && turn.dir === Math.sign(slope));
            // Followed: the cursor locks onto the laser. Otherwise it drifts with the knob
            const pos = ok ? target : Math.min(1, Math.max(0, (riding.current.get(l.key) ?? l.points[0].x) + turned(l.lane)));
            riding.current.set(l.key, pos);
            following.current.set(l.key, ok);
            if (ok) tracked.current.set(l.key, (tracked.current.get(l.key) ?? 0) + step);
          }
          continue;
        }
        const share = (tracked.current.get(l.key) ?? 0) / (end - first);
        const label: JudgementLabel = share >= 0.8 ? "GREAT" : share >= 0.45 ? "GOOD" : "MISS";
        judged.current.set(l.key, end);
        tracked.current.delete(l.key);
        riding.current.delete(l.key);
        following.current.delete(l.key);
        last.current = { label, lane: l.lane, at: t };
        if (label === "MISS") combo.current = 0;
        else {
          combo.current += 1;
          bursts.current.push({ lane: l.lane, at: t });
          chart.sound?.(l.lane);
        }
      }

      for (const n of instances(t - 2 * loopMs, t - GOOD_MS)) {
        if (judged.current.has(n.key)) continue;
        judged.current.set(n.key, n.at);
        last.current = { label: "MISS", lane: n.lane, at: t };
        combo.current = 0;
      }
      for (const [key, at] of judged.current) if (at < t - 2 * loopMs) judged.current.delete(key);
      bursts.current = bursts.current.filter((b) => t - b.at < BURST_MS);

      prevValues = values.current;

      const onScreen = laserInstances(t - TAIL_MS, t + LEAD_MS);
      const cursors: Record<string, number> = {};
      for (const lane of laneIds) {
        const live = onScreen.find((l) => l.lane === lane && riding.current.has(l.key));
        const next = onScreen.find((l) => l.lane === lane && l.points[0].at > t);
        if (live) cursors[lane] = riding.current.get(live.key)!;
        else if (next) cursors[lane] = next.points[0].x;
      }

      const j = last.current && t - last.current.at < JUDGEMENT_MS ? last.current : null;
      setFrame({
        notes: instances(t - TAIL_MS, t + LEAD_MS)
          .filter((n) => !judged.current.has(n.key) || n.at < t - GOOD_MS)
          .map((n) => ({ key: n.key, lane: n.lane, dt: n.at - t, progress: (n.at - t) / LEAD_MS })),
        lasers: onScreen.map((l) => ({
          key: l.key,
          lane: l.lane,
          points: l.points.map((p) => ({ progress: (p.at - t) / LEAD_MS, x: p.x })),
          tracking: following.current.get(l.key) ?? false,
        })),
        judgement: j && { label: j.label, lane: j.lane, age: (t - j.at) / JUDGEMENT_MS },
        combo: combo.current,
        bursts: bursts.current.map((b) => ({ lane: b.lane, age: (t - b.at) / BURST_MS })),
        cursors,
      });
      raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [loopMs, beatMs, chart.lasers, chart.sound]);

  // Score each fresh press against the nearest unjudged note in its lane
  useEffect(() => {
    const t = now.current;
    for (const id of input.held) {
      if (prevHeld.current.has(id)) continue;
      const lane = laneOf(id);
      if (lane === null) continue;
      const target = instancesRef
        .current(t - GOOD_MS, t + GOOD_MS)
        .filter((n) => n.lane === lane && !judged.current.has(n.key))
        .sort((a, b) => Math.abs(a.at - t) - Math.abs(b.at - t))[0];
      if (!target) continue;
      judged.current.set(target.key, target.at);
      last.current = { label: Math.abs(target.at - t) <= GREAT_MS ? "GREAT" : "GOOD", lane, at: t };
      combo.current += 1;
      bursts.current.push({ lane, at: t });
      chart.sound?.(lane);
    }
    prevHeld.current = input.held;
  }, [input.held, laneOf, chart.sound]);

  return frame;
}

const JUDGEMENT_COLORS: Record<JudgementLabel, string> = {
  GREAT: "#fde047",
  GOOD: "#86efac",
  MISS: "#9ca3af",
};

/** Judgement word that pops in and fades, with the combo underneath once it is going. */
export function JudgementText({ frame, x, y, size = 18 }: { frame: Frame; x: number; y: number; size?: number }) {
  const j = frame.judgement;
  return (
    <g fontFamily="system-ui, sans-serif" fontWeight={900} textAnchor="middle" pointerEvents="none">
      {j && (
        <text
          x={x}
          y={y - j.age * 6}
          fontSize={size * (1 + Math.max(0, 0.25 - j.age))}
          fill={JUDGEMENT_COLORS[j.label]}
          stroke="#000"
          strokeWidth={3}
          paintOrder="stroke"
          opacity={1 - j.age}
          letterSpacing={1}
        >
          {j.label}
        </text>
      )}
      {frame.combo > 1 && (
        <text x={x} y={y + size * 0.95} fontSize={size * 0.6} fill="#fff" stroke="#000" strokeWidth={2.5} paintOrder="stroke" opacity={0.85}>
          {frame.combo} COMBO
        </text>
      )}
    </g>
  );
}

/** Fade (1 → 0) of the newest burst in a lane, or 0 if it was not hit just now. */
export function burstOf(frame: Frame, lane: string) {
  const b = frame.bursts.filter((x) => x.lane === lane).at(-1);
  return b ? 1 - b.age : 0;
}
