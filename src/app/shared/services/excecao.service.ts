import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExcecaoService {
  constructor() {}

  public handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      alert('falha ao se conectar com o servidor');
    } else {
      alert('erro interno no servidor');
    }
    throw new Error('Não foi possivél se conectar ao backend');
  }
}
