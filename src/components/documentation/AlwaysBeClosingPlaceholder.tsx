import Image from 'next/image';

export default function AlwaysBeClosingPlaceholder() {
  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black/80 leading-relaxed">
          Always Be Closing is an interactive sales training simulation used in Stanford&apos;s STRAMGT351.
          A refreshed case-study style page with clips and insights is coming soon. In the meantime,
          here&apos;s a quick snapshot of what the experience covers.
        </p>
      </div>

      <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100">
        <Image
          src="/images/abc-preview.png"
          alt="Always Be Closing preview"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
          priority
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[
          { title: 'Simulated CRM Workflows', description: 'Practice discovery, objection handling, and qualification with branching outcomes.' },
          { title: 'Analytics Dashboard', description: 'Track call quality, deal health, and coaching opportunities for each scenario.' },
          { title: 'Team Delivery', description: 'Deployed as a classroom-ready web build for rapid onboarding and demos.' },
        ].map((item) => (
          <div key={item.title} className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black">{item.title}</h3>
            <p className="mt-2 text-sm text-black/70 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-blue-900">
        A richer walk-through with updated assets, sample scripts, and curriculum notes will be published here soon.
      </div>
    </div>
  );
}

