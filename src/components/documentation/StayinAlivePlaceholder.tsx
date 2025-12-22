import Image from 'next/image';

export default function StayinAlivePlaceholder() {
  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          Stayin' Alive is a survival-strategy ecosystem game where players inhabit the role of an endangered 
          kangaroo rat in Southern California shrublands. Players explore, collect materials, build dens, 
          recruit worker rats, and maintain a sustainable food system while navigating changing seasons, 
          predators, and scarce resources.
        </p>
      </div>

      {/* Gameplay Video/Image */}
      <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 mx-auto">
        <Image
          src="/images/stayinalive-preview.png"
          alt="Stayin' Alive gameplay"
          fill
          className="object-cover"
        />
      </div>

      {/* Mission Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-black">Mission</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed">
            Stayin' Alive was created to teach players about real ecosystem dynamics through interactive 
            gameplay. Grounded in the actual habitat of the endangered Stephens' kangaroo rat in Southern 
            California, the game aims to help players understand ecological relationships—how predators, 
            prey, resources, and seasons interact in a complex system. The goal is to create an engaging 
            experience where players discover how thoughtful decisions about resource management, habitat 
            building, and population control mirror real-world conservation challenges.
          </p>
          <p className="text-base md:text-lg text-black leading-relaxed mt-4">
            The game models real ecological feedback loops: reinforcing loops where food enables survival 
            and growth, and balancing loops where predators and seasonal scarcity create natural limits. 
            Through play, players experience how these systems work together, making the abstract concepts 
            of ecosystem balance tangible and memorable.
          </p>
        </div>
      </div>

      {/* Evolution Through Playtests */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-black">Evolution Through Playtesting</h2>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed mb-6">
            Over the course of <strong>8 structured playtests</strong>, Stayin' Alive evolved from a 
            functional prototype into a polished, educational experience. Each playtest revealed new 
            insights that shaped the game's development.
          </p>
        </div>

        {/* Milestone Timeline */}
        <div className="space-y-6">
          {/* Initial State */}
          <div className="border-l-4 border-blue-500 pl-6 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Initial State</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Starting Point</h3>
            <p className="text-base md:text-lg text-black leading-relaxed">
              The game launched with core mechanics in place: exploration, resource gathering, den building, 
              worker recruitment, and predator avoidance. However, players struggled to understand the 
              goals, ecosystem relationships were unclear, and several game-breaking bugs disrupted the 
              experience. The connection between player actions and real-world ecology needed strengthening.
            </p>
          </div>

          {/* Playtest 1 - Sam Jett */}
          <div className="border-l-4 border-green-500 pl-6 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Playtest 1</span>
              <span className="text-sm text-black/60">Sam Jett</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Onboarding Crisis</h3>
            <p className="text-base md:text-lg text-black leading-relaxed mb-3">
              The first playtest revealed critical onboarding issues. Players didn't understand what they 
              were supposed to do or why. The tutorial system was insufficient, and core goals were unclear. 
              This playtest established that <strong>clarity of purpose</strong> was the foundation for 
              everything else.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-3">
              <p className="text-sm text-green-800 font-semibold mb-1">Key Insight:</p>
              <p className="text-sm text-green-700">Players need explicit guidance on goals and mechanics before they can engage with ecosystem concepts.</p>
            </div>
          </div>

          {/* Mid-Playtest Iterations */}
          <div className="border-l-4 border-purple-500 pl-6 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Playtests 2-5</span>
              <span className="text-sm text-black/60">Jackson, Kevin, Brian, Renee</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Iterative Refinement</h3>
            <p className="text-base md:text-lg text-black leading-relaxed mb-3">
              Through multiple playtests, we systematically addressed issues:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-black leading-relaxed ml-4 mb-3">
              <li><strong>UI/UX Improvements:</strong> Redesigned interface elements to be more intuitive and informative</li>
              <li><strong>Bug Fixes:</strong> Resolved game-breaking issues with resource collection, den building, and worker systems</li>
              <li><strong>Balance Adjustments:</strong> Fine-tuned resource scarcity, predator behavior, and seasonal mechanics</li>
              <li><strong>Ecosystem Clarity:</strong> Enhanced visual and textual feedback to connect gameplay to real ecology</li>
            </ul>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-3">
              <p className="text-sm text-purple-800 font-semibold mb-1">Key Insight:</p>
              <p className="text-sm text-purple-700">Small, focused improvements between playtests allowed us to test hypotheses and validate changes quickly.</p>
            </div>
          </div>

          {/* Final Playtests */}
          <div className="border-l-4 border-orange-500 pl-6 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Playtests 6-8</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Polish & Validation</h3>
            <p className="text-base md:text-lg text-black leading-relaxed mb-3">
              Later playtests focused on polish and validation. Players could now understand the ecosystem 
              mechanics, make informed strategic decisions, and experience the intended learning outcomes. 
              The game felt balanced, engaging, and educational. Feedback confirmed that the ecosystem 
              grounding was clear and the survival-strategy loop was compelling.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-3">
              <p className="text-sm text-orange-800 font-semibold mb-1">Key Insight:</p>
              <p className="text-sm text-orange-700">The iterative process transformed confusion into clarity, allowing players to focus on strategic decision-making and learning.</p>
            </div>
          </div>

          {/* Final State */}
          <div className="border-l-4 border-emerald-500 pl-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Final State</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Published Game</h3>
            <p className="text-base md:text-lg text-black leading-relaxed">
              The final version successfully balances educational goals with engaging gameplay. Players 
              understand the ecosystem relationships, can make meaningful strategic choices, and experience 
              the intended learning outcomes about endangered species conservation. The game was published 
              and shared with a broader audience, achieving its mission of making complex ecological 
              systems accessible through interactive play.
            </p>
          </div>
        </div>

        {/* Playtest Image Placeholder */}
        <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 mt-6 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-teal-100">
            <p className="text-black/50 text-lg">Playtesting session documentation</p>
          </div>
        </div>
      </div>

      {/* External Links */}
      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <a 
          href="https://lwcoding.itch.io/stayin-alive" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>Play Stayin' Alive on itch.io</span>
        </a>
        <a 
          href="https://mechanicsofmagic.com/2025/12/12/p4-stayin-alive/" 
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
          <span>Read Full Blog Post</span>
        </a>
      </div>
    </div>
  );
}

