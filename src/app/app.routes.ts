import { Routes } from '@angular/router';

export const routes: Routes = [
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
  },
  {
    path: 'restaurantes',
    loadComponent: () =>
      import('./features/restaurante/pages/restaurantes/restaurantes.component').then((c) => c.RestaurantesComponent),
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
