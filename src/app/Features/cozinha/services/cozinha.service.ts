import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Cozinha } from '../models/cozinha';
import { Paginacao } from '../models/paginacao';

@Injectable({
  providedIn: 'root',
})
export class CozinhaService {
  private readonly baseUrl = 'http://localhost:8080/cozinha';

  private readonly httpClient = inject(HttpClient);

  list(params: HttpParams): Observable<Paginacao> {
    return this.httpClient
      .get<Paginacao>(`${this.baseUrl}/pagination`, { params })
      .pipe(retry(2), catchError(this.handleError));
  }

  search(name: string): Observable<Cozinha[]> {
    return this.httpClient
      .get<Cozinha[]>(`${this.baseUrl}/search?nome=${name}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      alert('falha ao se conectar com o servidor');
    } else {
      alert('erro interno no servidor');
    }
    throw new Error('Não foi possivél se conectar ao backend');
  }
}
