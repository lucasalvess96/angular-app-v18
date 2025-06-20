import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExcecaoService {
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  public handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      alert('falha ao se conectar com o servidor');
    } else {
      alert(error.error.message);
    }

    this.redirect();

    throw new Error('Não foi possivél se conectar ao backend');
  }

  private redirect(): void {
    if (history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['../welcome']);
    }
  }
}
