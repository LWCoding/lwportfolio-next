import Image from 'next/image';

export default function AlwaysBeClosingPlaceholder() {
  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          Always Be Closing is an interactive sales training simulation used in Stanford's STRAMGT351 
          course. The application simulates realistic CRM workflows, allowing students to practice discovery, 
          objection handling, and qualification through branching scenarios with measurable outcomes.
        </p>
      </div>

      {/* Preview Image */}
      <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 mx-auto">
        <Image
          src="/images/abc-preview.png"
          alt="Always Be Closing preview"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
          priority
        />
      </div>

      {/* Mission Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-black">Mission</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed">
            Always Be Closing was created to bridge the gap between sales theory and practice by providing 
            students with a realistic, interactive simulation environment. The mission is to give students 
            hands-on experience with real CRM workflows, allowing them to practice discovery, objection 
            handling, and qualification in a safe, repeatable setting where they can learn from their 
            decisions without real-world consequences.
          </p>
          <p className="text-base md:text-lg text-black leading-relaxed mt-4">
            The application aims to transform sales education by making abstract concepts tangible through 
            interactive scenarios. By simulating real sales conversations with branching outcomes, students 
            can see how their choices directly impact results, while instructors gain visibility into student 
            performance and can provide targeted coaching based on actionable analytics.
          </p>
        </div>
      </div>

      {/* Process Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-black">Process</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed mb-4">
            I collaborated with the STRAMGT351 teaching team to design and develop this sales training 
            simulation through an iterative design process:
          </p>
          <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-black leading-relaxed ml-4">
            <li><strong>Requirements Gathering:</strong> Conducted interviews with instructors to understand learning objectives and identify key sales scenarios</li>
            <li><strong>Scenario Design:</strong> Created branching dialogue trees that reflect real sales conversations with multiple decision points</li>
            <li><strong>Prototype Development:</strong> Built interactive prototypes in Unity to test user flows and gather early feedback</li>
            <li><strong>User Testing:</strong> Conducted usability tests with students to refine the interface and ensure scenarios felt realistic</li>
            <li><strong>Analytics Integration:</strong> Designed and implemented tracking systems to measure call quality, deal health, and identify coaching opportunities</li>
            <li><strong>Deployment:</strong> Created a web-ready build optimized for classroom use with rapid onboarding</li>
          </ul>
        </div>

        {/* Process Image Placeholder */}
        <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 mt-6 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
            <p className="text-black/50 text-lg">Design process documentation</p>
          </div>
        </div>
      </div>

      {/* My Work Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-black">My Work</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed mb-4">
            I led the design and development of Always Be Closing, focusing on creating an engaging and 
            educational experience:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="p-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-2">UI/UX Design</h3>
            <p className="text-sm text-black/70 leading-relaxed">
              Designed an intuitive interface that mimics real CRM workflows while remaining accessible 
              to students new to sales software. Created clear visual feedback for decision outcomes 
              and progress tracking.
            </p>
          </div>
          
          <div className="p-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-2">Scenario Architecture</h3>
            <p className="text-sm text-black/70 leading-relaxed">
              Built branching dialogue systems that create realistic sales conversations with meaningful 
              choices. Each scenario includes multiple paths based on discovery questions, objection 
              handling, and qualification techniques.
            </p>
          </div>
          
          <div className="p-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-2">Analytics Dashboard</h3>
            <p className="text-sm text-black/70 leading-relaxed">
              Developed tracking systems that measure call quality metrics, deal health indicators, and 
              identify specific coaching opportunities. The dashboard provides actionable insights for 
              both students and instructors.
            </p>
          </div>
          
          <div className="p-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-2">Technical Implementation</h3>
            <p className="text-sm text-black/70 leading-relaxed">
              Implemented the simulation in Unity with a web-ready build optimized for classroom deployment. 
              Ensured smooth performance and easy onboarding for students and instructors.
            </p>
          </div>
        </div>
      </div>

      {/* External Links */}
      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <a 
          href="https://sale-prod.s3.amazonaws.com/Build_Prod/index.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>Try Always Be Closing</span>
        </a>
        <a 
          href="https://github.com/banasse/ABCSALE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>View Source on GitHub</span>
        </a>
      </div>
    </div>
  );
}
