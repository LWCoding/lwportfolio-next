/** Values on every axis run from -AXIS_MAX (low end) to +AXIS_MAX (high end). */
export const AXIS_MAX = 10;
/** Objects closer than this to a midline count as "on the fence" for that axis. */
const FENCE = 0.5;

export interface Axis {
  id: string;
  name: string;
  low: string;
  high: string;
}

export interface QuiverObject {
  id: string;
  name: string;
  color: string;
  /** Position per axis id; missing means not placed on that axis yet. */
  values: Record<string, number>;
}

/** Top-right, top-left, bottom-left, bottom-right (high X / high Y first). */
export type Quadrant = "tr" | "tl" | "bl" | "br";
export const QUADRANTS: Quadrant[] = ["tl", "tr", "bl", "br"];

export interface MatrixAnalysis {
  placed: QuiverObject[];
  counts: Record<Quadrant, number>;
  trend: { slope: number; intercept: number } | null;
}

export function quadrantOf(x: number, y: number): Quadrant | null {
  if (Math.abs(x) < FENCE || Math.abs(y) < FENCE) return null;
  if (y > 0) return x > 0 ? "tr" : "tl";
  return x > 0 ? "br" : "bl";
}

function pearson(xs: number[], ys: number[]) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - mx) * (ys[i] - my);
    sxx += (xs[i] - mx) ** 2;
    syy += (ys[i] - my) ** 2;
  }
  if (sxx === 0 || syy === 0) return null;
  const slope = sxy / sxx;
  return { r: sxy / Math.sqrt(sxx * syy), slope, intercept: my - slope * mx };
}

export function analyzeMatrix(objects: QuiverObject[], xAxis: Axis, yAxis: Axis): MatrixAnalysis {
  const placed = objects.filter((o) => o.values[xAxis.id] !== undefined && o.values[yAxis.id] !== undefined);
  const counts: Record<Quadrant, number> = { tr: 0, tl: 0, bl: 0, br: 0 };
  for (const o of placed) {
    const q = quadrantOf(o.values[xAxis.id], o.values[yAxis.id]);
    if (q) counts[q]++;
  }

  // Only draw a trend line once there are enough points for it to mean something
  const fit =
    placed.length >= 3
      ? pearson(
          placed.map((o) => o.values[xAxis.id]),
          placed.map((o) => o.values[yAxis.id]),
        )
      : null;
  return {
    placed,
    counts,
    trend: fit && Math.abs(fit.r) >= 0.4 ? { slope: fit.slope, intercept: fit.intercept } : null,
  };
}
