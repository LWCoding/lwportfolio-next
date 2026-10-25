/**
 * Experiments listed on the hidden /playground page. Nothing else on the site links here.
 */
export interface PlaygroundProject {
  slug: string;
  title: string;
  description: string;
  /** Accent color for the card's doodle and underline. */
  color: string;
  /** Screenshot of the experiment, saved under /public/images/playground. */
  previewImage: string;
  createdAt: string;
}

export const PLAYGROUND_PROJECTS: PlaygroundProject[] = [
  {
    slug: "axis-quiver",
    title: "Axis Quiver",
    description:
      "Build a quiver of axes, drop your objects onto them, and flip through every 2x2 matrix they can form. It flags correlations, empty quadrants, and pile-ups so you can spot the framing worth exploring.",
    color: "#15803d",
    previewImage: "/images/playground/axis-quiver.png",
    createdAt: "Oct 2026",
  },
  {
    slug: "a-journey-through-rhythm",
    title: "A Journey Through Rhythm",
    description:
      "An interactive museum of Japanese rhythm-game controllers, from pop'n music to maimai. Press, step, drum, scratch, and spin each one to see how its inputs come alive on screen.",
    color: "#db2777",
    previewImage: "/images/playground/a-journey-through-rhythm.png",
    createdAt: "Oct 2026",
  },
];
