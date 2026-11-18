import Image from 'next/image';

const RATS = [
  { name: 'Regular', src: '/images/awrats/rat-regular.png', health: 3, speed: 1.5, points: 10, note: 'The baseline rat.' },
  { name: 'Speedy', src: '/images/awrats/rat-speedy.png', health: 1, speed: 3.2, points: 30, note: 'Fragile, but hard to loop in time.' },
  { name: 'Zig-Zag', src: '/images/awrats/rat-zigzag.png', health: 2, speed: 2.8, points: 50, note: 'Scuttles side to side to dodge your line.' },
  { name: 'Chonk', src: '/images/awrats/rat-chonk.png', health: 7, speed: 0.8, points: 100, note: 'Slow, but takes many loops to capture.' },
  { name: 'Decoy', src: '/images/awrats/rat-decoy.png', health: 3, speed: 1.5, points: 30, note: 'Shows up in a group of three.' },
];

function Figure({ src, alt, caption, width, height }: { src: string; alt: string; caption: string; width: number; height: number }) {
  return (
    <div className="max-w-3xl mx-auto mt-6">
      <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80">
        <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto block" />
      </div>
      <p className="text-sm text-black/70 text-center mt-3">{caption}</p>
    </div>
  );
}

export default function AwRatsDocumentation() {
  return (
    <div className="space-y-12">
      {/* Lead */}
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          <b>Aw, Rats!</b> is an arcade game made in five days for the{' '}
          <a
            href="https://itch.io/jam/gmtk-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline font-medium"
          >
            GMTK Game Jam 2025
          </a>
          , whose theme was <b>Loop</b>. A fancy restaurant has a rat problem right before an important
          inspection. Rats swarm toward a wheel of cheese in the middle of the floor, and you protect it by
          drawing loops around them with a stylus.
        </p>
        <p className="text-base md:text-lg text-black leading-relaxed mt-4">
          It was built in Unity and C# by a team of three. Out of more than 9,500 entries, it placed{' '}
          <b>#205 in Audio</b> and <b>#364 in Enjoyment</b>.
        </p>
      </div>

      <Figure
        src="/images/awrats/title.jpg"
        alt="Aw, Rats! title art showing a worried chef holding a stylus, a rat, and a block of cheese"
        caption="Title art. All of the game's art was drawn by our team."
        width={1600}
        height={900}
      />

      {/* Section: Core mechanic */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Turning the theme into a verb
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          We wanted &quot;loop&quot; to be something the player physically <i>does</i>, not just a story
          element. So the only action in the game is drawing: <b>click and drag to draw a line, and close it into
          a loop around rats to damage them</b>. Every rat inside one loop gets hit, so the best plays catch
          several at once.
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          Two rules keep it from being too easy. Your line <b>snaps if it touches a rat</b>, so you have to draw
          around them, not through them. And drawing drains <b>cursor energy</b>, so you can&apos;t scribble
          endlessly. Energy was first drained by time spent drawing, but we switched it to distance drawn so that
          careful, efficient loops feel rewarded.
        </p>
        <Figure
          src="/images/awrats/gameplay.jpg"
          alt="Gameplay: rats approach a wheel of cheese in the center of a wooden floor, with a score counter and a cursor energy bar"
          caption="Rats close in on the cheese. Score is at the top, and cursor energy is at the bottom."
          width={1521}
          height={853}
        />
      </section>

      {/* Section: How loops are detected */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          How a loop is detected
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          Players don&apos;t draw perfect circles, so loop detection had to be forgiving. While you draw, the game
          records points along your path and checks a few things every frame:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-base md:text-lg text-black/90 leading-relaxed">
          <li>
            <b>Is the shape closed?</b> The loop counts as soon as your cursor comes back near <i>any</i> earlier
            point on the line, not just where you started. This makes figure-eights and lopsided loops work.
          </li>
          <li>
            <b>Who is inside?</b> The points become a polygon, and a point-in-polygon test finds every rat inside
            it. Each one takes damage.
          </li>
          <li>
            <b>Did the line hit a rat?</b> Each segment of the line is checked against every rat. If any segment
            touches one, the line animates as it breaks apart.
          </li>
          <li>
            <b>Is the line too long?</b> The oldest points are trimmed off, so you can&apos;t trap the whole
            screen in one giant loop.
          </li>
        </ul>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-3">
          Once a loop lands, it fades out, and a new line starts right from your cursor. That way you can keep
          your finger down and chain loops together.
        </p>
      </section>

      {/* Section: Rats */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          A rat for every strategy
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          Each rat type pushes back on a different part of the drawing skill: speed, precision, patience, or
          picking your targets. Tougher rats are worth more points.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {RATS.map((rat) => (
            <div key={rat.name} className="flex flex-col items-center text-center rounded-xl border border-slate-200/80 p-4">
              <div className="h-24 flex items-center justify-center">
                <Image src={rat.src} alt={`${rat.name} rat sprite`} width={96} height={96} className="max-h-24 w-auto object-contain" />
              </div>
              <p className="font-bold text-black mt-2">{rat.name}</p>
              <p className="text-xs text-black/60 mt-1">
                {rat.health} HP · {rat.speed} speed · {rat.points} pts
              </p>
              <p className="text-sm text-black/80 mt-2 leading-snug">{rat.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Progression */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Waves and upgrades
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          The game runs in waves. After each wave, you&apos;re paid for the rats you caught and can spend the money
          at the <b>Upgrade Station</b>. There, you can raise your maximum energy, make drawing use less energy, or
          make each loop do more damage. After the hand-made waves run out, the game switches to an endless mode
          that sends more rats at once.
        </p>
        <Figure
          src="/images/awrats/upgrades.jpg"
          alt="Upgrade Station screen styled like a blueprint, with three upgrade slots and their costs"
          caption="The blueprint-style Upgrade Station between waves."
          width={1524}
          height={852}
        />
      </section>

      {/* Section: Feel and polish */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Polish in a five-day jam
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          We had the core mechanic playable on day one, so most of the jam went into <b>game feel</b>: unique
          sounds for each rat type, a capture animation, rats that run off with a slice of cheese when they reach
          it, a tutorial scene, and music for every screen. Players who rated the game called out the sound and the
          feel of drawing loops, which matched the high Audio and Enjoyment ranks.
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          They also pointed out real issues: drawing loops on a laptop trackpad is hard, and the upgrade button is
          easy to miss. Those two are what I&apos;d fix first in a post-jam update.
        </p>
      </section>
    </div>
  );
}
