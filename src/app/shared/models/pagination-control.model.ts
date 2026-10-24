import { PaginationState } from './pagination-state.model';

/** Compatibility state for list pages not yet migrated to PageRequest. */
export interface PaginationControl extends PaginationState {
  sortProperty?: string;
  sortOrder?: SortOrder;
}

export type SortOrder = 'asc' | 'desc' | '';
