import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth-guard/authGuard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'welcome',
    loadComponent: () => import('./features/welcome/pages/welcome/welcome.component').then((c) => c.WelcomeComponent),
  },
  {
    path: 'angular-concepts',
    loadComponent: () =>
      import('./features/concepts-angular/pages/concepts/concepts.component').then((c) => c.ConceptsComponent),
  },
  {
    path: 'cozinhas',
    loadComponent: () =>
      import('./features/cozinha/pages/cozinhas/cozinhas.component').then((c) => c.CozinhasComponent),
    data: { preload: true },
  },
  {
    path: 'restaurantes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/restaurante/restaurante.routing').then((m) => m.default),
  },
  {
    path: 'redirect-page',
    loadComponent: () =>
      import('./features/page-redirect/pages/page-redirect/page-redirect.component').then(
        (c) => c.PageRedirectComponent,
      ),
  },
  { path: '', redirectTo: '/redirect', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./features/page-not-found/pages/page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent,
      ),
  },
];
