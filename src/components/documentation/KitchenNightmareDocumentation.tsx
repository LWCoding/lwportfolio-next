import Image from 'next/image';

const DECOR = [
  { name: 'Bush', cost: 16, bonus: 2 },
  { name: 'Rose Bush', cost: 40, bonus: 4 },
  { name: 'Lamp', cost: 72, bonus: 8 },
  { name: 'Jukebox', cost: 200, bonus: 20 },
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

export default function KitchenNightmareDocumentation() {
  return (
    <div className="space-y-12">
      {/* Lead */}
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          <b>Kitchen Nightmare</b> is a restaurant management game made in four days for the{' '}
          <a
            href="https://itch.io/jam/gmtk-2024"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline font-medium"
          >
            GMTK Game Jam 2024
          </a>
          , whose theme was <b>Built to Scale</b>. You&apos;ve just bought a restaurant, and you need to cook
          enough omelets every day to hit your quota before you get fired. The catch is that the building gets
          bigger every night, so the kitchen you laid out yesterday never quite works today.
        </p>
        <p className="text-base md:text-lg text-black leading-relaxed mt-4">
          It was built in Unity and C# by the same core team that later made Aw, Rats!, with some extra help
          finding sound effects.
        </p>
      </div>

      <Figure
        src="/images/kitchennightmare/kitchen.jpg"
        alt="Top-down view of a small restaurant with rose bushes, two tables of customers, the chef, and two stoves"
        caption="An early-game restaurant. The red customer has been waiting way too long."
        width={670}
        height={562}
        className="max-w-xl"
      />

      {/* Section: Day/night loop */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Days for cooking, nights for building
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          We split the game into two halves that feel really different. During the <b>day</b>, you&apos;re the
          chef: you run between stoves, flip omelets, and carry them to hungry customers before they storm out.
          At <b>night</b>, you&apos;re the owner: you spend what you earned on new stoves, tables, and
          decorations, and drag them around a floor plan to set up for tomorrow.
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          Each night, the restaurant grows by one tile on every side and the camera zooms out to fit it. More
          space means room for more customers, but your quota goes up with it, so you can never just coast.
        </p>
        <Figure
          src="/images/kitchennightmare/build.jpg"
          alt="Night-time build mode: an empty grid with furniture placed on it and a shop bar of items with prices"
          caption="Night mode. Buy furniture from the bar at the bottom and drag it onto the grid."
          width={1402}
          height={772}
        />
      </section>

      {/* Section: Customers */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Impatient customers
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          Customers walk in through the front door and use A* pathfinding to get to an open table, so your
          layout actually matters. If you box them in or put tables in awkward spots, they&apos;ll have a long walk
          (or no way in at all).
        </p>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-2">
          Tables figure out their own seats when you place them. A seat appears on every side that isn&apos;t
          blocked by a wall or other furniture, so a table in the middle of the room can fit four people but one
          in a corner only fits two. Once someone sits down, a timer starts. They get annoyed after 8 seconds,
          turn red after 13, and leave at 15 if you haven&apos;t fed them.
        </p>
        <Figure
          src="/images/kitchennightmare/service.jpg"
          alt="Busy day service with three stoves cooking, tables full of customers, a 4 PM clock, and a quota of $108"
          caption="Mid-afternoon rush. The sun clock in the corner counts down the day, and the quota is on the right."
          width={1386}
          height={765}
        />
      </section>

      {/* Section: Economy */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          Balancing the menu of upgrades
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          Every omelet you serve is worth $8. Stoves ($80) let you cook more at once, and tables ($40) let you seat
          more people. Decorations are the long-term investment: each one adds a bonus to <i>every</i> omelet you
          sell, as long as it stays in your restaurant.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {DECOR.map((item) => (
            <div key={item.name} className="rounded-xl border border-slate-200/80 p-4 text-center">
              <p className="font-bold text-black">{item.name}</p>
              <p className="text-sm text-black/70 mt-1">${item.cost}</p>
              <p className="text-sm text-green-700 font-medium mt-1">+${item.bonus} per omelet</p>
            </div>
          ))}
        </div>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-4">
          That jukebox turned out to be a problem. It more than triples what each omelet pays, and once you
          can afford a couple of them, the quota stops being a challenge. Players found that pretty quickly!
        </p>
      </section>

      {/* Section: Lessons */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 border-b border-slate-200 pb-2">
          What players taught us
        </h2>
        <p className="text-base md:text-lg text-black/90 leading-relaxed">
          People really liked the art, the music, and how addictive the cook-and-serve loop got. But the comments
          also surfaced bugs we didn&apos;t catch in four days:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-base md:text-lg text-black/90 leading-relaxed">
          <li>
            <b>You could block the front door.</b> Putting furniture in front of the entrance meant no customer
            could ever reach a table, which soft-locked the run.
          </li>
          <li>
            <b>Everyone picked the same table.</b> Customers took the first table with a free seat, so one table
            filled up while the others sat empty. Picking a random open table would spread them out.
          </li>
          <li>
            <b>The Ready button was hard to find</b> in some builds, and the audio needed a better mix.
          </li>
        </ul>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mt-3">
          We pushed a quality-of-life patch after the jam. The bigger lesson for me was that a building game
          needs to check that the level is still playable after every change the player makes.
        </p>
      </section>
    </div>
  );
}
