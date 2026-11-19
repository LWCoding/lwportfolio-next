/** First-pill label(s) on /projects cards and homepage showcase (matches WorkItemCard styling). */
export type ListingPill = "For Work" | "For Fun" | "Teaching" | "Coursework" | "Side Project";

const DEFAULT_LISTING: ListingPill[] = ["For Work"];

/** Teaching roles get their own single "Teaching" badge instead of For Work / For Fun. */
const TEACHING_LISTING_PILLS: ListingPill[] = ["Teaching"];

/** Class projects: labeled honestly so they aren't mistaken for professional work. */
const COURSEWORK_LISTING_PILLS: ListingPill[] = ["Coursework"];

/** Independent / volunteer builds outside of a job or class. */
const SIDE_PROJECT_LISTING_PILLS: ListingPill[] = ["Side Project"];

export function getListingPillsForProject(projectId: string): ListingPill[] {
  switch (projectId) {
    case "cs42si":
    case "cs11si":
    case "cs247g-course-sl":
    case "cs377g-course-ta":
    case "code-in-place":
    case "stanford-splash":
      return TEACHING_LISTING_PILLS;
    case "cs144-mini-internet":
    case "cs148-graphics-engine":
    case "planet":
      return COURSEWORK_LISTING_PILLS;
    case "obscure-courses":
    case "malaysian-club-chicago":
      return SIDE_PROJECT_LISTING_PILLS;
    default:
      return DEFAULT_LISTING;
  }
}
