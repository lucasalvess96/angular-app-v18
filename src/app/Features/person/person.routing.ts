import { Route } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/person-home/person-home.component').then((c) => c.PersonHomeComponent),
  },
  {
    path: 'person',
    loadComponent: () => import('./pages/person/person.component').then((c) => c.PersonComponent),
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/person-add/person-add.component').then((c) => c.PersonAddComponent),
  },
  {
    path: 'person-signal',
    loadComponent: () => import('./pages/person-signal/person-signal.component').then((c) => c.PersonSignalComponent),
  },
];

export default routes;
