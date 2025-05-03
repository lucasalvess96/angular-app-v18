import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { PaginationControl, SortOrder } from '../../models/controlePaginacao';
import { Cozinha } from '../../models/cozinha';
import { Paginacao } from '../../models/paginacao';
import { CozinhaService } from '../../services/cozinha.service';

export const PAGINATION_DEFAULT_ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];
export const PAGINATION_DEFAULT_SIZE = 10;
export const PAGINATION_DEFAULT_PAGE = 0;

@Component({
  selector: 'app-cozinhas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule],
  templateUrl: './cozinhas.component.html',
  styleUrl: './cozinhas.component.scss',
})
export class CozinhasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome'];
  dataSource!: MatTableDataSource<Cozinha>;
  dataSource$!: Observable<Paginacao>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value: number = 50;
  loading: boolean = false;

  paginationControl = this.getDefaultPaginationControl();

  private readonly cozinhaService = inject(CozinhaService);

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Cozinha>([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.list();
  }

  list(): void {
    this.loading = true;

    const { page, size, sortProperty, sortOrder } = this.paginationControl;
    let params = new HttpParams().set('size', size.toString()).set('page', page.toString());

    if (sortProperty) {
      params = params.set('sort', `${sortProperty},${sortOrder}`);
    }

    this.cozinhaService
      .list(params)
      .pipe(
        tap({
          next: (response: Paginacao) => {
            this.loading = false;
            this.dataSource.data = response.content;
            this.paginationControl = {
              ...this.paginationControl,
              totalElements: response.totalElements,
            };
          },
        }),
      )
      .subscribe();
  }

  onPageChange(event: PageEvent): void {
    console.log(event);
    this.paginationControl.page = event.pageIndex;
    this.paginationControl.size = event.pageSize;
    this.list();
  }

  onSortChange(sort: Sort): void {
    this.paginationControl.sortProperty = sort.active;
    this.paginationControl.sortOrder = sort.direction as SortOrder;
    this.list();
  }

  private getDefaultPaginationControl() {
    return {
      itemsPerPageOptions: PAGINATION_DEFAULT_ITEMS_PER_PAGE_OPTIONS,
      size: PAGINATION_DEFAULT_SIZE,
      page: PAGINATION_DEFAULT_PAGE,
    } as PaginationControl;
  }
}
