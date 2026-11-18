import Image from 'next/image';

const STAGES = [
  {
    step: '1',
    title: 'Needfinding',
    body: 'We interviewed four college students and recent grads with different backgrounds and mental health histories. They coped with stress in very different ways, but almost all of them leaned on friends for support while rarely telling those friends when they were struggling. Most were also skeptical of formal mental health resources.',
  },
  {
    step: '2',
    title: 'Experience prototypes',
    body: 'We tested three ideas with real friend groups before designing anything. Sharing statuses in a group chat and taking turns planning hangouts both worked well. Swiping through old dormmates to reconnect did not: our participant got bored by the tenth name and said he only wanted to reconnect with a few people, not forty.',
  },
  {
    step: '3',
    title: 'Low-fi testing',
    body: 'We tested two copies of a paper prototype with four students. They loved seeing friends as planets and syncing their calendars, but icon-only buttons kept confusing them, and one tester looked for an "invite" button that didn’t exist. So we added labels, redesigned the friend page, and made text-only statuses easier.',
  },
  {
    step: '4',
    title: 'Med-fi & heuristic evaluation',
    body: 'We built a clickable Figma prototype, and three evaluators ran a heuristic evaluation on it, finding 42 usability issues. We made 13 revisions to address the 14 most severe ones before moving to code.',
  },
];

function Figure({ src, alt, caption, width, height, className = 'max-w-3xl' }: { src: string; alt: string; caption: string; width: number; height: number; className?: string }) {
  return (
    <div className={`${className} mx-auto mt-6`}>
      <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
        <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto block" />
      </div>
      <p className="text-sm text-black/70 text-center mt-3">{caption}</p>
    </div>
  );
}

export default function PlanetDocumentation() {
  return (
    <div className="space-y-12">
      {/* Lead */}
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          <b>Planet</b>{' '}is a mobile app that makes it easier to reach out to the friends you already have. Each
          friend shows up as a little planet whose face matches their mood, so you can tell at a glance who&apos;s
          having a rough day, who&apos;s free, and who might want company.
        </p>
        <p className="text-base md:text-lg text-black leading-relaxed mt-4">
          We made it in a team of four for{' '}
          <a
            href="https://hci.stanford.edu/courses/cs147/2024/au/projects/Technology-for-Mental-Health/Planet/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline font-medium"
          >
            CS147
          </a>
          , Stanford&apos;s intro to human-computer interaction course, in the Technology for Mental Health studio.
          Over ten weeks, we went from interviews all the way to a working React Native app.
        </p>
      </div>

      <Figure
        src="/images/planet/hifi-screens.png"
        alt="Three Planet app screens: a galaxy of friends drawn as planets, a friend's status page with a photo, and a friend's weekly busy times"
        caption="The final app: your galaxy of friends, a friend's status, and finding a time to hang out."
        width={1198}
        height={754}
      />

      {/* Section: Problem */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          The problem: reaching out feels like a burden
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          College is fast-paced and full of transitions, and it can feel isolating even when you have friends.
          In our interviews, people described reaching out as time-consuming and worried about being an
          inconvenience to the other person. That gets even harder when you&apos;re already in a bad headspace,
          which is exactly when reaching out matters most.
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          So instead of building another mental health resource (which most of our interviewees didn&apos;t trust
          anyway), we focused on the support system they already had: their friends. Our goal was to make sharing
          how you feel and making plans feel low-effort and low-pressure.
        </p>
        <Figure
          src="/images/planet/empathy-map.jpg"
          alt="Empathy map with sticky notes sorted into Says, Thinks, Does, and Feels quadrants"
          caption="An empathy map from one of our needfinding interviews."
          width={1600}
          height={902}
        />
      </section>

      {/* Section: Process */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          How Planet came into orbit
        </h2>
        <div className="space-y-6">
          {STAGES.map((stage) => (
            <div key={stage.step} className="flex gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full border-2 border-black/70 flex items-center justify-center font-bold text-black">
                {stage.step}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-black">{stage.title}</h3>
                <p className="text-base md:text-lg text-black/90 leading-relaxed mt-1">{stage.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Figure
            src="/images/planet/experience-prototype.jpg"
            alt="Group chat screenshots of friends texting each other updates about their day"
            caption="Experience prototype: friends texted status updates to a group chat for a day."
            width={1580}
            height={1354}
            className="w-full"
          />
          <Figure
            src="/images/planet/lofi.jpg"
            alt="Hand-drawn paper prototype screens of the Planet app laid out on a table"
            caption="Our paper prototype for low-fi testing."
            width={1458}
            height={1160}
            className="w-full"
          />
        </div>
      </section>

      {/* Section: What changed */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          What testing changed
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          A few of our biggest design decisions came straight out of feedback:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-base md:text-lg text-black/90 leading-relaxed">
          <li>
            <b>Every planet got a name and the same size.</b>{' '}Evaluators asked what would happen if they forgot what
            a friend&apos;s planet looked like, and whether bigger planets meant more important friends. Neither is a
            question you want people asking about their friends!
          </li>
          <li>
            <b>Scheduling became a quick ping.</b>{' '}People didn&apos;t realize the time blocks on a friend&apos;s
            schedule were tappable. We added a clear &quot;Plan&quot; button and swapped the messaging flow for a simple
            in-app notification, which fit our goal of making reaching out quick and easy.
          </li>
          <li>
            <b>We cut post visibility entirely.</b>{' '}Choosing who could see each status caused the most errors, like
            posting before setting visibility. We turned &quot;galaxies&quot; into a way to organize friends rather than
            a privacy setting, which also made the app feel less cliquey.
          </li>
        </ul>
        <Figure
          src="/images/planet/medfi.jpg"
          alt="Four medium-fidelity Figma screens: All Friends, James's Planet, Anya's Planet, and Set Your Status"
          caption="The med-fi prototype in Figma, before the heuristic evaluation."
          width={1458}
          height={706}
        />
      </section>

      {/* Section: Build */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Building it for real
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          For the hi-fi prototype, we built Planet in <b>React Native with Expo</b>, with <b>Supabase</b>{' '}as the
          database for users and statuses. You could check on your friends, share your own mood and status, and see when a friend was busy before sending them a hangout time. Everyone on the team did both design
          and development, so we were constantly going back and forth between Figma and code.
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          The biggest thing I took away was how much we learned before building anything. A day-long group chat
          told us more about whether people would share their feelings than any mockup could have.
        </p>
      </section>
    </div>
  );
}
