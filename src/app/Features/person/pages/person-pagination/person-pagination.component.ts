import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { SpinnerComponentComponent } from '../../../../shared/components/spinner-component/spinner-component.component';
import { TableComponent } from '../../../../shared/components/table-component/table.component';
import { TableColumn } from '../../../../shared/models/table-column.model';
import { PaginatedListController } from '../../../../shared/pagination/paginated-list.controller';
import { CpfMaskPipe } from '../../../../shared/pipes/cpf/cpf-mask.pipe';
import { createInitialPageRequest } from '../../../../shared/utils/pagination.utils';
import { Person } from '../../models/person';
import { PersonQuery } from '../../models/person-query.model';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-pagination',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, materialModules, CpfMaskPipe, TableComponent, SpinnerComponentComponent],
  templateUrl: './person-pagination.component.html',
  styleUrl: './person-pagination.component.scss',
})
export class PersonPaginationComponent {
  readonly columns: TableColumn[] = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Nome', sortable: true },
    { key: 'age', header: 'Idade', sortable: true },
    { key: 'cpf', header: 'CPF', sortable: true },
    { key: 'acoes', header: 'Ações', sortable: false },
  ];
  readonly message = 'Carregando informações...';
  private readonly personService = inject(PersonService);

  private readonly listing = new PaginatedListController<Person, PersonQuery>({
    initialQuery: { ...createInitialPageRequest(), name: '' },
    load: (query) => this.personService.getPersons(query),
    errorMessage: 'Não foi possível carregar os dados. Tente novamente.',
  });

  readonly viewModel$ = this.listing.viewModel$;

  onPageChange(event: PageEvent): void {
    this.listing.changePage(event.pageIndex, event.pageSize);
  }

  onSortChange(event: Sort): void {
    if (!this.columns.some((column) => column.sortable && (column.sortProperty || column.key) === event.active)) return;
    this.listing.changeSort(event.active, event.direction);
  }

  onSearch(term: string): void {
    this.listing.updateQuery({ name: term.trim(), page: 0 });
  }

  onClearSearch(): void {
    this.onSearch('');
  }
}
