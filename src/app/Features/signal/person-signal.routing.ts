import { Route } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/person-signal/person-signal.component').then((c) => c.PersonSignalComponent),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/person-detail/person-detail.component').then((c) => c.PersonDetailComponent),
  },
];

export default routes;
