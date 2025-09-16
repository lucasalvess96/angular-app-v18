import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExcecaoService {
  private readonly router = inject(Router);

  private readonly toastService = inject(ToastrService);

  public handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      this.toastService.warning('falha ao se conectar com o servidor');
    } else {
      this.toastService.error(error.error.message);
    }
    this.router.navigate(['/person-home/person']);

    throw new Error('Não foi possivél se conectar ao backend');
  }
}
