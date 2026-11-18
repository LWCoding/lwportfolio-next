import Image from 'next/image';

const PROTOTYPES = [
  { name: 'Founder Quilt', body: 'A wall of local founders’ faces to highlight underrepresented voices. It didn’t make the final cut.' },
  { name: 'We’re All Humans', body: 'A card game of personal questions that gets founders talking about who they are, not what they’re building.' },
  { name: 'Third Space', body: 'A cozy corner carved out of a busy startup office, so people have a reason to slow down.' },
];

const INSIGHTS = [
  { title: 'Third spaces deepen connection', body: 'People were happy to stop and engage with the space, usually in groups that already knew each other.' },
  { title: 'Smaller and cozier means more intimate', body: 'Conversations felt deeper in groups of two or three.' },
  { title: 'Personal topics go deep', body: 'When the questions were about the person rather than the startup, people opened up.' },
  { title: 'Food gets people in the door', body: 'Snacks drew people over, but once they were talking, the food stopped mattering.' },
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

export default function SerendipiTeaDocumentation() {
  return (
    <div className="space-y-12">
      {/* Lead */}
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          <b>Serendipi-Tea</b>{' '}is a pop-up card game café that helps startup founders connect as people
          instead of as pitches. We built it for founders in the{' '}
          <a
            href="https://startx.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline font-medium"
          >
            StartX
          </a>{' '}
          accelerator, turning a corner of their office into a cozy space with snacks, a photo wall, and a deck of
          conversation cards called <i>We&apos;re All Humans</i>.
        </p>
        <p className="text-base md:text-lg text-black leading-relaxed mt-4">
          This was a project for Design 121 at Stanford in Spring 2025, made with Josh Buenviaje and Lindsay
          McKinley.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Figure
          src="/images/serendipitea/before.jpg"
          alt="An empty office corner with green chairs and a small round table"
          caption="Before: an empty corner of the StartX office."
          width={1600}
          height={1200}
          className="w-full"
        />
        <Figure
          src="/images/serendipitea/after.jpg"
          alt="The same corner set up as Serendipi-Tea with lamps, drinks, a welcome sign, a connection wall, and the card game on the table"
          caption="After: Serendipi-Tea, ready for founders."
          width={1600}
          height={1200}
          className="w-full"
        />
      </div>

      {/* Section: Needfinding */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Every conversation felt like a pitch
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          We reached out to 17 people in startup culture and interviewed six founders, four from StartX and two
          from outside it. They ranged from people brand new to startups to seasoned pros, and we ended up
          grouping them into three kinds of founders: seasoned, underrepresented, and new-age.
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          We focused on <b>new StartX founders</b>. They were surrounded by other founders, but their environment
          didn&apos;t leave room for organic, serendipitous connection, so the average conversation ended up
          feeling transactional. In a space where every chat can turn into networking, genuine connection gets
          put on the back burner.
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          That led to our design question: <b>how might we promote serendipitous conversations between founders?</b>{' '}
          We wanted the relationships founders formed through StartX to actually last.
        </p>
      </section>

      {/* Section: Prototypes */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Three prototypes, one journey
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          We tested three ideas, then combined the best ones into a single experience. A founder would walk in,
          look around, grab a snack, sit down for the card game, take a photo, and head out.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {PROTOTYPES.map((p, i) => (
            <div key={p.name} className="rounded-xl border border-slate-200/80 p-4">
              <p className="text-xs font-bold text-black/50">#{i + 1}</p>
              <p className="font-bold text-black mt-1">{p.name}</p>
              <p className="text-sm text-black/80 mt-2 leading-snug">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {INSIGHTS.map((insight) => (
            <div key={insight.title}>
              <p className="font-bold text-black">{insight.title}</p>
              <p className="text-base text-black/80 mt-1 leading-relaxed">{insight.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Card game */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          We&apos;re All <s>Founders</s> Humans
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          The card game is the heart of the café. The deck is split into three levels, <b>Seed</b>,{' '}
          <b>Sprout</b>, and <b>Bloom</b>, that grow with the conversation. None of the questions are about
          your company. Instead, they ask things like &quot;What part of your culture or upbringing most shaped who
          you are?&quot; and &quot;What do you hope the world looks like in 100 years?&quot;
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          We designed the whole deck in Figma, including a box that crosses out &quot;founders&quot; and
          replaces it with &quot;humans,&quot; which pretty much sums up the whole project.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <Figure
            src="/images/serendipitea/cards.jpg"
            alt="Seed, Sprout, and Bloom cards spread across a wooden table around the We're All Humans card box"
            caption="The full deck, from Seed to Bloom."
            width={1600}
            height={2133}
            className="w-full"
          />
          <Figure
            src="/images/serendipitea/photo-station.jpg"
            alt="A side table with an instant camera, markers, tape, and a sign inviting people to take photos"
            caption="The photo station. Polaroids went up on the connection wall."
            width={1600}
            height={1200}
            className="w-full"
          />
        </div>
      </section>

      {/* Section: Results */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          What happened at the café
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          We ran the final version with small groups of two and three, and the conversations went way further than we
          expected. Groups talked about <b>love, death, politics, and their insecurities</b>, and we saw a lot of
          laughter, reflection, and surprise. The shortest session lasted 35 minutes and the longest went for 45,
          which is a long time for people who are usually rushing between meetings!
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          We also thought about how this could grow: starting with individual founders, expanding to the whole
          StartX space, and eventually the Stanford Research Park. Our business model had accelerators pay a
          monthly fee, and in return we&apos;d run the space, keep it stocked with snacks, and refresh the cards
          so founders always have something new to talk about.
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          Our closing line in the final presentation was &quot;Be real. Be vulnerable. Be human.&quot; It&apos;s
          still how I think about designing for connection: give people a comfortable place and a good question,
          and they&apos;ll do the rest.
        </p>
      </section>
    </div>
  );
}
