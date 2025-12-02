/**
 * Utility functions for calculating newspaper-style grid layout properties
 */

export interface NewspaperGridItemProps {
  isFirstRow: boolean;
  isLastInRow: boolean;
  columnSpan: string;
  isLastRow: boolean;
  variant: 'white' | 'grey';
}

/**
 * Calculates newspaper grid layout properties for an item at a given index
 * @param index - The index of the item in the array
 * @param totalItems - The total number of items in the array
 * @returns Object containing layout properties
 */
export function calculateNewspaperGridProps(
  index: number,
  totalItems: number
): NewspaperGridItemProps {
  const variants: Array<'white' | 'grey'> = ['white', 'grey'];
  
  // For the simplified layout we now always show 2 cards per row on all breakpoints.
  // That means each card just spans a single grid column.
  const isFirstRow = index < 2;
  const isLastInRow = (index % 2) === 1;

  const columnSpan = 'col-span-1';

  const variant = variants[index % variants.length] as 'white' | 'grey';
  
  // Calculate if this is in the last row (2 items per row)
  const itemsPerRow = 2;
  const lastRowStartIndex = Math.floor((totalItems - 1) / itemsPerRow) * itemsPerRow;
  const isLastRow = index >= lastRowStartIndex;
  
  return {
    isFirstRow,
    isLastInRow,
    columnSpan,
    isLastRow,
    variant,
  };
}

