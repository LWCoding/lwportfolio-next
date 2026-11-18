"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Button from "@/components/Button";
import VideoBanner from "@/components/VideoBanner";
import Footer from "@/components/Footer";
import GalleryCard from "@/components/GalleryCard";
import CompactProjectRow from "@/components/CompactProjectRow";
import SectionDoodles, { SECTION_COLORS } from "@/components/SectionDoodles";
import { useGames, FEATURED_GAMES_CONFIG } from "@/hooks/useFeaturedGames";
import { OTHER_PROJECTS_CONFIG } from "@/data/otherProjects";
import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";

type ViewMode = "display" | "compact";
const VIEW_MODE_KEY = "projects-view-mode";

/** Display / Compact segmented toggle shown in the page header. */
function ViewModeToggle({ mode, onChange }: { mode: ViewMode; onChange: (m: ViewMode) => void }) {
  const options: { value: ViewMode; label: string; icon: ReactNode }[] = [
    {
      value: "display",
      label: "Display",
      icon: (
        <>
          <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
          <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
          <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
          <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
        </>
      ),
    },
    {
      value: "compact",
      label: "Compact",
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h3M10 6h10M4 12h3M10 12h10M4 18h3M10 18h10" />,
    },
  ];
  return (
    <div role="radiogroup" aria-label="Project view" className="mx-auto flex w-fit gap-1 rounded-full bg-white/15 p-1">
      {options.map((o) => {
        const active = mode === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
              active ? "bg-white text-black" : "text-white/80 hover:text-white"
            }`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
              {o.icon}
            </svg>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

type CompactItem = ComponentProps<typeof CompactProjectRow> & { id: string };

/** Rows for compact mode, separated by thin dividers. */
function CompactList({ items }: { items: CompactItem[] }) {
  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {items.map(({ id, ...row }) => (
        <CompactProjectRow key={id} {...row} />
      ))}
    </div>
  );
}

/**
 * Thin gray wave between project page sections (matches homepage experience blocks).
 */
function ProjectsWaveDivider() {
  return (
    <div className="bg-white py-6 md:py-8" aria-hidden>
      <div className="mx-auto w-full max-w-[1280px] px-4">
        <svg
          viewBox="0 0 1200 34"
          className="block h-4 w-full text-gray-300 md:h-5"
          preserveAspectRatio="none"
          role="presentation"
        >
          <path
            fill="currentColor"
            d="M0,17 C20,17 40,9 72,9 C232,1 400,25 600,8 C800,0 968,29 1128,11 C1162,8 1190,16 1200,21 C1194,24 1176,27 1128,27 C968,31 800,17 600,27 C400,32 232,22 72,23 C40,24 22,22 0,17 Z"
          />
        </svg>
      </div>
    </div>
  );
}

function ProjectsSectionHeader({ children, color }: { children: ReactNode; color: string }) {
  return (
    <h2 className="mb-6 md:mb-8 flex justify-center">
      <div className="inline-flex flex-col">
        <span className="text-3xl font-black text-gray-900 md:text-4xl">
          {children}
        </span>
        <div className="mt-3 h-1 rounded-full" style={{ backgroundColor: color }} />
      </div>
    </h2>
  );
}

const TEACHING_TAG = "Teaching";

function isTeachingProject(p: (typeof OTHER_PROJECTS_CONFIG)[number]) {
  return p.tags.includes(TEACHING_TAG);
}

/** Teaching roles, most recent first. */
const teachingProjects = OTHER_PROJECTS_CONFIG.filter(isTeachingProject).sort((a, b) =>
  (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
);
const productProjects = OTHER_PROJECTS_CONFIG.filter((p) => !isTeachingProject(p));

export default function Projects() {
  const { featuredGames, loading, error } = useGames();
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("display");
  const compact = viewMode === "compact";

  // Remember the viewer's chosen view between visits (best effort; storage may be unavailable).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(VIEW_MODE_KEY);
      if (saved === "compact" || saved === "display") setViewMode(saved);
    } catch {}
  }, []);
  const changeViewMode = (m: ViewMode) => {
    setViewMode(m);
    try {
      localStorage.setItem(VIEW_MODE_KEY, m);
    } catch {}
  };

  // If the user lands via /projects#<section> (especially #teaching which loads async),
  // re-scroll once content settles. When coming from a homepage smooth-nav button,
  // use smooth behavior; otherwise instant.
  const didAutoScrollRef = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (didAutoScrollRef.current) return;
    if (loading) return;

    const hash = window.location.hash;
    const smoothTarget = sessionStorage.getItem('smoothScrollTarget');

    const targetId = hash ? hash.slice(1) : (smoothTarget ?? '');
    if (!targetId) return;

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const useSmooth = smoothTarget === targetId;
    if (useSmooth) sessionStorage.removeItem('smoothScrollTarget');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        targetEl.scrollIntoView({ behavior: useSmooth ? "smooth" : "auto", block: "start" });
        didAutoScrollRef.current = true;
      });
    });
  }, [loading]);

  return (
    <div className="min-h-screen flex flex-col bg-white pt-[56px]">
      <Navigation />

      <VideoBanner
        title="Projects"
        height="33vh"
        minHeight="200px"
      >
        <div className="mt-8">
          <ViewModeToggle mode={viewMode} onChange={changeViewMode} />
        </div>
      </VideoBanner>

      {/* Projects (non-teaching work) */}
      <div id="projects" className="relative">
        <SectionDoodles theme="professional" />
        <Section separator={false} container={true} padding={true} className="relative pt-8 md:pt-12 pb-4 md:pb-6">
          <ProjectsSectionHeader color={SECTION_COLORS.professional}>Professional</ProjectsSectionHeader>
          {compact ? (
            <CompactList
              items={productProjects.map((project, index) => ({
                id: project.id,
                title: project.title,
                description: project.description,
                imageSrc: project.coverImage || "/images/scratchproject.png",
                imageAlt: `${project.title} cover image`,
                tags: [...(project.listingPills ?? ["For Work"]), ...(project.tags || [])],
                date: project.createdAt,
                href: project.href,
                secondaryCtaLabel: project.type ? `View ${project.type}` : "View Project",
                githubUrl: project.githubUrl,
                processUrl: project.detailComponent ? `/projects/${project.id}` : undefined,
                showExternalCta: index >= 3,
              }))}
            />
          ) : (
          <>
          {/* One grid for all professional projects; on mobile, only the first three show until expanded */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
            {productProjects.map((project, index) => (
              <div
                key={project.id}
                id={index === 3 ? "other-projects" : undefined}
                className={index >= 3 && !showMoreProjects ? "hidden md:block" : undefined}
              >
                <GalleryCard
                  title={project.title}
                  description={project.description}
                  imageSrc={project.coverImage || "/images/scratchproject.png"}
                  imageAlt={`${project.title} cover image`}
                  tags={[...(project.listingPills ?? ["For Work"]), ...(project.tags || [])]}
                  tools={project.tools}
                  date={project.createdAt}
                  href={project.href}
                  secondaryCtaLabel={project.type ? `View ${project.type}` : "View Project"}
                  githubUrl={project.githubUrl}
                  processUrl={project.detailComponent ? `/projects/${project.id}` : undefined}
                  showExternalCta={index >= 3}
                />
              </div>
            ))}
          </div>
          {productProjects.length > 3 && (
            <div className="mt-4 flex justify-center md:hidden">
              <button
                type="button"
                onClick={() => setShowMoreProjects((v) => !v)}
                className="cursor-pointer px-4 py-2 text-base font-bold text-blue-600 underline transition-colors duration-200 hover:text-blue-700 md:text-lg"
              >
                {showMoreProjects ? "Show Less Projects" : "Show More Projects"}
              </button>
            </div>
          )}
          </>
          )}
        </Section>
      </div>

      <ProjectsWaveDivider />

      {/* Games */}
      <div id="games" className="relative">
        <SectionDoodles theme="games" />
        <Section separator={false} container={true} padding={true} className="relative pt-4 md:pt-6">
          <ProjectsSectionHeader color={SECTION_COLORS.games}>Games</ProjectsSectionHeader>
          {!loading && !error && featuredGames.length > 0 && compact && (
            <CompactList
              items={featuredGames.map((game) => {
                const gameConfig = FEATURED_GAMES_CONFIG.find((cfg) => cfg.id === game.id);
                return {
                  id: String(game.id),
                  title: game.title,
                  description: game.short_text || "An exciting game experience awaits!",
                  imageSrc: game.still_cover_url || game.cover_url || "/images/scratchproject.png",
                  imageAlt: `${game.title} cover image`,
                  tags: ["For Fun", ...(game.tags || [])],
                  date: game.created_at,
                  href: game.url,
                  secondaryCtaLabel: "Play Game",
                  githubUrl: gameConfig?.githubUrl || game.githubUrl,
                  processUrl: gameConfig?.detailComponent ? `/projects/${game.id}` : undefined,
                };
              })}
            />
          )}
          {!loading && !error && featuredGames.length > 0 && !compact && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
              {featuredGames.map((game) => {
                const gameConfig = FEATURED_GAMES_CONFIG.find((cfg) => cfg.id === game.id);
                return (
                  <GalleryCard
                    key={game.id}
                    title={game.title}
                    description={game.short_text || "An exciting game experience awaits!"}
                    imageSrc={game.still_cover_url || game.cover_url || "/images/scratchproject.png"}
                    imageAlt={`${game.title} cover image`}
                    tags={["For Fun", ...(game.tags || [])]}
                    tools={game.tools}
                    date={game.created_at}
                    href={game.url}
                    secondaryCtaLabel="Play Game"
                    githubUrl={gameConfig?.githubUrl || game.githubUrl}
                    processUrl={
                      gameConfig?.detailComponent ? `/projects/${game.id}` : undefined
                    }
                  />
                );
              })}
            </div>
          )}

          {error && (
            <div className="py-12 text-center">
              <p className="mb-4 text-black">
                Oops! Couldn&apos;t load games from Itch.io right now.
              </p>
              <p className="mb-4 text-sm text-black/80">Error: {error}</p>
              <Button
                href="https://lwcoding.itch.io/"
                variant="outline"
                className="mt-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Itch.io →
              </Button>
            </div>
          )}

          {!loading && !error && featuredGames.length === 0 && (
            <div className="py-12 text-center">
              <p className="mb-4 text-black">No games found in your Itch.io account.</p>
              <Button
                href="https://lwcoding.itch.io/"
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Itch.io →
              </Button>
            </div>
          )}

        </Section>
      </div>

      <ProjectsWaveDivider />

      {/* Teaching */}
      <div id="teaching" className="relative scroll-mt-[96px] md:scroll-mt-[120px]">
        <SectionDoodles theme="teaching" />
        <Section separator={false} container={true} padding={true} className="relative pt-4 md:pt-6 pb-8">
          <ProjectsSectionHeader color={SECTION_COLORS.teaching}>Teaching</ProjectsSectionHeader>
          {compact ? (
            <CompactList
              items={teachingProjects.map((project) => ({
                id: project.id,
                title: project.title,
                description: project.description,
                imageSrc: project.coverImage || "/images/scratchproject.png",
                imageAlt: `${project.title} cover image`,
                tags: [TEACHING_TAG, ...project.tags.filter((t) => t !== TEACHING_TAG)],
                date: project.createdAt,
                href: project.href,
                secondaryCtaLabel: project.type ? `View ${project.type}` : "View Project",
                githubUrl: project.githubUrl,
                processUrl: project.detailComponent ? `/projects/${project.id}` : undefined,
                showExternalCta: Boolean(project.href?.trim()),
              }))}
            />
          ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
            {teachingProjects.map((project) => (
              <GalleryCard
                key={project.id}
                title={project.title}
                description={project.description}
                imageSrc={project.coverImage || "/images/scratchproject.png"}
                imageAlt={`${project.title} cover image`}
                tags={[TEACHING_TAG, ...project.tags.filter((t) => t !== TEACHING_TAG)]}
                tools={project.tools}
                date={project.createdAt}
                href={project.href}
                secondaryCtaLabel={project.type ? `View ${project.type}` : "View Project"}
                githubUrl={project.githubUrl}
                processUrl={
                  project.detailComponent
                    ? `/projects/${project.id}`
                    : undefined
                }
                showExternalCta={Boolean(project.href?.trim())}
              />
            ))}
          </div>
          )}
        </Section>
      </div>

      <Footer />
    </div>
  );
}
