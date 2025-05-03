import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { materialModules } from '../../angular-material/material-modules';

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [CommonModule, materialModules],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.scss',
})
export class TableComponentComponent {
  @Input() dataSource: MatTableDataSource<any> | any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnHeaders: { [key: string]: string } = {};
  @Input() paginationControl!: {
    page: number;
    size: number;
    totalElements: number;
    itemsPerPageOptions?: number[];
  };

  @Output() sortChange = new EventEmitter<Sort>();
  @Output() pageChange = new EventEmitter<PageEvent>();
}
