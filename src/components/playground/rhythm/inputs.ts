"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { ComponentType, PointerEvent as ReactPointerEvent } from "react";

/** What every controller and screen reads: which inputs are held, plus continuous values (knobs, turntables). */
export interface InputState {
  held: ReadonlySet<string>;
  values: Readonly<Record<string, number>>;
}

export interface InputApi {
  press: (id: string) => void;
  release: (id: string) => void;
  /** Adds delta to a value, clamped to [min, max] when given. */
  nudge: (id: string, delta: number, min?: number, max?: number) => void;
}

export interface ControllerProps {
  input: InputState;
  api: InputApi;
}

export interface RhythmController {
  id: string;
  name: string;
  year: number;
  marquee: string;
  /** Screen viewBox size; the cabinet letterboxes it to fit. */
  screen: { width: number; height: number };
  initialValues?: Record<string, number>;
  Controller: ComponentType<ControllerProps>;
  Screen: ComponentType<{ input: InputState }>;
}

export function useRhythmInput(initialValues: Record<string, number> = {}) {
  const [held, setHeld] = useState<ReadonlySet<string>>(() => new Set());
  const [values, setValues] = useState<Record<string, number>>(initialValues);

  const api = useMemo<InputApi>(
    () => ({
      press: (id) =>
        setHeld((h) => (h.has(id) ? h : new Set(h).add(id))),
      release: (id) =>
        setHeld((h) => {
          if (!h.has(id)) return h;
          const next = new Set(h);
          next.delete(id);
          return next;
        }),
      nudge: (id, delta, min = -Infinity, max = Infinity) =>
        setValues((v) => ({
          ...v,
          [id]: Math.min(max, Math.max(min, (v[id] ?? 0) + delta)),
        })),
    }),
    [],
  );

  const reset = useCallback((next: Record<string, number> = {}) => {
    setHeld(new Set());
    setValues(next);
  }, []);

  return { input: { held, values } as InputState, api, reset };
}

/** Pointer handlers that hold an input while the pointer is down, even if it slides off. */
export function pressProps(api: InputApi, id: string) {
  return {
    onPointerDown: (e: ReactPointerEvent<SVGElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      api.press(id);
    },
    onPointerUp: () => api.release(id),
    onPointerCancel: () => api.release(id),
    onLostPointerCapture: () => api.release(id),
    style: { cursor: "pointer" },
  };
}

/**
 * Drag-in-a-circle handlers for knobs and turntables. Calls onTurn with the
 * change in angle (degrees, clockwise positive) around (cx, cy) in SVG units.
 */
export function useRotary(
  api: InputApi,
  id: string,
  cx: number,
  cy: number,
  onTurn: (deltaDeg: number) => void,
) {
  const last = useRef<number | null>(null);

  const angleOf = (e: ReactPointerEvent<SVGElement>) => {
    const svg = e.currentTarget.ownerSVGElement;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return 0;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    return (Math.atan2(p.y - cy, p.x - cx) * 180) / Math.PI;
  };

  const end = () => {
    last.current = null;
    api.release(id);
  };

  return {
    onPointerDown: (e: ReactPointerEvent<SVGElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      last.current = angleOf(e);
      api.press(id);
    },
    onPointerMove: (e: ReactPointerEvent<SVGElement>) => {
      if (last.current === null) return;
      const a = angleOf(e);
      let d = a - last.current;
      if (d > 180) d -= 360;
      if (d < -180) d += 360;
      last.current = a;
      onTurn(d);
    },
    onPointerUp: end,
    onPointerCancel: end,
    onLostPointerCapture: end,
    style: { cursor: "grab", touchAction: "none" as const },
  };
}

/**
 * Drag-sideways handlers for knobs that turn with relative horizontal movement
 * rather than following the pointer around their centre. Calls onDrag with the
 * change in x since the last move, in SVG units (right positive).
 */
export function useHorizontalDrag(api: InputApi, id: string, onDrag: (deltaX: number) => void) {
  const last = useRef<number | null>(null);

  const xOf = (e: ReactPointerEvent<SVGElement>) => {
    const ctm = e.currentTarget.ownerSVGElement?.getScreenCTM();
    if (!ctm) return e.clientX;
    return new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse()).x;
  };

  const end = () => {
    last.current = null;
    api.release(id);
  };

  return {
    onPointerDown: (e: ReactPointerEvent<SVGElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      last.current = xOf(e);
      api.press(id);
    },
    onPointerMove: (e: ReactPointerEvent<SVGElement>) => {
      if (last.current === null) return;
      const x = xOf(e);
      onDrag(x - last.current);
      last.current = x;
    },
    onPointerUp: end,
    onPointerCancel: end,
    onLostPointerCapture: end,
    style: { cursor: "ew-resize", touchAction: "none" as const },
  };
}

/** Points for a regular ring of n items around (cx, cy), starting at startDeg (0 = up, clockwise). */
export function ring(n: number, cx: number, cy: number, r: number, startDeg = 0) {
  return Array.from({ length: n }, (_, i) => {
    const deg = startDeg + (i * 360) / n;
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad), deg };
  });
}
