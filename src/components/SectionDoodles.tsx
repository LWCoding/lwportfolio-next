import { useId, useMemo } from "react";

export type DoodleTheme = "professional" | "games" | "teaching" | "mixed";

/** Hand-drawn line icons on a 48×48 grid (stroke only). */
const DOODLE_ICONS = {
  spiral: "M24 24 a2 2 0 1 1 3 1 a5 5 0 1 1 -7 -4 a9 9 0 1 1 12 8 a13 13 0 1 1 -17 -12",
  squiggle: "M4 30 q6 -12 12 0 t12 0 t12 0 t8 -2",
  star: "M24 6 l5 12 13 1 -10 8 4 13 -12 -7 -12 7 4 -13 -10 -8 13 -1z",
  lightbulb:
    "M24 6 c-8 0 -13 6 -13 13 c0 5 3 8 6 11 c1 1 2 3 2 5 h10 c0 -2 1 -4 2 -5 c3 -3 6 -6 6 -11 c0 -7 -5 -13 -13 -13z M19 39 h10 M20 43 h8 M24 12 v4 M17 18 l3 2",
  chart: "M8 40 h34 M12 40 v-10 h6 v10 M22 40 v-17 h6 v17 M32 40 v-24 h6 v24 M10 22 l10 -8 8 5 12 -11 M36 8 h5 v5",
  gear: "M24 14 a10 10 0 1 1 -0.1 0 M24 20 a4 4 0 1 1 -0.1 0 M24 6 v6 M24 36 v6 M6 24 h6 M36 24 h6 M11 11 l4 4 M33 33 l4 4 M37 11 l-4 4 M15 33 l-4 4",
  briefcase: "M8 18 h32 v20 h-32z M18 18 v-5 h12 v5 M8 26 h32 M22 26 v4 h4 v-4",
  controller:
    "M14 16 h20 c6 0 9 6 9 13 c0 6 -3 9 -6 9 c-3 0 -5 -4 -8 -6 h-10 c-3 2 -5 6 -8 6 c-3 0 -6 -3 -6 -9 c0 -7 3 -13 9 -13z M14 22 v8 M10 26 h8 M32 23 h0.1 M36 27 h0.1",
  heart: "M24 40 c-10 -7 -16 -13 -16 -20 c0 -5 4 -9 8 -9 c4 0 6 2 8 5 c2 -3 4 -5 8 -5 c4 0 8 4 8 9 c0 7 -6 13 -16 20z",
  die: "M10 10 h28 v28 h-28z M17 17 h0.1 M31 31 h0.1 M24 24 h0.1 M31 17 h0.1 M17 31 h0.1",
  coin: "M24 8 a16 16 0 1 1 -0.1 0 M24 15 v18 M28 19 c0 -2 -8 -3 -8 1 c0 4 8 3 8 7 c0 4 -8 3 -8 1",
  pencil: "M10 38 l4 -10 20 -20 6 6 -20 20z M14 28 l6 6 M30 12 l6 6",
  book: "M24 14 c-5 -4 -12 -4 -16 -2 v26 c4 -2 11 -2 16 2 c5 -4 12 -4 16 -2 v-26 c-4 -2 -11 -2 -16 2z M24 14 v26",
  gradcap: "M4 18 l20 -9 20 9 -20 9z M12 22 v9 c4 4 20 4 24 0 v-9 M44 18 v10",
  ruler: "M6 32 l26 -26 10 10 -26 26z M14 24 l3 3 M19 19 l4 4 M24 14 l3 3 M29 9 l4 4",
  aplusb: "M6 36 l6 -18 6 18 M8 30 h8 M22 27 h8 M26 23 v8 M34 18 v18 c6 0 9 -2 9 -5 c0 -3 -3 -4 -7 -4 c3 0 6 -1 6 -4 c0 -3 -3 -5 -8 -5",
  pi: "M8 16 c4 -3 26 -3 32 -1 M18 15 c0 8 -2 16 -6 22 M30 15 c-1 8 0 16 4 21 c2 1 4 0 5 -2",
} satisfies Record<string, string>;

const GREEN = "#15803d";
const YELLOW = "#a16207";
const BLUE = "#1d4ed8";

/** Each themed section's accent color (doodles, header underlines). */
export const SECTION_COLORS = { professional: GREEN, games: YELLOW, teaching: BLUE } as const;

/** `colors` cycles per doodle, so a theme with several colors alternates them. */
const THEMES: Record<DoodleTheme, { colors: string[]; icons: (keyof typeof DOODLE_ICONS)[]; seed: number }> = {
  professional: { colors: [GREEN], icons: ["lightbulb", "chart", "gear", "briefcase", "spiral", "squiggle"], seed: 11 },
  games: { colors: [YELLOW], icons: ["controller", "die", "heart", "coin", "star", "spiral", "squiggle"], seed: 23 },
  teaching: { colors: [BLUE], icons: ["pencil", "book", "gradcap", "ruler", "aplusb", "pi", "spiral"], seed: 37 },
  mixed: {
    colors: [GREEN, YELLOW, BLUE],
    icons: ["spiral", "squiggle", "star", "lightbulb", "controller", "pencil", "heart", "book"],
    seed: 53,
  },
};

/** Default doodles per section, alternating left/right edges top to bottom. */
const DEFAULT_COUNT = 12;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Themed hand-drawn doodles scattered down the side margins of a section.
 * Place inside a `relative` parent; content above needs `relative`.
 */
export default function SectionDoodles({
  theme,
  count = DEFAULT_COUNT,
  seed: seedOverride,
  contentWidth,
}: {
  theme: DoodleTheme;
  count?: number;
  /** Vary the layout when the same theme appears more than once on the site. */
  seed?: number;
  /**
   * Width (px) of the centered content column. When set, doodles hug just outside
   * it instead of spreading across the outer edges of wide screens.
   */
  contentWidth?: number;
}) {
  const filterId = `doodle-rough-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { colors, icons } = THEMES[theme];
  const seed = seedOverride ?? THEMES[theme].seed;

  // Seeded so the layout is identical on server and client
  const doodles = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => {
      const right = i % 2 === 1;
      const size = 44 + rand() * 30;
      // Positions are fractions of the space left after an edge margin, so no doodle
      // (even rotated, with its wobble filter) can poke past the section and get clipped
      const margin = Math.round(size * 0.75);
      const x = right ? 0.88 + rand() * 0.12 : rand() * 0.12;
      const y = Math.min(Math.max((i + 0.5) / count + (rand() - 0.5) * 0.06, 0), 1);
      let left = `calc(${margin}px + (100% - ${margin * 2}px) * ${x.toFixed(4)})`;
      if (contentWidth) {
        // Center sits 20–100px outside the content edge, still clamped inside the section
        const offset = Math.round(contentWidth / 2 + 20 + rand() * 80 + size / 2);
        left = right
          ? `min(calc(100% - ${margin}px), calc(50% + ${offset}px))`
          : `max(${margin}px, calc(50% - ${offset}px))`;
      }
      return {
        icon: icons[Math.floor(rand() * icons.length)],
        color: colors[i % colors.length],
        left,
        top: `calc(${margin}px + (100% - ${margin * 2}px) * ${y.toFixed(4)})`,
        size: Math.round(size),
        rotate: Math.round((rand() - 0.5) * 50),
      };
    });
  }, [icons, seed, colors, count, contentWidth]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block overflow-hidden">
      <svg width="0" height="0" className="absolute">
        <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      {doodles.map((d, i) => (
        <svg
          key={i}
          viewBox="0 0 48 48"
          width={d.size}
          height={d.size}
          className="absolute -translate-x-1/2 -translate-y-1/2 overflow-visible opacity-55"
          style={{ left: d.left, top: d.top, rotate: `${d.rotate}deg` }}
        >
          <path
            d={DOODLE_ICONS[d.icon]}
            fill="none"
            stroke={d.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${filterId})`}
          />
        </svg>
      ))}
    </div>
  );
}
