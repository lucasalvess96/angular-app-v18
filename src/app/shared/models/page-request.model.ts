export type SortDirection = 'asc' | 'desc';

export interface PageSort {
  property: string;
  direction: SortDirection;
}

/** Server page indexes are zero-based. */
export interface PageRequest {
  page: number;
  size: number;
  sort?: PageSort;
}
