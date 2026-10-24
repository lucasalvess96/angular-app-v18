import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { PageResponse } from '../../../shared/models/page-response.model';
import { ExcecaoService } from '../../../shared/services/exception/excecao.service';
import { Person } from '../models/person';
import { PersonQuery } from '../models/person-query.model';
import { toPageRequestHttpParams } from '../../../shared/utils/pagination.utils';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly baseUrl: string = '/api/person-v3';

  private readonly httpClient = inject(HttpClient);

  private readonly exececaoService = inject(ExcecaoService);

  create(person: Person): Observable<Person> {
    return this.httpClient.post<Person>(`${this.baseUrl}/create`, person).pipe(
      retry(2),
      catchError((error) => this.exececaoService.handleError(error)),
    );
  }

  list(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(`${this.baseUrl}/list`).pipe(retry(2));
  }

  getPersons(query: PersonQuery): Observable<PageResponse<Person>> {
    const params = toPageRequestHttpParams(query);
    return query.name.trim() ? this.searchPagination(query.name.trim(), params) : this.pagination(params);
  }

  pagination(params: HttpParams): Observable<PageResponse<Person>> {
    return this.httpClient.get<PageResponse<Person>>(`${this.baseUrl}/pagination`, { params }).pipe(retry(2));
  }

  detail(id: number): Observable<Person> {
    return this.httpClient.get<Person>(`${this.baseUrl}/detail/${id}`).pipe(
      retry(2),
      catchError((error) => this.exececaoService.handleError(error)),
    );
  }

  update(person: Person): Observable<Person> {
    return this.httpClient.put<Person>(`${this.baseUrl}/update/${person.id}`, person).pipe(
      retry(2),
      catchError((error) => this.exececaoService.handleError(error)),
    );
  }

  searchList(name: string): Observable<Person[]> {
    return this.httpClient.get<Person[]>(`${this.baseUrl}/search/list?name=${name}`).pipe(retry(2));
  }

  searchPagination(name: string, params: HttpParams): Observable<PageResponse<Person>> {
    return this.httpClient.get<PageResponse<Person>>(`${this.baseUrl}/search/pagination`, { params: params.set('name', name) }).pipe(retry(2));
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete/${id}`).pipe(
      retry(2),
      catchError((error) => this.exececaoService.handleError(error)),
    );
  }
}
