import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Paginacao } from '../../../shared/models/paginacao';
import { ExcecaoService } from '../../../shared/services/exception/excecao.service';
import { Restaurante } from '../models/restaurante';

@Injectable({
  providedIn: 'root',
})
export class RestauranteService {
  private readonly baseUrl = 'http://localhost:8080/restaurante';

  private readonly httpClient = inject(HttpClient);

  private readonly exececaoService = inject(ExcecaoService);

  list(params: HttpParams): Observable<Paginacao<Restaurante>> {
    return this.httpClient.get<Paginacao<Restaurante>>(`${this.baseUrl}/pagination`, { params }).pipe(
      retry(2),
      catchError((error) => this.exececaoService.handleError(error)),
    );
  }

  search(name: string): Observable<Restaurante[]> {
    return this.httpClient
      .get<Restaurante[]>(`${this.baseUrl}/search?nome=${name}`)
      .pipe(retry(2), catchError(this.exececaoService.handleError));
  }

  detail(id: number): Observable<Restaurante> {
    return this.httpClient.get<Restaurante>(`${this.baseUrl}/detail/${id}`).pipe(
      retry(2),
      catchError((error) => this.exececaoService.handleError(error)),
    );
  }
}
