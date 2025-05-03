import { PaginationControl } from '../../features/cozinha/models/controlePaginacao';

export const PAGINATION_DEFAULT_ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];
export const PAGINATION_DEFAULT_SIZE = 10;
export const PAGINATION_DEFAULT_PAGE = 0;

export function getDefaultPaginationControl(): PaginationControl {
  return {
    itemsPerPageOptions: PAGINATION_DEFAULT_ITEMS_PER_PAGE_OPTIONS,
    size: PAGINATION_DEFAULT_SIZE,
    page: PAGINATION_DEFAULT_PAGE,
  } as PaginationControl;
}
