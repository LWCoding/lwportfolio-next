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

export type InsightTone = "pattern" | "gap" | "warning" | "info";

export interface Insight {
  tone: InsightTone;
  title: string;
  detail: string;
  /** How notable this is; used to sort insights and rank matrices. */
  weight: number;
}

/** Top-right, top-left, bottom-left, bottom-right (high X / high Y first). */
export type Quadrant = "tr" | "tl" | "bl" | "br";
export const QUADRANTS: Quadrant[] = ["tl", "tr", "bl", "br"];

export interface MatrixAnalysis {
  insights: Insight[];
  score: number;
  placed: QuiverObject[];
  counts: Record<Quadrant, number>;
  correlation: number | null;
  trend: { slope: number; intercept: number } | null;
}

export function quadrantOf(x: number, y: number): Quadrant | null {
  if (Math.abs(x) < FENCE || Math.abs(y) < FENCE) return null;
  if (y > 0) return x > 0 ? "tr" : "tl";
  return x > 0 ? "br" : "bl";
}

export function quadrantLabel(q: Quadrant, xAxis: Axis, yAxis: Axis) {
  const x = q === "tr" || q === "br" ? xAxis.high : xAxis.low;
  const y = q === "tr" || q === "tl" ? yAxis.high : yAxis.low;
  return `${x} + ${y}`;
}

function listNames(objects: QuiverObject[], max = 3) {
  const names = objects.map((o) => o.name);
  if (names.length <= max) return names.join(", ");
  return `${names.slice(0, max).join(", ")} and ${names.length - max} more`;
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

function isAdjacent(a: Quadrant, b: Quadrant) {
  // Adjacent quadrants share either their X side or their Y side
  return a[0] === b[0] || a[1] === b[1];
}

export function analyzeMatrix(objects: QuiverObject[], xAxis: Axis, yAxis: Axis): MatrixAnalysis {
  const placed = objects.filter((o) => o.values[xAxis.id] !== undefined && o.values[yAxis.id] !== undefined);
  const unplaced = objects.length - placed.length;
  const counts: Record<Quadrant, number> = { tr: 0, tl: 0, bl: 0, br: 0 };
  const members: Record<Quadrant, QuiverObject[]> = { tr: [], tl: [], bl: [], br: [] };
  const onFence: QuiverObject[] = [];
  const insights: Insight[] = [];

  for (const o of placed) {
    const q = quadrantOf(o.values[xAxis.id], o.values[yAxis.id]);
    if (q) {
      counts[q]++;
      members[q].push(o);
    } else {
      onFence.push(o);
    }
  }

  if (unplaced > 0) {
    insights.push({
      tone: "info",
      title: `${unplaced} object${unplaced === 1 ? "" : "s"} not placed yet`,
      detail: "Drag them from the tray onto the matrix to include them in the read.",
      weight: 0,
    });
  }

  if (placed.length < 3) {
    insights.unshift({
      tone: "info",
      title: "Need at least 3 objects to read this matrix",
      detail: "Place a few more objects on both of these axes and patterns will start showing up here.",
      weight: 0,
    });
    return { insights, score: 0, placed, counts, correlation: null, trend: null };
  }

  const xs = placed.map((o) => o.values[xAxis.id]);
  const ys = placed.map((o) => o.values[yAxis.id]);
  const fit = pearson(xs, ys);
  const r = fit?.r ?? null;

  // Correlation between the two axes across objects
  if (r !== null && Math.abs(r) >= 0.4) {
    const strong = Math.abs(r) >= 0.7;
    const rText = `r = ${r.toFixed(2)}`;
    if (r > 0) {
      insights.push({
        tone: strong ? "warning" : "pattern",
        title: `${strong ? "Strong" : "Moderate"} positive correlation (${rText})`,
        detail: `More ${xAxis.high.toLowerCase()} tends to mean more ${yAxis.high.toLowerCase()}. ${
          strong
            ? "These axes may be measuring the same underlying thing. Try swapping one out to see a more independent split."
            : "Look for the objects that break the trend; they're often the interesting ones."
        }`,
        weight: strong ? 3 : 1.5,
      });
    } else {
      insights.push({
        tone: "pattern",
        title: `${strong ? "Strong" : "Moderate"} trade-off (${rText})`,
        detail: `As objects get more ${xAxis.high.toLowerCase()}, they get more ${yAxis.low.toLowerCase()}. Is that trade-off real, or could something be both ${xAxis.high.toLowerCase()} and ${yAxis.high.toLowerCase()}?`,
        weight: strong ? 3 : 1.5,
      });
    }
  } else if (r !== null && Math.abs(r) < 0.2 && placed.length >= 5) {
    insights.push({
      tone: "info",
      title: `Independent axes (r = ${r.toFixed(2)})`,
      detail: "Knowing where an object sits on one axis tells you little about the other, so this matrix shows two genuinely different dimensions.",
      weight: 0.5,
    });
  }

  // Quadrant occupancy
  const occupied = QUADRANTS.filter((q) => counts[q] > 0);
  const empty = QUADRANTS.filter((q) => counts[q] === 0);
  const xSides = new Set(placed.filter((o) => Math.abs(o.values[xAxis.id]) >= FENCE).map((o) => Math.sign(o.values[xAxis.id])));
  const ySides = new Set(placed.filter((o) => Math.abs(o.values[yAxis.id]) >= FENCE).map((o) => Math.sign(o.values[yAxis.id])));
  const quadrantTotal = placed.length - onFence.length;

  if (occupied.length === 1) {
    insights.push({
      tone: "warning",
      title: `Everything is ${quadrantLabel(occupied[0], xAxis, yAxis)}`,
      detail: "This matrix doesn't separate your objects at all. Either the set shares a hidden assumption, or the other three quadrants are a wide-open space nobody is designing for.",
      weight: 3,
    });
  } else if (occupied.length === 2 && !isAdjacent(occupied[0], occupied[1])) {
    insights.push({
      tone: "pattern",
      title: "Only opposite corners are filled",
      detail: `Objects split into ${quadrantLabel(occupied[0], xAxis, yAxis)} vs. ${quadrantLabel(occupied[1], xAxis, yAxis)}. Two clear camps, and the mixed combinations are untouched.`,
      weight: 2.5,
    });
  } else if (occupied.length === 3) {
    const gap = empty[0];
    insights.push({
      tone: "gap",
      title: `Empty quadrant: ${quadrantLabel(gap, xAxis, yAxis)}`,
      detail: "Every other combination has something in it except this one. Is it impossible, undesirable, or an untapped opportunity?",
      weight: 3,
    });
  } else if (occupied.length === 4 && quadrantTotal > 0) {
    const top = QUADRANTS.reduce((a, b) => (counts[b] > counts[a] ? b : a));
    const share = counts[top] / quadrantTotal;
    if (share >= 0.6) {
      insights.push({
        tone: "pattern",
        title: `Pile-up in ${quadrantLabel(top, xAxis, yAxis)}`,
        detail: `${Math.round(share * 100)}% of objects land here. It's the crowded default; the sparse quadrants are where differentiation lives.`,
        weight: 1.5,
      });
    } else if (quadrantTotal >= 8 && QUADRANTS.every((q) => Math.abs(counts[q] - quadrantTotal / 4) <= 1)) {
      insights.push({
        tone: "info",
        title: "Evenly spread across all four quadrants",
        detail: "A healthy, balanced matrix, useful for sorting but without an obvious gap to chase.",
        weight: 0.5,
      });
    }
  }

  // One-sided axes (skipped when everything is already in a single quadrant)
  if (occupied.length > 1) {
    for (const [axis, sides] of [
      [xAxis, xSides],
      [yAxis, ySides],
    ] as const) {
      if (sides.size !== 1) continue;
      const missing = sides.has(1) ? axis.low : axis.high;
      insights.push({
        tone: "gap",
        title: `Nothing is ${missing.toLowerCase()}`,
        detail: `Every object sits on the ${(sides.has(1) ? axis.high : axis.low).toLowerCase()} side, so this axis doesn't differentiate your set, or it points at a missing category.`,
        weight: 2,
      });
    }
  }

  // Lone objects are outliers worth studying
  if (quadrantTotal >= 5) {
    const lone = QUADRANTS.filter((q) => counts[q] === 1);
    lone.slice(0, 2).forEach((q) => {
      insights.push({
        tone: "pattern",
        title: `${members[q][0].name} stands alone`,
        detail: `It's the only object in ${quadrantLabel(q, xAxis, yAxis)}. What makes it different from everything else?`,
        weight: 1.5,
      });
    });
  }

  // Near-identical objects
  const twins: [QuiverObject, QuiverObject][] = [];
  for (let i = 0; i < placed.length; i++) {
    for (let j = i + 1; j < placed.length; j++) {
      const dx = placed[i].values[xAxis.id] - placed[j].values[xAxis.id];
      const dy = placed[i].values[yAxis.id] - placed[j].values[yAxis.id];
      if (Math.hypot(dx, dy) < 1.5) twins.push([placed[i], placed[j]]);
    }
  }
  twins.slice(0, 2).forEach(([a, b]) => {
    insights.push({
      tone: "info",
      title: `${a.name} and ${b.name} overlap`,
      detail: "They're nearly identical on this matrix. If they feel different to you, a third axis is hiding somewhere.",
      weight: 0.5,
    });
  });

  if (onFence.length > 0) {
    insights.push({
      tone: "info",
      title: `${onFence.length} on a midline`,
      detail: `${listNames(onFence)} ${onFence.length === 1 ? "sits" : "sit"} right on a dividing line. Commit to a side, or the axis definition may be fuzzy.`,
      weight: 0.5,
    });
  }

  insights.sort((a, b) => b.weight - a.weight);
  const score = insights.reduce((sum, i) => sum + i.weight, 0);
  return {
    insights,
    score,
    placed,
    counts,
    correlation: r,
    trend: fit && Math.abs(fit.r) >= 0.4 ? { slope: fit.slope, intercept: fit.intercept } : null,
  };
}
