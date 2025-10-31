import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableHarness } from '@angular/material/table/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { Paginacao } from '../../../../shared/models/paginacao';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';
import { PersonPaginationComponent } from './person-pagination.component';

fdescribe('PersonPaginationComponent', () => {
  let component: PersonPaginationComponent;
  let fixture: ComponentFixture<PersonPaginationComponent>;
  let harnessLoader: HarnessLoader;
  let service: PersonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonPaginationComponent, ToastrModule.forRoot(), BrowserAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
    service = TestBed.inject(PersonService);

    component.dataSource$ = of([
      { id: 1, name: 'John Doe', age: 30, cpf: '123.456.789-00' },
      { id: 2, name: 'Jane Smith', age: 25, cpf: '987.654.321-00' },
    ]);
  });

  const paginationResponse = {
    content: [
      { id: 1, name: 'John Doe', age: 30, cpf: '123.456.789-00' },
      { id: 2, name: 'Jane Smith', age: 25, cpf: '987.654.321-00' },
    ],
    size: 10,
    number: 0,
    totalElements: 42,
    totalPages: 5,
  } as Paginacao<Person>;

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load harness for a table', async () => {
    const table = await harnessLoader.getAllHarnesses(MatTableHarness);
    expect(table.length).toBe(1);
  });

  it('fetchPagination should fetch paginated data', (done: DoneFn) => {
    spyOn(service, 'pagination').and.returnValue(of(paginationResponse));

    component.fetchPagination().subscribe((result: Person[]) => {
      expect(result).toEqual(paginationResponse.content);
      expect(component.defaultPagination.totalElements).toBe(42);
      done();
    });
  });

  it('searchPagination should fetch filtered data', (done: DoneFn) => {
    const term = 'John';
    const spy = spyOn(service, 'searchPagination').and.returnValue(of(paginationResponse));

    component.searchPagination(term).subscribe((result: Person[]) => {
      expect(result).toEqual(paginationResponse.content);
      expect(component.defaultPagination.totalElements).toBe(42);
      expect(spy).toHaveBeenCalledWith(term, jasmine.any(Object));
      done();
    });
  });

  it('applyFilter should trim the term and emit on searchTerm$ and paginationChange$', () => {
    const raw = 'John';
    const trimmed = 'John';

    const searchSpy = spyOn(component.searchTerm$, 'next');
    const pageSpy = spyOn(component.paginationChange$, 'next');

    component.applyFilter(raw);

    expect(searchSpy).toHaveBeenCalledWith(trimmed);
    expect(pageSpy).toHaveBeenCalled();
  });

  it('clearFilter should clear input value and emit on searchTerm$ and paginationChange$', () => {
    const input = { value: 'John' } as HTMLInputElement;

    const searchSpy = spyOn(component.searchTerm$, 'next');
    const pageSpy = spyOn(component.paginationChange$, 'next');

    component.clearFilter(input);

    expect(input.value).toBe('');
    expect(searchSpy).toHaveBeenCalledWith('');
    expect(pageSpy).toHaveBeenCalled();
  });

  it('createDataSource should call searchPagination when term is provided', (done: DoneFn) => {
    const persons: Person[] = [{ id: 2, name: 'Jane Smith', age: 25, cpf: '987.654.321-00' }];

    const spy = spyOn(component, 'searchPagination').and.returnValue(of(persons));

    component.searchTerm$.next('Jane');
    component.paginationChange$.next();

    component.createDataSource().subscribe({
      next: (result) => {
        expect(spy).toHaveBeenCalledWith('Jane');
        expect(result).toEqual(persons);
        done();
      },
      error: () => fail('should not error'),
    });
  });
});
