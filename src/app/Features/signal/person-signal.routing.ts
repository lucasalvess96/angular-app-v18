import { Route } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/person-signal/person-signal.component').then((c) => c.PersonSignalComponent),
  },
  // {
  //   path: 'person',
  //   loadComponent: () => import('./pages/person/person.component').then((c) => c.PersonComponent),
  // },
  // {
  //   path: 'add',
  //   loadComponent: () => import('./pages/person-add/person-add.component').then((c) => c.PersonAddComponent),
  // },
  // {
  //   path: 'detail/:id',
  //   loadComponent: () => import('./pages/person-detail/person-detail.component').then((c) => c.PersonDetailComponent),
  // },
  // {
  //   path: 'edit/:id',
  //   loadComponent: () => import('./pages/person-update/person-update.component').then((c) => c.PersonUpdateComponent),
  // },
  // {
  //   path: 'person-signal',
  //   loadComponent: () => import('./pages/person-signal/person-signal.component').then((c) => c.PersonSignalComponent),
  // },
];

export default routes;
