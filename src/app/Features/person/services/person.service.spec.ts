import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpParams, provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { Paginacao } from '../../../shared/models/paginacao';
import { Person } from '../models/person';
import { PersonService } from './person.service';

describe('PersonService', () => {
  let service: PersonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PersonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  const baseUrl = 'http://localhost:8080/person-v3';
  const person = { id: 1, name: 'John Doe', age: 30, cpf: '123.456.789-00' } as Person;
  const persons: Person[] = [
    { id: 1, name: 'John Doe', age: 30, cpf: '123.456.789-00' },
    { id: 2, name: 'Jane Smith', age: 25, cpf: '987.654.321-00' },
  ];

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a person', () => {
    service.create(person).subscribe((response: Person) => expect(response).toEqual(person));

    const req = httpTestingController.expectOne(`${baseUrl}/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(person);
    req.flush(person);
  });

  it('should emit error when request fails after retries', (done: DoneFn) => {
    const errorResponse = { status: 500, statusText: 'Error saving information to the database' };

    service.create(person).subscribe({
      next: () => fail('expected to fail'),
      error: (error) => {
        expect(error).toBeTruthy();
        done();
      },
    });

    httpTestingController.expectOne(`${baseUrl}/create`).flush(null, errorResponse);
    httpTestingController.expectOne(`${baseUrl}/create`).flush(null, errorResponse);
    httpTestingController.expectOne(`${baseUrl}/create`).flush(null, errorResponse);
  });

  it('should fetch list of persons', () => {
    service.list().subscribe((response: Person[]) => expect(response).toEqual(persons));

    httpTestingController.expectOne(`${baseUrl}/list`).flush(persons);
  });

  it('should fetch person pagination successfully', () => {
    const paginationResponse = {
      content: persons,
      totalElements: 2,
      totalPages: 1,
      size: 10,
      number: 0,
    } as Paginacao<Person>;

    const params = new HttpParams();

    service.pagination(params).subscribe((response: Paginacao<Person>) => {
      expect(response).toEqual(paginationResponse);
      expect(response.content.length).toBe(2);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/pagination`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.keys().length).toBe(0);

    req.flush(paginationResponse);
  });
});
