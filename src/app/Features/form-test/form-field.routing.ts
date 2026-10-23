import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../form-test/pages/form-dinamic-test/form-dinamic-test.component').then(
        (c) => c.FormDinamicTestComponent,
      ),
  },
];
export default routes;
