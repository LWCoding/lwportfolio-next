import Image from 'next/image';

export default function AlwaysBeClosingDocumentation() {
  return (
    <div className="space-y-12">
      <div className="space-y-8">
        {/* Lead */}
        <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          <b>Always Be Closing</b> is a customer management software simulation that supplements STRAMGT351, a sales course at Stanford. The application gives hundreds of students a simulated environment to practice sales calls and close deals before they step into the real world.
        </p>
        </div>
      </div>

      {/* Course context */}
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
          <Image
            src="/images/stramgt351.png"
            alt="STRAMGT 351: Building & Managing Sales Organizations — course listing"
            width={800}
            height={450}
            className="w-full h-auto block"
          />
        </div>
        <p className="text-sm text-black/70 text-center mt-3">
          STRAMGT 351: Building &amp; Managing Sales Organizations
        </p>
      </div>

      {/* Section: Product & audience */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Product and audience
        </h2>
  
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          The simulation guides the player through a sales representative's journey of <b>converting leads into opportunities, and opportunities into customers</b>. The course comprises students across multiple years, but primarily focuses on graduate students in the Graduate School of Business.
        </p>
          
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          The game replaced an activity offered in previous years of the course that initially focused on managing numbers in a sales spreadsheet. Many of the early design and tech choices were guided by the need to define a balance of fun and learning.
        </p>

        <div className="max-w-2xl mx-auto mt-6">
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
            <Image
              src="/images/alwaysbeclosing.png"
              alt="Always Be Closing — simulation interface preview"
              width={1024}
              height={768}
              className="w-full h-auto block"
            />
          </div>
          <p className="text-sm text-black/70 text-center mt-3">
            Always Be Closing interface
          </p>
        </div>
      </section>

      {/* Section: Scale and infrastructure */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Built for scale: Firebase, AWS, Airtable, and Claude
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mb-4">
          With 20,000+ monthly requests, reliability and performance were important. I designed and optimized the backend around <b>Firebase for real-time and auth, AWS for hosting and assets, and Airtable as a database and interface for the professor to use to create and assign sessions</b>. The application also contains a virtual boss who answers questions about the player's sales pipeline; the Claude API allows the simulation to respond intelligently to student choices for more guided learning opportunities.
        </p>
        <div className="max-w-3xl mx-auto mt-6">
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
            <Image
              src="/images/abcairtable.png"
              alt="Airtable view used to manage Always Be Closing player performance data"
              width={1200}
              height={600}
              className="w-full h-auto block"
            />
          </div>
          <p className="text-sm text-black/70 text-center mt-3">
            Airtable interface for tracking game sessions and player performance in testing environment
          </p>
        </div>
      </section>

      {/* Section: Iteration and playtesting */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Design process: 20+ playtesting sessions
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          The design process was driven by frequent, structured playtesting. I helped run and analyze <b>20+ playtesting sessions with students, teaching assistants, and instructors to test fun, difficulty curves, and UI clarity</b>. All feedback went straight into sprint planning and shaped everything from onboarding (via an interactive tutorial) to the way sales scenarios were presented (in modals rather than banner notifications).
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          The application was built in Unity and deployed for Mac and Windows. The builds were versioned and used throughout iterative testing.
        </p>
        <div className="max-w-3xl mx-auto mt-6">
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
            <Image
              src="/images/abcbuilds.png"
              alt="Build folder showing versioned Always Be Closing releases"
              width={1200}
              height={600}
              className="w-full h-auto block"
            />
          </div>
          <p className="text-sm text-black/70 text-center mt-3">
            Versioned builds used throughout iterative testing
          </p>
        </div>
      </section>
    </div>
  );
}
