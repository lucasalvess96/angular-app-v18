import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
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

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should create a person', () => {
    service.create(person).subscribe((response: Person) => expect(response).toEqual(person));

    const req = httpTestingController.expectOne(`${baseUrl}/create`);
    expect(req.request.method).toBe('POST');
    req.flush(person);
  });

  fit('should retry the request until success retry(2)', () => {
    let result: Person | undefined;

    service.create(person).subscribe((response: Person) => (result = response));

    const req1 = httpTestingController.expectOne(`${baseUrl}/create`);
    req1.flush({ message: 'err' }, { status: 500, statusText: 'Server Error' });

    const req2 = httpTestingController.expectOne(`${baseUrl}/create`);
    req2.flush({ message: 'err' }, { status: 500, statusText: 'Server Error' });

    const req3 = httpTestingController.expectOne(`${baseUrl}/create`);
    req3.flush(person, { status: 200, statusText: 'OK' });

    expect(result).toEqual(person);
  });
});
