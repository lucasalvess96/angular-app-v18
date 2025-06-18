import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OauthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly oauthService = inject(OauthService);
  private readonly router = inject(Router);

  canActivate(): boolean {
    const isAuthenticated = this.oauthService.isLoggedIn();

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
