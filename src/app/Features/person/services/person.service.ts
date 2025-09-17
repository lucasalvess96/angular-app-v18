import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Paginacao } from '../../../shared/models/paginacao';
import { ExcecaoService } from '../../../shared/services/exception/excecao.service';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly baseUrl: string = 'http://localhost:8080/person-v3';

  private readonly httpClient = inject(HttpClient);

  private readonly exececaoService = inject(ExcecaoService);

  create(person: Person): Observable<Person> {
    return this.httpClient.post<Person>(`${this.baseUrl}/create`, person).pipe(
      retry(2),
      catchError((error) => this.exececaoService.handleError(error)),
    );
  }

  list(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(`${this.baseUrl}/list`).pipe(
      retry(2),
      catchError((error) => this.exececaoService.handleError(error)),
    );
  }

  pagination(params: HttpParams): Observable<Paginacao<Person>> {
    return this.httpClient
      .get<Paginacao<Person>>(`${this.baseUrl}/pagination`, { params })
      .pipe(retry(2), catchError(this.exececaoService.handleError));
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
    return this.httpClient
      .get<Person[]>(`${this.baseUrl}/search/list?name=${name}`)
      .pipe(retry(2), catchError(this.exececaoService.handleError));
  }

  searchPagination(name: string, params: HttpParams): Observable<Paginacao<Person>> {
    return this.httpClient
      .get<Paginacao<Person>>(`${this.baseUrl}/search/pagination?name=${name}`, { params })
      .pipe(retry(2), catchError(this.exececaoService.handleError));
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete/${id}`).pipe(
      retry(2),
      catchError((error) => this.exececaoService.handleError(error)),
    );
  }
}
