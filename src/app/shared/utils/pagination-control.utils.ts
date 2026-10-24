import { HttpParams } from '@angular/common/http';
import { PaginationControl } from '../models/pagination-control.model';
import { createInitialPaginationState, toPageRequestHttpParams } from './pagination.utils';

export function createPaginationControl(): PaginationControl {
  return { ...createInitialPaginationState(), sortProperty: 'id', sortOrder: 'desc' };
}

export function toPaginationHttpParams(pagination: PaginationControl): HttpParams {
  return toPageRequestHttpParams({
    page: pagination.page, size: pagination.size,
    sort: pagination.sortProperty && pagination.sortOrder
      ? { property: pagination.sortProperty, direction: pagination.sortOrder } : undefined,
  });
}
