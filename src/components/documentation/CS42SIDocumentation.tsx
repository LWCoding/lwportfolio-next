import Image from 'next/image';

export default function CS42SIDocumentation() {
  return (
    <div className="space-y-12">
      <div className="space-y-8">
        {/* Lead */}
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed">
            <b>CS42SI: From Player to Maker</b> is an original course I teach at Stanford University.
            The class gives students a structured way to design and build games that teach something meaningful,
            combining game design theory, rapid prototyping, and feedback from real players.
          </p>
          <p className="text-base md:text-lg text-black leading-relaxed mt-4">
            The course grew out of a desire to create more opportunities for students to explore game development, and focuses on building playful experiences in the Unity Engine. At its time, it was the only game design course at Stanford that formally taught game production in a game engine.
          </p>
        </div>
      </div>

      {/* Course overview image */}
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
          <Image
            src="/images/cs42si_fa2025.png"
            alt="CS42SI course homepage — overview"
            width={800}
            height={450}
            className="w-full h-auto block"
          />
        </div>
        <p className="text-sm text-black/70 text-center mt-3">
          CS42SI: Designing Games for Learning — course homepage (placeholder)
        </p>
      </div>

      {/* Section: Course structure */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Course structure and learning goals
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          In the course, students learn <b>concepts in game design</b> like MDA Analysis, ludonarrative design, game feel, and more. They also learn how to <b>code in C# in the Unity engine</b> to build games, and how to use <b>Git version control</b> to manage shared codebases.
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          The first half of the course is structured around lectures and rapid implementation assignments, while the second half is project work and playtesting.
        </p>
        <div className="max-w-2xl mx-auto mt-6">
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
            <Image
              src="/images/cs42si_fa2025.png"
              alt="CS42SI course structure — placeholder"
              width={1024}
              height={768}
              className="w-full h-auto block"
            />
          </div>
          <p className="text-sm text-black/70 text-center mt-3">
            Course structure and weekly rhythm — placeholder
          </p>
        </div>
      </section>

      {/* Section: Projects and playtesting */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Student projects and playtesting
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          A core part of the course is <b>iterative playtesting</b>. Rather than having midterms or final exams, students develop a culminating final project by the end of the quarter. Before the final showcase, groups of students bring in early versions of their games,
          run short playtests with classmates, and give/receive feedback to understand what players actually
          experience versus what they intended.
        </p>
        <div className="max-w-3xl mx-auto mt-6">
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
            <Image
              src="/images/cs42si_fa2025.png"
              alt="CS42SI student projects and playtesting — placeholder"
              width={1200}
              height={600}
              className="w-full h-auto block"
            />
          </div>
          <p className="text-sm text-black/70 text-center mt-3">
            Student projects and in-class playtesting — placeholder
          </p>
        </div>
      </section>

      {/* Section: Curriculum and public site */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Curriculum and public-facing materials
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          I also designed the public-facing{" "}
          <a
            href="https://web.stanford.edu/class/cs42si/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline font-medium"
          >
            course website
          </a>
          , which hosts the full syllabus, assignments, and examples of student work. (View past winners of our hosted game jams at the bottom of the webpage!) The site is designed to be easy to scan for both enrolled students and anyone curious about the course.
        </p>
        <div className="max-w-3xl mx-auto mt-6">
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
            <Image
              src="/images/cs42si_fa2025.png"
              alt="CS42SI curriculum and website — placeholder"
              width={1200}
              height={600}
              className="w-full h-auto block"
            />
          </div>
          <p className="text-sm text-black/70 text-center mt-3">
            Public-facing course website and curriculum — placeholder
          </p>
        </div>
      </section>
    </div>
  );
}

