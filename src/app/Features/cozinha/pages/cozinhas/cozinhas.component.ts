import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
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

  loading: boolean = false;

  private readonly cozinhaService = inject(CozinhaService);

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Cozinha>([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.list();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  filter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
