/** First-pill label(s) on /projects cards and homepage showcase (matches WorkItemCard styling). */
export type ListingPill = "For Work" | "For Fun" | "Teaching";

const DEFAULT_LISTING: ListingPill[] = ["For Work"];

/** Teaching roles get their own single "Teaching" badge instead of For Work / For Fun. */
const TEACHING_LISTING_PILLS: ListingPill[] = ["Teaching"];

export function getListingPillsForProject(projectId: string): ListingPill[] {
  switch (projectId) {
    case "cs42si":
    case "cs11si":
    case "cs247g-course-sl":
    case "cs377g-course-ta":
    case "code-in-place":
    case "stanford-splash":
      return TEACHING_LISTING_PILLS;
    default:
      return DEFAULT_LISTING;
  }
}
