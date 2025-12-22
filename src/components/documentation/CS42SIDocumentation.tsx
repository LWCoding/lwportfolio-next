import Image from 'next/image';

export default function CS42SIDocumentation() {
  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black/80 leading-relaxed">
          CS42SI is the follow-on to CS11SI, focused on Unity and game development at Stanford.
          This placeholder highlights what the course site and materials will showcase until a
          full write-up is ready.
        </p>
      </div>

      <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100">
        <Image
          src="/images/cs42si.png"
          alt="CS42SI website preview"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
          priority
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[
          { title: 'Curriculum Design', description: 'Project-based modules covering Unity fundamentals, input systems, and polish.' },
          { title: 'Student Resources', description: 'Lecture slides, starter repos, and lab walkthroughs available from the course site.' },
          { title: 'Showcase Ready', description: 'Links out to shipped student projects and the live course website.' },
        ].map((item) => (
          <div key={item.title} className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black">{item.title}</h3>
            <p className="mt-2 text-sm text-black/70 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100 text-yellow-900">
        More visuals, lesson flow, and downloadable assets will land here soon. The live course site remains linked above.
      </div>
    </div>
  );
}

