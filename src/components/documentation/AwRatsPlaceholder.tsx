import Image from 'next/image';

export default function AwRatsPlaceholder() {
  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black/80 leading-relaxed">
          Aw, Rats! is an arcade game created for GMTK 2025 where you use new stylus technology 
          to loop rats before they eat all of your cheese. A detailed case study page with gameplay 
          footage, design insights, and development process is coming soon.
        </p>
      </div>

      <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
          <p className="text-black/50 text-lg">Gameplay preview coming soon</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[
          { title: 'Stylus Technology', description: 'Innovative touch controls that make looping rats intuitive and engaging.' },
          { title: 'Arcade Gameplay', description: 'Fast-paced action where timing and strategy are key to protecting your cheese.' },
          { title: 'GMTK 2025 Entry', description: 'Ranked #722 out of 9,605 entries in the Game Maker\'s Toolkit game jam.' },
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

