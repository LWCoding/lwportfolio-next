import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import SectionDoodles from "@/components/SectionDoodles";
import { PLAYGROUND_PROJECTS } from "@/data/playgroundProjects";

export default function PlaygroundIndex() {
  return (
    <div className="min-h-screen flex flex-col bg-white pt-[56px]">
      <Navigation />

      <div className="relative flex-1">
        <SectionDoodles theme="mixed" count={8} />
        <Section className="relative pt-10 md:pt-14">
          <div className="mb-10 flex flex-col items-center text-center">
            <h1 className="inline-flex flex-col text-4xl font-black text-gray-900 md:text-5xl">
              Playground
              <span className="mt-3 h-1 rounded-full bg-yellow-400" />
            </h1>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {PLAYGROUND_PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/playground/${project.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0_0_#000] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000]"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-black/10 bg-gray-200">
                  <Image
                    src={project.previewImage}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 768px) 440px, 100vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <span className="text-xs font-semibold text-black/50">{project.createdAt}</span>
                <div className="flex flex-col gap-1.5">
                  <h2 className="inline-flex flex-col self-start text-2xl font-bold leading-tight text-black">
                    {project.title}
                    <span
                      className="mt-1 h-1 w-full rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                  </h2>
                  <p className="text-sm text-black/70 md:text-base">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      <Footer />
    </div>
  );
}
