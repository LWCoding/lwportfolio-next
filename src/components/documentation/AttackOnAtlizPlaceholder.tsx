import Image from 'next/image';

export default function AttackOnAtlizPlaceholder() {
  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          Attack on Atliz is a top-down shooter game created for Wonderjam 4. Players control a ship 
          that must destroy waves of enemy vessels, earning XP to unlock powerful upgrades and progress 
          through increasingly challenging levels. The game combines fast-paced combat with strategic 
          upgrade choices, creating an engaging progression loop.
        </p>
      </div>

      {/* Gameplay Video/Image */}
      <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 mx-auto">
        <Image
          src="/images/attackonatliz-preview.png"
          alt="Attack on Atliz gameplay"
          fill
          className="object-cover"
        />
      </div>

      {/* Mission Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-black">Mission</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed">
            Attack on Atliz was designed to create a satisfying top-down shooter experience with meaningful 
            progression. The goal was to balance fast-paced action with strategic decision-making, allowing 
            players to customize their ship through an upgrade system that creates diverse playstyles. The 
            game aims to deliver the classic arcade shooter feel while incorporating modern progression 
            mechanics that keep players engaged.
          </p>
          <p className="text-base md:text-lg text-black leading-relaxed mt-4">
            Through careful balancing of enemy waves, upgrade costs, and player power scaling, the game 
            creates a satisfying difficulty curve that rewards both skill and strategic planning. Players 
            must decide when to invest in offense, defense, or utility upgrades, creating meaningful choices 
            that impact their playstyle and success.
          </p>
        </div>
      </div>

      {/* Evolution Through Playtests */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-black">Evolution Through Playtesting</h2>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed mb-6">
            Over the course of <strong>7 structured playtests</strong>, Attack on Atliz evolved from a 
            basic shooter prototype into a polished Wonderjam 4 entry. Each playtest revealed insights 
            about combat feel, progression balance, and player engagement that shaped the game's 
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
              The initial prototype featured basic shooting mechanics and a simple upgrade system. However, 
              combat felt sluggish, enemy patterns were too predictable, and the progression system lacked 
              meaningful choices. Players found the upgrade costs unbalanced, making some builds clearly 
              superior while others felt underpowered.
            </p>
          </div>

          {/* Playtest 1 */}
          <div className="border-l-4 border-green-500 pl-6 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Playtest 1</span>
              <span className="text-sm text-black/60">Combat Feel</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Combat Refinement</h3>
            <p className="text-base md:text-lg text-black leading-relaxed mb-3">
              The first playtest revealed that combat lacked impact and feedback. Bullets felt weak, 
              enemy destruction wasn't satisfying, and players couldn't tell when they were dealing 
              effective damage. This playtest established that <strong>juicy combat feedback</strong> 
              was essential for engagement.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-3">
              <p className="text-sm text-green-800 font-semibold mb-1">Key Insight:</p>
              <p className="text-sm text-green-700">Players need immediate visual and audio feedback to feel powerful and engaged in combat.</p>
            </div>
          </div>

          {/* Mid-Playtest Iterations */}
          <div className="border-l-4 border-purple-500 pl-6 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Playtests 2-5</span>
              <span className="text-sm text-black/60">Balance Phase</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Iterative Refinement</h3>
            <p className="text-base md:text-lg text-black leading-relaxed mb-3">
              Through multiple playtests, we systematically improved the game:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-black leading-relaxed ml-4 mb-3">
              <li><strong>Combat Polish:</strong> Added screen shake, particle effects, and satisfying sound design to enhance combat feel</li>
              <li><strong>Enemy Variety:</strong> Created diverse enemy patterns and behaviors to keep combat engaging</li>
              <li><strong>Progression Balance:</strong> Rebalanced upgrade costs and effects to create multiple viable build paths</li>
              <li><strong>Difficulty Curve:</strong> Adjusted enemy spawn rates and health scaling to create a satisfying challenge</li>
            </ul>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-3">
              <p className="text-sm text-purple-800 font-semibold mb-1">Key Insight:</p>
              <p className="text-sm text-purple-700">Balancing upgrades required extensive testing to ensure multiple playstyles felt viable and fun.</p>
            </div>
          </div>

          {/* Final Playtests */}
          <div className="border-l-4 border-orange-500 pl-6 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Playtests 6-7</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Polish & Submission</h3>
            <p className="text-base md:text-lg text-black leading-relaxed mb-3">
              Final playtests focused on polish and ensuring the game was ready for Wonderjam 4 submission. 
              Players found combat satisfying, progression meaningful, and the difficulty curve engaging. 
              Feedback confirmed that different upgrade paths felt viable and the core gameplay loop was 
              compelling. The game achieved its goal of delivering a polished top-down shooter experience.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-3">
              <p className="text-sm text-orange-800 font-semibold mb-1">Key Insight:</p>
              <p className="text-sm text-orange-700">The iterative process transformed a basic prototype into a polished game that ranked #2 out of 25 entries.</p>
            </div>
          </div>

          {/* Final State */}
          <div className="border-l-4 border-emerald-500 pl-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Final State</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Wonderjam 4 Submission</h3>
            <p className="text-base md:text-lg text-black leading-relaxed">
              The final version successfully delivers satisfying top-down shooter gameplay with meaningful 
              progression. Players can experience impactful combat, make strategic upgrade choices, and 
              enjoy a well-balanced difficulty curve. The game was submitted to Wonderjam 4 and ranked 
              #2 out of 25 entries, achieving recognition for its polished combat, engaging progression, 
              and overall game feel.
            </p>
          </div>
        </div>

        {/* Playtest Image Placeholder */}
        <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 mt-6 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100">
            <p className="text-black/50 text-lg">Playtesting session documentation</p>
          </div>
        </div>
      </div>

      {/* External Links */}
      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <a 
          href="https://lwcoding.itch.io/attack-on-atliz" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>Play Attack on Atliz on itch.io</span>
        </a>
        <a 
          href="https://github.com/LWCoding/attack-on-atliz" 
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
