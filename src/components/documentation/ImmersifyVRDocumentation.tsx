import Image from 'next/image';

export default function ImmersifyVRDocumentation() {
  return (
    <div className="space-y-12">
      {/* Lead */}
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          ImmersifyVR is a virtual reality game built in Unity with a clear mission: incentivize daily exercise in older adults. Using C#, Figma, Next.js, and Git, the project spans the full stack—from the headset experience to a B2B business model and a public-facing website. Here&apos;s how we went from concept to in-person playtests with 30+ older adults and a coordinated team of student developers.
        </p>
      </div>

      {/* Impact at a glance */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-5 text-center">
          <p className="text-2xl md:text-3xl font-bold text-slate-900">30+</p>
          <p className="text-sm text-slate-600 mt-1">Older adult playtesters</p>
        </div>
        <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-5 text-center">
          <p className="text-2xl md:text-3xl font-bold text-slate-900">3</p>
          <p className="text-sm text-slate-600 mt-1">Retirement home sites</p>
        </div>
        <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-5 text-center">
          <p className="text-2xl md:text-3xl font-bold text-slate-900">4</p>
          <p className="text-sm text-slate-600 mt-1">Student developers</p>
        </div>
        <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-5 text-center">
          <p className="text-2xl md:text-3xl font-bold text-slate-900">B2B</p>
          <p className="text-sm text-slate-600 mt-1">Business model &amp; site</p>
        </div>
      </div>

      {/* Product visual */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src="/images/immersifyvr.png"
              alt="ImmersifyVR exercise interface"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-black/70 text-center">
            VR exercise interface
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src="/images/immersifyvr.png"
              alt="ImmersifyVR user interaction design"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-black/70 text-center">
            User interaction design
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src="/images/immersifyvr.png"
              alt="ImmersifyVR exercise flow"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-black/70 text-center">
            Exercise flow and feedback
          </p>
        </div>
      </div>

      {/* Section: Product and mission */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Product and mission
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          The VR game is built in Unity (C#) to create an immersive environment that makes daily exercise appealing and achievable for older adults. The experience combines spatial audio, visual feedback, and gamification so that working out feels less like a chore and more like an engaging activity—with real-time guidance that adapts to the user&apos;s level. Figma was used to prototype flows and UI before implementation, keeping design and development aligned from the start.
        </p>
      </section>

      {/* Section: Playtesting with older adults */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Design process: playtesting with 30+ older adults across 3 retirement homes
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mb-4">
          To make sure the product actually worked for our audience, we ran in-person playtests with 30+ older adults across three retirement homes. Watching real users put on the headset, follow exercises, and react in the moment revealed what felt intuitive, what caused confusion, and where we needed to adjust difficulty or pacing. That direct feedback was irreplaceable—it pushed us to simplify onboarding, clarify in-VR instructions, and tune the exercise range so it felt both safe and motivating.
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          Synthesizing that user feedback with WHO guidelines for physical activity in older adults gave us an evidence-based framework for the exercise design. We didn&apos;t just build what felt right; we aligned the in-app exercises with recommendations for frequency, intensity, and type of activity, so the experience is both engaging and grounded in public health research.
        </p>
      </section>

      {/* Section: Team and version control */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Team coordination: Git and onboarding 4 student developers
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          As the team grew to four student developers, clear version control and workflow became critical. I managed Git for the project and coordinated guidelines so that everyone could onboard smoothly—branching, commits, pull requests, and code review practices that kept the codebase stable while moving fast. Setting those standards early made it easier to integrate new work, avoid merge conflicts, and maintain a single source of truth for the Unity project and related assets.
        </p>
      </section>

      {/* Section: B2B and public marketing */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          B2B model and public presence: immersifyvr.org
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mb-4">
          Beyond the VR build, we designed a B2B business model aimed at retirement communities, senior centers, and health programs. To support that, I designed and built a website for public marketing—viewable at <a href="https://www.immersifyvr.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline font-medium">immersifyvr.org</a>. The site (Next.js) explains the mission, the evidence behind the exercises, and the value for organizations, so potential partners can understand the product and get in touch. It&apos;s the public face of ImmersifyVR and a key part of how we communicate the project to employers, partners, and the broader community.
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          Together, the VR experience and the website represent full-stack ownership: from Unity and C# on the headset to Figma and Next.js for design and web, plus Git-driven collaboration and user research that keeps the product grounded in real feedback and WHO guidelines.
        </p>
      </section>

      {/* Closing */}
      <div className="rounded-xl bg-slate-100/80 border border-slate-200 px-5 py-6 md:px-6 md:py-7">
        <p className="text-base md:text-lg text-black leading-relaxed">
          ImmersifyVR is an example of human-centered design at scale: in-person playtesting with older adults, evidence-based exercise design, team coordination via Git, and a clear B2B story on the web. If you&apos;d like to hear more about the playtests, the tech stack, or the business model, I&apos;d be happy to share—reach out anytime.
        </p>
      </div>
    </div>
  );
}
