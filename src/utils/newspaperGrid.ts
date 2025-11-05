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
  
  // Determine which row this item is in
  // First 2 items: row 1 (2 columns)
  // Items 2+ (index 2+): row 2+ (3 columns each)
  const isFirstRow = index < 2;
  
  // Calculate if this is the last item in its row
  let isLastInRow = false;
  if (isFirstRow) {
    // First row: last item is at index 1
    isLastInRow = index === 1;
  } else {
    // Subsequent rows: 3 items per row
    const rowIndex = index - 2; // 0-based row index for rows after first
    const positionInRow = rowIndex % 3;
    isLastInRow = positionInRow === 2; // Last position in a 3-item row
  }
  
  // First row: each item spans 3 columns (6/2 = 3)
  // Subsequent rows: each item spans 2 columns (6/3 = 2)
  const columnSpan = isFirstRow 
    ? 'md:col-span-1 lg:col-span-3' 
    : 'md:col-span-1 lg:col-span-2';
  
  const variant = variants[index % variants.length] as 'white' | 'grey';
  
  // Calculate if this is in the last row
  const isLastRow = isFirstRow 
    ? false 
    : index >= totalItems - 3; // Last 3 items are in the last row
  
  return {
    isFirstRow,
    isLastInRow,
    columnSpan,
    isLastRow,
    variant,
  };
}

