import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AUTH_CONFIG, OauthService, safeReturnUrl } from 'security-auth-ui';
import { materialModules } from '../../../../shared/angular-material/material-modules';

const RETURN_URL_KEY = 'redirectAfterLogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, materialModules, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly auth = inject(OauthService);
  private readonly config = inject(AUTH_CONFIG);

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly destroyRef = inject(DestroyRef);

  readonly checkingSession = signal(true);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem(RETURN_URL_KEY);

    this.auth
      .isLoggedIn()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (authenticated) => {
          if (authenticated) {
            const destination = this.returnUrl();
            sessionStorage.removeItem(RETURN_URL_KEY);
            void this.router.navigateByUrl(destination, { replaceUrl: true });
          } else {
            this.checkingSession.set(false);
          }
        },
        error: () => {
          this.checkingSession.set(false);
          this.errorMessage.set('Não foi possível verificar sua sessão. Confira se a API está disponível.');
        },
      });
  }

  loginWithGoogle(): void {
    sessionStorage.setItem(RETURN_URL_KEY, this.returnUrl());
    this.auth.loginWithGoogle();
  }

  private returnUrl(): string {
    const candidate = this.route.snapshot.queryParamMap.get('returnUrl') ?? sessionStorage.getItem(RETURN_URL_KEY);
    return safeReturnUrl(candidate, this.config);
  }
}
