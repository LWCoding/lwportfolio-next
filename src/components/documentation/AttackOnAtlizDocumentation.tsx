import Image from 'next/image';

const ENEMIES = [
  { name: 'Bee', src: '/images/atliz/enemy-bee.png', health: 10, unlock: 'From the start', note: 'If you stay near one for too long, it sounds an alarm and calls in two more bees.' },
  { name: 'Beetle', src: '/images/atliz/enemy-beetle.png', health: 13, unlock: 'Level 3', note: 'Fast, but it stalls for a split second every time you hit it.' },
  { name: 'Star', src: '/images/atliz/enemy-star.png', health: 15, unlock: 'Level 5', note: 'Parks itself and fires bullets in all eight directions at once.' },
  { name: 'Bat', src: '/images/atliz/enemy-bat.png', health: 8, unlock: 'Level 7', note: 'The fastest ship. It only fires when it’s facing you, so stay out of its nose.' },
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

export default function AttackOnAtlizDocumentation() {
  return (
    <div className="space-y-12">
      {/* Lead */}
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          <b>Attack on Atliz</b>{' '}is a top-down space shooter made in ten days for{' '}
          <a
            href="https://itch.io/jam/wonderjam-4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline font-medium"
          >
            Wonderjam 4
          </a>
          . The planet Atliz has fallen, and you&apos;re the last survivor on a ship with a single turret. Fight
          off the enemy fleet, salvage what they drop, and turn that one turret into something scary.
        </p>
        <p className="text-base md:text-lg text-black leading-relaxed mt-4">
          This was my <b>first-ever game jam</b>. Silver and I made all of the art, code, and music as a team of
          two, and it placed <b>2nd overall</b>{' '}out of 25 entries and <b>#1 in Gameplay</b>.
        </p>
      </div>

      <Figure
        src="/images/atliz/combat.jpg"
        alt="Pixel-art space combat: the player's red ship surrounded by enemy ships near a red space station"
        caption="Your ship (center) takes on a mixed wave near the station walls."
        width={1317}
        height={826}
      />

      {/* Section: One weapon */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          One weapon, many ways to grow it
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          You never pick up a new gun. Instead, every enemy you destroy drops XP orbs, and each time you level up,
          you choose <b>one of three random upgrade cards</b>{' '}for your turret. There are six upgrades in total:
          faster shooting, farther firing, auto aim, a faster-swiveling barrel, heavier bullets, and explosive
          pellets that deal area damage.
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          Each level takes 40% more XP than the last, so early upgrades come quickly and later ones feel earned.
          Upgrades you&apos;ve maxed out stop showing up as choices, and once everything is maxed, your XP bar
          turns gold.
        </p>
        <Figure
          src="/images/atliz/upgrades.jpg"
          alt="Level-up screen with three upgrade cards: Heavier Bullets, Auto Aim, and Explosive Pellets"
          caption="Level up and pick one. Each card shows exactly which stat changes and by how much."
          width={1314}
          height={826}
        />
      </section>

      {/* Section: Enemies */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Enemies that ramp up with you
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          New enemy types only start spawning once you reach a certain level, so the fleet gets nastier as your
          turret gets stronger. Every enemy hunts you down with A* pathfinding around the station walls, but each
          one has its own trick.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {ENEMIES.map((enemy) => (
            <div key={enemy.name} className="flex flex-col items-center text-center rounded-xl border border-slate-200/80 p-4">
              <Image
                src={enemy.src}
                alt={`${enemy.name} enemy sprite`}
                width={80}
                height={80}
                className="w-20 h-20"
                style={{ imageRendering: 'pixelated' }}
              />
              <p className="font-bold text-black mt-2">{enemy.name}</p>
              <p className="text-xs text-black/60 mt-1">
                {enemy.health} HP · {enemy.unlock}
              </p>
              <p className="text-sm text-black/80 mt-2 leading-snug">{enemy.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Under the hood */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Keeping it smooth
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          With bullets, debris, and explosions everywhere, I didn&apos;t want the game to slow down in the
          browser. Enemies and explosion effects are <b>pooled</b>{' '}and reused instead of being created and
          destroyed over and over. Enemies that lose track of you for eight seconds quietly despawn back into the
          pool. Parts of the station are also destructible, so stray shots chip away at the walls around you.
        </p>
        <Figure
          src="/images/atliz/explosions.jpg"
          alt="Late-game combat at 12,000 points with debris and explosions around the player's ship"
          caption="Later in a run, with debris flying everywhere."
          width={1317}
          height={819}
        />
      </section>

      {/* Section: Feedback */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          What I&apos;d change
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          Players loved the random upgrade choices and the enemy designs. The most common complaint was that
          bumping into walls hurts you, which makes the tighter rooms frustrating. People also wanted to see more
          of the map around them (or a minimap) and weren&apos;t sure whether the game ever ends.
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          The floaty movement was on purpose, to make it feel like you&apos;re drifting in space, but I&apos;d
          drop the wall damage and widen the view if I came back to it. As a first jam, it taught me how much a
          simple loop of &quot;kill, level up, choose&quot; can carry a game.
        </p>
      </section>
    </div>
  );
}
