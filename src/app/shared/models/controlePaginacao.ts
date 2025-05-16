export interface PaginationControl {
  itemsPerPageOptions?: number[];
  size: number;
  page: number;
  totalElements: number;
  sortProperty?: string;
  sortOrder?: SortOrder;
}

export type SortOrder = 'asc' | 'desc' | '';
