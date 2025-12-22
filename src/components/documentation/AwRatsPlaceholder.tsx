import Image from 'next/image';

export default function AwRatsPlaceholder() {
  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          Aw, Rats! is an arcade game created for GMTK 2025 where you use innovative stylus technology 
          to loop rats before they eat all of your cheese. The game combines intuitive touch controls 
          with fast-paced arcade gameplay, challenging players to master the art of creating perfect loops 
          while managing an ever-increasing swarm of hungry rodents.
        </p>
      </div>

      {/* Gameplay Video/Image */}
      <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 mx-auto">
        <Image
          src="/images/awrats-preview.png"
          alt="Aw, Rats! gameplay"
          fill
          className="object-cover"
        />
      </div>

      {/* Mission Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-black">Mission</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed">
            Aw, Rats! was designed to explore the potential of stylus-based input in arcade games. 
            The goal was to create an experience where drawing loops felt natural and satisfying, 
            transforming a simple gesture into a core gameplay mechanic. By focusing on the tactile 
            connection between player input and on-screen action, the game aims to demonstrate how 
            innovative control schemes can enhance traditional arcade gameplay.
          </p>
          <p className="text-base md:text-lg text-black leading-relaxed mt-4">
            The game challenges players to think spatially and react quickly, balancing the precision 
            needed to create effective loops with the speed required to protect their cheese. Through 
            iterative design, we refined the stylus controls to feel responsive and intuitive, making 
            complex loop patterns accessible while maintaining a high skill ceiling for mastery.
          </p>
        </div>
      </div>

      {/* Evolution Through Playtests */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-black">Evolution Through Playtesting</h2>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed mb-6">
            Over the course of <strong>6 structured playtests</strong>, Aw, Rats! evolved from a 
            concept prototype into a polished GMTK 2025 entry. Each playtest revealed new insights 
            about stylus controls, difficulty curves, and player engagement that shaped the game's 
            development.
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
              The initial prototype featured basic loop drawing mechanics and simple rat AI. However, 
              the stylus controls felt imprecise, the difficulty curve was too steep, and players 
              struggled to understand the core loop strategy. The visual feedback for successful loops 
              was unclear, making it difficult for players to learn and improve.
            </p>
          </div>

          {/* Playtest 1 */}
          <div className="border-l-4 border-green-500 pl-6 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Playtest 1</span>
              <span className="text-sm text-black/60">Early Prototype</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Control Refinement</h3>
            <p className="text-base md:text-lg text-black leading-relaxed mb-3">
              The first playtest revealed that players found the stylus controls unintuitive. The loop 
              detection was too strict, causing frustration when players thought they had created valid 
              loops. This playtest established that <strong>responsive and forgiving controls</strong> 
              were essential for the game's success.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-3">
              <p className="text-sm text-green-800 font-semibold mb-1">Key Insight:</p>
              <p className="text-sm text-green-700">Players need immediate visual feedback and lenient loop detection to feel successful with stylus controls.</p>
            </div>
          </div>

          {/* Mid-Playtest Iterations */}
          <div className="border-l-4 border-purple-500 pl-6 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Playtests 2-4</span>
              <span className="text-sm text-black/60">Iteration Phase</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Iterative Refinement</h3>
            <p className="text-base md:text-lg text-black leading-relaxed mb-3">
              Through multiple playtests, we systematically improved the game:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-black leading-relaxed ml-4 mb-3">
              <li><strong>Control Improvements:</strong> Refined loop detection algorithms and added visual trail effects for better feedback</li>
              <li><strong>Difficulty Balancing:</strong> Adjusted rat spawn rates and movement speeds to create a satisfying difficulty curve</li>
              <li><strong>Visual Polish:</strong> Enhanced particle effects and animations to make successful loops feel rewarding</li>
              <li><strong>Onboarding:</strong> Added tutorial hints to teach players effective loop strategies</li>
            </ul>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-3">
              <p className="text-sm text-purple-800 font-semibold mb-1">Key Insight:</p>
              <p className="text-sm text-purple-700">Small adjustments to detection sensitivity and visual feedback dramatically improved player satisfaction.</p>
            </div>
          </div>

          {/* Final Playtests */}
          <div className="border-l-4 border-orange-500 pl-6 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Playtests 5-6</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Polish & Submission</h3>
            <p className="text-base md:text-lg text-black leading-relaxed mb-3">
              Final playtests focused on polish and ensuring the game was ready for GMTK 2025 submission. 
              Players found the controls intuitive, the difficulty curve engaging, and the core loop 
              satisfying. Feedback confirmed that the stylus mechanics felt natural and the arcade 
              gameplay was compelling. The game achieved its goal of demonstrating innovative control 
              schemes in arcade games.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-3">
              <p className="text-sm text-orange-800 font-semibold mb-1">Key Insight:</p>
              <p className="text-sm text-orange-700">The iterative process transformed a frustrating prototype into a polished game that ranked #722 out of 9,605 entries.</p>
            </div>
          </div>

          {/* Final State */}
          <div className="border-l-4 border-emerald-500 pl-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Final State</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">GMTK 2025 Submission</h3>
            <p className="text-base md:text-lg text-black leading-relaxed">
              The final version successfully demonstrates how stylus technology can enhance arcade gameplay. 
              Players can create satisfying loops with intuitive controls, experience a well-balanced 
              difficulty curve, and enjoy polished visual feedback. The game was submitted to GMTK 2025 
              and ranked #722 out of 9,605 entries, achieving recognition for its innovative control scheme 
              and engaging arcade mechanics.
            </p>
          </div>
        </div>

        {/* Playtest Image Placeholder */}
        <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 mt-6 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
            <p className="text-black/50 text-lg">Playtesting session documentation</p>
          </div>
        </div>
      </div>

      {/* External Links */}
      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <a 
          href="https://lwcoding.itch.io/aw-rats" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>Play Aw, Rats! on itch.io</span>
        </a>
        <a 
          href="https://github.com/LWCoding/aw-rats" 
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
