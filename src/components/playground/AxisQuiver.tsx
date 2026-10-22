"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AXIS_MAX,
  Axis,
  QUADRANTS,
  Quadrant,
  QuiverObject,
  analyzeMatrix,
} from "./axisQuiverAnalysis";

const STORAGE_KEY = "axis-quiver-v1";
const SIZE_KEY = "axis-quiver-size";
/** Bounds (px) for the matrix size control. */
const PLOT_SIZE = { min: 260, max: 760, default: 560 };
const OBJECT_COLORS = ["#15803d", "#a16207", "#1d4ed8", "#b91c1c", "#7c3aed", "#0e7490", "#c2410c", "#be185d"];

interface QuiverState {
  axes: Axis[];
  objects: QuiverObject[];
  xId: string;
  yId: string;
}

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

const BLANK_STATE: QuiverState = { axes: [], objects: [], xId: "", yId: "" };

/** Tag written into exported files so imports can tell a quiver file from any other JSON. */
const FILE_TAG = "axis-quiver";

const isString = (v: unknown): v is string => typeof v === "string";
const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

/** Validates saved or imported data; returns null if it isn't a usable quiver. */
function parseQuiver(raw: unknown): QuiverState | null {
  if (!isRecord(raw) || !Array.isArray(raw.axes) || !Array.isArray(raw.objects)) return null;
  const axes = raw.axes.filter(
    (a): a is Axis => isRecord(a) && isString(a.id) && isString(a.name) && isString(a.low) && isString(a.high),
  );
  const axisIds = new Set(axes.map((a) => a.id));
  const objects: QuiverObject[] = raw.objects.flatMap((o, i) => {
    if (!isRecord(o) || !isString(o.id) || !isString(o.name)) return [];
    const values: Record<string, number> = {};
    if (isRecord(o.values)) {
      for (const [id, v] of Object.entries(o.values)) {
        if (axisIds.has(id) && typeof v === "number" && Number.isFinite(v)) {
          values[id] = Math.max(-AXIS_MAX, Math.min(AXIS_MAX, v));
        }
      }
    }
    const color = isString(o.color) ? o.color : OBJECT_COLORS[i % OBJECT_COLORS.length];
    return [{ id: o.id, name: o.name, color, values }];
  });
  // Fall back to the first two axes if the saved pair is missing
  const pick = (id: unknown, fallback: number) =>
    isString(id) && axisIds.has(id) ? id : (axes[fallback]?.id ?? "");
  let xId = pick(raw.xId, 0);
  let yId = pick(raw.yId, 1);
  if (xId === yId) [xId, yId] = [axes[0]?.id ?? "", axes[1]?.id ?? ""];
  return { axes, objects, xId, yId };
}

function Card({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000] md:p-5 ${className}`}>
      {title && <h2 className="mb-3 text-lg font-black text-black">{title}</h2>}
      {children}
    </section>
  );
}

const inputClass =
  "w-full min-w-0 rounded-lg border-2 border-black/15 bg-white px-2.5 py-1.5 text-sm text-black outline-none transition-colors focus:border-black";
const smallButton =
  "cursor-pointer rounded-full bg-yellow-400 px-3 py-1.5 text-sm font-bold text-black transition-all hover:bg-black hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-yellow-400 disabled:hover:text-black";

/** Maps a value in [-AXIS_MAX, AXIS_MAX] to a 0–100 percentage across the plot. */
const toPct = (v: number) => ((v + AXIS_MAX) / (AXIS_MAX * 2)) * 100;

export default function AxisQuiver() {
  const [state, setState] = useState<QuiverState>(BLANK_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [plotSize, setPlotSize] = useState(PLOT_SIZE.default);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [newObjectName, setNewObjectName] = useState("");
  const [newAxis, setNewAxis] = useState({ name: "", low: "", high: "" });
  const [importError, setImportError] = useState<string | null>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const importRef = useRef<HTMLInputElement>(null);
  // Where the current drag began, so a plain click on a selected object can deselect it
  const dragStart = useRef<{ x: number; y: number; wasSelected: boolean } | null>(null);

  const { axes, objects, xId, yId } = state;
  const xAxis = axes.find((a) => a.id === xId);
  const yAxis = axes.find((a) => a.id === yId);

  // Restore from localStorage after mount so server and client render the same first frame
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const restored = saved ? parseQuiver(JSON.parse(saved)) : null;
      if (restored) setState(restored);
      const size = Number(localStorage.getItem(SIZE_KEY));
      if (size >= PLOT_SIZE.min && size <= PLOT_SIZE.max) setPlotSize(size);
    } catch {
      // Corrupt or blocked storage: start blank
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      localStorage.setItem(SIZE_KEY, String(plotSize));
    } catch {
      // Storage unavailable; the session still works in memory
    }
  }, [state, plotSize, hydrated]);

  const analysis = useMemo(
    () => (xAxis && yAxis ? analyzeMatrix(objects, xAxis, yAxis) : null),
    [objects, xAxis, yAxis],
  );

  // Dragging works for dots already on the plot and chips pulled from the tray
  useEffect(() => {
    if (!dragId || !xAxis || !yAxis) return;
    const onMove = (e: PointerEvent) => {
      const rect = plotRef.current?.getBoundingClientRect();
      if (!rect) return;
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      setState((s) => {
        const obj = s.objects.find((o) => o.id === dragId);
        if (!obj) return s;
        const alreadyPlaced = obj.values[xAxis.id] !== undefined && obj.values[yAxis.id] !== undefined;
        if (!inside && !alreadyPlaced) return s;
        const clamp = (v: number) => Math.round(Math.max(-AXIS_MAX, Math.min(AXIS_MAX, v)) * 2) / 2;
        const x = clamp(((e.clientX - rect.left) / rect.width) * AXIS_MAX * 2 - AXIS_MAX);
        const y = clamp(AXIS_MAX - ((e.clientY - rect.top) / rect.height) * AXIS_MAX * 2);
        return {
          ...s,
          objects: s.objects.map((o) =>
            o.id === dragId ? { ...o, values: { ...o.values, [xAxis.id]: x, [yAxis.id]: y } } : o,
          ),
        };
      });
    };
    const onUp = (e: PointerEvent) => {
      const start = dragStart.current;
      if (start?.wasSelected && Math.hypot(e.clientX - start.x, e.clientY - start.y) < 4) setSelectedId(null);
      dragStart.current = null;
      setDragId(null);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragId, xAxis, yAxis]);

  const startDrag = (id: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    dragStart.current = { x: e.clientX, y: e.clientY, wasSelected: id === selectedId };
    setSelectedId(id);
    setDragId(id);
  };

  const exportQuiver = () => {
    const file = JSON.stringify({ app: FILE_TAG, version: 1, ...state }, null, 2);
    const url = URL.createObjectURL(new Blob([file], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "axis-quiver.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importQuiver = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // Let the same file be picked again later
    if (!file) return;
    try {
      const raw: unknown = JSON.parse(await file.text());
      const next = isRecord(raw) && raw.app === FILE_TAG ? parseQuiver(raw) : null;
      if (!next) throw new Error();
      setState(next);
      setSelectedId(null);
      setImportError(null);
    } catch {
      setImportError("That file isn't an Axis Quiver export.");
    }
  };

  const setAxes = (xNext: string, yNext: string) => setState((s) => ({ ...s, xId: xNext, yId: yNext }));

  const pickAxis = (which: "x" | "y", id: string) => {
    // Picking the other axis's current value swaps them rather than showing a diagonal
    if (which === "x") setAxes(id, id === yId ? xId : yId);
    else setAxes(id === xId ? yId : xId, id);
  };

  const shuffleAxes = () => {
    if (axes.length < 2) return;
    let a = xId;
    let b = yId;
    while ((a === xId && b === yId) || a === b) {
      a = axes[Math.floor(Math.random() * axes.length)].id;
      b = axes[Math.floor(Math.random() * axes.length)].id;
      if (axes.length === 2) break;
    }
    if (a !== b) setAxes(a, b);
  };

  const updateAxis = (id: string, patch: Partial<Axis>) =>
    setState((s) => ({ ...s, axes: s.axes.map((a) => (a.id === id ? { ...a, ...patch } : a)) }));

  const removeAxis = (id: string) =>
    setState((s) => {
      const rest = s.axes.filter((a) => a.id !== id);
      const fallback = (keep: string) => rest.find((a) => a.id !== keep)?.id ?? "";
      const nextX = s.xId === id ? fallback(s.yId) : s.xId;
      const nextY = s.yId === id ? fallback(nextX) : s.yId;
      return {
        axes: rest,
        objects: s.objects.map((o) => {
          const values = { ...o.values };
          delete values[id];
          return { ...o, values };
        }),
        xId: nextX,
        yId: nextY,
      };
    });

  const addAxis = (e: React.FormEvent) => {
    e.preventDefault();
    const low = newAxis.low.trim() || "Low";
    const high = newAxis.high.trim() || "High";
    const axis: Axis = { id: makeId(), name: newAxis.name.trim() || `${low} vs ${high}`, low, high };
    setState((s) => ({
      ...s,
      axes: [...s.axes, axis],
      objects: s.objects.map((o) => ({ ...o, values: { ...o.values, [axis.id]: 0 } })),
      xId: s.xId || axis.id,
      yId: s.yId || (s.xId ? axis.id : ""),
    }));
    setNewAxis({ name: "", low: "", high: "" });
  };

  const addObject = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newObjectName.trim();
    if (!name) return;
    const obj: QuiverObject = {
      id: makeId(),
      name,
      color: OBJECT_COLORS[objects.length % OBJECT_COLORS.length],
      // New objects start at the midpoint of every axis
      values: Object.fromEntries(axes.map((a) => [a.id, 0])),
    };
    setState((s) => ({ ...s, objects: [...s.objects, obj] }));
    setSelectedId(obj.id);
    setNewObjectName("");
  };

  const updateObject = (id: string, patch: Partial<QuiverObject>) =>
    setState((s) => ({ ...s, objects: s.objects.map((o) => (o.id === id ? { ...o, ...patch } : o)) }));

  const setValue = (obj: QuiverObject, axisId: string, value: number) =>
    updateObject(obj.id, { values: { ...obj.values, [axisId]: value } });

  const removeObject = (id: string) => {
    setState((s) => ({ ...s, objects: s.objects.filter((o) => o.id !== id) }));
    if (selectedId === id) setSelectedId(null);
  };

  const selected = objects.find((o) => o.id === selectedId) ?? null;
  const unplaced =
    xAxis && yAxis ? objects.filter((o) => o.values[xAxis.id] === undefined || o.values[yAxis.id] === undefined) : [];

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 pb-16 pt-8 md:pt-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/playground" className="block w-fit text-sm font-bold text-blue-600 underline hover:text-blue-700">
            ← Playground
          </Link>
          <h1 className="mt-2 inline-flex flex-col text-4xl font-black text-gray-900 md:text-5xl">
            Axis Quiver
            <span className="mt-3 h-1 rounded-full bg-green-700" />
          </h1>
        </div>
        <div className="flex flex-col items-start gap-1 md:items-end">
          <div className="flex flex-wrap gap-2">
            <button type="button" className={smallButton} onClick={() => importRef.current?.click()}>
              Import
            </button>
            <button
              type="button"
              className={smallButton}
              onClick={exportQuiver}
              disabled={axes.length === 0 && objects.length === 0}
            >
              Export
            </button>
            <button
              type="button"
              className={smallButton}
              onClick={() => {
                setState(BLANK_STATE);
                setSelectedId(null);
              }}
            >
              Clear all
            </button>
          </div>
          <input
            ref={importRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={importQuiver}
          />
          {importError && <p className="text-xs font-semibold text-red-700">{importError}</p>}
        </div>
      </div>

      <div className="grid gap-6">
        {/* Matrix */}
        <Card>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {axes.length >= 2 && (
              <>
            <label className="flex items-center gap-2 text-sm font-semibold text-black/70">
              X
              <select
                value={xId}
                onChange={(e) => pickAxis("x", e.target.value)}
                className={`${inputClass} w-auto cursor-pointer`}
              >
                {axes.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className={smallButton}
              onClick={() => setAxes(yId, xId)}
              disabled={!xAxis || !yAxis}
              aria-label="Swap axes"
            >
              ⇄
            </button>
            <label className="flex items-center gap-2 text-sm font-semibold text-black/70">
              Y
              <select
                value={yId}
                onChange={(e) => pickAxis("y", e.target.value)}
                className={`${inputClass} w-auto cursor-pointer`}
              >
                {axes.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" className={smallButton} onClick={shuffleAxes} disabled={axes.length < 3}>
              Random pair
            </button>
              </>
            )}
            <label className="flex items-center gap-2 text-sm font-semibold text-black/70 sm:ml-auto">
              Size
              <input
                type="range"
                min={PLOT_SIZE.min}
                max={PLOT_SIZE.max}
                step={20}
                value={plotSize}
                onChange={(e) => setPlotSize(Number(e.target.value))}
                className="w-28 cursor-pointer accent-black"
                aria-label="Matrix size"
              />
            </label>
          </div>

          {xAxis && yAxis && analysis ? (
            <>
              {/* Size covers the plot plus the side labels (2 × w-32 + gaps) */}
              <div className="mx-auto w-full" style={{ maxWidth: plotSize + 272 }}>
                <p className="mb-1 text-center text-sm font-bold text-black">↑ {yAxis.high}</p>
                <div className="flex items-center gap-2">
                  <p className="hidden w-32 shrink-0 text-right text-sm font-bold text-black sm:block">
                    {xAxis.low} ←
                  </p>
                  <div
                    ref={plotRef}
                    className="relative aspect-square w-full touch-none select-none overflow-hidden rounded-xl border-2 border-black bg-white"
                  >
                    {QUADRANTS.map((q) => (
                      <QuadrantCell
                        key={q}
                        quadrant={q}
                        highlightEmpty={analysis.placed.length >= 3 && analysis.counts[q] === 0}
                      />
                    ))}
                    <div className="pointer-events-none absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-black" />
                    <div className="pointer-events-none absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-black" />

                    {analysis.trend && (
                      <svg
                        viewBox={`${-AXIS_MAX} ${-AXIS_MAX} ${AXIS_MAX * 2} ${AXIS_MAX * 2}`}
                        className="pointer-events-none absolute inset-0 h-full w-full"
                        aria-hidden
                      >
                        <line
                          x1={-AXIS_MAX}
                          x2={AXIS_MAX}
                          y1={-(analysis.trend.intercept + analysis.trend.slope * -AXIS_MAX)}
                          y2={-(analysis.trend.intercept + analysis.trend.slope * AXIS_MAX)}
                          stroke="#15803d"
                          strokeWidth={0.15}
                          strokeDasharray="0.6 0.4"
                          opacity={0.8}
                        />
                      </svg>
                    )}

                    {analysis.placed.map((o) => {
                      const left = toPct(o.values[xAxis.id]);
                      const top = 100 - toPct(o.values[yAxis.id]);
                      const isSelected = o.id === selectedId;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onPointerDown={startDrag(o.id)}
                          className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 ${
                            dragId === o.id ? "cursor-grabbing" : "cursor-grab"
                          }`}
                          style={{ left: `${left}%`, top: `${top}%` }}
                          aria-label={`${o.name}, drag to reposition`}
                        >
                          <span
                            className={`block h-4 w-4 shrink-0 rounded-full border-2 border-white shadow-[0_0_0_2px_#000] transition-transform ${
                              isSelected ? "scale-125" : ""
                            }`}
                            style={{ backgroundColor: o.color }}
                          />
                          <span
                            className={`pointer-events-none absolute whitespace-nowrap rounded px-1 text-xs font-bold ${
                              isSelected ? "bg-black text-white" : "bg-white/85 text-black"
                            } ${left > 75 ? "right-5" : "left-5"}`}
                          >
                            {o.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="hidden w-32 shrink-0 text-sm font-bold text-black sm:block">→ {xAxis.high}</p>
                </div>
                <p className="mt-1 text-center text-sm font-bold text-black">↓ {yAxis.low}</p>
                <p className="mt-1 flex justify-between text-xs font-bold text-black/60 sm:hidden">
                  <span>← {xAxis.low}</span>
                  <span>{xAxis.high} →</span>
                </p>
              </div>

              {unplaced.length > 0 && (
                <div className="mt-4 rounded-xl bg-gray-200 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/60">
                    Tray · drag onto the matrix
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {unplaced.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onPointerDown={startDrag(o.id)}
                        className="flex cursor-grab touch-none items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-semibold text-black shadow-sm"
                      >
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: o.color }} />
                        {o.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </>
          ) : (
            <EmptyHint>Add at least two axes to form a matrix.</EmptyHint>
          )}
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Axes */}
        <Card title={`Axes · ${axes.length}`}>
          <ul className="mb-4 space-y-2">
            {axes.map((a) => (
              <li key={a.id} className="rounded-xl bg-gray-200 p-2.5">
                <div className="mb-2 flex items-center gap-2">
                  <input
                    value={a.name}
                    onChange={(e) => updateAxis(a.id, { name: e.target.value })}
                    className={`${inputClass} font-bold`}
                    aria-label="Axis name"
                  />
                  <AxisBadge active={a.id === xId} label="X" />
                  <AxisBadge active={a.id === yId} label="Y" />
                  <RemoveButton onClick={() => removeAxis(a.id)} label={`Remove axis ${a.name}`} />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    value={a.low}
                    onChange={(e) => updateAxis(a.id, { low: e.target.value })}
                    className={inputClass}
                    aria-label="Low end label"
                  />
                  <span className="shrink-0 text-sm font-bold text-black/50">↔</span>
                  <input
                    value={a.high}
                    onChange={(e) => updateAxis(a.id, { high: e.target.value })}
                    className={inputClass}
                    aria-label="High end label"
                  />
                </div>
              </li>
            ))}
          </ul>
          <form onSubmit={addAxis} className="space-y-2 rounded-xl border-2 border-dashed border-black/20 p-2.5">
            <input
              value={newAxis.name}
              onChange={(e) => setNewAxis({ ...newAxis, name: e.target.value })}
              placeholder="New axis name"
              className={inputClass}
            />
            <div className="flex items-center gap-2">
              <input
                value={newAxis.low}
                onChange={(e) => setNewAxis({ ...newAxis, low: e.target.value })}
                placeholder="Low end"
                className={inputClass}
              />
              <span className="shrink-0 text-sm font-bold text-black/50">↔</span>
              <input
                value={newAxis.high}
                onChange={(e) => setNewAxis({ ...newAxis, high: e.target.value })}
                placeholder="High end"
                className={inputClass}
              />
            </div>
            <button type="submit" className={smallButton}>
              + Add axis
            </button>
          </form>
        </Card>

        {/* Objects */}
        <Card title={`Objects · ${objects.length}`}>
          <div className="mb-4 flex flex-wrap gap-2">
            {objects.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setSelectedId(o.id === selectedId ? null : o.id)}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                  o.id === selectedId ? "bg-black text-white" : "bg-gray-200 text-black hover:bg-yellow-400"
                }`}
              >
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: o.color }} />
                {o.name}
              </button>
            ))}
          </div>
          <form onSubmit={addObject} className="mb-4 flex gap-2">
            <input
              value={newObjectName}
              onChange={(e) => setNewObjectName(e.target.value)}
              placeholder="New object"
              className={inputClass}
            />
            <button type="submit" className={`${smallButton} shrink-0`} disabled={!newObjectName.trim()}>
              + Add
            </button>
          </form>

          {selected ? (
            <div className="rounded-xl bg-gray-200 p-3">
              <div className="mb-3 flex items-center gap-2">
                <input
                  type="color"
                  value={selected.color}
                  onChange={(e) => updateObject(selected.id, { color: e.target.value })}
                  className="h-8 w-8 shrink-0 cursor-pointer rounded border-0 bg-transparent p-0"
                  aria-label="Object color"
                />
                <input
                  value={selected.name}
                  onChange={(e) => updateObject(selected.id, { name: e.target.value })}
                  className={`${inputClass} font-bold`}
                  aria-label="Object name"
                />
                <RemoveButton onClick={() => removeObject(selected.id)} label={`Remove ${selected.name}`} />
              </div>
              {axes.length === 0 && <p className="text-sm text-black/60">Add axes to place this object.</p>}
              <ul className="space-y-3">
                {axes.map((a) => {
                  const v = selected.values[a.id];
                  return (
                    <li key={a.id}>
                      <div className="mb-1 flex items-center justify-between text-xs font-semibold text-black/60">
                        <span>{a.low}</span>
                        <span className="font-bold text-black">{a.name}</span>
                        <span>{a.high}</span>
                      </div>
                      <input
                        type="range"
                        min={-AXIS_MAX}
                        max={AXIS_MAX}
                        step={0.5}
                        value={v ?? 0}
                        onChange={(e) => setValue(selected, a.id, Number(e.target.value))}
                        className="w-full cursor-pointer accent-black"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <EmptyHint>Select an object to fine-tune where it sits on every axis.</EmptyHint>
          )}
        </Card>
      </div>
    </div>
  );
}

const QUADRANT_POSITION: Record<Quadrant, string> = {
  tl: "left-0 top-0",
  tr: "right-0 top-0",
  bl: "left-0 bottom-0",
  br: "right-0 bottom-0",
};

function QuadrantCell({ quadrant, highlightEmpty }: { quadrant: Quadrant; highlightEmpty: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute h-1/2 w-1/2 ${QUADRANT_POSITION[quadrant]}`}
      style={
        highlightEmpty
          ? {
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(250,204,21,0.28) 0 8px, transparent 8px 16px)",
            }
          : undefined
      }
    />
  );
}

function AxisBadge({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${
        active ? "bg-black text-white" : "bg-white/60 text-black/30"
      }`}
    >
      {label}
    </span>
  );
}

function RemoveButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-sm font-bold text-black/60 transition-colors hover:bg-red-700 hover:text-white"
    >
      ✕
    </button>
  );
}

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border-2 border-dashed border-black/20 p-4 text-center text-sm text-black/60">
      {children}
    </p>
  );
}
