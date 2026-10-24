import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { materialModules } from '../../angular-material/material-modules';
import { PaginationState } from '../../models/pagination-state.model';
import { TableColumn } from '../../models/table-column.model';
import { createInitialPaginationState } from '../../utils/pagination.utils';

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [CommonModule, materialModules],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T extends object = Record<string, unknown>> {
  @Input() dataSource: T[] = [];
  @Input() columnHeaders: Record<string, string> = {};
  @Input() displayedColumns: string[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions?: TemplateRef<{ $implicit: T }>;
  @Input() paginationControl: PaginationState = createInitialPaginationState();
  @Input() customTemplates: Record<string, TemplateRef<{ $implicit: T }>> = {};
  @Input() sortActive = '';
  @Input() sortDirection: Sort['direction'] = '';

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<Sort>();

  get tableColumns(): TableColumn[] {
    return this.columns.length
      ? this.columns
      : this.displayedColumns.map((key) => ({
          key,
          header: this.columnHeaders[key] || key,
          sortable: key !== 'acoes',
        }));
  }
  get columnKeys(): string[] {
    return this.tableColumns.map((column) => column.key);
  }

  trackColumn(_index: number, column: TableColumn): string {
    return column.key;
  }

  cellValue(row: T, key: string): unknown {
    return row[key as keyof T];
  }

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }

  onSortChange(event: Sort): void {
    this.sortChange.emit(event);
  }
}
