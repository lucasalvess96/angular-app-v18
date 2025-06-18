import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiUrl = req.url.startsWith('http://localhost:8080');
    const token = localStorage.getItem('token');

    if (token && isApiUrl) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
