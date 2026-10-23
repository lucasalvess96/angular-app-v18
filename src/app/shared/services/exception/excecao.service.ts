import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExcecaoService {
  private readonly toastService = inject(ToastrService);

  public handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      this.toastService.warning('falha ao se conectar com o servidor');
    } else {
      this.toastService.error(error.error?.message ?? 'Não foi possível concluir a solicitação ao servidor');
    }

    return throwError(() => error);
  }
}
