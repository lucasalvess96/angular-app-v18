import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { materialModules } from '../../../../shared/angular-material/material-modules';
import { SpinnerComponentComponent } from '../../../../shared/components/spinner-component/spinner-component.component';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule, SpinnerComponentComponent],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
})
export class PersonComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'age', 'cpf', 'actions'];
  dataSource!: MatTableDataSource<Person>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  persons$!: Observable<MatTableDataSource<Person>>;

  loading: boolean = false;

  TIME_DELAY = 1000;

  filterInput = new BehaviorSubject<string>('');

  private destroy$ = new Subject<void>();

  private readonly personService = inject(PersonService);

  ngOnInit(): void {
    // this.list();
    // this.searchList();

    this.persons$ = this.filterInput.pipe(
      debounceTime(this.TIME_DELAY),
      distinctUntilChanged(),
      tap(() => (this.loading = true)),
      switchMap((term) => (term ? this.personService.searchList(term) : this.personService.list())),
      map((persons) => {
        const ds = new MatTableDataSource(persons);
        ds.paginator = this.paginator;
        ds.sort = this.sort;
        return ds;
      }),
      tap(() => (this.loading = false)),
      takeUntil(this.destroy$),
    );
  }

  // list(): void {
  //   this.loading = true;
  //   this.persons$ = this.personService.list().pipe(
  //     delay(this.TIME_DELAY),
  //     tap((response: Person[]) => {
  //       this.dataSource = new MatTableDataSource(response);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     }),
  //     finalize(() => (this.loading = false)),
  //   );
  // }

  // searchList(): void {
  //   this.filterInput
  //     .pipe(
  //       debounceTime(this.TIME_DELAY),
  //       distinctUntilChanged(),
  //       tap(() => (this.loading = true)),
  //       switchMap((term: string) => (term ? this.personService.searchList(term) : this.personService.list())),
  //       tap((response: Person[]) => {
  //         this.dataSource = new MatTableDataSource(response);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //       }),
  //       finalize(() => (this.loading = false)),
  //     )
  //     .subscribe();
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.filterInput.next(filterValue);
  }

  edit(row: Person) {
    console.log(row);
  }

  delete(id: number) {
    console.log(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
