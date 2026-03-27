/** First-pill label(s) on /projects cards and homepage showcase (matches WorkItemCard styling). */
export type ListingPill = "For Work" | "For Fun";

const DEFAULT_LISTING: ListingPill[] = ["For Work"];

/** CS courses span both work and playful teaching — show both badges. */
const COURSE_LISTING_PILLS: ListingPill[] = ["For Fun", "For Work"];

export function getListingPillsForProject(projectId: string): ListingPill[] {
  switch (projectId) {
    case "cs42si":
    case "cs11si":
      return COURSE_LISTING_PILLS;
    default:
      return DEFAULT_LISTING;
  }
}
