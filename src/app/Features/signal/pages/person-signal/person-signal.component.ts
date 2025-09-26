import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { combineLatest, finalize, map, Observable, switchMap, tap } from 'rxjs';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { SpinnerComponentComponent } from '../../../../shared/components/spinner-component/spinner-component.component';
import { TableComponentComponent } from '../../../../shared/components/table-component/table-component.component';
import { buildPaginationParams, getDefaultPaginationControl } from '../../../../shared/constants/pagination';
import { PaginationControl } from '../../../../shared/models/controlePaginacao';
import { Paginacao } from '../../../../shared/models/paginacao';
import { CpfMaskPipe } from '../../../../shared/pipes/cpf/cpf-mask.pipe';
import { Person } from '../../../person/models/person';
import { PersonService } from '../../../person/services/person.service';

@Component({
  selector: 'app-person-signal',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    materialModules,
    CommonModule,
    TableComponentComponent,
    SpinnerComponentComponent,
    CpfMaskPipe,
  ],
  templateUrl: './person-signal.component.html',
  styleUrl: './person-signal.component.scss',
})
export class PersonSignalComponent {
  displayedColumns: string[] = ['id', 'name', 'age', 'cpf', 'acoes'];

  paginationControl = signal(getDefaultPaginationControl());
  paginationChange = signal(0);

  searchTerm = signal('');

  loading = signal(false);

  message = 'Carregando informações...';

  private readonly personService = inject(PersonService);

  dataSource = toSignal(
    combineLatest([toObservable(this.searchTerm), toObservable(this.paginationChange)]).pipe(
      switchMap(([term, _]) => {
        this.loading.set(true);
        return term.trim() ? this.searchPagination(term) : this.fetchPagination();
      }),
    ),
    { initialValue: [] as Person[] },
  );

  fetchPagination(): Observable<Person[]> {
    return this.personService.pagination(buildPaginationParams(this.paginationControl())).pipe(
      tap((response: Paginacao<Person>) => {
        this.paginationControl.update((pagination: PaginationControl) => ({
          ...pagination,
          totalElements: response.totalElements,
        }));
      }),
      map((response: Paginacao<Person>) => response.content),
      finalize(() => this.loading.set(false)),
    );
  }

  onPageChange(event: PageEvent): void {
    this.paginationControl.update((pagination: PaginationControl) => ({
      ...pagination,
      page: event.pageIndex,
      size: event.pageSize,
    }));
    this.paginationChange.update((number: number) => number + 1);
  }

  onSizeChange(size: number): void {
    this.paginationControl.update((pagination: PaginationControl) => ({ ...pagination, size, page: 0 }));
    this.paginationChange.update((number: number) => number + 1);
  }

  onSortChange(event: Sort): void {
    this.paginationControl.update((pagination: PaginationControl) => ({
      ...pagination,
      sort: event.active,
      direction: event.direction || 'asc',
    }));
    this.paginationChange.update((number: number) => number + 1);
  }

  //pagination filter
  searchPagination(term: string): Observable<Person[]> {
    return this.personService.searchPagination(term, buildPaginationParams(this.paginationControl())).pipe(
      tap((response: Paginacao<Person>) => {
        this.paginationControl.update((pagination: PaginationControl) => ({
          ...pagination,
          totalElements: response.totalElements,
        }));
      }),
      map((response: Paginacao<Person>) => response.content),
      finalize(() => this.loading.set(false)),
    );
  }
  applyFilter(value: string): void {
    this.searchTerm.set(value.trim());
    this.paginationControl.update((pagination: PaginationControl) => ({ ...pagination, page: 0 }));
    this.paginationChange.update((number: number) => number + 1);
  }

  clearFilter(input: HTMLInputElement): void {
    input.value = '';
    this.searchTerm.set('');
    this.paginationControl.update((pagination: PaginationControl) => ({ ...pagination, page: 0 }));
    this.paginationChange.update((number: number) => number + 1);
  }
}
