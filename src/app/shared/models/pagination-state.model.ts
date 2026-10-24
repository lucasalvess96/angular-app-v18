/** Display values; page, size and totals are supplied by the server response. */
export interface PaginationState {
  page: number;
  size: number;
  totalElements: number;
  itemsPerPageOptions: number[];
}
