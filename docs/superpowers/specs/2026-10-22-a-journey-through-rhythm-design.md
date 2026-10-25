# A Journey Through Rhythm — design

## Intent
A playground experiment: an interactive museum of Japanese rhythm-game controllers. Visitors poke at a faithful drawing of each controller and watch a simplified game screen react, so they discover each controller's affordances by guessing. No history or player-culture content for now.

## Goals
- One focal controller centred on the page, inside an arcade-cabinet frame: marquee with the game name, simplified screen above, controller below.
- Seven controllers, oldest first: pop'n music (1998), Dance Dance Revolution (1998), beatmania IIDX (1999), Taiko no Tatsujin (2001), jubeat (2008), Sound Voltex (2012), maimai (2012).
- Under each controller, only small text: `<year> · <name>`.
- Controllers look like the real hardware: correct shapes, proportions, layout, colours and details (bezels, screws, seams, knurling). Flat colours, no gradients. SVG so every part is pressable.
- Only interactive things: the controller and subtle left/right chevrons to switch controllers.
- Every input lights something on the screen; holding works; multi-touch works.

## Non-goals / anti-goals
- No score, songs, falling notes, menus, labels or instructions. Must not feel overwhelming.
- No history or culture copy (yet).

## Per-controller screens (builder's calls, approved in chat)
- pop'n music: 9 colour-matched lanes; press lights lane and pops at judgement line.
- DDR: 4 receptor arrows at top; stepping lights its arrow; jumps work.
- beatmania IIDX: red scratch lane + 7 white/blue lanes; dragging the turntable spins it and lights scratch.
- Taiko: horizontal lane with judgement circle; face = red don, rim = blue ka; mini drum shows side hit.
- jubeat: mirrored 4×4 grid; pressed panel flashes.
- Sound Voltex: 4 BT lanes, FX lights half track, knobs (endless spin) move laser cursors.
- maimai: round screen with 8 rim marks; each button lights its mark, ring pulses.

## Other calls
- Route `/playground/a-journey-through-rhythm`, no footer, same header style as Axis Quiver.
- Works on phones (controller scales to width).
- Playground card in the same style as Axis Quiver, with a screenshot preview.
