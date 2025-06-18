import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExcecaoService {
  constructor(private readonly location: Location, private readonly router: Router) {}

  public handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      alert('falha ao se conectar com o servidor');
    } else {
      alert('erro interno no servidor');
    }

    if (history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['../home']);
    }

    throw new Error('Não foi possivél se conectar ao backend');
  }
}
