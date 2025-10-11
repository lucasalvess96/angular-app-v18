import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/forms-one/forms-one.component').then((c) => c.FormsOneComponent),
  },
  {
    path: 'forms-two',
    loadComponent: () => import('./pages/forms-two/forms-two.component').then((c) => c.FormsTwoComponent),
  },
];

export default routes;
