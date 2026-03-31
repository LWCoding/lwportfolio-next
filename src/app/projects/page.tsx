"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Button from "@/components/Button";
import VideoBanner from "@/components/VideoBanner";
import Footer from "@/components/Footer";
import WorkItemCard from "@/components/WorkItemCard";
import GalleryCard from "@/components/GalleryCard";
import { useGames, FEATURED_GAMES_CONFIG } from "@/hooks/useFeaturedGames";
import { OTHER_PROJECTS_CONFIG } from "@/data/otherProjects";
import { useEffect, useRef, useState } from "react";

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

const TEACHING_TAG = "Teaching";

function isTeachingProject(p: (typeof OTHER_PROJECTS_CONFIG)[number]) {
  return p.tags.includes(TEACHING_TAG);
}

const teachingProjects = OTHER_PROJECTS_CONFIG.filter(isTeachingProject);
const productProjects = OTHER_PROJECTS_CONFIG.filter((p) => !isTeachingProject(p));

export default function Projects() {
  const { featuredGames, loading, error } = useGames();
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [showOtherGames, setShowOtherGames] = useState(false);
  const [showMoreTeaching, setShowMoreTeaching] = useState(false);

  // If the user lands directly via /projects#teaching, the browser hash scroll can
  // happen before dynamic content (games) finishes loading, leaving the anchor
  // too high. Re-scroll once loading settles.
  const didAutoScrollRef = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (didAutoScrollRef.current) return;
    if (loading) return;

    const hash = window.location.hash;
    if (!hash) return;

    const targetId = hash.startsWith("#") ? hash.slice(1) : hash;
    if (targetId !== "teaching") return;

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        targetEl.scrollIntoView({ behavior: "auto", block: "start" });
        didAutoScrollRef.current = true;
      });
    });
  }, [loading]);

  return (
    <div className="min-h-screen flex flex-col bg-white pt-[56px]">
      <Navigation />

      <VideoBanner
        title="Projects"
        subtitle="Work, games, and teaching—in three sections below."
        height="33vh"
        minHeight="200px"
      />

      {/* Projects (non-teaching work) */}
      <div id="projects">
        <Section separator={false} container={true} padding={true} className="pt-8 md:pt-12 pb-4 md:pb-6">
          <h2 className="mb-6 text-3xl font-bold text-black md:mb-8 md:text-4xl">
            Projects
          </h2>
          <div className="space-y-8 md:space-y-6">
            {productProjects.slice(0, 3).map((project, index) => (
              <WorkItemCard
                key={project.id}
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
                processUrl={
                  project.detailComponent || project.displayType
                    ? `/projects/${project.id}`
                    : undefined
                }
                priority={index === 0}
                showExternalCta={false}
              />
            ))}
          </div>
          {productProjects.length > 3 && (
            <>
              <div className="mt-4 flex justify-center md:hidden">
                <button
                  type="button"
                  onClick={() => setShowMoreProjects((v) => !v)}
                  className="cursor-pointer px-4 py-2 text-base font-bold text-blue-600 underline transition-colors duration-200 hover:text-blue-700 md:text-lg"
                >
                  {showMoreProjects ? "Show Less Projects" : "Show More Projects"}
                </button>
              </div>

              <div
                id="other-projects"
                className={`mt-8 overflow-hidden transition-all duration-500 ease-in-out pointer-events-none md:pointer-events-auto md:mt-12 ${
                  showMoreProjects
                    ? "max-h-[5000px] opacity-100 pointer-events-auto"
                    : "max-h-0 opacity-0"
                } md:max-h-[5000px] md:opacity-100`}
              >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
                  {productProjects.slice(3).map((project) => (
                    <GalleryCard
                      key={project.id}
                      title={project.title}
                      description={project.description}
                      imageSrc={
                        project.coverImage || "/images/scratchproject.png"
                      }
                      imageAlt={`${project.title} cover image`}
                      tags={[
                        ...(project.listingPills ?? ["For Work"]),
                        ...(project.tags || []),
                      ]}
                      tools={project.tools}
                      date={project.createdAt}
                      href={project.href}
                      secondaryCtaLabel={
                        project.type ? `View ${project.type}` : "View Project"
                      }
                      githubUrl={project.githubUrl}
                      processUrl={
                        project.detailComponent || project.displayType
                          ? `/projects/${project.id}`
                          : undefined
                      }
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </Section>
      </div>

      <ProjectsWaveDivider />

      {/* Games */}
      <div id="games">
        <Section separator={false} container={true} padding={true} className="pt-4 md:pt-6">
          <h2 className="mb-6 text-3xl font-bold text-black md:mb-8 md:text-4xl">
            Games
          </h2>
          {!loading && !error && featuredGames.length > 0 && (
            <div className="space-y-8 md:space-y-6">
              {featuredGames.slice(0, 3).map((game, index) => {
                const gameConfig = FEATURED_GAMES_CONFIG.find((cfg) => cfg.id === game.id);
                return (
                  <WorkItemCard
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
                    priority={index === 0 && productProjects.length === 0}
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

          {!loading && !error && featuredGames.length > 3 && (
            <>
              <div className="mt-4 flex justify-center md:hidden">
                <button
                  type="button"
                  onClick={() => setShowOtherGames((v) => !v)}
                  className="cursor-pointer px-4 py-2 text-base font-bold text-blue-600 underline transition-colors duration-200 hover:text-blue-700 md:text-lg"
                >
                  {showOtherGames ? "Show Less Games" : "Show More Games"}
                </button>
              </div>

              <div
                className={`mt-8 overflow-hidden transition-all duration-500 ease-in-out pointer-events-none md:pointer-events-auto md:mt-12 ${
                  showOtherGames
                    ? "max-h-[5000px] opacity-100 pointer-events-auto"
                    : "max-h-0 opacity-0"
                } md:max-h-[5000px] md:opacity-100`}
              >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
                  {featuredGames.slice(3).map((game) => {
                    const gameConfig = FEATURED_GAMES_CONFIG.find(
                      (cfg) => cfg.id === game.id
                    );
                    return (
                      <GalleryCard
                        key={game.id}
                        title={game.title}
                        description={
                          game.short_text || "An exciting game experience awaits!"
                        }
                        imageSrc={
                          game.still_cover_url ||
                          game.cover_url ||
                          "/images/scratchproject.png"
                        }
                        imageAlt={`${game.title} cover image`}
                        tags={["For Fun", ...(game.tags || [])]}
                        tools={game.tools}
                        date={game.created_at}
                        href={game.url}
                        secondaryCtaLabel="Play Game"
                        githubUrl={gameConfig?.githubUrl || game.githubUrl}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </Section>
      </div>

      <ProjectsWaveDivider />

      {/* Teaching */}
      <div id="teaching" className="scroll-mt-[96px] md:scroll-mt-[120px]">
        <Section separator={false} container={true} padding={true} className="pt-4 md:pt-6 pb-8">
          <h2 className="mb-6 text-3xl font-bold text-black md:mb-8 md:text-4xl">
            Teaching
          </h2>
          <div className="space-y-8 md:space-y-6">
            {teachingProjects.slice(0, 3).map((project, index) => (
              <WorkItemCard
                key={project.id}
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
                processUrl={
                  project.detailComponent || project.displayType
                    ? `/projects/${project.id}`
                    : undefined
                }
                priority={index === 0 && productProjects.length === 0 && featuredGames.length === 0}
                showExternalCta={Boolean(project.href?.trim())}
              />
            ))}
          </div>
          {teachingProjects.length > 3 && (
            <>
              <div className="mt-4 flex justify-center md:hidden">
                <button
                  type="button"
                  onClick={() => setShowMoreTeaching((v) => !v)}
                  className="cursor-pointer px-4 py-2 text-base font-bold text-blue-600 underline transition-colors duration-200 hover:text-blue-700 md:text-lg"
                >
                  {showMoreTeaching ? "Show Less" : "Show More Teaching"}
                </button>
              </div>

              <div
                className={`mt-8 overflow-hidden transition-all duration-500 ease-in-out pointer-events-none md:pointer-events-auto md:mt-12 ${
                  showMoreTeaching
                    ? "max-h-[5000px] opacity-100 pointer-events-auto"
                    : "max-h-0 opacity-0"
                } md:max-h-[5000px] md:opacity-100`}
              >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
                  {teachingProjects.slice(3).map((project) => (
                    <GalleryCard
                      key={project.id}
                      title={project.title}
                      description={project.description}
                      imageSrc={
                        project.coverImage || "/images/scratchproject.png"
                      }
                      imageAlt={`${project.title} cover image`}
                      tags={[
                        ...(project.listingPills ?? ["For Work"]),
                        ...(project.tags || []),
                      ]}
                      tools={project.tools}
                      date={project.createdAt}
                      href={project.href}
                      secondaryCtaLabel={
                        project.type ? `View ${project.type}` : "View Project"
                      }
                      githubUrl={project.githubUrl}
                      processUrl={
                        project.detailComponent || project.displayType
                          ? `/projects/${project.id}`
                          : undefined
                      }
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </Section>
      </div>

      <Footer />
    </div>
  );
}
