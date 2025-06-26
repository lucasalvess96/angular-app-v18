import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { SpinnerComponentComponent } from '../../../../shared/components/spinner-component/spinner-component.component';
import { TableComponentComponent } from '../../../../shared/components/table-component/table-component.component';
import { buildPaginationParams, getDefaultPaginationControl } from '../../../../shared/constants/pagination';
import { Paginacao } from '../../../../shared/models/paginacao';
import { Cozinha } from '../../models/cozinha';
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

  dataSource$!: Observable<Cozinha[]>;

  paginationControl = getDefaultPaginationControl();
  paginationChange$ = new BehaviorSubject<void>(undefined);

  searchControl = new FormControl('');
  searchTerm$ = new BehaviorSubject<string>('');

  loading = false;

  message = 'Carregando informações...';

  private readonly cozinhaService = inject(CozinhaService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  private readonly LOAD_DELAY = 400;

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(this.LOAD_DELAY), distinctUntilChanged()).subscribe((term) => {
      this.searchTerm$.next(term ?? '');
    });

    this.dataSource$ = this.createDataSource();
  }

  createDataSource(): Observable<Cozinha[]> {
    return combineLatest([this.paginationChange$, this.searchTerm$]).pipe(
      switchMap(([_, term]) => {
        this.loading = true;
        this.changeDetectorRef.detectChanges();
        return (term.trim() ? this.cozinhaService.search(term) : this.fetchCozinhas()).pipe(
          finalize(() => {
            this.loading = false;
            this.changeDetectorRef.detectChanges();
          }),
        );
      }),
    );
  }

  fetchCozinhas(): Observable<Cozinha[]> {
    return this.cozinhaService.list(buildPaginationParams(this.paginationControl)).pipe(
      tap((response: Paginacao<Cozinha>) => {
        this.paginationControl.totalElements = response.totalElements;
      }),
      map((response: Paginacao<Cozinha>) => response.content),
    );
  }
}
