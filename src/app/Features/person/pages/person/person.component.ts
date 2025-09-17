import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, delay, finalize, map, Observable, switchMap } from 'rxjs';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { SpinnerComponentComponent } from '../../../../shared/components/spinner-component/spinner-component.component';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule, SpinnerComponentComponent],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
})
export class PersonComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'age', 'cpf', 'actions'];
  dataSource!: MatTableDataSource<Person>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  persons$!: Observable<MatTableDataSource<Person>>;

  loading: boolean = false;

  TIME_DELAY = 1000;

  filterInput = new BehaviorSubject<string>('');

  private readonly personService = inject(PersonService);
  private readonly toastService = inject(ToastrService);
  private readonly dialog = inject(MatDialog);

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.createDataSource();
  }

  createDataSource(): void {
    this.loading = true;
    this.persons$ = this.filterInput.pipe(
      delay(this.TIME_DELAY),
      switchMap((term: string) => {
        const request$ = term.trim() ? this.personService.searchList(term) : this.personService.list();
        return request$.pipe(
          map((persons: Person[]) => {
            const tableData = new MatTableDataSource(persons);
            tableData.paginator = this.paginator;
            tableData.sort = this.sort;
            return tableData;
          }),
          finalize(() => (this.loading = false)),
        );
      }),
      takeUntilDestroyed(this.destroyRef),
    );
    this.filterInput.next('');
  }

  applyFilter(value: string): void {
    this.loading = true;
    this.filterInput.next(value.trim());
  }

  clearFilter(input: HTMLInputElement): void {
    input.value = '';
    this.loading = true;
    this.filterInput.next('');
  }

  delete(id: number): void {
    this.personService.delete(id).subscribe(() => {
      this.toastService.success('Cadastro excluído com sucesso!');
      this.createDataSource();
    });
  }

  openDialogConfirm(id: number): void {
    this.dialog
      .open(DialogConfirmComponent, {
        width: '30vw',
        disableClose: true,
        data: { title: 'Confirmar exclusão', message: 'deletar' },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.delete(id);
        }
      });
  }
}
