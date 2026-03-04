import Image from 'next/image';

export default function ImmersifyVRDocumentation() {
  return (
    <div className="space-y-12">
      <div className="space-y-8">
        {/* Lead */}
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed">
            <b>ImmersifyVR</b> is a virtual reality startup designing a product that motivates exercise in older adults. So far, we've built three in-game experiences and ran in-person playtests with 30+ older adults across three retirement homes in California.
          </p>
          <p className="text-base md:text-lg text-black leading-relaxed mt-4">
            ImmersifyVR initially started as a project that I managed for <a href="https://www.lettuce.build/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline font-medium">LettuceBuild</a> (a coaching program for younger students to develop entrepreneurial and technical skills). After going through the needfinding, prototyping, and iteration process, it became clear that there was a market for what we were developing, transforming into a fully-fledged startup managed by a team of four student developers.
          </p>
        </div>
      </div>

      {/* Context image */}
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
          <Image
            src="/images/chateaubobvisit.JPG"
            alt="ImmersifyVR — Team with senior playtester at Chateau Cupertino"
            width={800}
            height={450}
            className="w-full h-auto block"
          />
        </div>
        <p className="text-sm text-black/70 text-center mt-3">
          ImmersifyVR team with senior playtester at Chateau Cupertino
        </p>
      </div>

      {/* Section: Product and mission */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Product and mission
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          The game is built in Unity (C#) to create an immersive environment that makes daily exercise appealing and achievable for older adults. <b>Spatial audio, visual feedback, and gamification</b> turn working out into an engaging activity, with real-time guidance that adapts to the user&apos;s level. Exercises in the application are designed to be accessible to older adults with limited mobility.
        </p>
        <div className="max-w-2xl mx-auto mt-6">
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
            <Image
              src="/images/immersifyvr.png"
              alt="Preview of ImmersifyVR swimming scene"
              width={1024}
              height={768}
              className="w-full h-auto block"
            />
          </div>
          <p className="text-sm text-black/70 text-center mt-3">
            Preview of ImmersifyVR swimming scene
          </p>
        </div>
      </section>

      {/* Section: Playtesting with older adults */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Design process: playtesting with 30+ older adults
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          We ran in-person playtests with <b>30+ older adults across three retirement homes</b>. This feedback drove simpler onboarding, clearer in-VR instructions, and exercise ranges that felt both safe and motivating. It also has informed our development of new activities; at first, we believed that older adults preferred more relaxed activities, but the playtests revealed that many older adults preferred excitement.
        </p>
        <div className="max-w-3xl mx-auto mt-6">
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
            <Image
              src="/images/chateaulucasattentive.JPG"
              alt="Lucas post-interviewing with a senior playtester at Chateau Cupertino"
              width={1200}
              height={600}
              className="w-full h-auto block"
            />
          </div>
          <p className="text-sm text-black/70 text-center mt-3">
            Post-interviewing with a senior playtester at Chateau Cupertino
          </p>
        </div>
      </section>

      {/* Section: B2B and public presence */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Business model and public presence: immersifyvr.org
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          Beyond the VR build, we designed a <b>in-person personal-trainer model for retirement communities and senior centers</b>. I helped develop the public site at <a href="https://www.immersifyvr.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline font-medium">immersifyvr.org</a>; most of my work was in guiding the team in creating a public-facing presence to get in touch with partners.
        </p>
        <div className="max-w-3xl mx-auto mt-6">
          <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
            <Image
              src="/images/immersifyvrwebsite.png"
              alt="immersifyvr.org website preview"
              width={1200}
              height={600}
              className="w-full h-auto block"
            />
          </div>
          <p className="text-sm text-black/70 text-center mt-3">
            immersifyvr.org website preview
          </p>
        </div>
      </section>
    </div>
  );
}
