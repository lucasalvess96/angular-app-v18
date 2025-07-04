import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { parseBrDate } from '../../../../shared/constants/formatar-datas';
import { buildPaginationParams, getDefaultPaginationControl } from '../../../../shared/constants/pagination';
import { Paginacao } from '../../../../shared/models/paginacao';
import { Restaurante } from '../../models/restaurante';
import { RestauranteService } from '../../services/restaurante.service';

@Component({
  selector: 'app-restaurantes',
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
  templateUrl: './restaurantes.component.html',
  styleUrl: './restaurantes.component.scss',
})
export class RestaurantesComponent {
  columnHeaders: { [key: string]: string } = {
    nome: 'nome',
    taxaFrete: 'Taxa do Frete',
    ativo: 'Ativo',
    dataCadastro: 'Data Cadastro',
    dataAtualizacao: 'Data Atualização',
    acoes: 'Ações',
  };
  displayedColumns: string[] = ['id', 'nome', 'taxaFrete', 'ativo', 'dataCadastro', 'dataAtualizacao', 'acoes'];

  dataSource$!: Observable<Restaurante[]>;

  paginationControl = getDefaultPaginationControl();
  paginationChange$ = new BehaviorSubject<void>(undefined);

  searchControl = new FormControl('');
  searchTerm$ = new BehaviorSubject<string>('');

  loading = false;

  message = 'Carregando informações...';

  formatDate = parseBrDate;

  LOAD_DELAY = 400;

  private readonly restauranteService = inject(RestauranteService);

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(this.LOAD_DELAY), distinctUntilChanged()).subscribe((term) => {
      this.searchTerm$.next(term ?? '');
    });

    this.dataSource$ = this.createDataSource();
  }

  createDataSource(): Observable<Restaurante[]> {
    return combineLatest([this.paginationChange$, this.searchTerm$]).pipe(
      switchMap(([_, term]) => {
        finalize(() => (this.loading = false));
        return (term.trim() ? this.restauranteService.search(term) : this.fetchRestaurante()).pipe(
          finalize(() => (this.loading = false)),
        );
      }),
    );
  }

  fetchRestaurante(): Observable<Restaurante[]> {
    return this.restauranteService.list(buildPaginationParams(this.paginationControl)).pipe(
      tap((response: Paginacao<Restaurante>) => {
        this.paginationControl.totalElements = response.totalElements;
      }),
      map((response: Paginacao<Restaurante>) => response.content),
    );
  }
}
