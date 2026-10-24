import { PaginationState } from './pagination-state.model';

export interface PaginatedListViewModel<T> {
  items: T[];
  pagination: PaginationState;
  sortActive: string;
  sortDirection: 'asc' | 'desc' | '';
  loading: boolean;
  error: string | null;
}
