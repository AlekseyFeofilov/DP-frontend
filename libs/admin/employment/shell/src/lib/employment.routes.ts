import { Route } from '@angular/router';

export const EMPLOYMENT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@dp/admin/employment/pages').then(m => m.AllEmploymentsComponent),
  },
];
