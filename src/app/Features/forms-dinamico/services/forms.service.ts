import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { ExcecaoService } from '../../../shared/services/exception/excecao.service';
import { Forms } from '../models/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  private readonly baseUrl = 'http://localhost:8080/persoon';

  private readonly httpClient = inject(HttpClient);

  private readonly excecaoService = inject(ExcecaoService);

  create(forms: Forms): Observable<Forms> {
    return this.httpClient.post<Forms>(`${this.baseUrl}/create`, forms).pipe(
      retry(2),
      catchError((error) => this.excecaoService.handleError(error)),
    );
  }
}
