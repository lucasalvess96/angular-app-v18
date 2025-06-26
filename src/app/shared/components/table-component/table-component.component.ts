import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { materialModules } from '../../angular-material/material-modules';
import { PaginationControl, SortOrder } from '../../models/controlePaginacao';

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [CommonModule, materialModules],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.scss',
})
export class TableComponentComponent {
  @Input() dataSource: MatTableDataSource<any> | any[] = [];
  @Input() columnHeaders: { [key: string]: string } = {};
  @Input() displayedColumns: string[] = [];
  @Input() actions?: TemplateRef<any>;
  @Input() paginationControl!: PaginationControl;
  @Input() customTemplates: { [key: string]: TemplateRef<any> } = {};

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<Sort>();

  onPageChange(event: PageEvent): void {
    this.paginationControl.page = event.pageIndex;
    this.paginationControl.size = event.pageSize;
    this.pageChange.emit(event);
  }

  onSortChange(sort: Sort): void {
    this.paginationControl.sortProperty = sort.active;
    this.paginationControl.sortOrder = sort.direction as SortOrder;
    this.sortChange.emit(sort);
  }
}
