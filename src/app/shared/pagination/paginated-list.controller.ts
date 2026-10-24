import { BehaviorSubject, catchError, defer, map, Observable, of, shareReplay, startWith, switchMap } from 'rxjs';
import { PageRequest } from '../models/page-request.model';
import { PageResponse } from '../models/page-response.model';
import { PaginatedListViewModel } from '../models/PaginatedListView.model';
import { arePageQueriesEqual, createInitialPaginationState } from '../utils/pagination.utils';

export class PaginatedListController<T, Q extends PageRequest> {
  private query: Q;
  private readonly queryChanges: BehaviorSubject<Q>;
  private pagination = createInitialPaginationState();
  readonly viewModel$: Observable<PaginatedListViewModel<T>>;

  constructor(options: {
    initialQuery: Q;
    load: (query: Q) => Observable<PageResponse<T>>;
    errorMessage: string;
    queriesEqual?: (previous: Q, next: Q) => boolean;
  }) {
    this.query = { ...options.initialQuery };
    this.queryChanges = new BehaviorSubject(this.query);
    this.queriesEqual = options.queriesEqual ?? arePageQueriesEqual;
    this.viewModel$ = this.queryChanges.pipe(
      switchMap((query) =>
        defer(() => options.load(query)).pipe(
          map((response) => {
            this.query = { ...query, page: response.number, size: response.size };
            this.pagination = {
              ...this.pagination,
              page: response.number,
              size: response.size,
              totalElements: response.totalElements,
            };
            return this.createViewModel(query, { items: response.content });
          }),
          catchError(() => of(this.createViewModel(query, { error: options.errorMessage }))),
          startWith(this.createViewModel(query, { loading: true })),
        ),
      ),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  private readonly queriesEqual: (previous: Q, next: Q) => boolean;

  updateQuery(changes: Partial<Q>): void {
    const next = { ...this.query, ...changes };
    if (this.queriesEqual(this.query, next)) return;
    this.query = next;
    this.queryChanges.next(next);
  }

  changePage(page: number, size: number): void {
    this.updateQuery({ page, size } as Partial<Q>);
  }

  changeSort(property: string, direction: 'asc' | 'desc' | ''): void {
    this.updateQuery({ page: 0, sort: direction ? { property, direction } : undefined } as Partial<Q>);
  }

  private createViewModel(query: Q, changes: Partial<PaginatedListViewModel<T>>): PaginatedListViewModel<T> {
    return {
      items: [],
      pagination: this.pagination,
      sortActive: query.sort?.property || '',
      sortDirection: query.sort?.direction || '',
      loading: false,
      error: null,
      ...changes,
    };
  }
}
