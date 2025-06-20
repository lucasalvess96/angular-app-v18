import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Paginacao } from '../../../shared/models/paginacao';
import { ExcecaoService } from '../../../shared/services/exception/excecao.service';
import { Cozinha } from '../models/cozinha';

@Injectable({
  providedIn: 'root',
})
export class CozinhaService {
  private readonly baseUrl = 'http://localhost:8080/cozinha';

  private readonly httpClient = inject(HttpClient);

  private readonly exececaoService = inject(ExcecaoService);

  list(params: HttpParams): Observable<Paginacao<Cozinha>> {
    return this.httpClient
      .get<Paginacao<Cozinha>>(`${this.baseUrl}/pagination`, { params })
      .pipe(retry(2), catchError(this.exececaoService.handleError));
  }

  search(name: string): Observable<Cozinha[]> {
    return this.httpClient
      .get<Cozinha[]>(`${this.baseUrl}/search?nome=${name}`)
      .pipe(retry(2), catchError(this.exececaoService.handleError));
  }
}
