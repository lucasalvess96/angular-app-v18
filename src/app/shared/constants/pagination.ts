import { HttpParams } from '@angular/common/http';
import { PaginationControl } from '../models/controlePaginacao';

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

export function buildPaginationParams(pagination: PaginationControl): HttpParams {
  const { page, size, sortProperty, sortOrder } = pagination;

  let params = new HttpParams().set('size', size.toString()).set('page', page.toString());

  if (sortProperty) {
    params = params.set('sort', `${sortProperty},${sortOrder}`);
  }

  return params;
}
