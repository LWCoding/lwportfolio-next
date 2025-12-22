import Image from 'next/image';

export default function AttackOnAtlizPlaceholder() {
  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black/80 leading-relaxed">
          Attack on Atliz is a top-down shooter game created for Wonderjam 4. Destroy enemy ships, 
          get XP, and unlock upgrades as you progress through challenging levels. A detailed case 
          study page with gameplay footage, design insights, and development process is coming soon.
        </p>
      </div>

      <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100">
          <p className="text-black/50 text-lg">Gameplay preview coming soon</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[
          { title: 'Top-Down Shooter', description: 'Engaging combat mechanics with smooth controls and satisfying enemy destruction.' },
          { title: 'Progression System', description: 'Earn XP and unlock powerful upgrades to enhance your ship\'s capabilities.' },
          { title: 'Wonderjam 2024', description: 'Ranked #2 out of 25 entries in Wonderjam 4 game jam competition.' },
        ].map((item) => (
          <div key={item.title} className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black">{item.title}</h3>
            <p className="mt-2 text-sm text-black/70 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-blue-900">
        A comprehensive walkthrough with gameplay videos, design documentation, and development insights will be published here soon.
      </div>
    </div>
  );
}

