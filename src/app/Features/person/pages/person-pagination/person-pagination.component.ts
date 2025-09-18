import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BehaviorSubject, combineLatest, finalize, map, Observable, switchMap, tap } from 'rxjs';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { SpinnerComponentComponent } from '../../../../shared/components/spinner-component/spinner-component.component';
import { TableComponentComponent } from '../../../../shared/components/table-component/table-component.component';
import { buildPaginationParams, getDefaultPaginationControl } from '../../../../shared/constants/pagination';
import { Paginacao } from '../../../../shared/models/paginacao';
import { CpfMaskPipe } from '../../../../shared/pipes/cpf/cpf-mask.pipe';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-pagination',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    materialModules,
    CommonModule,
    ReactiveFormsModule,
    CpfMaskPipe,
    TableComponentComponent,
    SpinnerComponentComponent,
  ],
  templateUrl: './person-pagination.component.html',
  styleUrl: './person-pagination.component.scss',
})
export class PersonPaginationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'age', 'cpf', 'acoes'];
  dataSource$!: Observable<Person[]>;

  paginationControl = getDefaultPaginationControl();
  paginationChange$ = new BehaviorSubject<void>(undefined);

  searchTerm$ = new BehaviorSubject<string>('');

  loading = false;

  message = 'Carregando informações...';

  private readonly personService = inject(PersonService);

  ngOnInit(): void {
    this.dataSource$ = this.createDataSource();
  }

  createDataSource(): Observable<Person[]> {
    return combineLatest([this.paginationChange$, this.searchTerm$]).pipe(
      switchMap(([_, term]) => {
        tap(() => (this.loading = true));
        return (term.trim() ? this.searchPagination(term) : this.fetchPagination()).pipe(
          finalize(() => (this.loading = false)),
        );
      }),
    );
  }

  fetchPagination(): Observable<Person[]> {
    return this.personService.pagination(buildPaginationParams(this.paginationControl)).pipe(
      tap((response: Paginacao<Person>) => {
        this.paginationControl.totalElements = response.totalElements;
      }),
      map((response: Paginacao<Person>) => response.content),
    );
  }

  //  pagination filter
  searchPagination(term: string): Observable<Person[]> {
    return this.personService.searchPagination(term, buildPaginationParams(this.paginationControl)).pipe(
      tap((response: Paginacao<Person>) => {
        this.paginationControl.totalElements = response.totalElements;
      }),
      map((response: Paginacao<Person>) => response.content),
    );
  }

  applyFilter(term: string): void {
    this.searchTerm$.next(term.trim());
    this.paginationChange$.next();
  }

  clearFilter(): void {
    this.searchTerm$.next('');
    this.paginationChange$.next();
  }
}
