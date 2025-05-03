import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, of, switchMap, tap } from 'rxjs';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { SpinnerComponentComponent } from '../../../../shared/components/spinner-component/spinner-component.component';
import { TableComponentComponent } from '../../../../shared/components/table-component/table-component.component';
import { getDefaultPaginationControl } from '../../../../shared/constants/pagination';
import { SortOrder } from '../../models/controlePaginacao';
import { Cozinha } from '../../models/cozinha';
import { Paginacao } from '../../models/paginacao';
import { CozinhaService } from '../../services/cozinha.service';

@Component({
  selector: 'app-cozinhas',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    materialModules,
    CommonModule,
    ReactiveFormsModule,
    TableComponentComponent,
    SpinnerComponentComponent,
  ],
  templateUrl: './cozinhas.component.html',
  styleUrl: './cozinhas.component.scss',
})
export class CozinhasComponent implements OnInit {
  columnHeaders: { [key: string]: string } = { id: 'ID', nome: 'Nome' };
  displayedColumns: string[] = ['id', 'nome'];
  dataSource!: MatTableDataSource<Cozinha>;
  dataSource$!: Observable<Cozinha[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  paginationControl = getDefaultPaginationControl();
  paginationChange$ = new BehaviorSubject<void>(undefined);

  searchControl = new FormControl('');

  loading: boolean = false;

  private readonly cozinhaService = inject(CozinhaService);

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Cozinha>([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.list();
    this.filter();
  }

  list(): void {
    this.dataSource$ = this.paginationChange$.pipe(
      switchMap(() => this.cozinhaService.list(this.buildPaginationParams())),
      tap((response: Paginacao) => {
        this.paginationControl = {
          ...this.paginationControl,
          totalElements: response.totalElements,
        };
      }),
      map((response: Paginacao) => response.content),
    );
  }

  filter(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => {
          if (!term || term.trim() === '') {
            return this.dataSource$;
          }

          return this.cozinhaService.search(term);
        }),
      )
      .subscribe((result: Cozinha[]) => {
        this.dataSource$ = of(result);
      });
  }

  onPageChange(event: PageEvent): void {
    this.paginationControl.page = event.pageIndex;
    this.paginationControl.size = event.pageSize;
    this.paginationChange$.next();
  }

  onSortChange(sort: Sort): void {
    this.paginationControl.sortProperty = sort.active;
    this.paginationControl.sortOrder = sort.direction as SortOrder;
    this.paginationChange$.next();
  }

  private buildPaginationParams(): HttpParams {
    const { page, size, sortProperty, sortOrder } = this.paginationControl;

    let params = new HttpParams().set('size', size.toString()).set('page', page.toString());

    if (sortProperty) {
      params = params.set('sort', `${sortProperty},${sortOrder}`);
    }

    return params;
  }
}
