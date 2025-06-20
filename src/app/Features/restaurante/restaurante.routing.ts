import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../../features/restaurante/pages/restaurantes/restaurantes.component').then(
        (c) => c.RestaurantesComponent,
      ),
  },
  {
    path: 'restaurante-detail/:id',
    loadComponent: () =>
      import('../../features/restaurante/pages/restaurante-detail/restaurante-detail.component').then(
        (c) => c.RestauranteDetailComponent,
      ),
  },
];
export default routes;
