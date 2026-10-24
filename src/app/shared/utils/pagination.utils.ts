import { HttpParams } from '@angular/common/http';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../constants/pagination.constants';
import { PageRequest } from '../models/page-request.model';
import { PaginationState } from '../models/pagination-state.model';

/** Compares pagination plus flat filter values; supply a custom comparator for nested filters. */
export function arePageQueriesEqual<Q extends PageRequest>(previous: Q, next: Q): boolean {
  const keys = new Set([...Object.keys(previous), ...Object.keys(next)]);
  return [...keys].every(key => key === 'sort'
    ? previous.sort?.property === next.sort?.property && previous.sort?.direction === next.sort?.direction
    : previous[key as keyof Q] === next[key as keyof Q]);
}

export function createInitialPageRequest(): PageRequest {
  return { page: DEFAULT_PAGE_INDEX, size: DEFAULT_PAGE_SIZE, sort: { property: 'id', direction: 'desc' } };
}

export function createInitialPaginationState(): PaginationState {
  return { page: DEFAULT_PAGE_INDEX, size: DEFAULT_PAGE_SIZE, totalElements: 0, itemsPerPageOptions: [...PAGE_SIZE_OPTIONS] };
}

export function toPageRequestHttpParams(request: PageRequest): HttpParams {
  let params = new HttpParams().set('size', request.size).set('page', request.page);
  if (request.sort) params = params.set('sort', request.sort.property + ',' + request.sort.direction);
  return params;
}
