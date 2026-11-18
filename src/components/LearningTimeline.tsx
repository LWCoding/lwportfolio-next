"use client";

import React, { useState } from "react";

type MilestoneKind = "project" | "learning" | "teaching";
type Milestone = {
  at: number; // fractional year used for placement (2024.5 = mid-2024)
  date: string;
  label: string;
  note: string;
  kind: MilestoneKind;
  href?: string; // "Learn more" link, opened in a new tab
};

const MILESTONES: Milestone[] = [
  { at: 2018.5, date: "2018", label: "Fell in love with coding", note: "Started making games on Scratch.", kind: "learning" },
  { at: 2019.5, date: "2019", label: "Went viral on Scratch", note: "The Battle Cats! drew ~950K views.", kind: "project", href: "https://scratch.mit.edu/projects/225197640/" },
  { at: 2021.0, date: "Jan 2021", label: "Built my first website", note: "Malaysian Club site in HTML/CSS/JS.", kind: "project", href: "/projects/malaysian-club-chicago" },
  { at: 2021.5, date: "Jun 2021", label: "Shipped my first game", note: "Learned Unity + C#, posted on itch.io.", kind: "project", href: "https://lwcoding.itch.io/sunday-morning-groovin" },
  { at: 2022.5, date: "2022", label: "Joined online game teams", note: "Shipped 5 games with remote teams.", kind: "project", href: "https://lwcoding.itch.io" },
  { at: 2023.2, date: "Mar 2023", label: "2nd place at Wonderjam", note: "Attack on Atliz, out of 25 teams.", kind: "project", href: "/projects/1940212" },
  { at: 2023.45, date: "Jun 2023", label: "Graduated high school", note: "Headed to Stanford next.", kind: "learning" },
  { at: 2023.83, date: "Nov 2023", label: "Taught my first class", note: "Game design at Stanford Splash.", kind: "teaching", href: "/projects/stanford-splash" },
  { at: 2024.25, date: "Spring 2024", label: "Studied game design", note: "CS247G with Christina Wodtke.", kind: "learning", href: "https://mechanicsofmagic.com/2024/04/02/introducing-lucas-wang/" },
  { at: 2024.47, date: "Jun 2024", label: "Wrote a ray tracer", note: "In C++ for CS148.", kind: "project", href: "/projects/cs148-graphics-engine" },
  { at: 2024.6, date: "Aug 2024", label: "Entered a 7,500-game jam", note: "Made Kitchen Nightmare for GMTK 2024.", kind: "project", href: "/projects/2904867" },
  { at: 2024.78, date: "Oct 2024", label: "Led a VR app for seniors", note: "ImmersifyVR, tested in retirement homes.", kind: "project", href: "/projects/immersifyvr" },
  { at: 2024.9, date: "Nov 2024", label: "Wrote my own Internet", note: "IP, UDP, and TCP in C++ for CS144.", kind: "project", href: "/projects/cs144-mini-internet" },
  { at: 2025.05, date: "Jan 2025", label: "Became a section leader", note: "For CS247G game design.", kind: "teaching", href: "/projects/cs247g-course-sl" },
  { at: 2025.33, date: "Apr 2025", label: "Taught Python worldwide", note: "Section leader for Code in Place.", kind: "teaching", href: "/projects/code-in-place" },
  { at: 2025.45, date: "Jun 2025", label: "Published a Stanford sales game", note: "Always Be Closing, used to teach STRAMGT351.", kind: "project", href: "/projects/always-be-closing" },
  { at: 2025.58, date: "Aug 2025", label: "Top 8% of 9,600 jam games", note: "Aw, Rats! at GMTK 2025.", kind: "project", href: "/projects/3766251" },
  { at: 2025.68, date: "Sep 2025", label: "Established my own courses", note: "CS11SI and CS42SI at Stanford.", kind: "teaching", href: "/projects/cs42si" },
  { at: 2026.1, date: "2026", label: "Picked up AI tools", note: "Cursor, then Claude.", kind: "learning" },
  { at: 2026.3, date: "Spring 2026", label: "Built 3 games in one quarter", note: "Independent study with Christina Wodtke.", kind: "project", href: "https://mechanicsofmagic.com/2026/06/02/cooking-animals-cooking-as-animals-and-skateboarding-as-animals/" },
  { at: 2026.45, date: "Jun 2026", label: "Made motion games at Nex", note: "Software engineering intern, Nex Playground.", kind: "project", href: "/projects/nex-playground" },
  { at: 2026.72, date: "Fall 2026", label: "Became a TA", note: "For CS377G, Serious Games.", kind: "teaching", href: "/projects/cs377g-course-ta" },
];

// Horizontal space each year gets, relative to the others: recent years are wider since they hold more.
const YEAR_WEIGHTS: Record<number, number> = {
  2018: 0.5, 2019: 0.5, 2020: 0.5, 2021: 0.55, 2022: 0.55, 2023: 1.0, 2024: 1.9, 2025: 1.9, 2026: 1.35,
};
const T_MIN = 2018;
const T_MAX = 2027;
const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const STEMS = [22, 22, 60, 60, 98, 98, 136, 136]; // px; even lanes go up, odd lanes go down

// `button` is the "Learn more" button, contrasted against the ticket color.
const KINDS: Record<MilestoneKind, { bg: string; text: string; button: string; name: string }> = {
  project: { bg: "bg-yellow-400", text: "text-black", button: "bg-black text-white hover:bg-black/80", name: "Projects" },
  learning: { bg: "bg-blue-500", text: "text-white", button: "bg-white text-blue-600 hover:bg-white/85", name: "Learning" },
  teaching: { bg: "bg-green-600", text: "text-white", button: "bg-white text-green-700 hover:bg-white/85", name: "Teaching" },
};

const TOTAL_WEIGHT = Object.values(YEAR_WEIGHTS).reduce((sum, w) => sum + w, 0);

/** Maps a fractional year to a left offset, giving each year its weighted share of the width. */
function pct(t: number) {
  let offset = 0;
  for (let y = T_MIN; y < T_MAX; y++) {
    const w = YEAR_WEIGHTS[y];
    if (t < y + 1) return `${((offset + (t - y) * w) / TOTAL_WEIGHT) * 100}%`;
    offset += w;
  }
  return "100%";
}

/** Hover, focus, or tap to expand a ticket. */
function useHighlight() {
  const [active, setActive] = useState<number | null>(null);
  const bind = (i: number) => ({
    onMouseEnter: () => setActive(i),
    onMouseLeave: () => setActive((a) => (a === i ? null : a)),
    onFocus: () => setActive(i),
    onBlur: () => setActive((a) => (a === i ? null : a)),
    onClick: () => setActive((a) => (a === i ? null : i)),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActive((a) => (a === i ? null : i));
      }
    },
    role: "button" as const,
    tabIndex: 0,
    "aria-expanded": active === i,
  });
  return { active, bind };
}

/** A flat colored ticket; when open it grows a little and shows the date and a short note. */
function Ticket({ m, open, className = "" }: { m: Milestone; open: boolean; className?: string }) {
  const k = KINDS[m.kind];
  return (
    <span
      className={`block rounded-md px-2 py-1 text-xs font-bold leading-tight transition-transform duration-150 ${k.bg} ${k.text} ${
        open ? "scale-105" : ""
      } ${className}`}
    >
      {m.label}
      {open && (
        <>
          <span className="mt-0.5 block text-[11px] font-medium opacity-90">
            {m.date} · {m.note}
          </span>
          {m.href && (
            <a
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`mt-1.5 inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold transition-colors ${k.button}`}
            >
              Learn more
              <svg aria-hidden viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 2h6v6M10 2 2 10" />
              </svg>
            </a>
          )}
        </>
      )}
    </span>
  );
}

/** Desktop: horizontal track with tickets staggered across six lanes. */
function HorizontalTimeline() {
  const { active, bind } = useHighlight();
  return (
    <div className="relative hidden h-[520px] md:block">
      {/* year columns: alternating shaded bands, label centered at the bottom of each */}
      {[T_MIN, ...YEARS].map((y, i) => (
        <div
          key={y}
          className={`absolute bottom-0 top-0 rounded-lg ${i % 2 === 0 ? "bg-gray-100" : ""}`}
          style={{ left: pct(y), width: `calc(${pct(y + 1)} - ${pct(y)})` }}
        >
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-bold text-black/40">
            {y}
          </span>
        </div>
      ))}

      {/* track */}
      <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-black" />

      {MILESTONES.map((m, i) => {
        const lane = i % STEMS.length;
        const up = lane % 2 === 0;
        const stem = STEMS[lane];
        const open = active === i;
        return (
          <div key={m.label} className="absolute top-1/2" style={{ left: pct(m.at), zIndex: open ? 30 : 10 }}>
            <span
              aria-hidden
              className="absolute w-0.5 -translate-x-1/2 bg-black/15"
              style={up ? { bottom: 6, height: stem - 6 } : { top: 6, height: stem - 6 }}
            />
            {/* dot, with a larger invisible hover area; mouse only, since the ticket handles focus */}
            <span
              aria-hidden
              onMouseEnter={bind(i).onMouseEnter}
              onMouseLeave={bind(i).onMouseLeave}
              onClick={bind(i).onClick}
              className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
            >
              <span
                className={`h-3.5 w-3.5 rounded-full border-2 border-solid transition-transform duration-150 ${KINDS[m.kind].bg} ${
                  open ? "scale-125" : ""
                }`}
                style={{ borderColor: "#fff" }}
              />
            </span>
            <div
              {...bind(i)}
              className="absolute w-max -translate-x-1/2 cursor-pointer text-center focus:outline-none"
              style={up ? { bottom: stem } : { top: stem }}
            >
              <Ticket m={m} open={open} className={open ? "w-[160px]" : "whitespace-nowrap"} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Mobile: the same tickets stacked vertically; tap one to expand it. */
function VerticalTimeline() {
  const { active, bind } = useHighlight();
  return (
    <ol className="relative md:hidden">
      <span aria-hidden className="absolute bottom-2 left-[6px] top-2 w-1 rounded-full bg-black" />
      {MILESTONES.map((m, i) => {
        const prev = MILESTONES[i - 1];
        const year = Math.floor(m.at);
        const newYear = !prev || Math.floor(prev.at) !== year;
        const open = active === i;
        return (
          <li key={m.label} className="relative pl-7">
            {newYear && (
              <div className={`pb-1 text-sm font-bold text-black/40 ${i === 0 ? "" : "pt-3"}`}>
                {year}
              </div>
            )}
            <div className="relative">
              <span
                aria-hidden
                onClick={bind(i).onClick}
                className={`absolute -left-[26px] top-[8px] h-3.5 w-3.5 cursor-pointer rounded-full border-2 border-solid ${KINDS[m.kind].bg}`}
                style={{ borderColor: "#fff" }}
              />
              <div {...bind(i)} className="inline-block cursor-pointer py-1 text-left focus:outline-none">
                <Ticket m={m} open={open} className="origin-left" />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Timeline of what I learned and when. */
export default function LearningTimeline() {
  return (
    <section aria-label="Timeline of what I learned and when">
      <HorizontalTimeline />
      <VerticalTimeline />
      <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-bold text-black/60">
        {Object.values(KINDS).map((k) => (
          <span key={k.name} className="inline-flex items-center gap-1.5">
            <span className={`h-3 w-3 rounded-full ${k.bg}`} />
            {k.name}
          </span>
        ))}
      </div>
    </section>
  );
}
