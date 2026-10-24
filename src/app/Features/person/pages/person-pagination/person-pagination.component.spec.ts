import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { PageResponse } from '../../../../shared/models/page-response.model';
import { Person } from '../../models/person';
import { PersonPaginationComponent } from './person-pagination.component';

describe('PersonPaginationComponent', () => {
  let fixture: ComponentFixture<PersonPaginationComponent>;
  let component: PersonPaginationComponent;
  let http: HttpTestingController;
  const baseUrl = '/api/person-v3';
  const rows: Person[] = [{ id: 7, name: 'Maria', age: 30, cpf: '12345678900' }];
  const response = (overrides: Partial<PageResponse<Person>> = {}): PageResponse<Person> => ({
    content: rows, size: 10, number: 0, totalElements: 42, totalPages: 5, first: true, last: false, ...overrides,
  });
  function expectPage(filtered = false): TestRequest {
    return http.expectOne(req => req.url === baseUrl + (filtered ? '/search/pagination' : '/pagination'));
  }
  function loadInitial(): void { expectPage().flush(response()); fixture.detectChanges(); }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonPaginationComponent, NoopAnimationsModule, ToastrModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(PersonPaginationComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });
  afterEach(() => { fixture.destroy(); http.verify(); });

  it('preserves backend request parameters and displays its page metadata', async () => {
    const req = expectPage();
    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.params.get('size')).toBe('5');
    expect(req.request.params.get('sort')).toBe('id,desc');
    expect(fixture.nativeElement.querySelector('app-spinner-component mat-progress-spinner')).toBeTruthy();
    req.flush(response({ number: 1, size: 5 }));
    fixture.detectChanges();
    const paginator = await TestbedHarnessEnvironment.loader(fixture).getHarness(MatPaginatorHarness);
    expect(await paginator.getRangeLabel()).toContain('42');
    expect(await paginator.getPageSize()).toBe(5);
    expect(fixture.nativeElement.textContent).toContain('Maria');
    expect(fixture.nativeElement.querySelector('app-spinner-component mat-progress-spinner')).toBeNull();
    component.onSearch('Maria');
    const search = expectPage(true);
    expect(search.request.params.get('size')).toBe('5');
    search.flush(response());
  });

  it('searches once, resets the page and encodes reserved characters in names', () => {
    loadInitial();
    component.onPageChange({ pageIndex: 3, pageSize: 10, length: 42 });
    expectPage().flush(response({ number: 3, first: false }));
    component.onSearch('  Ana & Jo?o#  ');
    const req = expectPage(true);
    expect(req.request.params.get('name')).toBe('Ana & Jo?o#');
    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.url).toBe(baseUrl + '/search/pagination');
    req.flush(response());
    http.expectNone(req => req.url.startsWith(baseUrl));
    component.onSearch('Ana & Jo?o#');
    http.expectNone(req => req.url.startsWith(baseUrl));
  });

  it('clears the filter and returns to page zero with one request', () => {
    loadInitial();
    component.onSearch('Maria'); expectPage(true).flush(response());
    component.onPageChange({ pageIndex: 2, pageSize: 10, length: 42 });
    expectPage(true).flush(response({ number: 2 }));
    component.onClearSearch();
    const req = expectPage();
    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.params.has('name')).toBeFalse();
    req.flush(response());
  });

  it('sends sort to the server, resets page and omits cleared sorting', () => {
    loadInitial();
    component.onPageChange({ pageIndex: 2, pageSize: 10, length: 42 });
    expectPage().flush(response({ number: 2 }));
    component.onSortChange({ active: 'name', direction: 'asc' });
    const ascending = expectPage();
    expect(ascending.request.params.get('sort')).toBe('name,asc');
    expect(ascending.request.params.get('page')).toBe('0');
    ascending.flush(response());
    component.onSortChange({ active: 'name', direction: 'desc' });
    const descending = expectPage();
    expect(descending.request.params.get('sort')).toBe('name,desc');
    descending.flush(response());
    component.onSortChange({ active: 'name', direction: '' });
    const cleared = expectPage();
    expect(cleared.request.params.has('sort')).toBeFalse();
    cleared.flush(response());
    component.onSortChange({ active: 'acoes', direction: 'asc' });
    http.expectNone(req => req.url.startsWith(baseUrl));
  });

  it('wires next, previous, last, first and page size controls to server requests', async () => {
    loadInitial();
    const paginator = await TestbedHarnessEnvironment.loader(fixture).getHarness(MatPaginatorHarness);
    const operations: Array<[() => Promise<void>, number]> = [
      [() => paginator.goToNextPage(), 1], [() => paginator.goToPreviousPage(), 0],
      [() => paginator.goToLastPage(), 4], [() => paginator.goToFirstPage(), 0],
    ];
    for (const [navigate, page] of operations) {
      await navigate();
      const req = expectPage();
      expect(req.request.params.get('page')).toBe(String(page));
      req.flush(response({ number: page, first: page === 0, last: page === 4 }));
      fixture.detectChanges();
    }
    await paginator.setPageSize(20);
    const req = expectPage();
    expect(req.request.params.get('size')).toBe('20');
    req.flush(response({ size: 20, totalPages: 3 }));
  });

  it('cancels stale requests and renders server order without sorting locally', () => {
    const stale = expectPage();
    component.onSearch('Maria');
    expect(stale.cancelled).toBeTrue();
    const returned = [rows[0], { ...rows[0], id: 2, name: 'Ana' }];
    expectPage(true).flush(response({ content: returned }));
    fixture.detectChanges();
    const text: string = fixture.nativeElement.textContent;
    expect(text.indexOf('Maria')).toBeLessThan(text.indexOf('Ana'));
  });

  it('recovers after retries fail and allows retrying then searching again', () => {
    for (let attempt = 0; attempt < 3; attempt++) {
      expectPage().flush(null, { status: 500, statusText: 'Server error' });
    }
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeNull();
    component.onRetry(); expectPage().flush(response()); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
    component.onSearch('Maria'); expectPage(true).flush(response());
  });

  it('cancels the outstanding request when the view is destroyed', () => {
    const req = expectPage(); fixture.destroy(); expect(req.cancelled).toBeTrue();
  });
});
