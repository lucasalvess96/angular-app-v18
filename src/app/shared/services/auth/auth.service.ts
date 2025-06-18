import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OauthService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      return !this.isTokenExpired(token);
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  private isTokenExpired(token: string): boolean {
    try {
      const ONE_SECOND = 1000;
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));

      const expirationDate = payload.exp * ONE_SECOND;
      const currentTime = Date.now();

      return currentTime >= expirationDate;
    } catch (e) {
      console.error('Token inválido ou malformado:', e);
      return true;
    }
  }
}
